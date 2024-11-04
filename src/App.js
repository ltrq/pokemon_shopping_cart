import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Store from './Store';
import AboutUs from './AboutUs';
import { CartProvider } from './CartItems'; // Import CartProvider
import Cart from './Cart';
import StoreItem from './StoreItem';

function App() {
  return (
    <CartProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/store/:id" element={<StoreItem />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
