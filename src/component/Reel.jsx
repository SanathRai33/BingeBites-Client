import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Reels.css';
import Loading from './Loading';
import { FaHeart, FaRegBookmark, FaComment, FaHome, FaSave } from 'react-icons/fa';

const Reels = () => {
    const [videoData, setVideoData] = useState([]);
    const [ name, setName ] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const containerRef = useRef();
    const videoRefs = useRef([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/food/get', {
            withCredentials: true
        })
            .then(response => {
                setVideoData(response.data.foodItems);
                setName(response.data.partnerName[0].name);
                setLoading(false);
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the food items!', error);
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
        axios.post('http://localhost:3000/api/food/like', { foodId: id }, {
            withCredentials: true
        })
    };

    const handleSave = (id) => {
        // Implement save functionality
        console.log('Saved video:', id);
    };

    const handleComment = (id) => {
        // Implement comment functionality
        console.log('Comment on video:', id);
    };

    return (
        <div className="reels-container" ref={containerRef}>
            {loading ? (
                <Loading />
            ) : (
                videoData.map((video, index) => (
                    <div className="reel-item" key={video._id}>
                        <video
                            ref={el => videoRefs.current[index] = el}
                            src={video.video}
                            muted
                            loop
                            playsInline
                        />
                        <div className="reel-overlay">

                            <div className="reel-actions">
                                <div className="action-btn" onClick={() => handleLike(video._id)}>
                                    {/* <span style={{ height: '30px', width: '30px'}}>❤️</span> */}
                                    <FaHeart style={{ height: '30px', width: '30px' }} />
                                    <span className="action-count">23</span>
                                </div>
                                <div className="action-btn" onClick={() => handleSave(video._id)}>
                                    {/* <span style={{ height: '30px', width: '30px'}}>🔖</span> */}
                                    <FaRegBookmark style={{ height: '30px', width: '30px' }} />
                                    <span className="action-count">23</span>
                                </div>
                                <div className="action-btn" onClick={() => handleComment(video._id)}>
                                    {/* <span style={{ height: '30px', width: '30px'}}>💬</span> */}
                                    <FaComment style={{ height: '30px', width: '30px' }} />
                                    <span className="action-count">45</span>
                                </div>
                            </div>

                            <div className="reel-info">
                                <Link to={`/food-partner/${video.foodPartner}`} className="store-link">
                                    <div className="store-info">
                                        <div className="store-avatar">
                                            <img src="https://img.freepik.com/premium-vector/tasty-food-chef-logo-mascot-template_190190-133.jpg?w=360" alt="logo" />
                                        </div>
                                        <div className="store-name">@{name}</div>
                                    </div>
                                </Link>
                                <div className='food-name' >{video.name}</div>
                                <div className="video-description">{video.description}</div>
                            </div>
                            <div className="navigation">
                                <Link to="/">
                                    <FaHome style={{ height: '30px', width: '30px', color: 'white' }} />
                                    <p>Home</p>
                                </Link>
                                <Link to="/collection">
                                    <FaSave style={{ height: '30px', width: '30px', color: 'white' }} />
                                    <p>Saved</p>
                                </Link>
                            </div>

                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Reels;