import React from 'react'
import "../../styles/Order.css";

const AddressSection = () => {
  return (
    
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
  )
}

export default AddressSection
