// components/Layout.tsx
import React, { ReactNode } from 'react';
import Layout from './components/layout';
import Head from 'next/head';


const Index: React.FC = ({ }) => {
  return (
    <div>
      <Head>
        <title>Web-testing</title>
        <link rel="icon" href="/img/icons/icon_site.svg" />
      </Head>
      <Layout children={'WEB-TESTING'} />
    </div>
  );
};

export default Layout;
