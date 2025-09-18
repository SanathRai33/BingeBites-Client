import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Reels from '../../component/Reel';
import '../../styles/Home.css';
import axios from 'axios';

const Home = () => {
  
  const [ profile, setProfile ] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user/profile`, {
      withCredentials: true
    })
    .then(response => {
      setProfile(response.data.user);
      console.log("profile", response.data.user);
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        navigate('/user/login');
        console.log("status code", error.response.status);
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