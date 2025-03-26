import React from "react";
import { Container, Button } from "react-bootstrap";

const Hero = () => {
  return (
    <div className="hero-section">
      <Container className="text-center text-Dark-green">
        <h1>Welcome To FarmHub</h1>
        <p>
        "Find the perfect land for your farming needs. Search, bid, and grow with ease. 
        Your journey to affordable and accessible farmland starts here"
        </p>
        <Button
  className="btn btn-success"
  style={{ width: "200px" }} // Adjust this width as needed
>
  Get Started
</Button>

      </Container>
    </div>
  );
};

export default Hero;
