import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/More.css';
import { FaBookmark, FaExclamationCircle, FaFileAlt, FaHeart, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import axios from 'axios';

const More = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get('http://localhost:3000/api/auth/user/logout',
            { withCredentials: true })
            .then(response => {
                console.log('Logout successful:', response.data);
                localStorage.removeItem('token');
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                navigate('/user/login');
            })
            .catch(error => {
                console.error('There was an error logging out!', error);
            });
    };

    return (
        <div className="more-container">
            <h1>User information</h1>

            <div className="more-item" onClick={() => navigate('/user/liked')}>
                <FaHeart style={{ width: '24px', height: '24px' }} /><span> Liked Videos</span>
            </div>

            <div className="more-item" onClick={() => navigate('/user/saved')}>
                <FaBookmark style={{ width: '24px', height: '24px' }} /><span> Saved Videos</span>
            </div>

            <div className="more-item" onClick={handleLogout}>
                <FaSignOutAlt style={{ width: '24px', height: '24px' }} /><span> Logout</span>
            </div>

            <div className="more-item" onClick={() => navigate('/terms')}>
                <FaFileAlt style={{ width: '24px', height: '24px' }} /><span> Terms and Conditions</span>
            </div>
            <div className="more-item" onClick={() => navigate('/user/profile')}>
                <FaUserAlt style={{ width: '24px', height: '24px' }} /><span> Profile</span>
            </div>
            <div className="more-item" onClick={() => navigate('/user/help')}>
                <FaExclamationCircle style={{ width: '24px', height: '24px' }} /><span>Help Center</span>
            </div>
        </div>
    );
};

export default More;
