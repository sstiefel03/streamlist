import React from 'react';

function Cart({ cartItems, removeFromCart, updateQuantity }) {
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
                                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                <span>{item.quantity}</span>
                                {item.id > 4 && (
                                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                )}
                            </div>
                            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h3>Total: ${total.toFixed(2)}</h3>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;