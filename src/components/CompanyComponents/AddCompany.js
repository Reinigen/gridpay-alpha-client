import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export default function AddCompany({ fetchData }) {
  const [companyName, setCompanyName] = useState("");
  const [address, setCompanyAddress] = useState("");
  const [employee, setEmployee] = useState(null);
  const [pricingPlan, setPricingPlan] = useState({
    tiered: false,
    tiers: [0],
    rates: [0],
    tax: 0,
  });

  const [tiered, setTiered] = useState(false);
  const [tiers, setTiers] = useState([0]);
  const [rates, setRates] = useState([0]);
  const [tax, setTax] = useState(0);

  const [showAdd, setShowAdd] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const openAdd = () => {
    setShowAdd(true);
  };

  const closeAdd = () => {
    setShowAdd(false);
    setCompanyName("");
    setCompanyAddress("");
    setEmployee(null);
    setTiered(false);
  };

  const addTier = () => {
    setTiers([...tiers, 0]);
    setRates([...rates, 0]);
  };

  const updateTier = (index, value) => {
    const newTiers = [...tiers];
    newTiers[index] = value;
    setTiers(newTiers);
  };
  const updateRate = (index, value) => {
    const newRates = [...rates];
    newRates[index] = value;
    setRates(newRates);
  };

  const removeTier = (index) => {
    const newTiers = tiers.filter((_, i) => i !== index);
    const newRates = rates.filter((_, i) => i !== index);
    setTiers(newTiers);
    setRates(newRates);
  };

  function createCompany(e) {
    e.preventDefault();

    let token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_GRIDPAY_API}/companies/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        companyName: companyName,
        address: address,
        employee: employee,
        pricingPlan: pricingPlan,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Company created successfully") {
          setCompanyName("");
          setCompanyAddress("");
          setEmployee(null);
          setPricingPlan({
            tiered: false,
            tiers: [0],
            rates: [0],
            tax: 0,
          });

          fetchData();
          closeAdd();

          Swal.fire({
            icon: "success",
            title: "Company Added",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: data.message,
          });
        }
      });
  }
  useEffect(() => {
    // console.log(pricingPlan);
    setPricingPlan({
      tiered: tiered,
      tiers: tiers,
      rates: rates,
      tax: tax,
    });
    if (companyName !== "" && address !== "" && pricingPlan !== null) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [
    companyName,
    address,
    employee,
    setPricingPlan,
    tiered,
    tiers,
    rates,
    tax,
  ]);
  return (
    <>
      <Button
        className="my-3 btn-important"
        size="xl"
        onClick={() => openAdd()}
      >
        <i className="bi bi-plus-square"> </i>
        Create Company
      </Button>
      <Modal show={showAdd} onHide={closeAdd}>
        <Form
          onSubmit={(e) => {
            createCompany(e);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Company</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="companyName">
              <Form.Label>Company Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                required
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="companyAddress">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                required
                value={address}
                onChange={(e) => {
                  setCompanyAddress(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Pricing Plan: </Form.Label>
              <Form.Group>
                <Form.Label>Tiered</Form.Label>
                <Form.Switch
                  checked={tiered}
                  onChange={(e) => {
                    setTiered(e.target.checked);
                  }}
                />
              </Form.Group>
              {tiered ? (
                <Form.Group>
                  {tiers.map((tier, index) => (
                    <div key={index}>
                      <Form.Label>Tier {index + 1}</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Tier"
                        required
                        value={tier}
                        onChange={(e) => {
                          updateTier(index, e.target.value);
                        }}
                      />
                      <Form.Label>Rate</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Rate"
                        required
                        value={rates[index]}
                        onChange={(e) => {
                          updateRate(index, e.target.value);
                        }}
                      />
                      <Button
                        variant="danger"
                        onClick={() => {
                          removeTier(index);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="success"
                    onClick={() => {
                      addTier();
                    }}
                  >
                    Add Tier
                  </Button>
                </Form.Group>
              ) : (
                <Form.Group>
                  <Form.Label>Rate</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Rate"
                    required
                    value={rates}
                    onChange={(e) => {
                      setRates([e.target.value]);
                    }}
                  />
                </Form.Group>
              )}
              <Form.Group>
                <Form.Label>Tax</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Tax"
                  required
                  value={tax}
                  onChange={(e) => {
                    setTax(e.target.value);
                  }}
                />
              </Form.Group>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeAdd}>
              Close
            </Button>
            {isActive ? (
              <Button variant="success" type="submit">
                Add Company
              </Button>
            ) : (
              <Button variant="danger" disabled>
                Fill in the necessary fields
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
