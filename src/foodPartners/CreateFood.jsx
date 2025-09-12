import React, { useState } from 'react';
import '../styles/CreateFood.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  

const CreateFood = () => {
    const [foodName, setFoodName] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', foodName);
        formData.append('description', description);
        formData.append('video', video);

        axios.post('http://localhost:3000/api/food/', formData, {
            withCredentials: true
        })
            .then(response => {
                console.log('Food created:', response.data);
            })
            .catch(error => {
                console.error('Error creating food:', error.response || error.message);
            });
        navigate('/foodPartner');
    };


    const handleVideoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setVideo(e.target.files[0]);
        }
    };

    return (
        <div className="create-food-container">
            <form className="create-food-form" onSubmit={handleSubmit}>
                <h2>Add New Food</h2>

                <div className="form-field">
                    <label htmlFor="foodName">Food Name</label>
                    <input
                        type="text"
                        id="foodName"
                        className="form-input"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        placeholder="Enter food name"
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        className="form-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                        rows="4"
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="video">Food Video</label>
                    <input
                        type="file"
                        id="video"
                        className="form-input"
                        accept="video/*"
                        onChange={handleVideoChange}
                        required
                    />
                    {video && <p style={{ marginTop: '8px', color: '#666' }}>{video.name}</p>}
                </div>

                <button type="submit" className="btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateFood;
