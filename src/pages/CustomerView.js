import { useCallback, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { ButtonGroup, Container, Form, FormGroup } from "react-bootstrap";
import UserContext from "../context/UserContext";
import AddCustomer from "../components/CustomerComponents/AddCustomer";
import CompanyContext from "../context/CompanyContext";

export default function CustomerView() {
  const { user } = useContext(UserContext);
  const { company } = useContext(CompanyContext);
  const companyId = company.id;

  const [customers, setCustomers] = useState([]);

  const fetchCustomers = useCallback(() => {
    fetch(`${process.env.REACT_APP_GRIDPAY_API}/customers/${companyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomers(data);
      });
  }, [setCustomers]);

  return user.id !== null ? (
    <>
      <h1>Customers</h1>
      <Container className="d-inline-flex flex-column">
        <ButtonGroup className="d-flex justify-content-between mb-3">
          <FormGroup>
            <Form.Label for="installation_date">Installation Date:</Form.Label>
            <Form.Control type="date" id="installation_date" />
          </FormGroup>
          <AddCustomer fetchData={fetchCustomers} />
        </ButtonGroup>
      </Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
