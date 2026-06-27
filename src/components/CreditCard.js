import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreditCard({ cartItems, clearCart }) {
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const formatCardNumber = (value) => {
        const digitsOnly = value.replace(/\D/g, '').slice(0,16);
        const groups = digitsOnly.match(/.{1,4}/g);
        return groups ? groups.join(' ') : '';
    };

    const handleCardNumberChange = (e) => {
        setCardNumber(formatCardNumber(e.target.value));
    };

    const formatName = (value) => {
        return value.replace(/[^a-zA-Z\s]/g, '');
    };

    const handleNameChange = (e) => {
        setCardName(formatName(e.target.value));
    };

    const formatExpiry = (value) => {
        const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
        if (digitsOnly.length <= 2) return digitsOnly;
        return `${digitsOnly.slice(0,2)}/${digitsOnly.slice(2)}`;
    };

    const handleExpiryChange = (e) => {
        setExpiry(formatExpiry(e.target.value));
    };

    const handleCvvChange = (e) => {
        const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 4);
        setCvv(digitsOnly);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cardData = {
            cardName,
            cardNumber,
            expiry,
            cvv: '***',
        };
        localStorage.setItem('savedCard', JSON.stringify(cardData));
        setSaved(true);
        clearCart();
    };

    return (
        <div className="credit-card-container">
            <h2>Checkout</h2>
            <div className="order-summary">
                <h3>Order Total: ${total.toFixed(2)}</h3>
            </div>
            {saved ? (
                <div className="confirmation">
                    <p>Payment information saved. Thank you for your purchase!</p>
                    <button onClick={() => navigate('/')}>Return Home</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="credit-card-form">
                    <label>
                        Name on card
                        <input
                         type="text"
                         value={cardName}
                         onChange={handleNameChange}
                         required
                        />
                    </label>
                    <label>
                        Card Number
                        <input
                         type="text"
                         value={cardNumber}
                         onChange={handleCardNumberChange}
                         placeholder="1234 5678 9012 3456"
                         maxLength="19"
                         required
                        />
                    </label>
                    <div className="card-row">
                        <label>
                            Expiry (MM/YY)
                            <input
                             type="text"
                             value={expiry}
                             onChange={handleExpiryChange}
                             placeholder="MM/YY"
                             maxLength="5"
                             required
                            />
                        </label>
                        <label>
                            cvv
                            <input
                             type="text"
                             value={cvv}
                             onChange={handleCvvChange}
                             maxLength="4"
                             required
                            />
                        </label>
                    </div>
                    <button type="submit">Submit Payment</button>
                </form>
            )}
        </div>
    );
}

export default CreditCard;