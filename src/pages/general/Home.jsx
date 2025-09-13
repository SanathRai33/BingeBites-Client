import React, { useEffect } from 'react';
import Reels from '../../component/Reel';
import '../../styles/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const getCookie = (name) => {
            const cookies = document.cookie.split('; ');
            for (let cookie of cookies) {
                const [key, value] = cookie.split('=');
                if (key === name) return value;
            }
            return null;
        };

        const token = getCookie('token');
        if (token) {
            localStorage.setItem('token', token);
            console.log('Token saved to localStorage');
        } else {
            console.log('User is not logged in');
            navigate('/user/login');
        }
    }, []);

    return (
        <div className="home-container">
            <Reels />
        </div>
    );
};

export default Home;
