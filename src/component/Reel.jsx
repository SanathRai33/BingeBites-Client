import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Reels.css';
import Loading from './Loading';
import { FaHeart, FaBookmark, FaRegComment } from 'react-icons/fa';

const Reels = () => {
    const [videoData, setVideoData] = useState([]);
    const [name, setName] = useState("");
    const [logo, setLogo] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [savedStatus, setSavedStatus] = useState(false);


    const containerRef = useRef();
    const videoRefs = useRef([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/food/get`, {
            withCredentials: true
        })
            .then(response => {
                setVideoData(response.data.foodItems);
                setLikeCount(response.data?.foodItems?.likes);
                setName(response.data?.partnerName[0]?.name);
                setLogo(response.data?.partnerName[0]?.image)
                setLoading(false);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error status:", error.response?.status || error.code);
                console.error('There was an error fetching the food items!', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const options = {
            root: containerRef.current,
            rootMargin: '0px',
            threshold: 0.8
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = videoRefs.current.indexOf(entry.target);
                    setCurrentVideoIndex(index);
                    entry.target.play();
                } else {
                    entry.target.pause();
                }
            });
        }, options);

        videoRefs.current.forEach(video => {
            if (video) observer.observe(video);
        });

        return () => {
            videoRefs.current.forEach(video => {
                if (video) observer.unobserve(video);
            });
        };
    }, [videoData]);

    const handleLike = (id) => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/food/like`, { foodId: id }, {
            withCredentials: true
        })
            .then(res => {
                console.log(res.data.status);
                if (res.data.status === true) {
                    setLikeCount(likeCount + 1);
                } else {
                    setLikeCount(likeCount - 1);
                }
            })
            .catch(err => console.log(err));
    };

    const handleSave = (id) => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/food/save`, { foodId: id }, {
            withCredentials: true
        })
            .then(res => {
                console.log(res.data)
                setSavedStatus(!savedStatus);
            })
            .catch(err => console.log(err));
    };

    const handleComment = (id) => {
        // Implement comment functionality
        console.log('Comment on video:', id);
    };

    return (
        <div className="reels-modern-container" ref={containerRef}>
            {loading ? (
                <Loading />
            ) : (
                videoData.map((video, index) => (
                    <div className="reel-modern-item" key={video._id}>
                        <video
                            ref={el => videoRefs.current[index] = el}
                            src={video.video}
                            muted
                            loop
                            playsInline
                        />
                        <div className="reel-modern-bottom-bar">
                            <div className="reel-modern-store">
                                <Link to={`/food-partner/${video.foodPartner}`}>
                                    <img className="store-modern-avatar" src={logo} alt={name || 'logo'} />
                                </Link>
                                <div>
                                    <div className="store-modern-name">@{name}</div>
                                    <div className="food-modern-title">{video.name}</div>
                                </div>
                            </div>
                            <div className="food-modern-desc">{video.description}</div>
                            <button className="modern-order-btn">
                                <FaShoppingCart /> Order Now
                            </button>
                        </div>
                        <div className="reel-modern-actions">
                            <div className="modern-action-btn" onClick={() => handleLike(video._id)}>
                                <FaHeart className="modern-action-icon" />
                                <span>{video.likes}</span>
                            </div>
                            <div className="modern-action-btn" onClick={() => handleSave(video._id)}>
                                <FaBookmark className="modern-action-icon" />
                            </div>
                            <div className="modern-action-btn" onClick={() => handleComment(video._id)}>
                                <FaRegComment className="modern-action-icon" />
                                <span>45</span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Reels;