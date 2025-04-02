import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Col, Row, Button, Form, Spinner } from 'react-bootstrap';
import { iniatePayment } from "../api/payments.api";

function PaymentPrompt({setShow, show, bid}) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] =useState(false);
    const handleBidSubmit =async e =>{
        e.preventDefault();
        if(!phoneNumber) return;
        setIsLoading(true);
        try {
            await iniatePayment({phone: phoneNumber, land_id: bid.id})
            setShow(null, false)
            setPhoneNumber('')
        } catch (error) {
            
        }finally{
            setIsLoading(false);
        }
    }
  return (

      <Modal show={show && bid} onHide={() =>setShow(null, false)}>
        <Modal.Header closeButton>
          <Modal.Title>Pay {bid?.bid_price}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleBidSubmit} className="mt-3">
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="We'll send an stk push to this number"
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
                            : 'Pay Now'
                        }
                    </Button>
                </Col>
            </Row>
        </Modal.Footer>
      </Modal>
  );
}

export default PaymentPrompt;