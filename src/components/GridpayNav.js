import { Container, Image, Nav } from "react-bootstrap";
import { Navigate, NavLink } from "react-router-dom";
import Logo from "../assets/GP Logo No BG.png";
import { useContext } from "react";
import CompanyContext from "../context/CompanyContext";
import UserContext from "../context/UserContext";

export default function GridPayNav() {
  const { company } = useContext(CompanyContext);
  const { user } = useContext(UserContext);

  return user.id !== null ? (
    company.isActive !== null ? (
      <>
        <Container className="d-flex flex-column jusity-content-between">
          <Container className="d-flex pt-5 flex-column justify-content-around border-end">
            <Nav className="d-flex flex-column align-items-center">
              <Nav.Link
                className="text-logo"
                as={NavLink}
                to="/switching-company"
              >
                <Image src={Logo} style={{ width: "6rem" }}></Image>
                <p className="d-none d-xl-inline text-title">{company.name}</p>
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
    ) : (
      <Navigate to="/company-selector" />
    )
  ) : (
    <></>
  );
}
