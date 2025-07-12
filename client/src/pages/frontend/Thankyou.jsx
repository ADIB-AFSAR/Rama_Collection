import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import './frontend.css'; // External CSS file for custom styles
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
    const navigate = useNavigate()
  
  useEffect(() => {
  const flag = localStorage.getItem("showThankYou");
  if (!flag) {
    navigate("/"); // prevent direct access
  }
  localStorage.removeItem("showThankYou");
}, []);
  return (
    <div className="thankyou-container">
      <Container className="thankyou-box text-center shadow-lg">
        <div className="logo">
            <span className="ml-2 head">
              <span className='updock-regular fw-bold t'>Rama Collections</span>
            </span></div>
        <h2>Thank you for your purchase</h2>
        <div className="order-number">ORDER NO. 52816537706</div>
        <div className="message">
          WE WILL SEND YOU ANOTHER EMAIL WHEN IT IS IN TRANSIT
        </div>
        <Button className="btn-track" variant="outline-dark" href="/order">
          TRACK YOUR ORDER HERE
        </Button>
      </Container>
    </div>
  );
};

export default ThankYou;
