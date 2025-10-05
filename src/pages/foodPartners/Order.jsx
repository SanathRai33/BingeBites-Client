import React from 'react'

const Order = () => {

    const messages = [
        { id: 1, text: 'New order received', type: 'info' },
        { id: 2, text: 'Order #1234 has been shipped', type: 'success' },
        { id: 3, text: 'Payment failed for Order #5678', type: 'error' },
    ];

    return (
        <div className='order-container'>
            <h1>Orders</h1>
            <div className="messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.type}`}>
                        {msg.text}
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Order
