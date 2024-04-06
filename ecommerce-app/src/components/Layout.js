import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <main>
        <Outlet context={{ isNavOpen }} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;