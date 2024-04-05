import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../contexts/CartContext';
import CartCard from '../components/CartCard';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  /* styles omitted for brevity */
`;

const Title = styled.h2`
  /* styles omitted for brevity */
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const TotalPrice = styled.p`
  /* additional styles for total price */
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

const ResponsiveLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 20px;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const CartPage = () => {
  const { cartItems, clearCart, removeItemFromCart } = useContext(CartContext); // Make sure to include removeItemFromCart here
  const navigate = useNavigate();

  const handleCheckout = () => {
    clearCart();
    navigate('/checkout-success');
  };

  const handleRemoveFromCart = (productId) => {
    removeItemFromCart(productId); // This function is now properly referenced from the context
  };

  // Calculate total price of the entire cart
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.discountedPrice ? item.discountedPrice : item.price) * item.quantity;
  }, 0);

  return (
    <Container>
      <Title>Shopping Cart</Title>
      <ProductList>
        {cartItems.map((item) => (
          <CartCard key={item.id} product={item} onRemove={() => handleRemoveFromCart(item.id, item.quantity)} quantity={item.quantity} />
        ))}
      </ProductList>
      {cartItems.length > 0 && (
        <>
          <TotalPrice>Total Price: ${totalPrice.toFixed(2)}</TotalPrice> {/* Display total price */}
          <ButtonContainer>
            <Button onClick={handleCheckout}>Checkout</Button>
          </ButtonContainer>
        </>
      )}
      {cartItems.length === 0 && <p>Your cart is empty.</p>}
      <ResponsiveLink to="/">Back to Store</ResponsiveLink>
    </Container>
  );
};

export default CartPage;
