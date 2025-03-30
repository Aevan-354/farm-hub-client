import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spinner, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate
import { API } from "../api";
import "./Dashboard.css"; // ✅ Ensure you have proper styling

const Dashboard = () => {
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // ✅ Initialize useNavigate

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const response = await API.get("/lands");
        setLands(response.data);
      } catch (error) {
        console.error("Error fetching lands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLands();
  }, []);

  const removeLandFromMarket =async land =>{
    if(window.confirm('Are you sure to remove land from market?')){
      await API.post(`/lands/market-place/${land.id}`, {is_in_marketplace: false});
      selectedLand({
        ...land,
        is_in_marketplace: false
      })

    }
  }

  const listLandToMarket =async land =>{
    try {
      
      const {data: {message}} =await API.post(`/lands/market-place/${land.id}`, {is_in_marketplace: true});
      selectedLand({
        ...land,
        is_in_marketplace: true
      })
      alert(message)
    } catch (error) {
      alert('Error Listing Land')
    }
  }
  // ✅ Function to handle Bid Now button click
const handleBidClick = (land) => {
  if (land && land._id) {
    navigate(`/market-place/${land._id}`);  // ✅ Now it matches the corrected route
  } else {
    console.error("Land ID is missing:", land);
  }
};

  return (
    <Container className="dashboard-container">
      <h2 className="dashboard-title">Welcome to your Dashboard</h2>

      {/* ✅ Display Selected Land on Top, Pushing Other Lands Down */}
      {selectedLand && (
        <Row className="selected-land p-3 border rounded mb-4">
          <Col md={6}>
            <img
              src={selectedLand.image_url}
              alt={selectedLand.title}
              className="img-fluid"
              style={{ borderRadius: "10px", maxHeight: "300px", objectFit: "cover", width: "100%" }}
            />
          </Col>
          <Col md={6}>
            <h4>{selectedLand.title}</h4>
            <p><strong>Description:</strong> {selectedLand.description}</p>
            <p><strong>Location:</strong> {selectedLand.location}</p>
            <p><strong>Price:</strong> Ksh {selectedLand.price}</p>
            <p><strong>Size:</strong> {parseInt(`${selectedLand.size}`)} Acres</p>

            {/* ✅ Google Maps Link */}
            <p>
              <strong>View on Google Maps:</strong>{" "}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedLand.location)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Location
              </a>
            </p>

            {/* ✅ "Bid Now" Button - Uses handleBidClick */}
            <Button onClick={() => listLandToMarket(selectedLand)} className="btn btn-success">
              List On Market
            </Button>
          </Col>
        </Row>
      )}

      {/* ✅ Other Lands List (Still Visible) */}
      <h3>Available Lands</h3>
      <Row>
        {loading ? (
          <Spinner animation="border" />
        ) : lands.length > 0 ? (
          lands.map((land) => (
            <Col md={4} key={land.id || land._id} className="mb-4">
              <Card
                className="land-card"
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src={land.image_url}
                  alt={land.title}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/200") }
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{land.title}</Card.Title>
                  <p><strong>Location:</strong> {land.location}</p>
                  <p><strong>Price:</strong> Ksh {land.price}</p>
                <Button onClick={() => setSelectedLand(land)}>View</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No lands available yet.</p>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;
