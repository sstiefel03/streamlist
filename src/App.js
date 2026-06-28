import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import Subscriptions from './components/Subscriptions';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import CreditCard from './components/CreditCard';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
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

  const clearCart = () => {
    setCartItems([]);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <Navbar 
       cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0 )}
       user={user}
       handleLogout={handleLogout}
      />     
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} user={user} />} />
        <Route 
        path="/" 
        element={
          <ProtectedRoute user={user}>
            <StreamList />
          </ProtectedRoute>
        }
      />
      <Route
       path="/movies"
       element={
        <ProtectedRoute user={user}>
          <Movies />
        </ProtectedRoute>
       }
      />
      <Route
       path="/subscriptions"
       element={
        <ProtectedRoute user={user}>
          <Subscriptions addToCart={addToCart} cartItems={cartItems} />
        </ProtectedRoute>
       }
      />
      <Route
       path="/cart"
       element={
        <ProtectedRoute user={user}>
          <Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
        </ProtectedRoute>
       }
      />
      <Route
       path="/checkout"
       element={
        <ProtectedRoute user={user}>
          <CreditCard cartItems={cartItems} clearCart={clearCart} />
        </ProtectedRoute>
       }
      />
      <Route 
       path="/about" 
       element={
       <ProtectedRoute user={user}>
        <About />
       </ProtectedRoute>
       }
      />
    </Routes>
  </Router>
  );
}

export default App;