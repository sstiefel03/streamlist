import React, { useState } from 'react';
import list from '../data';

function Subscriptions({ addToCart, cartItems }) {
    const [warning, setWarning] = useState('');

    const handleAdd = (item) => {
        const isSubscription = item.id <= 4;
        const existingSubscription = cartItems ? cartItems.find((i) => i.id <= 4) : null;

        const result = addToCart(item);
        if (result === 'duplicate') {
            if (isSubscription && existingSubscription && existingSubscription.id !== item.id) {
                setWarning('You may only select one subscription level at a time. ');
            } else {
            setWarning(`You already have ${item.service} in your cart. `);
            }
        } else {
            setWarning('');
        }
    };

    return (
        <div className="subscriptions-container">
            <h2>Subscriptions</h2>
            <p>Choose a subscription or accessory to add to your cart.</p>
            {warning && <p className="warning">{warning}</p>}
            <div className="subscriptions-grid">
                {list.map((item) => (
                    <div key={item.id} className="subscription-card">
                        <img src={item.img} alt={item.service} />
                        <h3>{item.service}</h3>
                        <p>{item.serviceInfo}</p>
                        <p>${item.price}</p>
                        <button onClick={() => handleAdd(item)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Subscriptions;