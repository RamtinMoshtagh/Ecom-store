import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Layout from './components/layout';
import HomePage from './pages/homePage';
import ProductPage from './pages/productPage';
import CartPage from './pages/cartPage';
import CheckoutSuccessPage from './pages/checkoutSuccessPage';
import ContactPage from './pages/contactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductPage /></Layout>} />
        <Route path="/cart" element={<Layout><CartPage /></Layout>} />
        <Route path="/checkout-success" element={<Layout><CheckoutSuccessPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
