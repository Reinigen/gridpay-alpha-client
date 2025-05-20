import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Container, Form, Image } from "react-bootstrap";
import UserContext from "../context/UserContext";
import Swal from "sweetalert2";
import Logo from "../assets/GP Logo No BG.png";

export default function Readings() {
  const { user } = useContext(UserContext);

  return user.id !== null ? (
    <>
      <Container className="d-inline-flex flex-column">
        <h1>Readings</h1>
      </Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
