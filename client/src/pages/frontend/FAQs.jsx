import React from 'react';
import './frontend.css';

const FAQ = () => {
  return (
    <div className="faq-container mt-3">
      <h1>Frequently Asked Questions (FAQ)</h1>
      <p>
        Welcome to the Rama Collection FAQ page! Here, you'll find answers to common questions about our store, products, and services. If you don’t see your question here, feel free to reach out to us at <a href="mailto:support@techhodu.com">support@techhodu.com</a>.
      </p>

      <div className="faq-item">
        <h2>1. How do I place an order?
</h2>
        <p>
          Select product, make payment via UPI/QR, upload screenshot, wait for confirmation. 
        </p>
      </div>

      <div className="faq-item">
        <h2>2. How long does confirmation take?
</h2>
        <p>
          Within 24 hours.
        </p>
      </div>

      <div className="faq-item">
        <h2>3.  Do you provide COD? </h2>
        <p>
          COD is not available at the moment
        </p>
      </div>

      <div className="faq-item">
        <h2>4. How can I contact customer support?</h2>
        <p>
          If you need assistance, feel free to email us at <a href="mailto:ramacollectionshop@gmail.com">ramacollectionshop@gmail.com"</a> or call/whatsApp on 7263025531 during business hours. Our support team is happy to help and will respond as soon as possible.
        </p>
      </div>

      <p>If you have more questions, don’t hesitate to reach out. Thank you for choosing Rama Collection!</p>
    </div>
  );
};

export default FAQ;
