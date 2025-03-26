import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

import { Col, Container, Row} from 'react-bootstrap'

const PrivateRoute = () => {
  const currentUser = localStorage.getItem("user"); // Check if user is logged in
  return currentUser ? 
  <>
    <Container fluid>

      <Row className="mt-3">
        <Sidebar />
          {/* ✅ Animated Welcome Banner */}
          <Col>
          <Container>
            <div className="welcome-banner">
              <p className="scrolling-text">
                Welcome to FarmHub: Your Trusted Platform for Agricultural Land Leasing
              </p>
          </div>
          <Outlet /> 
          </Container>
          </Col>
        
      </Row>
      </Container>
  </>
  : <Navigate to="/login" />; // Redirect if no user
};

export default PrivateRoute;
