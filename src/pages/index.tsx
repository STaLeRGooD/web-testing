// components/Layout.tsx
import React, { ReactNode } from 'react';
import Layout from './components/layout';
import Head from 'next/head';


export default function Index() {
  return (
    <div>
      <Head>
        <title>Web-testing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout children={'WEB-TESTING'} />
    </div>
  );
};

