import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/HelpCenter.css';

const HelpCenter = () => {
  return (
    <div className="more-container">
      <h1>Help Center</h1>
      <div className="help-content">

        <div className="help-topic">
          <h3>Account Issues</h3>
          <p>If you're having trouble logging in or accessing your account, please check your credentials or reset your password.</p>
        </div>

        <div className="help-topic">
          <h3>Payments</h3>
          <p>For questions about payments, billing, or subscriptions, please review our payment guidelines or contact support.</p>
        </div>

        <div className="help-topic">
          <h3>Using the App</h3>
          <p>Learn how to post videos, interact with other users, and manage your profile by checking our detailed guides.</p>
        </div>

        <div className="help-topic">
          <h3>Privacy & Security</h3>
          <p>We take your privacy seriously. Read about how we protect your data and what you can do to secure your account.</p>
        </div>

        <div className="help-topic">
          <h3>Contact Support</h3>
          <p>If you need further assistance, reach out to our support team through the contact form or email.</p>
        </div>

        <Link to="/user/more" className="back-link">← Back to More</Link>
      </div>
    </div>
  );
};

export default HelpCenter;
