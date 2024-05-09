import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AxiosClient from "../client/client";
import { useNavigate } from "react-router-dom";
import MyNavbar from "../components/navbar/MyNavbar";
import Footer from "../components/footer/Footer";
import "./Login&Register.css"

const Register = () => {
  const client = new AxiosClient();
  const [formData, setFormData] = useState({});
  const [error,setError]=useState(null)
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 const onSubmit = async (e) => {
    e.preventDefault();
    try{
    const response = await client.post("/user", formData);
    if (response.statusCode === 201) {
     localStorage.setItem("auth", response.token);
      navigate("/cart");
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      setError("Si sono verificati degli errori nei dati inseriti. Controlla e riprova.");
    } else {
      setError("Si è verificato un errore durante la registrazione. Si prega di riprovare più tardi.");
    }
  }
  };


return (
  <>
  <MyNavbar/>
  <div className="register container py-5">
  {error && <div className="alert alert-danger">{error}</div>}
    <Form onSubmit={onSubmit} className="form container my-5" >
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          name="firstName"
          type="text"
          onChange={onChangeInput}
          placeholder="Enter first name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          name="lastName"
          type="text"
          onChange={onChangeInput}
          placeholder="Enter last name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          type="email"
          onChange={onChangeInput}
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          onChange={onChangeInput}
          placeholder="Password"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
    </div>
    <Footer/>
    </>
  );
};

export default Register;