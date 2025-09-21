import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';
import '../styles/BottomNav.css';
import { useSelector } from 'react-redux';

const BottomNav = () => {
  
  const user = useSelector((state) => state.auth.user);

  console.log("USerdata nav", user)

  return (
    <nav className="bb-bottom-nav">
      <Link to="/" className="nav-item" aria-label="Home">
        <FaHome />
        <span>Home</span>
      </Link>
      <Link to={user ? `/user/profile/${user.id}` : '/user/login'}  className="nav-item" aria-label="Partner">
        <FaUser />
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default BottomNav;