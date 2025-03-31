import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Col, Row, Button, Form, Spinner } from 'react-bootstrap';
import { placeBid } from '../api/bids.api';

function BidPrompt({setShow, show, bid}) {
    const [bidAmount, setBidAmount] = useState("");
    const [isLoading, setIsLoading] =useState(false);
    const handleBidSubmit =async e =>{
        e.preventDefault();
        if(!bidAmount) return;
        setIsLoading(true);
        try {
            await placeBid({bid_price: Number(bidAmount), land_id: bid.id})
            setShow(null, false)
            setBidAmount('')
        } catch (error) {
            
        }finally{
            setIsLoading(false);
        }
    }
  return (

      <Modal show={show && bid} onHide={() =>setShow(null, false)}>
        <Modal.Header closeButton>
          <Modal.Title>Bid {bid?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleBidSubmit} className="mt-3">
              <Form.Group>
                <Form.Label>Bid Price (KSH)</Form.Label>
                <Form.Control
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter your bid price"
                  required
                />
              </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Row className='justify-content-end'>
                <Col>
                    <Button variant="primary"  onClick={handleBidSubmit}>
                        {
                            isLoading
                            ? <Spinner size='sm' />
                            : 'Place Bid'
                        }
                    </Button>
                </Col>
            </Row>
        </Modal.Footer>
      </Modal>
  );
}

export default BidPrompt;