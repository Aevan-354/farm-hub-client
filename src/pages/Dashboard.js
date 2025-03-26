import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css"; // Import the new CSS file
import { API } from "../api";


const Dashboard = () => {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const response = await API.get('/lands');
        setLands(response.data);
      } catch (error) {
        console.error("Error fetching lands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLands();
  }, []);

  return (
    <>
              <h2 className="dashboard-title">Welcome to your Dashboard</h2>

              {/* ✅ Summary Cards */}
              <Row>
                <Col md={4}>
                  <Card className="summary-card uploads-card">
                    <Card.Body>
                      <Card.Title>Total Uploads</Card.Title>
                      {loading ? <Spinner animation="border" size="sm" /> : <h4>{lands.length}</h4>}
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="summary-card bids-card">
                    <Card.Body>
                      <Card.Title>Total Bids</Card.Title>
                      <h4>0</h4>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="summary-card rented-card">
                    <Card.Body>
                      <Card.Title>Total Rented Lands</Card.Title>
                      <h4>0</h4>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* ✅ Favorite Lands & Reviews */}
              <Row>
                <Col md={6}>
                  <Card className="info-card">
                    <Card.Body>
                      <Card.Title>Payments</Card.Title>
                      <p>All Payments History</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="info-card">
                    <Card.Body>
                      <Card.Title>Reviews</Card.Title>
                      <p>No Reviews Yet</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* ✅ Latest Lands */}
              <h3 className="mt-4">Latest Lands</h3>
              <Row>
                {loading ? (
                  <Spinner animation="border" />
                ) : lands.length > 0 ? (
                  lands.map((land) => (
                    <Col md={4} key={land.id || land._id} className="mb-4">
                      <Card className="land-card">
                        <Card.Img
                          variant="top"
                          src={land.image_url}
                          alt={land.title}
                          onError={(e) => (e.target.src = "https://via.placeholder.com/200")}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <Card.Body>
                          <Card.Title>{land.title}</Card.Title>
                          <Card.Text>{land.description}</Card.Text>
                          <p><strong>Location:</strong> {land.location}</p>
                          <p><strong>Price:</strong> Ksh {land.price}</p>
                          <p><strong>Size: </strong>{parseInt(`${land.size}`)} Acres</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p className="text-center">No lands available yet.</p>
                )}
              </Row>
            </>
  )
}


export default Dashboard;