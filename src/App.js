import Container from "react-bootstrap/Container";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { UserProvider } from "./context/UserContext";
import { useEffect, useState } from "react";
import Register from "./pages/Register";
import GridPayNavbar from "./components/GridPayNavbar";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Readings from "./pages/Readings";
import GridPayNav from "./components/GridpayNav";
import CompanySelector from "./components/CompanyComponents/CompanySelector";
import { CompanyProvider } from "./context/CompanyContext";

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const [company, setCompany] = useState({
    id: null,
    name: null,
  });

  function unsetUser() {
    localStorage.clear();
  }
  function unsetCompany() {
    localStorage.clear();
  }

  // update/check user stuff
  useEffect(() => {
    fetch(`${process.env.REACT_APP_GRIDPAY_API}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.auth !== "Failed") {
          setUser({
            id: data.data.userId,
            isAdmin: data.data.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      });
  }, []);

  // update/check company stuff
  useEffect(() => {
    fetch(`${process.env.REACT_APP_GRIDPAY_API}/companies/owner`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message !== "Company not found") {
          setCompany({
            id: data.data.id,
            name: data.data.name,
          });
        } else {
          setCompany({
            id: null,
            name: null,
          });
        }
      });
  }, []);

  // Used to check if the user information is properly stored upon login and the localStorage information is cleared upon logout
  useEffect(() => {
    // console.log("User: ", user);
    // console.log("Company: ", company);
    // console.log(localStorage);
  }, [user, company]);
  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <CompanyProvider value={{ company, setCompany, unsetCompany }}>
          <Router>
            <GridPayNavbar />
            {user.isAdmin && company.id == null ? (
              <CompanySelector />
            ) : (
              <Container className="d-flex flex-row m-0 p-0 vh-100">
                <GridPayNav
                  className="col m-0 p-0"
                  style={{ width: "4 rem" }}
                />
                <Container className="pt-3 col-3 col-lg-12">
                  <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/readings" element={<Readings />} />
                  </Routes>
                </Container>
              </Container>
            )}
          </Router>
        </CompanyProvider>
      </UserProvider>
    </>
  );
}

export default App;
