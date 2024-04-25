import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import AxiosClient from "../client/client";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
  const client = new AxiosClient();
  const [formData, setFormData] = useState({});
  console.log(formData);
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
    const response = await client.post("/login", formData);
    if (response.statusCode === 200) {
      localStorage.setItem("auth", JSON.stringify(response.token));
      navigate("/home");
    }
  };


   const handleLoginWithGithub = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`;
  };

  return (
    <Form onSubmit={onSubmit} className="m-5" style={{ width: 400 }}>
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
      
      <Form.Group className="mb-3">
        <Col>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Col>
      </Form.Group>

      <Form.Group className="mb-3">
        <Col>
        if you are not registered  
          <Link to="/register">
            Register here
          </Link>
        </Col>
      </Form.Group>

      <Form.Group>
        <Col>
          <Button onClick={handleLoginWithGithub} variant="success" type="submit">
            Login with Github
          </Button>
        </Col>
      </Form.Group>
      
    </Form>
  );
};

export default Login;