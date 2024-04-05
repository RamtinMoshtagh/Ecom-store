import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  max-width: 300px; // Increased max-width for better display
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin: 15px auto; // Centering the card for better visual
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    width: calc(50% - 30px); // Makes cards larger on wider screens
  }

  @media (min-width: 1024px) {
    width: calc(33.33% - 40px); // Adjusts for very wide screens for better utilization of space
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem; // Slightly larger for readability
  color: #333;
  text-align: center;
  margin-bottom: 10px;
`;

const PriceWrapper = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const Price = styled.span`
  color: #666;
  font-size: 0.9rem;
  margin-right: 5px;

  &.discounted {
    color: #d00;
    font-weight: bold;
  }

  &.original-price {
    text-decoration: line-through;
  }
`;

const RemoveButton = styled.button`
  padding: 8px 16px; // More padding for a better click area
  background-color: #ff3b3b;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e60000;
  }
`;

const Quantity = styled.div`
  font-size: 0.9rem; // Made font size consistent with price
  color: #333; // Darker for better readability
  margin-bottom: 10px;
`;

const CartCard = ({ product, onRemove }) => {
  const { title, price, discountedPrice, image, quantity } = product;

  return (
    <Card>
      <ProductImage src={image.url} alt={image.alt || 'Product Image'} />
      <ProductTitle>{title}</ProductTitle>
      <Quantity>Quantity: {quantity}</Quantity>
      <PriceWrapper>
        <Price className="original-price">${price.toFixed(2)}</Price>
        {discountedPrice && <Price className="discounted">${discountedPrice.toFixed(2)}</Price>}
      </PriceWrapper>
      <RemoveButton onClick={() => onRemove(product.id)}>Remove from Cart</RemoveButton>
    </Card>
  );
};

export default CartCard;
