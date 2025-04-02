import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Col, Row, Button, Form, Spinner } from 'react-bootstrap';
import { iniatePayment } from "../api/payments.api";
import { formatCurrency } from "../utils/currency-formatter";

function PaymentPrompt({setShow, show, bid}) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] =useState(false);
    const [error, setError] =useState(null);

    const handleBidSubmit =async e =>{
        setError(null)
        e.preventDefault();
        if(!phoneNumber) {
            setError('Phone number required*')
            return;
        }
        setIsLoading(true);
        try {
            if(phoneNumber.length <10 || phoneNumber.length >13) setError('Phone number must have between 10-13 digits')
            await iniatePayment(bid.bid_id, bid.bid_price, phoneNumber)
            setShow(null, false)
            setPhoneNumber('')
        } catch ({message}) {
            alert(message);
        }finally{
            setIsLoading(false);
        }
    }
  return (

      <Modal show={show && bid} onHide={() =>setShow(null, false)}>
        <Modal.Header closeButton>
          <Modal.Title>Pay KSH. {formatCurrency(bid?.bid_price)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleBidSubmit} className="mt-3">
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g 254xxxxxxxxx"
                  required
                />
              </Form.Group>
              {
              error
              ? <small style={{fontSize: '10px', display: 'block', paddingTop: '8px'}} className="text-danger">{error}</small>
              : <small style={{fontSize: '10px', display: 'block', paddingTop: '8px'}} className="text-success">We'll send an stk push to this number</small>}
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