import React from 'react'

const OrderDetail = () => {
    return (
        <div className="order-section">
            <h2>Order Details</h2>
            <div className="order-items-container">
                {items?.map((item, index) => (
                    <div key={index} className="order-item-card">
                        <div className="item-image">
                            <img src={item?.image || "/default-food.jpg"} alt={item?.name} />
                        </div>
                        <div className="item-details">
                            <h4>{item?.name}</h4>
                            <p className="item-price">₹{item?.price}</p>
                            <div className="quantity-controls">
                                <label>Quantity:</label>
                                <input
                                    type="number"
                                    value={item?.quantity}
                                    min="1"
                                    onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className="item-total">
                            ₹{(item?.price || 0) * (item?.quantity || 1)}
                        </div>
                    </div>
                ))}
            </div>

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

            <div className="section-actions">
                <button className="btn-primary" onClick={() => setStep(2)}>
                    Continue to Address
                </button>
            </div>
        </div>
    )
}

export default OrderDetail
