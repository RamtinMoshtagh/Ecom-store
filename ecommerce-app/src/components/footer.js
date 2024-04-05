import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  background-color: #333;
  color: white;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const FooterText = styled.p`
  margin: 0;
  padding: 0 10px; // Adds padding to prevent text from touching the sides on small screens
`;

const LinksContainer = styled.div`
  margin-top: 20px;
`;

const Link = styled.a`
  color: white;
  margin: 0 10px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 E-commerce App. All rights reserved.</FooterText>
      <LinksContainer>
        <Link href="/contact">Contact</Link>
      </LinksContainer>
    </FooterContainer>
  );
};

export default Footer;
