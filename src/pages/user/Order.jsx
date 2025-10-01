import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Order.css";
import { useParams, useNavigate } from "react-router-dom";
import OrderDetail from "../../component/OrderDetail";

const Order = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Order Details, 2: Address, 3: Payment, 4: Summary
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savedAddress, setSavedAddress] = useState(null);
    const [address, setAddress] = useState({ street: "", city: "", pincode: "", useNew: false });
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [submitting, setSubmitting] = useState(false);

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
                }
            })
            .catch((err) => console.error("Error fetching food:", err))
            .finally(() => setLoading(false));

        // Load saved address
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, { withCredentials: true })
            .then(res => {
                const userAddress = res.data?.user?.address;
                if (userAddress) {
                    setSavedAddress(userAddress);
                    setAddress({
                        street: userAddress.street || "",
                        city: userAddress.city || "",
                        pincode: userAddress.pincode || "",
                        useNew: false
                    });
                }
            })
            .catch(() => console.log("No saved address found"));
    }, [id]);

    const handleQuantityChange = (index, value) => {
        const updated = [...items];
        updated[index] = { ...updated[index], quantity: Math.max(1, Number(value) || 1) };
        setItems(updated);
    };

    const totalAmount = items.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);

    const handleOrder = async () => {
        if (items.length === 0) return alert("Add at least one item");

        const firstItem = items[0];
        const partnerId = firstItem?.foodPartner || firstItem?.partner || firstItem?.foodPartnerId || null;
        if (!partnerId) {
            return alert("Partner information missing on the food item.");
        }

        if (!address.street || !address.city || !address.pincode) {
            return alert("Please complete address details");
        }

        setSubmitting(true);

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
            navigate(`/order-confirmation/${res.data.orderData._id}`);
        } catch (err) {
            console.error("Unable to place order", err.response?.data || err.message);
            alert("Failed to place order. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const renderStepIndicator = () => (
        <div className="step-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <span>1</span>
                <p>Order Details</p>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <span>2</span>
                <p>Address</p>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <span>3</span>
                <p>Payment</p>
            </div>
            <div className={`step ${step >= 4 ? 'active' : ''}`}>
                <span>4</span>
                <p>Summary</p>
            </div>
        </div>
    );

    const renderOrderDetails = () => (
        <OrderDetail/>
    );

    const renderAddressSection = () => (
        <div className="order-section">
            <h2>Delivery Address</h2>

            <div className="address-options">
                {savedAddress && (
                    <div
                        className={`address-card ${!address.useNew ? 'active' : ''}`}
                        onClick={() => setAddress({
                            street: savedAddress.street || "",
                            city: savedAddress.city || "",
                            pincode: savedAddress.pincode || "",
                            useNew: false
                        })}
                    >
                        <div className="address-radio">
                            <input type="radio" checked={!address.useNew} readOnly />
                        </div>
                        <div className="address-content">
                            <div className="address-header">
                                <strong>📍 Saved Address</strong>
                                <span className="address-type">Home</span>
                            </div>
                            <p className="address-text">
                                {savedAddress.street}, {savedAddress.city}, {savedAddress.pincode}
                            </p>
                            {savedAddress.fullAddress && (
                                <p className="address-full">{savedAddress.fullAddress}</p>
                            )}
                        </div>
                    </div>
                )}

                <div
                    className={`address-card ${address.useNew ? 'active' : ''}`}
                    onClick={() => setAddress({ street: "", city: "", pincode: "", useNew: true })}
                >
                    <div className="address-radio">
                        <input type="radio" checked={address.useNew} readOnly />
                    </div>
                    <div className="address-content">
                        <div className="address-header">
                            <strong>🏠 Add New Address</strong>
                        </div>

                        {address.useNew && (
                            <div className="address-fields">
                                <input
                                    type="text"
                                    placeholder="Street Address"
                                    value={address.street}
                                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                    required
                                />
                                <div className="address-row">
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
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="section-actions">
                <button className="btn-outline" onClick={() => setStep(1)}>
                    Back
                </button>
                <button
                    className="btn-primary"
                    onClick={() => setStep(3)}
                    disabled={!address.street || !address.city || !address.pincode}
                >
                    Continue to Payment
                </button>
            </div>
        </div>
    );

    const renderPaymentSection = () => (
        <div className="order-section">
            <h2>Select Payment Method</h2>

            <div className="payment-options">
                <div
                    className={`payment-card ${paymentMethod === 'COD' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('COD')}
                >
                    <div className="payment-radio">
                        <input type="radio" checked={paymentMethod === 'COD'} readOnly />
                    </div>
                    <div className="payment-content">
                        <span className="payment-icon">💰</span>
                        <div className="payment-details">
                            <strong>Cash on Delivery</strong>
                            <p>Pay when you receive your order</p>
                        </div>
                    </div>
                </div>

                <div
                    className={`payment-card ${paymentMethod === 'ONLINE' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('ONLINE')}
                >
                    <div className="payment-radio">
                        <input type="radio" checked={paymentMethod === 'ONLINE'} readOnly />
                    </div>
                    <div className="payment-content">
                        <span className="payment-icon">💳</span>
                        <div className="payment-details">
                            <strong>Online Payment</strong>
                            <p>Pay securely with UPI, Card, or Net Banking</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-actions">
                <button className="btn-outline" onClick={() => setStep(2)}>
                    Back
                </button>
                <button className="btn-primary" onClick={() => setStep(4)}>
                    Continue to Summary
                </button>
            </div>
        </div>
    );

    const renderSummarySection = () => (
        <div className="order-section">
            <h2>Order Summary</h2>

            <div className="summary-sections">
                <div className="summary-section">
                    <h3>Order Details</h3>
                    {items.map((item, index) => (
                        <div key={index} className="summary-item">
                            <span>{item.name} × {item.quantity}</span>
                            <span>₹{(item.price || 0) * (item.quantity || 1)}</span>
                        </div>
                    ))}
                </div>

                <div className="summary-section">
                    <h3>Delivery Address</h3>
                    <div className="summary-address">
                        <p>{address.street}</p>
                        <p>{address.city}, {address.pincode}</p>
                    </div>
                </div>

                <div className="summary-section">
                    <h3>Payment Method</h3>
                    <div className="summary-payment">
                        {paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}
                    </div>
                </div>

                <div className="summary-section">
                    <h3>Price Breakdown</h3>
                    <div className="price-breakdown">
                        <div className="price-row">
                            <span>Item Total</span>
                            <span>₹{totalAmount}</span>
                        </div>
                        <div className="price-row">
                            <span>Delivery Fee</span>
                            <span>₹0</span>
                        </div>
                        <div className="price-row total">
                            <span>Total Amount</span>
                            <span>₹{totalAmount}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-actions">
                <button className="btn-outline" onClick={() => setStep(3)}>
                    Back
                </button>
                <button
                    className="btn-primary confirm-btn"
                    onClick={handleOrder}
                    disabled={submitting}
                >
                    {submitting ? 'Placing Order...' : 'Confirm Order'}
                </button>
            </div>
        </div>
    );

    if (loading) return <div className="order-loading">Loading Order...</div>;

    return (
        <div className="order-container">
            <div className="order-form">
                {renderStepIndicator()}

                {step === 1 && renderOrderDetails()}
                {step === 2 && renderAddressSection()}
                {step === 3 && renderPaymentSection()}
                {step === 4 && renderSummarySection()}
            </div>
        </div>
    );
};

export default Order;