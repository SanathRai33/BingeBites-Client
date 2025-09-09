import React from 'react';
import '../styles/Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image" />
        <div className="profile-info">
          <div className="business-name">Pizza hut</div>
          <div className="address"> 3rd cross bangaluru, Karnataka, India</div>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <div className="stat-value">43</div>
          <div className="stat-label">Total Meals</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">15K</div>
          <div className="stat-label">Customer Serve</div>
        </div>
      </div>

      <div className="profile-videos">
        {Array.from({ length: 9 }).map((_, index) => (
          <div className="video-placeholder" key={index}>
            video
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
