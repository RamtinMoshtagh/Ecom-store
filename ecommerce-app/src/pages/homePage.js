import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductGrid from '../components/ProductGrid';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 900px; // Adjust based on your design needs
  margin: 20px auto;
  position: relative; // This is important for absolute positioning of the SuggestionsList
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SuggestionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background: #fff;
  position: absolute;
  width: 100%;
  border: 1px solid #ddd;
  border-top: none;
  z-index: 5; // Make sure this is above other content
  border-radius: 0 0 5px 5px;
  max-height: 200px;
  overflow-y: auto;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  border-top: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background-color: #f8f8f8;
  }
`;



const LoadingIndicator = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
  text-align: center;
`;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('https://v2.api.noroff.dev/online-shop')
      .then(response => response.json())
      .then(data => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch products:", error);
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const suggestions = searchTerm.length > 0
    ? products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={handleSearchChange}
        aria-label="Search products"
      />
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion) => (
            <SuggestionItem key={suggestion.id} onClick={() => navigate(`/product/${suggestion.id}`)}>
              {suggestion.title}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
      {loading ? (
        <LoadingIndicator>Loading...</LoadingIndicator>
      ) : error ? (
        <ErrorMessage>{error}<button onClick={() => window.location.reload()}>Try again</button></ErrorMessage>
      ) : (
        <ProductGrid>
          {products.map(product => (
            <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
              <ProductCard product={product} />
            </div>
          ))}
        </ProductGrid>
      )}
    </Container>
  );
};

export default HomePage;
