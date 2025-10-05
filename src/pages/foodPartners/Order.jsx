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

  return (
    <div className='partner-order-container'>
      <h1 className='order-title'>Orders</h1>

      {orders.length === 0 ? (
        <p className='no-orders'>No orders available.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <span className="customer-name">{order.user?.fullName}</span>
                <span className={`status ${order.status?.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item, idx) => (
                  <p key={idx} className="item-line">
                    {item.name} × {item.quantity}
                  </p>
                ))}
              </div>

              <div className="order-info">
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <p><strong>Payment:</strong> {order.paymentMethod}</p>
                <p><strong>Address:</strong> {order.deliveryAddress.street}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}</p>
                <p className="date">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
