import  { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/get-current-user';
const Sidebar =() =>{
    const [currentUser, setCurrentUser] =useState({})
    useEffect(() =>{
        const session =getCurrentUser();
        setCurrentUser(session);
    }, [])
    return <Col md={2} className="sidebar">
        <h5 className="text-white">Welcome, {currentUser.username}</h5>
        <ul className="sidebar-links">
        <li><Link to="/dashboard">📊 Dashboard</Link></li>
        <li><Link to="/dashboard/upload-land">📤 Land Uploads</Link></li>
        <li><Link to="/dashboard/market-place">🛒 Market Place</Link></li>
        <li><Link to="/dashboard/My-Biddings">📋 Biddings</Link></li>
        <li><Link to="/dashboard/rented-lands">🏡 Rented Lands</Link></li>
        <li><Link to="/dashboard/payments">💳 Payments</Link></li>
        <li><Link to="/dashboard/reviews">⭐ Reviews</Link></li>
        <li><Link to="/dashboard/profile">👤 Profile</Link></li>
        </ul>
  </Col>
}

export default Sidebar