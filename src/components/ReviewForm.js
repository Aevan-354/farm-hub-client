import React, { useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import "./ReviewForm.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([
    { name: "John Doe", rating: 5, comment: "Great experience!", date: "2025-03-23" },
    { name: "Jane Smith", rating: 4, comment: "Good service but can improve.", date: "2025-03-22" },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  // Handle review submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewWithDate = { ...newReview, date: new Date().toLocaleDateString() };
    setReviews([reviewWithDate, ...reviews]);
    setNewReview({ name: "", rating: 5, comment: "" });
  };

  return (
    <Container className="reviews-container">
      <h2 className="text-center">User Reviews</h2>

      {/* Review Form */}
      <Form onSubmit={handleSubmit} className="review-form">
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={newReview.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control as="select" name="rating" value={newReview.rating} onChange={handleChange}>
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>
                {star} ⭐
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="comment"
            value={newReview.comment}
            onChange={handleChange}
            placeholder="Write your review..."
            required
          />
        </Form.Group>

        <Button type="submit" className="submit-btn mt-3">
          Submit Review
        </Button>
      </Form>

      {/* Review Table */}
      <Table striped bordered hover className="review-table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <tr key={index}>
                <td>{review.name}</td>
                <td>{`${review.rating} ⭐`}</td>
                <td>{review.comment}</td>
                <td>{review.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No reviews yet. Be the first to review!
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Reviews;
