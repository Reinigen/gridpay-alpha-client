import { Container, Image, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import Logo from "../assets/GP Logo No BG.png";

export default function GridPayNav({ CompanyName }) {
  return (
    <>
      <Container className="d-flex flex-column jusity-content-between">
        <Container className="d-flex pt-5 flex-column justify-content-around border-end">
          <Nav className="d-flex flex-column align-items-center">
            {/* Company */}
            <Nav.Link className="text-logo" as={NavLink} to="/company">
              <Image src={Logo} style={{ width: "6rem" }}></Image>
              <p className="d-none d-xl-inline text-title">Company Name</p>
              <hr></hr>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/dashboard">
              <i className="bi bi-house-door"> </i>
              <p className="d-none d-xl-inline">Dashboard</p>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/readings">
              <i className="bi bi-speedometer2"> </i>
              <p className="d-none d-xl-inline">Readings</p>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/customers">
              <i className="bi bi-people"> </i>
              <p className="d-none d-xl-inline">Customers</p>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/billings">
              <i className="bi bi-receipt"> </i>
              <p className="d-none d-xl-inline">Billing</p>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/payments">
              <i className="bi bi-cash"> </i>
              <p className="d-none d-xl-inline">Payments</p>
            </Nav.Link>
          </Nav>
        </Container>
        <p></p>
      </Container>
    </>
  );
}
