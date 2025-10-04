import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="back-home-btn">Go Back Home</Link>
    </div>
  );
}

export default NotFound;
