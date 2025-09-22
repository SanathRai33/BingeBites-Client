import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PartnerHome.css';

const PartnerHome = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/partner/profile`, { withCredentials: true })
      .then(res => {
        const partner = res.data?.partner;
        if (partner) {
          setName(partner.name || '');
          setPreview(partner.image || '');
        } else {
          console.warn('No partner in response', res.data);
        }
      })
      .catch(err => console.error('Error fetching profile:', err.response?.data || err.message));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (image) formData.append('image', image);

    axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/partner/profile`, formData, {
      withCredentials: true
    })
      .then(res => {
        setMessage(res.data?.message || 'Profile updated successfully');
        // update local preview/name if server returned updated partner
        const partner = res.data?.partner;
        if (partner) {
          setName(partner.name || '');
          setPreview(partner.image || '');
        }
      })
      .catch(err => {
        console.error('Error updating profile:', err.response?.data || err.message);
        setMessage('Error updating profile');
      });
  };

  return (
    <div className="profile-container">
      <h2>Partner Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-image-section">
          <img src={preview || '/default-avatar.png'} alt="Profile" className="profile-image" />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="profile-field">
          <label>Business Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="update-btn">Update Profile</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default PartnerHome;