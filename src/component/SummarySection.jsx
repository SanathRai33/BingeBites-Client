import React from 'react'

const SummarySection = ({ items, address, paymentMethod, totalAmount, submitting, handleOrder, setStep }) => {
    return (
        <div className="order-section summary">
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
    )
}

export default SummarySection