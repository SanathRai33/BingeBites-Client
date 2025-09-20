import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';
import '../styles/BottomNav.css';

const BottomNav = () => {
  return (
    <nav className="bb-bottom-nav">
      <Link to="/" className="nav-item" aria-label="Home">
        <FaHome />
        <span>Home</span>
      </Link>
      <Link to={`/user/more`} className="nav-item" aria-label="Partner">
        <FaUser />
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default BottomNav;