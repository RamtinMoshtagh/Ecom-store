import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let calculatedTotalPrice = 0;
    cartItems.forEach(item => {
      const itemPrice = item.discountedPrice ? item.discountedPrice : item.price;
      calculatedTotalPrice += itemPrice * item.quantity;
    });
    setTotalPrice(calculatedTotalPrice);
    setCartItemCount(cartItems.reduce((total, item) => total + item.quantity, 0));
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCartItemCount(0);
  };

  const removeItemFromCart = (productId, quantityToRemove = 1) => {
    setCartItems(currentItems => {
      return currentItems.reduce((updatedCartItems, item) => {
        if (item.id === productId) {
          const updatedQuantity = item.quantity - quantityToRemove;

          if (updatedQuantity > 0) {
            updatedCartItems.push({ ...item, quantity: updatedQuantity });
          }
        } else {
          updatedCartItems.push(item);
        }

        return updatedCartItems;
      }, []);
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartItemCount, totalPrice, clearCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default CartContext;
