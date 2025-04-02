import React from "react";
import { Navbar, Nav, Container, Form, FormControl, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './CustomNavbar.css';

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
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="nav-item dropdown">
              <Nav.Link href="#" className="nav-link dropdown-toggle">Our Services</Nav.Link>
              <div className="dropdown-menu card-dropdown">
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>Our Services</Card.Title>
                    <Card.Text>
                      Explore the range of services offered by FarmHub:
                      <ul>
                        <li>A digital Platfrom fro leasing agricultural land</li>
                        <li>Connecting Land owners with Tenants</li>
                        <li>Ensuring Agriculrural Growth</li>
                      </ul>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>

            <div className="nav-item dropdown">
              <Nav.Link href="#" className="nav-link dropdown-toggle">Blogs</Nav.Link>
              <div className="dropdown-menu card-dropdown">
                <Card style={{ width: '30rem' }}>
                  <Card.Body>
                    <Card.Title>Blogs</Card.Title>
                    <Card.Text>
                      <ul>
                   <li> ​FarmHub simplifies the process of leasing agricultural land by connecting landowners with individuals seeking farmland.</li> 
                   <li>​Verified Listings: Ensures all farms are authenticated for quality and legitimacy.</li>
                    <li>​Secure Transactions: Provides fast and safe payment processes, offering peace of mind to users.​</li>
                    <li>Terms: Accommodates various leasing durations—daily, weekly, or long-term—to suit different needs</li>
                    <li>Eco-Friendly Focus: Promotes sustainable and organic farming practices, supporting environmental conservation.​</li>
                    <li>By offering a user-friendly platform with these features, FarmHub facilitates seamless connections between landowners and tenants, fostering a thriving agricultural community.</li>
                    </ul> 
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>

            <div className="nav-item dropdown">
              <Nav.Link href="#" className="nav-link dropdown-toggle">Contact Us</Nav.Link>
              <div className="dropdown-menu card-dropdown">
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>Contact Us</Card.Title>
                    <Card.Text>
                      Hallo us on:
                      <ul>
                        <li>Email: info@farmhub.com</li>
                        <li>Phone: +254 111 653 396</li>
                        <li>Follow us on:
                          <ul>
                            <li><a href="https://facebook.com/farmhub">Facebook</a></li>
                            <li><a href="https://twitter.com/farmhub">Twitter(X)</a></li>
                            <li><a href="https://instagram.com/farmhub">Instagram</a></li>
                          </ul>
                        </li>
                      </ul>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Nav>

          <Form className="d-flex mx-auto w-50">
            <FormControl type="search" placeholder="Search for land..." className="me-2" />
          </Form>

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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
