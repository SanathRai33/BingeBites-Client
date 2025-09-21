import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';
import '../styles/BottomNav.css';

const BottomNav = () => {

  const user = {
    _id: '12345',
    name: 'John Doe'
  }

  return (
    <nav className="bb-bottom-nav">
      <Link to="/" className="nav-item" aria-label="Home">
        <FaHome />
        <span>Home</span>
      </Link>
      <Link to={`/user/profile/${user._id}`} className="nav-item" aria-label="Partner">
        <FaUser />
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default BottomNav;