import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Form, Spinner } from "react-bootstrap";
import { API } from "../api";

const MarketPlace = () => {
  const { id } = useParams();  // Get the Land ID from the URL
  const [land, setLand] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLandDetails = async () => {
      try {
        const response = await API.get(`/lands/${id}`);
        setLand(response.data);
      } catch (error) {
        console.error("Error fetching land details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLandDetails();
  }, [id]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    if (!bidAmount) {
      alert("Please enter a bid amount.");
      return;
    }

    try {
      await API.post(`/bids`, { landId: id, amount: bidAmount });
      alert("Bid submitted successfully!");
      setBidAmount("");  // Clear the input field
      navigate("/dashboard");  // Redirect user back to dashboard after bidding
    } catch (error) {
      console.error("Error submitting bid:", error);
      alert("Failed to submit bid.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Bid for Land</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : land ? (
        <Card className="p-4">
          <Card.Body>
            <Card.Title>{land.title}</Card.Title>
            <Card.Text><strong>Location:</strong> {land.location}</Card.Text>
            <Card.Text><strong>Size:</strong> {land.size} Acres</Card.Text>
            <Card.Text><strong>Current Price:</strong> Ksh {land.price}</Card.Text>

            {/* Bid Input Form */}
            <Form onSubmit={handleBidSubmit} className="mt-3">
              <Form.Group>
                <Form.Label>Enter Your Bid (Ksh)</Form.Label>
                <Form.Control
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter bid amount"
                  required
                />
              </Form.Group>

              <Button className="mt-3" variant="success" type="submit">
                Submit Bid
              </Button>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <p>Error loading land details.</p>
      )}
    </Container>
  );
};

export default MarketPlace;
