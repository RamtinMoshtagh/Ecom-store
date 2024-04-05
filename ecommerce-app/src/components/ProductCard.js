import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Button from './Button';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingIndicator = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #ffffff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
`;

const Card = styled.div`
  width: 100%;
  max-width: 200px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
  }

  @media (min-width: 768px) {
    padding: 20px;
    margin: 20px auto;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    height: 150px;
  }
`;

const ProductTitle = styled.h3`
  font-size: 1rem;
  color: #333;
  text-align: center;
  margin: 5px 0;
`;

const ProductPrice = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 5px 0;
`;

const DiscountedPrice = styled(ProductPrice)`
  color: #d00;
  font-weight: bold;
`;

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Card>
      <ProductImage src={product.image.url} alt={product.image.alt || 'Product Image'} />
      <ProductTitle>{product.title}</ProductTitle>
      {/* Display discounted price only if it's less than the original price */}
      {product.discountedPrice && product.discountedPrice < product.price ? (
        <>
          <ProductPrice className="original-price">Price: ${product.price.toFixed(2)}</ProductPrice>
          <DiscountedPrice>Discounted Price: ${product.discountedPrice.toFixed(2)}</DiscountedPrice>
        </>
      ) : (
        <ProductPrice>Price: ${product.price.toFixed(2)}</ProductPrice>
      )}
      <Button onClick={handleClick} disabled={loading}>
        {loading ? <LoadingIndicator /> : 'View Product'}
      </Button>
    </Card>
  );
};

export default ProductCard;
