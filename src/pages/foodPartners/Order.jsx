import React, { useEffect } from 'react'
import '../../styles/partner/Order.css';
import axios from 'axios';

const Order = () => {

    const [messagess, setMessages] = React.useState(null);

    const messages = [
        { id: 1, text: 'New order received', type: 'info', avatar: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg', name: 'John Dev' },
        { id: 2, text: 'Order #1234 has been shipped', type: 'success', avatar: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg', name: 'John Dev' },
        { id: 3, text: 'Payment failed for Order #5678', type: 'error', avatar: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg', name: 'John Dev' },
    ];

    useEffect(() => {

        // Simulate fetching messages from an API
        setTimeout(() => {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/partner/profile/${id}`, {
                withCredentials: true
            }).then(res => {
                setMessages(res.data.orders);
                console.log(res.data.orders);
            }).catch(err => {
                console.error('Error fetching messages:', err);
            });
        }, 1000);
    })


    return (
        <div className='partner-order-container'>
            <h1>Orders</h1>
            <div className="messages-container">
                {messages ? messages.map((msg) => (
                    <div key={msg.id} className='message'>
                        <div className="message-header">
                            <img src={msg.avatar} alt={msg.name} className="avatar" />
                            <span className="name">{msg.name}</span>
                            <span className='badge'>{msg.type}</span>
                        </div>
                        <p className="message-content">
                            {msg.text}
                        </p>
                    </div>
                )) : <p>No messages available.</p>
                }
            </div>
        </div>
    )
}

export default Order
