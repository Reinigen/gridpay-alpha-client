import { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import CompanyContext from "../../context/CompanyContext";

export default function AddCustomer({ fetchData }) {
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const { company } = useContext(CompanyContext);

  const [showAdd, setShowAdd] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [multiple, setMultiple] = useState(false);

  const openAdd = () => {
    setShowAdd(true);
  };

  const closeAdd = () => {
    setShowAdd(false);
  };

  const openMultiple = () => {
    setMultiple(true);
  };

  const closeMultiple = () => {
    setMultiple(false);
  };

  function createCustomer(e) {
    e.preventDefault();

    let token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_GRIDPAY_API}/customers/addCustomer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        customerName: customerName,
        customerId: customerId,
        companyId: company.id,
        customerAddress: customerAddress,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Customer added successfully") {
          setCustomerName("");
          setCustomerId("");
          setCustomerAddress("");

          fetchData();
          closeAdd();

          Swal.fire({
            icon: "success",
            title: "Customer Added",
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
    if (customerName !== "" && customerId !== "" && customerAddress !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [customerName, customerId, customerAddress]);
  return (
    <>
      <Container className="d-inline-flex flex-row justify-content-end">
        <Button
          className="my-3 btn-important"
          size="xl"
          onClick={() => openAdd()}
        >
          <i className="bi bi-plus-square"> </i>
          Add Customer
        </Button>
        <Modal show={showAdd} onHide={closeAdd}>
          <Form
            onSubmit={(e) => {
              createCustomer(e);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add New Customer for {company.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="customerId">
                <Form.Label>Customer Id:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Customer Id"
                  required
                  value={customerId}
                  onChange={(e) => {
                    setCustomerId(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="customerName">
                <Form.Label>Customer Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Customer Name"
                  required
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="customerAddress">
                <Form.Label>Customer Address:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Customer Address"
                  required
                  value={customerAddress}
                  onChange={(e) => {
                    setCustomerAddress(e.target.value);
                  }}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeAdd}>
                Close
              </Button>
              {isActive ? (
                <Button variant="success" type="submit">
                  Add Customer
                </Button>
              ) : (
                <Button variant="danger" disabled>
                  Fill in the necessary fields
                </Button>
              )}
            </Modal.Footer>
          </Form>
        </Modal>
        <Button
          className="my-3 mx-3 btn-important"
          size="xl"
          onClick={() => openMultiple()}
        >
          <i className="bi bi-plus-square"> </i>
          Add Multiple Customers
        </Button>
        <Modal show={multiple} onHide={closeMultiple}>
          <Modal.Header closeButton>
            <Modal.Title>Add Multiple Customers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="customersFile">
                <Form.Label>Customers File:</Form.Label>
                <Form.Control type="file" required />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeMultiple}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
