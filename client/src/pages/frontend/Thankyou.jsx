import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import './frontend.css';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      sessionStorage.removeItem('showThankYou');
    }, 15000);
  }, []);

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

 useEffect(() => {
  const placed = sessionStorage.getItem('showThankYou');
  if (!placed) {
    setTimeout(() => {
      navigate('/');
    }, 100); // Short delay to allow smooth transitions
  } else {
    localStorage.removeItem('showThankYou');
  }
}, []);

  return (
    <div className="thankyou-container d-flex align-items-center justify-content-center">
      <Container className="thankyou-box text-center shadow-lg p-4 rounded">
        <div className="logo mb-3">
          <span className="ml-2 head">
            <span className="updock-regular fw-bold t">Rama Collection Shop</span>
          </span>
        </div>
        <h2 className="thankyou-heading">Thank you for your purchase</h2>
        <div className="order-number fw-medium my-2">ORDER ID. 52816537706</div>
        <div className="message fw-semibold mb-3">
          Your order is in processing, click below to check status
        </div>
        <Button
          className="btn-track"
          variant="outline-dark"
          href="https://www.ramacollectionshop.com/order"
        >
          TRACK YOUR ORDER HERE
        </Button>
      </Container>
    </div>
  );
};

export default ThankYou;
