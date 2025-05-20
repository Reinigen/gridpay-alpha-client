import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Form, Image } from "react-bootstrap";
import UserContext from "../context/UserContext";
import Swal from "sweetalert2";
import Logo from "../assets/GP Logo No BG.png";

export default function Register() {
  const { user } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      mobileNo !== "" &&
      password === confirmPassword &&
      mobileNo.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, password, confirmPassword, mobileNo]);

  function registerUser(e) {
    e.preventDefault();
    console.log("Registering user");
    console.log(process.env.REACT_APP_GRIDPAY_API);
    fetch(`${process.env.REACT_APP_GRIDPAY_API}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        mobileNo: mobileNo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "User created successfully") {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setMobileNo("");
          Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: "Redirecting to login page",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: data.message,
          });
        }
      });
  }
  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <Form onSubmit={(e) => registerUser(e)}>
      <h1 className="text-logo">
        <Image src={Logo} className="img-fluid logo" /> GridPay
      </h1>
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          value={firstName}
          placeholder="Enter First Name"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          value={lastName}
          placeholder="Enter Last Name"
          required
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          placeholder="Enter Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          placeholder="Enter Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Mobile No.</Form.Label>
        <Form.Control
          type="tel"
          value={mobileNo}
          placeholder="Enter Mobile No."
          required
          onChange={(e) => setMobileNo(e.target.value)}
        />
      </Form.Group>

      <Button
        type="submit"
        className="btn btn-primary"
        id="submitBtn"
        disabled={!isActive}
      >
        Register
      </Button>
    </Form>
  );
}
