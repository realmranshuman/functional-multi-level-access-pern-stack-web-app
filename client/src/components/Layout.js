import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

function Layout({ children }) {
    const location = useLocation();
    const hideNavbarForRoutes = ['/signin', '/signup']; // add routes where you want to hide navbar
    const hideFooterForRoutes = ['/signin', '*']; // add routes where you want to hide footer
  
    return (
      <div>
        {!hideNavbarForRoutes.includes(location.pathname) && <Navbar />}
        {children}
        {!hideFooterForRoutes.includes(location.pathname) && <Footer />}
      </div>
    );
  }
  
  export default Layout;