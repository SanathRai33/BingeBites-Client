import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Order.css";
import { useParams } from "react-router-dom";

const Order = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    //   useEffect(() => {
    //     axios
    //       .get(`${import.meta.env.VITE_BACKEND_URL}/api/order/${id}`, {
    //         withCredentials: true,
    //       })
    //       .then((res) => setOrder(res.data))
    //       .catch((err) => console.error("Error fetching order:", err));
    //   }, [id]);

    //   if (!order) return <div className="order-loading">Loading Order...</div>;

    const handleOrder = () => {
        console.log("object")
    }

    return (
        <div className="order-container">
            <form className="order-form" onSubmit={handleOrder}>
                <h2>Order Summary</h2>

                <div className="order-info">
                    <p><strong>Order ID:</strong> {order?._id}</p>
                    <p><strong>Status:</strong> <span className={`status ${order?.status}`}>{order?.status}</span></p>
                    <p><strong>Payment:</strong> {order?.paymentMethod}</p>
                </div>

                <div className="order-address">
                    <h3>Delivery Address</h3>
                    <p>{order?.deliveryAddress.street}, {order?.deliveryAddress.city} - {order?.deliveryAddress.pincode}</p>
                </div>

                <div className="order-items">
                    <h3>Items</h3>
                    {order?.items.map((item, idx) => (
                        <div key={idx} className="order-item">
                            <span>{item.name} x {item.quantity}</span>
                            <span>₹{item.price * item.quantity}</span>
                        </div>
                    ))}
                </div>

                <div className="order-total">
                    <h3>Total: ₹{order?.totalAmount}</h3>
                </div>

                <div className="order-btn">
                    <button type="submit">Order now</button>
                </div>
            </form>
        </div>
    );
};

export default Order;
