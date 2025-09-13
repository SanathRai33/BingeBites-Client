import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/Collections.css';

const Collection = () => {
    const [likedVideos, setLikedVideos] = useState([]);
    const [savedVideos, setSavedVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/api/food/collection', {
            withCredentials: true
        })
        .then(response => {
            setLikedVideos(response.data.likedVideos);
            setSavedVideos(response.data.savedVideos);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching collection:', error);
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

            <h2>Saved Videos</h2>
            <div className="video-grid">
                {savedVideos.length > 0 ? savedVideos.map(video => (
                    <div key={video._id} className="video-card">
                        <video src={video.video} controls />
                        <p>{video.name}</p>
                    </div>
                )) : <p>No saved videos.</p>}
            </div>
        </div>
    );
};

export default Collection;
