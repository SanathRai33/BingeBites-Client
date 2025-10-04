import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaUser } from 'react-icons/fa';
import '../styles/BottomNav.css';
import { useSelector } from 'react-redux';

const BottomNav = () => {
  const partner = useSelector((state) => state.auth.partner);

  return (
    <nav className="bb-partner-bottom-nav">
      <Link to="/foodPartner" className="nav-item" aria-label="Partner Home">
        <FaHome />
        <span>Home</span>
      </Link>

      <Link to="/food-partner/create-food" className="nav-item" aria-label="Create Food">
        <FaPlusCircle />
        <span>Create</span>
      </Link>

      <Link to={partner ? `/food-partner/${partner?.id}` : '/food-partner/login'} className="nav-item" aria-label="Profile">
        <FaUser />
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default BottomNav;