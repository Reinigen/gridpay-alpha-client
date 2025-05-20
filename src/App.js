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

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  function unsetUser() {
    localStorage.clear();
  }

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
  // Used to check if the user information is properly stored upon login and the localStorage information is cleared upon logout
  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  }, [user]);
  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          {user.id !== null ? (
            <GridPayNavbar className="d-flex flex-column" />
          ) : (
            <GridPayNavbar />
          )}
          <Container>
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/readings" element={<Readings />} />
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
