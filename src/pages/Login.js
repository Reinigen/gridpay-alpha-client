import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Form, Image } from "react-bootstrap";
import UserContext from "../context/UserContext";
import Swal from "sweetalert2";
import Logo from "../assets/GP Logo No BG.png";

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  function authenticate(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_GRIDPAY_API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status !== 401) {
          localStorage.setItem("token", data.data);
          retrieveUserDetails(data.data);

          // console.log(
          //   "Saved in Local Storage: ",
          //   localStorage.getItem("token")
          // );
          setEmail("");
          setPassword("");

          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: data.message,
          });
        } else if (data.message === "Email and password do not match") {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: data.message,
          });
        } else {
          localStorage.setItem("token", data.token);
          setUser({
            id: data.userId,
            isAdmin: data.isAdmin,
          });
        }
      });
  }

  function retrieveUserDetails(token) {
    console.log("activating retrieveUserDetails");
    fetch(`${process.env.REACT_APP_GRIDPAY_API}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setUser({
          id: data.data.userId,
          isAdmin: data.data.isAdmin,
        });
        console.log("set user", user);
      });
  }
  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return user.id !== null ? (
    <Navigate to={`/dashboard/${user.id}`} />
  ) : (
    <Form className="" onSubmit={(e) => authenticate(e)}>
      <h1 className="text-logo">
        <Image src={Logo} className="img-fluid logo" /> GridPay
      </h1>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!isActive}>
        Login
      </Button>
    </Form>
  );
}
