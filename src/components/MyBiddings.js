import React, { useEffect, useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import "./MyBiddings.css"; // Import CSS file
import { getUserBids } from "../api/bids.api";
import { getCurrentUser } from "../api/get-current-user";

const MyBiddings = () => {
  const [biddings, setBiddings] = useState([]);
  const [userId, setUserId] = useState("");
  useEffect(() => { 
    (async () => {
      setUserId(getCurrentUser().id);
      const data =await getUserBids();
      setBiddings(data);
    })();
  }, [])


  return (
    <div className="container">
      <h2>My Biddings</h2>
      <Table striped bordered hover className="biddings-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Land</th>
            <th>Description</th>
            <th>Location</th>
            <th>Price</th>
            <th>Size</th>
            <th>Status</th>
            <th>My Bid</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {biddings.map((bid) => {
            return (
              <tr key={bid.id}>
                <td>
                  <img src={bid.image_url} alt={bid.name} className="land-image" />
                </td>
                <td>{bid.title}</td>
                <td>{bid.description}</td>
                <td>{bid.location}</td>
                <td>{bid.price}</td>
                <td>{bid.size}</td>
                <td>
                {bid.status === "sold"? (
                    bid.won ? <Badge bg="success">Won</Badge> : <Badge bg="danger">Sold</Badge>
                  ): bid.status === "closed" ? <Badge bg="secondary">Closed</Badge> : <Badge bg="primary">Open</Badge>}
                </td>
                <td>ksh. {bid.bid_price}</td>
                
                <td>
                  {bid.status === "sold" && bid.won ? (
                    <Button variant="success">Pay & Rent</Button>
                  ) : bid.status === "open"? <Button variant="warning">Cancel</Button> : (
                    <Button variant="secondary" disabled >Cancel</Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default MyBiddings;
