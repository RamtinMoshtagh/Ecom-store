import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import React, { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import ContactPage from './pages/ContactPage';
import ProductPage from './pages/ProductPage';


function App() {
  const [cartCount, setCartCount] = useState(0); // State to keep track of cart count

  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout cartItems={cartCount} setCartItems={setCartCount} />}> {/* Pass cartCount and setCartCount to Layout component */}
            <Route index element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout-success" element={<CheckoutSuccessPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="product/:id" element={<ProductPage setCartCount={setCartCount} />} /> {/* Pass setCartCount to ProductPage component */}
          </Route>
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
