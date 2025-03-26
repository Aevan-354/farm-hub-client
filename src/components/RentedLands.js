import React from "react";
import { Table, Button, Card } from "react-bootstrap";
import "./RentedLands.css";

const RentedLands = () => {
  const rentedLands = [
    // all rented lands
  ];

  return (
    <div className="rented-lands-container">
      <Card className="rented-lands-card">
        <Card.Body>
          <h2 className="text-center">Rented Lands</h2>
          <Table striped bordered hover responsive className="rented-lands-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Land Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Price</th>
                <th>Size</th>
                <th>Tenant</th>
              </tr>
            </thead>
            <tbody>
              {rentedLands.map((land) => (
                <tr key={land.id}>
                  <td>
                    <img src={land.image} alt={land.title} className="land-image" />
                  </td>
                  <td>{land.title}</td>
                  <td>{land.description}</td>
                  <td>{land.location}</td>
                  <td>{land.price}</td>
                  <td>{land.size}</td>
                  <td>{land.tenant}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RentedLands;
