import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/partner/food-partner/${id}`, {
      withCredentials: true
    })
      .then(res => {
        setProfileData(res.data.foodPartner);
        console.log(res.data);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, [id]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image" />
        <div className="profile-info">
          <div className="business-name">{profileData?.name}</div>
          <div className="address">{profileData?.address}</div>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <div className="stat-value">{profileData?.totalMeals || 0}</div>
          <div className="stat-label">Total Meals</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{profileData?.customerServe || '0'}</div>
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
