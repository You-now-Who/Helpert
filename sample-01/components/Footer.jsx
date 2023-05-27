import React from 'react';

const Footer = () => (
  <footer className="bg-gray-100 p-3 text-center" data-testid="footer">
    <div className="logo" data-testid="footer-logo" />
    <p className="text-gray-700" data-testid="footer-text">
      Sample project provided by{' '}
      <a href="https://auth0.com" className="text-blue-500 hover:text-blue-700">
        Auth0
      </a>
    </p>
  </footer>
);

export default Footer;