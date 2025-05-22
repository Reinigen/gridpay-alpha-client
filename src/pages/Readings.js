import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  FormGroup,
  Image,
} from "react-bootstrap";
import UserContext from "../context/UserContext";
import Swal from "sweetalert2";
import Logo from "../assets/GP Logo No BG.png";

export default function Readings() {
  const { user } = useContext(UserContext);

  return user.id !== null ? (
    <>
      <h1>Readings</h1>
      <Container className="d-inline-flex flex-column">
        <ButtonGroup className="d-flex justify-content-between mb-3">
          <Button className="btn-important w-25 m-3" onClick={() => {}}>
            Add Reading
          </Button>
          <FormGroup>
            <Form.Label for="reading_date">Reading Date:</Form.Label>
            <Form.Control type="month" id="reading_date" />
          </FormGroup>
        </ButtonGroup>
      </Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
