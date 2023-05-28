import React, { useState } from 'react';
import { Container } from 'reactstrap';
import Head from 'next/head';

import NavBar from './NavBar';
import Footer from './Footer';


const Helpert = ({ children }) => {

  return (
    <>
      <Head>
        <title>Helpert - College Application Assistance</title>
      </Head>
      <main id="app" className="flex flex-col h-screen bg-gray-100" data-testid="helpert">
        <NavBar />
        <Container className="mx-auto">{children}</Container>
        <Footer />
        {/* <button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode</button> */}
      </main>
    </>
  );
};

export default Helpert;