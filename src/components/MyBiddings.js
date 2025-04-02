import React, { useEffect, useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import "./MyBiddings.css"; // Import CSS file
import { getUserBids, removeBid } from "../api/bids.api";
import { getCurrentUser } from "../api/current-user";
import { formatCurrency } from "../utils/currency-formatter";
import PaymentPrompt from "./PaymentPrompt";

const MyBiddings = () => {
  const [biddings, setBiddings] = useState([]);
  const [selectedBid, setSelectedBid] = useState(null);
  const [userId, setUserId] = useState("");

  const [showPaymentPrompt, setShowPaymentPrompt] =useState(false);
  const handleBidSelection =async (land, visible) =>{
    setSelectedBid(land)
    setShowPaymentPrompt(visible);
    await getMyBids();
  }

  useEffect(() => { 
   getMyBids()
  }, [])

  const getMyBids =async () =>{
    setUserId(getCurrentUser().id);
    const data =await getUserBids();
    setBiddings(data);
  }

  const cancelBid = async (bidId) =>{
    try {
     if(window.confirm('Are you sure you want to widhdraw')){
        await removeBid(bidId);
        const data =await getUserBids();
        setBiddings(data);
        alert('Bid removed successfully')
      }
    } catch ({message}) {
      alert(message)
    }
  }


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
            <th>Ask Price</th>
            <th>Size</th>
            <th>Status</th>
            <th>Bid Price</th>
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
                <td>KSH {formatCurrency(bid.price)}</td>
                <td>{formatCurrency(bid.size)}</td>
                <td>
                {bid.status === "closed"? (
                    bid.won ? <Badge bg="success">Won</Badge> : <Badge bg="secondary">Closed</Badge>
                  ): bid.status === "sold" ?  <Badge bg="danger">Sold</Badge>: <Badge bg="primary">Open</Badge>}
                </td>
                <td>KSH. {formatCurrency(bid.bid_price)}</td>
                
                <td>
                  {bid.status === "closed" && bid.won ? (
                    <Button variant="success" onClick={() =>handleBidSelection(bid, true)}>Pay & Rent</Button>
                  ) : bid.status === "open"? <Button variant="warning" onClick={() =>cancelBid(bid.bid_id)}>Widhdraw</Button> : (
                    <Button variant="secondary" >{bid.status}</Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <PaymentPrompt setShow={handleBidSelection} show={showPaymentPrompt} bid={selectedBid}/>
    </div>
  );
};

export default MyBiddings;
