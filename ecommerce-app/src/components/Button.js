import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #007bff; 
  color: #ffffff; 
  padding: 10px 20px;
  border: 2px solid transparent; 
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover,
  &:focus {
    background-color: #0056b3;
    border-color: #ffdd57;
    outline: none; 
  }
  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(255, 221, 87, 0.6);
  }
`;

const Button = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
