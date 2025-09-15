import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Reels from '../../component/Reel';
import '../../styles/Home.css';
import axios from 'axios';

const Home = () => {

      const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/auth/user/profile', {
            withCredentials: true
        })
        .then(response => {
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                navigate('/user/login');
                console.log("status code",error.response.status)
            } else {
                console.error("Error fetching profile:", error);
            }
        });
    }, [navigate]);

  return (
    <div className="home-container">
      <Reels />
    </div>
  );
};

export default Home;
