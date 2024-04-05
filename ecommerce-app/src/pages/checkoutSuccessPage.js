import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button'; // Assuming this is the path to your Button component

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #f8f9fa;
`;

const Title = styled.h2`
  color: #28a745; // Using a green color to signify success
  font-size: 28px; // Slightly larger for emphasis
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
  line-height: 1.5;
`;

const EngagementSuggestions = styled.div`
  margin-top: 40px;
`;

const SuggestionLink = styled(Link)`
  display: block;
  color: #007bff;
  text-decoration: none;
  margin: 10px 0;
  &:hover {
    text-decoration: underline;
  }
`;

const CheckoutSuccessPage = () => {
  const navigate = useNavigate(); // Call useNavigate to define 'navigate'

  return (
    <Container role="alert" aria-live="assertive">
      <Title>Checkout Successful 🎉</Title>
      <Message>Thank you for your purchase! Your order was successful. You will receive an email confirmation shortly.</Message>
      <Button onClick={() => navigate('/')}>Continue Shopping</Button> {/* Use 'navigate' for navigation */}
      <EngagementSuggestions>
        <p>Explore More:</p>
        <SuggestionLink to="/new-arrivals">New Arrivals</SuggestionLink>
        <SuggestionLink to="/offers">Special Offers</SuggestionLink>
        <SuggestionLink to="/account">View Account</SuggestionLink>
      </EngagementSuggestions>
    </Container>
  );
};

export default CheckoutSuccessPage;
