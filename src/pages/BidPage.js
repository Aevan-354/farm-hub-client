import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Table, Button, Spinner, Alert } from "react-bootstrap";
import { API } from "../api";
import { useMarket } from "../context/MarketContext"; // Import Market Context

const BidPage = () => {
  const { id } = useParams(); // Get Land ID from URL
  const { addToMarket } = useMarket(); // Get function from Context
  const navigate = useNavigate(); // Navigation Hook

  const [land, setLand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch land details
  useEffect(() => {
    const fetchLandDetails = async () => {
      try {
        const response = await API.get(`/lands/${id}`);
        setLand(response.data);
      } catch (err) {
        console.error("Error fetching land details:", err);
        setError("Failed to load land details.");
      } finally {
        setLoading(false);
      }
    };

    fetchLandDetails();
  }, [id]);

  const handleAddToMarket = () => {
    if (land) {
      addToMarket(land);
      alert(`${land.title} added to the marketplace!`);
      navigate("/market"); // Redirect to Marketplace Page
    }
  };

  return (
    <Container className="mt-4">
      <h2>Land Details</h2>

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : land ? (
        <>
          <Table bordered hover className="mt-3">
            <tbody>
              <tr>
                <th>Title</th>
                <td>{land.title}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{land.location}</td>
              </tr>
              <tr>
                <th>Size</th>
                <td>{land.size} Acres</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>Ksh {land.price.toLocaleString()}</td>
              </tr>
            </tbody>
          </Table>

          {/* Bid Now -> Add to Market Button */}
          <Button variant="primary" className="mt-3" onClick={handleAddToMarket}>
            Add to Marketplace
          </Button>
        </>
      ) : (
        <Alert variant="warning">Land details not found.</Alert>
      )}
    </Container>
  );
};

export default BidPage;
