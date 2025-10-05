import React, { useEffect, useState } from 'react';
import '../../styles/partner/Order.css';
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/order/`, {
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data.orders || []);
        console.log('Orders fetched:', res.data.orders);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
      });
  }, []);

  // Function to get status display text
  const getStatusText = (status) => {
    const statusMap = {
      'placed': 'Order Placed',
      'confirmed': 'Confirmed',
      'preparing': 'Preparing',
      'out_for_delivery': 'Out for Delivery',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
  };

  return (
    <div className='partner-order-container'>
      <div className="order-header-section">
        <h1 className='order-title'>Orders</h1>
        <div className="order-stats">
          <span className="total-orders">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <p className='no-orders'>No orders available</p>
          <p className="empty-subtitle">New orders will appear here</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              {/* Order Header */}
              <div className="order-card-header">
                <div className="order-meta">
                  <span className="order-id">Order #{order._id.slice(-6)}</span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <span className={`status ${order.status?.toLowerCase()}`}>
                  {getStatusText(order.status)}
                </span>
              </div>

              {/* Customer Info */}
              <div className="customer-section">
                <div className="customer-info">
                  <span className="customer-name">{order.user?.fullName}</span>
                  <span className="customer-contact">
                    {order.user?.phone || 'No contact'}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="order-items-section">
                <h4 className="section-title">Items</h4>
                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="item-line">
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        {item.customizations && (
                          <span className="item-customizations">
                            {item.customizations}
                          </span>
                        )}
                      </div>
                      <div className="item-quantity-price">
                        <span className="item-quantity">×{item.quantity}</span>
                        <span className="item-price">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{order.totalAmount}</span>
                </div>
                {order.deliveryFee > 0 && (
                  <div className="summary-row">
                    <span>Delivery Fee</span>
                    <span>₹{order.deliveryFee}</span>
                  </div>
                )}
                {order.discount > 0 && (
                  <div className="summary-row discount">
                    <span>Discount</span>
                    <span>-₹{order.discount}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="delivery-info">
                <div className="info-row">
                  <span className="info-label">Payment</span>
                  <span className="info-value payment-method">
                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                     order.paymentMethod === 'online' ? 'Online Payment' : 
                     order.paymentMethod}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Delivery Address</span>
                  <span className="info-value address">
                    {order.deliveryAddress.street}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
                  </span>
                </div>
                {order.deliveryInstructions && (
                  <div className="info-row">
                    <span className="info-label">Instructions</span>
                    <span className="info-value instructions">
                      {order.deliveryInstructions}
                    </span>
                  </div>
                )}
              </div>

              {/* Order Actions */}
              <div className="order-actions">
                <button className="btn btn-primary">
                  Update Status
                </button>
                <button className="btn btn-secondary">
                  View Details
                </button>
                <button className="btn btn-secondary">
                  Contact Customer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;