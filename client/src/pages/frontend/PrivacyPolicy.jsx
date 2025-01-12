import React from 'react';
import './frontend.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container mt-3">
      <h1>Privacy Policy</h1>
      <p>
        At Rama Collection, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you share with us while using our website.
      </p>

      <div className="policy-section">
        <h2>1. Information We Collect</h2>
        <p>When you visit our website or make a purchase, we may collect the following information:</p>
        <ul>
          <li>Personal details such as name, email address, phone number, and shipping address.</li>
          <li>Payment information to process your orders securely.</li>
          <li>Technical information, including your IP address, browser type, and device data, to improve your shopping experience.</li>
        </ul>
      </div>

      <div className="policy-section">
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process and deliver your orders.</li>
          <li>Provide customer support and respond to inquiries.</li>
          <li>Improve our website’s functionality and user experience.</li>
          <li>Notify you about new products, promotions, and updates (if you opt-in).</li>
        </ul>
      </div>

      <div className="policy-section">
        <h2>3. Data Sharing and Security</h2>
        <ul>
          <li>
            <strong>Third-Party Sharing:</strong> Your information is only shared with trusted third parties, such as payment processors and shipping companies, to complete your orders. We do not sell or rent your data to anyone.
          </li>
          <li>
            <strong>Security Measures:</strong> We implement robust security measures, including encryption, to protect your data from unauthorized access or disclosure.
          </li>
        </ul>
      </div>

      <div className="policy-section">
        <h2>4. Cookies and Tracking</h2>
        <p>
          We use cookies to enhance your browsing experience. Cookies help us understand your preferences and tailor our website to your needs. You can adjust your browser settings to disable cookies if you prefer.
        </p>
      </div>

      <div className="policy-section">
        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal information we have about you.</li>
          <li>Request corrections or updates to your data.</li>
          <li>Opt-out of marketing communications at any time.</li>
        </ul>
        <p>
          For any of these requests, please contact us at <a href="mailto:support@techhodu.com">support@techhodu.com</a>.
        </p>
      </div>

      <div className="policy-section">
        <h2>6. Third-Party Support</h2>
        <p>
          Our website is supported and run by <a href="https://www.techhodu.com" target="_blank" rel="noopener noreferrer">TechHodu</a>, a trusted technology provider that ensures a secure and seamless online shopping experience.
        </p>
      </div>

      <div className="policy-section">
        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page, so please review it regularly.
        </p>
      </div>

      <div className="policy-section">
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, feel free to contact us at:
        </p>
        <p>Email: <a href="mailto:support@techhodu.com">support@techhodu.com</a></p>
      </div>

      <p>Thank you for trusting Rama Collection with your shopping needs!</p>
    </div>
  );
};

export default PrivacyPolicy;
