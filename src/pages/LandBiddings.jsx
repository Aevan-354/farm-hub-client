import React, { useEffect, useState } from "react";
import { Table, Button, Badge} from "react-bootstrap";
import "../components/MyBiddings.css"; 
import { getLandBids, getUserBids, removeBid, selectHighestBidder } from "../api/bids.api";
import { formatCurrency } from "../utils/currency-formatter";
import { useParams } from "react-router-dom";

const LandBiddings = () => {
    const params =useParams()
  const [biddings, setBiddings] = useState([]);
  useEffect(() => { 
    (async () => {
      const data =await getLandBids(Number(params.id));
      setBiddings(data);
    })();
  }, [])

  const selectWinner = async (land) =>{
    try {
     if(window.confirm(`Select ${land.username} as winner?`)){
        await selectHighestBidder(land.bid_id, land.id)
        const data =await getLandBids(land.id);
        setBiddings(data);
        alert(`${land.username} is selected as the bid winner. Bid closed`)
      }
    } catch ({message}) {
      alert(message)
    }
  }


  return (
    <div className="container">
      <h2>Land Bids</h2>
      <Table striped bordered hover className="biddings-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Land</th>
            <th>Location</th>
            <th>User</th>
            <th>Bid Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {biddings.map((bid) => {
            return (
              <tr key={bid.id}>
                <td>  <img src={bid.image_url} alt={bid.name} className="land-image" />  </td>
                <td>{bid.title}</td>
                <td>{bid.location}</td>
                <td>KSH. {formatCurrency(bid.bid_price)}</td>
                <td>{bid.username}</td>
                <td><Button variant="primary" onClick={() =>selectWinner(bid)}>Pick Bid</Button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default LandBiddings;
