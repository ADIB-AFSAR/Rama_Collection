import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faPinterest, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './footer.css'; // Assuming the CSS is in a separate file

const Footer = () => {
  return (
    <footer className="footer mt-5">
      <Container>
        <Row>
          <Col md={4} className="text-center">
            <div className="line"></div>
            <div className="links">
              <a href="./privacy-policy">Privacy Policy</a>
              <a href="./terms&condition">Terms & Conditions</a>
              <a href="./about">About</a>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <div className="brand d-flex flex-column">
            <span className="ml-2 h4"><span className='updock-regular fw-bold fs-2'><a className='text-decoration-none text-dark' href='https://www.ramacollectionshop.com'>Rama Collections</a></span></span>
           <img
              src="/images/logo.png" 
              className="d-inline-block align-top m-0 p-0"
              alt="Logo"
            />
              <div>
              </div>
            </div>
            {/* <div className="social-icons">
              <a href='www.twitter.com'><FontAwesomeIcon className='mx-2 fs-4 text-dark' icon={faTwitter}  /></a>
              <a href='www.pintrest.com'><FontAwesomeIcon className='mx-2 fs-4 text-dark' icon={faPinterest}  /></a>
              <a href='www.instagram.com'><FontAwesomeIcon className='mx-2 fs-4 text-dark' icon={faInstagram}  /></a>
            </div> */}
            <div className="line mt-2"></div>
          </Col>
          <Col md={4} className="text-center">
            <div className="line"></div>
            <div className="links">
              <a href="./contact-us">Contact Us</a>
              <a href="./Shipping-details">Shipping / Returns / Exchanges</a>
              <a href="./faqs">FAQs</a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
          {/* <p className='fw-bold text-muted small name'>ADIB AFSAR </p> */}
            <p className="copyright">Brought to you by <a className='text-decoration-none' href='https://techhodu.com/'>Tech Hodu</a> 2024.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
