import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../contexts/CartContext';

const HeaderContainer = styled.header`
  background: #282c34;
  color: white;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.8rem; /* Larger font size for better visibility */

  &:hover {
    color: #61dafb;
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  font-size: 1rem; /* Ensuring text is easily readable */

  &:hover {
    text-decoration: underline;
    color: #61dafb;
  }
`;

const CartIcon = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  font-size: 1.5rem; /* Adjusted for consistency and visibility */

  &:before {
    content: attr(data-count);
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 0.25rem;
    font-size: 0.75rem;
    min-width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px; /* Centering the content vertically */
  }
`;

const Header = () => {
  const { cartItemCount } = useContext(CartContext);

  return (
    <HeaderContainer>
      <Logo to="/">Shoppy</Logo>
      <Navigation>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/contact">Contact</NavItem>
      </Navigation>
      <CartIcon to="/cart" data-count={cartItemCount ? cartItemCount : '0'}>🛒</CartIcon>
    </HeaderContainer>
  );
};

export default Header;
