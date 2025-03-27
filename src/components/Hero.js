import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import navigation hook

const Hero = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="hero-section">
      <Container className="text-center text-Dark-green">
        <h1>Welcome To FarmHub</h1>
        <p>
          "Find the perfect land for your farming needs. Search, bid, and grow with ease. 
          Your journey to affordable and accessible farmland starts here."
        </p>
        <Button
          className="btn btn-success"
          style={{ width: "200px" }}
          onClick={() => navigate("/login")} // Navigate to login page
        >
          Get Started
        </Button>
      </Container>
    </div>
  );
};

export default Hero;
