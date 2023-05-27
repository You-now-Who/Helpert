import React from 'react';
import { Container } from 'reactstrap';
import Head from 'next/head';

import NavBar from './NavBar';
import Footer from './Footer';


const Layout = ({ children }) => (
  <>
    <Head>
      <title>Next.js Sample App</title>
    </Head>
    <main id="app" className="flex flex-col h-screen bg-gray-100" data-testid="layout">
      <NavBar />
      <Container className="flex justify-center mt-5">{children}</Container>
      <Footer />
    </main>
  </>
);

export default Layout;