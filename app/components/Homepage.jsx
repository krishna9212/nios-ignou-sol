import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import WhyUs from './WhyUs';
import Testimonial from './Testimonial';
import WhatWeDo from './WhatWeDo';

const Homepage = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>NIOS, IGNOU & SOL Assignments – Ace Your Exams with Expert Help</title>
        <meta
          name="description"
          content="Get high-quality, expert-written assignments for NIOS (10th & 12th), IGNOU, and DU SOL. Trusted by 500+ students across India."
        />
        <meta
          name="keywords"
          content="NIOS assignments, IGNOU practicals, DU SOL help, IGNOU solved assignments, NIOS 10th 12th assignments"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="YourClientName or SiteName" />

        {/* Open Graph (for WhatsApp, Facebook previews) */}
        <meta property="og:title" content="Get Assignments for NIOS, IGNOU & SOL – Trusted by 500+ Students" />
        <meta property="og:description" content="Get expert-written assignments & practicals for NIOS, IGNOU, and SOL. Boost your marks today!" />
        <meta property="og:image" content="/og-image.jpg" /> {/* Replace with real image path */}
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-gray-50 overflow-hidden">
        {/* <HeroSection /> */}
        <main>
          <WhatWeDo id="whatwedo" />
          <WhyUs />
          <Testimonial />
        </main>
      </div>
    </>
  );
};


export default Homepage;
