import React from "react";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand href="/">Farm-Hub</Navbar.Brand>

        {/* left Side Icons */}
        <Nav>
        <Nav.Link href="/home" className="text-white">Home</Nav.Link>
          <Nav.Link href="/our services" className="text-white">Our Services</Nav.Link>
          <Nav.Link href="/blogs" className="text-white">Blogs</Nav.Link>
          <Nav.Link href="/contact us" className="text-white">Contact Us</Nav.Link>
          </Nav>

        {/* Search Bar */}
        <Form className="d-flex mx-auto w-50">
          <FormControl type="search" placeholder="Search for land..." className="me-2" />
        </Form>

          {/* Show Login/Register if not logged in */}
          <Nav>
          {!isLoggedIn ? (
            <>
              <Nav.Link href="/login" className="text-white">Sign in</Nav.Link>
              <Nav.Link href="/register" className="text-white">Register</Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={handleLogout} className="text-white">Logout</Nav.Link>
          )}

        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
