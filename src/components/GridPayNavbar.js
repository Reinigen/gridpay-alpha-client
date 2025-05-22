import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import Logo from "../assets/GP Logo No BG.png";

export default function GridPayNavbar() {
  const { user } = useContext(UserContext);
  // const { login, setLogin } = useContext(false);

  // useEffect(() => {}, [login]);
  console.log("Hello From the Navbar", user);

  return user.id !== null ? (
    <>
      <Navbar className="gridpay-gradient justify-content-between">
        <Navbar.Brand className="text-logo" as={NavLink} to="/">
          <Image
            src={Logo}
            className="d-inline-block ms-3 me-2 align-center logo-small"
          />
          GridPay
        </Navbar.Brand>
        <Container className="d-flex flex-row justify-content-end">
          <Nav.Link as={NavLink} to="/logout" className="me-3">
            <i className="bi bi-box-arrow-right"> </i>
            Logout
          </Nav.Link>
          <Nav.Link as={NavLink} to="/profile" className="me-3">
            <i className="bi bi-person"> </i>
            Profile
          </Nav.Link>
        </Container>
      </Navbar>
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
