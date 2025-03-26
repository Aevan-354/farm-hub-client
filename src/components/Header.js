import React from "react";
import { Navbar, Nav, Form, FormControl, Button, Container } from "react-bootstrap";
import { FaHeart, FaUser, FaShoppingCart, FaSyncAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

<Link to="/listings">Lands Available</Link>

const Header = () => {
  return (
    <>
      {/* Top Navbar */}
      <Navbar bg="success" variant="dark" expand="lg" className="p-3">
        <Container>
          {/* Logo */}
          <Navbar.Brand href="#">
            <strong>FarmHub</strong>
          </Navbar.Brand>

          {/* Toggle Button for Mobile View */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Navbar Links */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Form className="d-flex">
                <FormControl type="search" placeholder="Search lands here..." className="me-2" />
                <Button variant="light">🔍</Button>
              </Form>
            </Nav>

            {/* Icons & Links */}
            <Nav>
              <Nav.Link href="#" className="text-white">
                <FaSyncAlt /> 
              </Nav.Link>
              <Nav.Link href="#" className="text-white">
                <FaHeart /> Favorites
              </Nav.Link>
              <Nav.Link href="#" className="text-white">
                <FaUser /> Account
              </Nav.Link>
              <Nav.Link href="#" className="text-white">
                <FaShoppingCart /> Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Second Navbar - Navigation Menu */}
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className="mx-auto">
            <Nav.Link href="#" className="fw-bold text-dark">🌱 Lands Available</Nav.Link>
            <Nav.Link href="#" className="fw-bold text-dark">🏠 Home</Nav.Link>
            <Nav.Link href="#" className="fw-bold text-dark">💼 Our Services</Nav.Link>
            <Nav.Link href="#" className="fw-bold text-dark">📝 Blogs</Nav.Link>
            <Nav.Link href="#" className="fw-bold text-dark">📞 Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
