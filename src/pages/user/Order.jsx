import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Order.css";
import { useParams, useNavigate } from "react-router-dom";
import OrderDetail from "../../component/OrderDetail";
import AddressSection from "../../component/AddressSection";
import PaymentSection from "../../component/PaymentSection";
import SummarySection from "../../component/SummarySection";

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
        <OrderDetail />
    );

    const renderAddressSection = () => (
        <AddressSection />
    );

    const renderPaymentSection = () => (
        <PaymentSection />
    );

    const renderSummarySection = () => (
        <SummarySection />
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