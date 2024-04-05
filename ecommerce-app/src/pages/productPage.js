import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../contexts/CartContext';
import Button from '../components/Button';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 50px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 600px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
`;

const PriceDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 1.2rem;
`;

const OriginalPrice = styled.span`
  color: #666;
  text-decoration: line-through;
`;

const DiscountedPrice = styled.span`
  color: #d00;
`;

const Savings = styled.span`
  color: #2a9d8f;
`;

const QuantitySelector = styled.select`
  font-size: 1rem;
  padding: 8px;
`;

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 600px;
  margin-top: 20px;
`;

const ReviewItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
`;

const ReviewUser = styled.div`
  font-weight: bold;
`;

const StarRating = styled.div`
  display: flex;
  color: #ffc107; // Gold color for stars
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  font-style: italic;
  gap: 8px; // Add some space between the username and the star ratings
`;
const ReviewDescription = styled.div`
  color: #333;
`;

const LoadingMessage = styled.p`
  text-align: center;
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

// Function to generate star ratings visually
const generateStars = (rating) => {
  return Array.from({ length: 5 }, (_, index) => (
    <span key={index}>{index < rating ? '★' : '☆'}</span>
  ));
};

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/online-shop/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data.data);
        setError('');
      })
      .catch(error => {
        setError('Failed to fetch product. Please try again later.');
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (loading) {
    return <LoadingMessage>Loading product details...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const discount = product && product.discountedPrice ? product.price - product.discountedPrice : 0;

  return (
    <DetailContainer>
      {product && product.image && (
        <ProductImage src={product.image.url} alt={product.image.alt || 'Product Image'} />
      )}
      <InfoSection>
        <Title>{product?.title}</Title>
        <Description>{product?.description}</Description>
        <PriceDetails>
          {product?.price && <OriginalPrice>Original Price: ${product.price.toFixed(2)}</OriginalPrice>}
          {product?.discountedPrice && <DiscountedPrice>Discounted Price: ${product.discountedPrice.toFixed(2)}</DiscountedPrice>}
          {discount > 0 && <Savings>You Save: ${discount.toFixed(2)}!</Savings>}
        </PriceDetails>
        <QuantitySelector value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))}>
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>{index + 1}</option>
          ))}
        </QuantitySelector>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
        {showSuccess && <p>Product added to cart successfully!</p>}
        {product?.reviews && (
          <ReviewSection>
            <h3>Reviews</h3>
            {product.reviews.map(review => (
              <ReviewItem key={review.id}>
                <ReviewUser>{review.username}</ReviewUser>
                <ReviewRating><StarRating>{generateStars(review.rating)}</StarRating></ReviewRating>
                <ReviewDescription>{review.description}</ReviewDescription>
              </ReviewItem>
            ))}
          </ReviewSection>
        )}
      </InfoSection>
    </DetailContainer>
  );
};

export default ProductPage;
