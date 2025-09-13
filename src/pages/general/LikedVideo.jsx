import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/Collections.css';

const LikedVideo = () => {
    const [likedVideos, setLikedVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/api/food/liked', {
            withCredentials: true
        })
            .then(response => {
                setLikedVideos(response.data.likedVideos);
                setLoading(false);
                console.log(response)
            })
            .catch(error => {
                console.error('Error fetching liked:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="collection-container">
            <h2>Liked Videos</h2>
            <div className="video-grid">
                {likedVideos.length > 0 ? likedVideos.map(video => (
                    <div key={video._id} className="video-card">
                        <video src={video.video} controls />
                        <p>{video.name}</p>
                    </div>
                )) : <p>No liked videos.</p>}
            </div>
        </div>
    );
};

export default LikedVideo;
