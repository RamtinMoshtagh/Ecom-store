import React, { useContext, useState } from 'react';
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
  font-size: 1.8rem;

  &:hover {
    color: #61dafb;
  }
`;
const NavToggle = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 2rem;
  display: none;
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;
const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    display: ${({ $navOpen }) => $navOpen ? 'flex' : 'none'};
    flex-direction: column;
    width: 100%;
    background-color: #282c34;
    position: static; // Adjusted position
    top: 100%;
    left: 0;
    right: 0;
  }
`;
const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  font-size: 1rem;
  &:hover {
    text-decoration: underline;
    color: #61dafb;
  }
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
const CartIcon = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
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
    line-height: 20px;
  }
  @media (max-width: 768px) {
    &:before {
      margin-left: 10px; 
    }
  }
`;
const Header = () => {
  const { cartItemCount } = useContext(CartContext);
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!navOpen);
  return (
    <HeaderContainer>
      <Logo to="/">Shoppy</Logo>
      <NavToggle onClick={toggleNav}>☰</NavToggle>
      <Navigation $navOpen={navOpen}>
        <NavItem to="/" onClick={toggleNav}>Home</NavItem>
        <NavItem to="/contact" onClick={toggleNav}>Contact</NavItem>
        <CartIcon to="/cart" data-count={cartItemCount ? cartItemCount : '0'} onClick={toggleNav}>🛒</CartIcon>
      </Navigation>
    </HeaderContainer>
  );
};
export default Header;