import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./MyNav.css"

const MyNavbar = () => {
  return (
    <Navbar className="mb-5 my-nav" bg="dark" variant="dark" expand="lg">
      <div className="container">
        <Navbar.Brand>My Commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/">Login</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/cart">Carrello</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default MyNavbar;
