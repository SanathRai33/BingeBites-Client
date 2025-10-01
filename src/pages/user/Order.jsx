import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Order.css";
import { useParams } from "react-router-dom";

const Order = () => {
    const { id } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState({ street: "", city: "", pincode: "" });
    const [paymentMethod, setPaymentMethod] = useState("COD");

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/food/get/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                const fetchedFood = res?.data?.food;
                if (fetchedFood) {
                    setItems([{ ...fetchedFood, quantity: 1 }]);
                } else {
                    setItems([]);
                }
                console.log('fetchedFood', fetchedFood);
            })
            .catch((err) => console.error("Error fetching food:", err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="order-loading">Loading Order...</div>;

    const handleQuantityChange = (index, value) => {
        const updated = [...items];
        updated[index] = { ...updated[index], quantity: Math.max(1, Number(value) || 1) };
        setItems(updated);
    };

    const totalAmount = items.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);

    const handleOrder = async (e) => {
        e.preventDefault();
        if (items.length === 0) return alert("Add at least one item");

        const firstItem = items[0];
        const partnerId = firstItem?.foodPartner || firstItem?.partner || firstItem?.foodPartnerId || null;
        if (!partnerId) {
            return alert("Partner information missing on the food item.");
        }

        const foodPayload = {
            _id: firstItem._id,
            name: firstItem.name,
            price: firstItem.price,
            quantity: firstItem.quantity || 1,
        };

        const payload = {
            partner: { _id: partnerId },
            food: foodPayload,
            deliveryAddress: address,
            paymentMethod,
        };

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/order/`,
                payload,
                { withCredentials: true }
            );
            console.log("Order placed successfully", res.data);
            alert("Order placed successfully");
        } catch (err) {
            console.error("Unable to place order", err.response?.data || err.message);
            alert("Failed to place order. See console for details.");
        }
    };

    return (
        <div className="order-container">
            <form className="order-form" onSubmit={handleOrder}>
                <h2>Place Order</h2>

                {items.map((item, index) => (
                    <div key={index} className="order-item">
                        <div className="order-item-blocks">
                            <span>Food</span>
                            <span>{item.name}</span>
                        </div>
                        <div className="order-item-blocks">
                            <span>Quantity</span>
                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                            />
                        </div>
                        <div className="order-item-blocks">
                            <span>Price</span>
                            <span>₹{(item.price || 0) * (item.quantity || 1)}</span>
                        </div>
                    </div>
                ))}

                <div className="order-address">
                    <label className="section-title">Delivery Address</label>

                    {/* Saved Address Card */}
                    <div
                        className={`address-card ${!address.useNew ? 'active' : ''}`}
                        onClick={() => {
                            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, { withCredentials: true })
                                .then(res => {
                                    const saved = res.data?.user?.address || {};
                                    setAddress({
                                        street: saved.street || "",
                                        city: saved.city || "",
                                        pincode: saved.pincode || "",
                                        useNew: false
                                    });
                                })
                                .catch(() => alert("No saved address found"));
                        }}
                    >
                        <input type="radio" checked={!address.useNew} readOnly />
                        <div className="address-content">
                            <strong>📍 Use Saved Address</strong>
                            <p>{address.street ? `${address.street}, ${address.city}, ${address.pincode}` : "Tap to load"}</p>
                        </div>
                    </div>

                    {/* New Address Card */}
                    <div
                        className={`address-card ${address.useNew ? 'active' : ''}`}
                        onClick={() => setAddress({ street: "", city: "", pincode: "", useNew: true })}
                    >
                        <input type="radio" checked={address.useNew} readOnly />
                        <div className="address-content">
                            <strong>🏠 Enter New Address</strong>
                            <div className="address-fields">
                                <input type="text" placeholder="Street" value={address.street} disabled={!address.useNew}
                                    onChange={(e) => setAddress({ ...address, street: e.target.value })} required />
                                <input type="text" placeholder="City" value={address.city} disabled={!address.useNew}
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })} required />
                                <input type="text" placeholder="Pincode" value={address.pincode} disabled={!address.useNew}
                                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })} required />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="order-info">
                    <label>Payment Method</label>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="COD">Cash on Delivery</option>
                        <option value="ONLINE">Online Payment</option>
                    </select>
                </div>

                <div className="order-total">Total: ₹{totalAmount}</div>

                <div className="order-btn">
                    <button type="submit">Confirm Order</button>
                </div>
            </form>
        </div>
    );
};

export default Order;