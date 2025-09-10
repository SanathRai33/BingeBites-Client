import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Reels.css';
import Loading from './Loading';

const Reels = () => {
    const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(true);

    const containerRef = useRef();

    useEffect(() => {
        axios.get('http://localhost:3000/api/food/get', {
            withCredentials: true
        })
            .then(response => {
                setVideoData(response.data.foodItems);
                setLoading(false);
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the food items!', error);
            });
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const videosElements = container.querySelectorAll('video');

        const handleScroll = () => {
            videosElements.forEach(video => {
                const rect = video.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        };

        container.addEventListener('scroll', handleScroll);

        // Initial check
        handleScroll();

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [videoData]); // dependency on videoData ensures it runs after data loads

    return (
        <div className="video-container" ref={containerRef}>
            {loading ? (
                <Loading />
            ) : (videoData.map(video => (
                <div className="video-item" key={video._id}>
                    <video src={video.video} muted loop autoPlay playsInline />
                    <div className="overlay">
                        <div className="description">{video.description}</div>
                        <Link to={`/food-partner/${video.foodPartner}`} className="visit-btn">Shop Now</Link>
                    </div>
                </div>
            )))}
        </div>

    );
};

export default Reels;
