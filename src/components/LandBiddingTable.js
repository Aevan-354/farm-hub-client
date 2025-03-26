import React, {useEffect, useState} from "react";
import { Table, Button, Image, Form } from "react-bootstrap";
// import { landbid } from "../api/landbids";
import "./LandBiddingTable.css";
import { getAvailableLand, placeBid } from "../api/bids.api";
import { getCurrentUser } from "../api/get-current-user";

const LandBiddingTable = () => {
  const [bid, setBid] =useState(null)
  const [lands, setLands] = useState([]);
    useEffect(() => { 
      getAvailableLands();
    }, []);

  async function getAvailableLands(){
    const userId = getCurrentUser().id;
    const data =await getAvailableLand();
    setLands(data.filter(land => land.user_id !== userId).filter(land => land.owner_id !== userId));
  };

  async function bidLand(){
    if(!bid) return
    await placeBid(bid);
    await getAvailableLands();
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Land Bidding</h2>
      <Table striped bordered hover>
        <thead className="bg-primary text-white">
          <tr>
            <th>Image</th>
            <th>Land</th>
            <th>Description</th>
            <th>Location</th>
            <th>Price</th>
            <th>Size</th>
            <th>Bid Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {lands.map((land, index) => (
            <tr key={index}>
              <td>
                <Image src={land.image_url} alt="Land" width="80" height="60" rounded />
              </td>
              <td>{land.title}</td>
              <td>{land.description}</td>
              <td>{land.location}</td>
              <td>${land.price}</td>
              <td>{land.size} acres</td>
              <td>
                <Form.Control onChange={e =>setBid({
                  land_id: land.id,
                  bid_price: e.target.value,
                })} type="number" placeholder="Enter bid" />
              </td>
              <td>
                <Button variant="success" onClick={bidLand}>Bid</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LandBiddingTable;
