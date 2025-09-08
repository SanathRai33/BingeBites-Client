import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Reels.css';

const Reels = () => {
    const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(true);

    const containerRef = useRef();

    // Fetch videos once when component mounts
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

    // Handle play/pause of videos
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
            {videoData.map(video => (
                <div className="video-item" key={video._id}>
                    <video src={video.video} muted loop autoPlay playsInline />
                    <div className="overlay">
                        <div className="description">{video.description}</div>
                        <Link to={`/food-partner/${video._id}`} className="visit-btn">Shop Now</Link>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default Reels;
