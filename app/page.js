import React from 'react';
import Head from 'next/head'; // ⬅️ Import Head
import Homepage from './components/Homepage';

const Page = () => {
  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Get ready-to-submit, plagiarism-free solved assignments for NIOS, IGNOU, and DU SOL at affordable prices. Instant delivery and secure payment methods!" />
        <meta name="keywords" content="NIOS solved assignments, IGNOU assignments, DU SOL assignments, academic assignments, ready-to-use assignments, plagiarism-free assignments, assignment store, assignment help, TMA solutions" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="NIOS-IGNOU-SOL.com" />
        <meta name="google-adsense-account" content="ca-pub-5101220421827112"/>
        <meta property="og:title" content="Buy Solved Assignments for NIOS, IGNOU, and DU SOL | Assignment Store" />
        <meta property="og:description" content="Get ready-to-submit, plagiarism-free solved assignments..." />
        <meta property="og:url" content="https://www.nios-ignou-sol.com" />
        <meta property="og:type" content="website" />
      </Head>

      <Homepage />
    </>
  );
};

export default Page;
