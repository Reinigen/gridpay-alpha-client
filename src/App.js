import "./App.css";
import Container from "react-bootstrap/Container";
import { data, BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { UserProvider } from "./context/UserContext";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  function unsetUser() {
    localStorage.clear();
  }

  useEffect(() => {
    fetch(`${process.env.GRIDPAY_API}/user/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.auth !== "Failed") {
          setUser({
            id: data.userId,
            isAdmin: data.isAdmin,
          });
        } else {
          setUser({
            id: data.userId,
            isAdmin: data.isAdmin,
          });
        }
      });
  }, []);
  // Used to check if the user information is properly stored upon login and the localStorage information is cleared upon logout
  useEffect(() => {
    // console.log(user);
    // console.log(localStorage);
  }, [user]);
  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <Container>
            <Routes>{/* <Route path="/" element={<Home />} /> */}</Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
