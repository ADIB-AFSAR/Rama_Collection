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
        <h2>1. What kind of products does Rama Collection offer?</h2>
        <p>
          We currently specialize in high-quality suits, sarees, kurtis, and other clothing items. Our collection is designed to offer a perfect blend of style, comfort, and affordability.
        </p>
      </div>

      <div className="faq-item">
        <h2>2. Do you plan to expand your product range?</h2>
        <p>
          Yes! In the near future, we plan to add more exciting items to our collection, ensuring a wider variety of choices for our customers. Stay tuned for updates!
        </p>
      </div>

      <div className="faq-item">
        <h2>3. How do I place an order on your website?</h2>
        <p>
          Ordering from Rama Collection is simple:
          <ol>
            <li>Browse through our collections and select the products you like.</li>
            <li>Add them to your cart.</li>
            <li>Proceed to checkout, provide your details, and complete your payment.</li>
          </ol>
          You’ll receive an order confirmation via email once the purchase is complete.
        </p>
      </div>

      <div className="faq-item">
        <h2>4. How can I contact customer support?</h2>
        <p>
          If you need assistance, feel free to email us at <a href="mailto:support@techhodu.com">support@techhodu.com</a>. Our support team is happy to help and will respond as soon as possible.
        </p>
      </div>

      <div className="faq-item">
        <h2>5. Who manages the website?</h2>
        <p>
          Our website is supported and run by <a href="https://www.techhodu.com" target="_blank" rel="noopener noreferrer">TechHodu</a>. Their expertise ensures a smooth and secure shopping experience for you.
        </p>
      </div>

      <div className="faq-item">
        <h2>6. What payment methods do you accept?</h2>
        <p>
          We accept a variety of payment methods, including major credit/debit cards, online payment platforms, and more. Payment options will be displayed at checkout for your convenience.
        </p>
      </div>

      <div className="faq-item">
        <h2>7. Do you offer returns or exchanges?</h2>
        <p>
          Yes, we aim to ensure your satisfaction. For details about returns or exchanges, please check our Shipping and Returns page or contact us at <a href="mailto:support@techhodu.com">support@techhodu.com</a>.
        </p>
      </div>

      <div className="faq-item">
        <h2>8. How can I stay updated on new arrivals and offers?</h2>
        <p>
          Subscribe to our newsletter or follow us on social media to receive updates on new arrivals, special promotions, and exclusive deals.
        </p>
      </div>

      <p>If you have more questions, don’t hesitate to reach out. Thank you for choosing Rama Collection!</p>
    </div>
  );
};

export default FAQ;
