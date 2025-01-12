import React from 'react';
import './frontend.css';

const ContactUs = () => {
  return (
    <div className="contact-us-container mt-3">
      <h1>Contact Us</h1>
      <p>
        We’re here to help! Whether you have a question, need assistance with an order, or just want to say hello, feel free to reach out to us.
      </p>

      <h2>Contact Information</h2>
      <p>
        <strong>Email:</strong> For general inquiries and support, please contact us at <a href="mailto:support@techhodu.com">support@techhodu.com</a>.
      </p>
      <p>We’ll get back to you as soon as possible.</p>

      <h2>Business Hours</h2>
      <ul>
        <li><strong>Monday to Friday:</strong> 9:00 AM - 6:00 PM</li>
        <li><strong>Saturday:</strong> 10:00 AM - 4:00 PM</li>
        <li><strong>Sunday:</strong> Closed</li>
      </ul>

      <h2>Additional Information</h2>
      <p>
        This website is proudly supported and run by <a href="https://www.techhodu.com" target="_blank" rel="noopener noreferrer">TechHodu</a>.  
        With their expertise in technology and e-commerce solutions, we aim to provide you with a seamless shopping experience.
      </p>

      <h2>Feedback</h2>
      <p>
        We value your feedback! If you have suggestions or ideas to improve your experience, don’t hesitate to share them with us.
      </p>

      <p><strong>Thank you for choosing Rama Collection.</strong> We’re always here to ensure your shopping journey is as smooth and enjoyable as possible.</p>
    </div>
  );
};

export default ContactUs;
