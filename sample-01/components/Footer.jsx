import React from 'react';

const Footer = () => (
  <footer className="bg-gray-100 p-3 text-center" data-testid="footer">
    <div className="logo" data-testid="footer-logo" />
    <p className="text-gray-500" data-testid="footer-text">
      Copyright Helpert 2023
    </p>
  </footer>
);

export default Footer;