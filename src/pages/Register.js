import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";

export default function Register() {
  const { user } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {}, []);

  function registerUser(e) {
    e.preventDefault();
    fetch(`${process.env.GRIDPAY_API}/user/register`, {
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
    });
  }
}
