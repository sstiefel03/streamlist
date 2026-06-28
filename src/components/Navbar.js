import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ cartCount, user, handleLogout }) {
    return (
        <nav>
            <h1>StreamList</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/movies">Movies</Link></li>
                <li><Link to="/subscriptions">Subscriptions</Link></li>
                <li><Link to="/cart">Cart {cartCount > 0 && <span> ({cartCount})</span>}</Link></li>
                <li><Link to="/about">About</Link></li>
                {user ? (
                    <li>
                        <span>{user.name}</span>{' '}
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                    <li><Link to="/login">login</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar; 