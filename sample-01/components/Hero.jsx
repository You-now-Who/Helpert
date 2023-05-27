import React from 'react';

import Logo from './Logo';

const Hero = () => (
  <div className="hero my-5 text-center p-10" data-testid="hero">
    <Logo testId="hero-logo" className="mx-auto" />
    <h1 className="mb-4 text-4xl font-bold text-gray-800" data-testid="hero-title">
      Next.js Sample Project
    </h1>

    <p className="lead text-gray-700" data-testid="hero-lead">
      This is a sample application that demonstrates an authentication flow for a Regular Web App, using{' '}
      <a href="https://nextjs.org" className="text-blue-500 hover:text-blue-700">
        Next.js
      </a>
    </p>
  </div>
);

export default Hero;