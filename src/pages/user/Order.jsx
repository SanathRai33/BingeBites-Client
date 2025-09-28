import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Order.css";
import { useParams } from "react-router-dom";

const Order = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState({ street: "", city: "", pincode: "" });
    const [paymentMethod, setPaymentMethod] = useState("COD");

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

    const handleAddItem = (food) => {
        setItems((prev) => [...prev, { ...food, quantity: 1 }]);
    };

    const handleQuantityChange = (index, value) => {
        const updated = [...items];
        updated[index].quantity = value;
        setItems(updated);
    };

    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const handleSubmit = () => {
        if (items.length === 0) return alert("Add at least one item");
        onSubmit({
            items,
            deliveryAddress: address,
            paymentMethod,
            totalAmount,
        });
    };

    return (
        <div className="order-container">
            <form className="order-form" onSubmit={(e) => e.preventDefault()}>
                <h2>Place Order</h2>

                {/* Food Selection */}
                <div className="order-items">
                    <label>Select Items</label>
                    {foodItems.map((food, idx) => (
                        <button key={idx} type="button" onClick={() => handleAddItem(food)}>
                            + {food.name} (${food.price})
                        </button>
                    ))}
                </div>

                {/* Selected Items */}
                {items.map((item, index) => (
                    <div key={index} className="order-item">
                        <span>{item.name}</span>
                        <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                        />
                        <span>${item.price * item.quantity}</span>
                    </div>
                ))}

                {/* Address */}
                <div className="order-address">
                    <label>Delivery Address</label>
                    <input
                        type="text"
                        placeholder="Street"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Pincode"
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        required
                    />
                </div>

                {/* Payment Method */}
                <div className="order-info">
                    <label>Payment Method</label>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="COD">Cash on Delivery</option>
                        <option value="ONLINE">Online Payment</option>
                    </select>
                </div>

                {/* Total */}
                <div className="order-total">Total: ${totalAmount}</div>

                {/* Submit */}
                <div className="order-btn">
                    <button type="button" onClick={handleSubmit}>Confirm Order</button>
                </div>
            </form>
        </div>
    );
};

export default Order;

