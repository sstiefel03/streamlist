import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, removeFromCart, updateQuantity }) {
    const navigate = useNavigate();
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        <div className="cart-container">
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.img} alt={item.service} />
                            <div className="cart-item-info">
                                <h3>{item.service}</h3>
                                <p>${item.price}</p>
                            </div>
                            <div className="cart-item-controls">
                                <button 
                                    onClick={() => updateQuantity(item.id, -1)}
                                    disabled={item.quantity === 1}
                                    aria-label="Decrease quantity"
                                >-</button>
                                <span>{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, 1)}
                                    aria-label="Increase Quantity"                                
                                >+</button>
                            </div>
                            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h3>Total: ${total.toFixed(2)}</h3>
                    </div>
                    <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                        Checkout
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;