import React, { useEffect, useState } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import { API } from "../api";
import { formatCurrency } from "../utils/currency-formatter";

const MarketPlace = () => {
  const [marketLands, setMarketLands] =useState([])

  useEffect(() =>{
    (async () =>{
      try {
        const {data} =await API.get('/lands/market-place');
        setMarketLands(data)
        
      } catch (error) {
        alert('Error Loading marketplace')
      }
    })();
  }, [])

  return (
    <Container className="mt-4">
      <h2>Marketplace</h2>

      {marketLands.length === 0 ? (
        <Alert variant="info">No lands in the marketplace yet. Add some from the land details page.</Alert>
      ) : (
        <Table bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Size</th>
              <th>Ask Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {marketLands.map((land) => (
              <tr key={land.id}>
                <td>{land.title}</td>
                <td>{land.location}</td>
                <td>{land.size} Acres</td>
                <td>Ksh {formatCurrency(land.price)}</td>
                <td>
                  <Button variant="success">Place Bid</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MarketPlace;
