import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Reels from "../../component/Reel";
import "../../styles/Home.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, removeUser } from "../../redux/Slices/authSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user/profile`, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(setUser(response.data.user)); 
        console.log("profile", response.data.user);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          dispatch(removeUser()); 
          navigate("/user/login"); 
        } else {
          console.error("Error fetching profile:", error);
        }
      });
  }, [dispatch, navigate]);

  return (
    <div className="home-container">
      <Reels />
    </div>
  );
};

export default Home;
