import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/Collections.css';

const SavedVideo = () => {
    const [savedVideos, setSavedVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/food/saved`, {
            withCredentials: true
        })
            .then(response => {
                setSavedVideos(response.data.savedVideos);
                setLoading(false);
                console.log(response)
            })
            .catch(error => {
                console.error('Error fetching saved:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="collection-container">
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

export default SavedVideo;
