import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Order.css";
import { useParams } from "react-router-dom";

const Order = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/food/get/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                setFood(res.data.food)
                console.log(food)
            })
            .catch((err) => console.error("Error fetching food:", err))
            .finally(() => setLoading(false));
    }, [id]);


    if (loading) return <div className="order-loading">Loading Order...</div>;

    const handleOrder = () => {
        console.log("object")
    }

    return (
        food ? (
            <div>
                <h2>{food.name}</h2>
                <img src={food.image} alt={food.name} />
                <p>Price: ₹{food.price}</p>
            </div>
        ) : (
            <p>Food not found</p>
        )
    );
};

export default Order;
