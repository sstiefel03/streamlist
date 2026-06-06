import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import Subscriptions from './components/Subscriptions';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    const isSubscription = item.id <= 4;
    const alreadyInCart = cartItems.find((i) => i.id === item.id);
    const hasSubscription = cartItems.find((i) => i.id <= 4);

    if (isSubscription && hasSubscription) {
      return 'duplicate';
    }
    if (alreadyInCart) {
      setCartItems(cartItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    return 'added';
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((i) => i.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCartItems(cartItems.map((i) =>
      i.id === id ? { ...i, quantity: Math.max(1, i.quantity + amount) } : i
    ));
  };

  return (
    <Router>
      <Navbar cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0 )} />
      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/subscriptions" element={<Subscriptions addToCart= {addToCart} cartItems={cartItems} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );     
}

export default App;