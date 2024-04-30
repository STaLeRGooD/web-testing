// components/Layout.tsx
import React, { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
import Main from './main';

interface LayoutProps {
    children: ReactNode;
  }
  
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header title={'WEB-TESTING'} />
      <Main children={''}/>
      <Footer title={''}/>
    </div>
  );
};

export default Layout;
