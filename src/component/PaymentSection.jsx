import React from 'react'

const PaymentSection = ({ paymentMethod, setPaymentMethod, setStep }) => {
    return (
        <div className="order-section payment">
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
    )
}

export default PaymentSection