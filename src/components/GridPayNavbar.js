import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import Logo from "../assets/GP Logo No BG.png";

export default function GridPayNavbar() {
  const { user } = useContext(UserContext);
  // const { login, setLogin } = useContext(false);

  // useEffect(() => {}, [login]);

  return user.id !== null ? (
    <>
      <Navbar className="gridpay-gradient">
        <Navbar.Brand className="text-logo" as={NavLink} to="/">
          <Image
            src={Logo}
            className="d-inline-block ms-3 me-2 align-center logo-small"
          />
          GridPay
        </Navbar.Brand>
      </Navbar>
      <Container
        className="d-inline-flex flex-column"
        style={{ width: "280px" }}
      >
        <Nav className="d-grid flex-column align-items-stretch flex-shrink-0 me-auto">
          <Nav.Link as={NavLink} to="/dashboard">
            <i className="bi bi-house-door"> </i>
            Dashboard
          </Nav.Link>
          <Nav.Link as={NavLink} to="/readings">
            <i className="bi bi-speedometer2"> </i>
            Readings
          </Nav.Link>
          <Nav.Link as={NavLink} to="/customers">
            <i className="bi bi-people"> </i>
            Customers
          </Nav.Link>
          <Nav.Link as={NavLink} to="/billings">
            <i className="bi bi-receipt"> </i>
            Billing
          </Nav.Link>
          <Nav.Link as={NavLink} to="/payments">
            <i className="bi bi-cash"> </i>
            Payments
          </Nav.Link>
          <Nav.Link as={NavLink} to="/logout">
            <i className="bi bi-box-arrow-right"> </i>
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </>
  ) : (
    <>
      <Navbar expand="lg">
        <Container className="d-flex flex-row justify-content-end text-title">
          <Nav.Link as={NavLink} to="/register" className="me-3">
            <i className="bi bi-person-plus"> </i>
            MAKE AN ACCOUNT
          </Nav.Link>
          <Nav.Link as={NavLink} to="/login">
            <i className="bi bi-box-arrow-in-right"> </i>
            LOG IN
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
}
