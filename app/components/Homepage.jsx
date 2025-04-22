import React from 'react';
import Link from 'next/link';
import WhyUs from './WhyUs';
import Testimonial from './Testimonial';
import WhatWeDo from './WhatWeDo';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* <HeroSection /> */}
      <WhatWeDo id="whatwedo" />
      <WhyUs />
      <Testimonial />
    </div>
  );
};

const HeroSection = () => (
  <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 via-indigo-900 to-purple-900 text-white px-4 sm:px-6 lg:px-8">
    {/* Overlay with subtle blur */}
    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

    {/* Decorative Glow */}
    <div className="absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-purple-700 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

    {/* Main Content */}
    <div className="relative z-10 text-center max-w-4xl w-full animate-fadeInUp">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-md">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500">
          Ace Your Exams
        </span>{" "}
        with High-Quality Assignments
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
        Get expert-written assignments for <strong>NIOS (10th & 12th)</strong>, <strong>IGNOU</strong>, and <strong>DU SOL</strong>. 
        Boost your marks with zero stress and full confidence.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
        <Link
          href="#whatwedo"
          className="px-7 py-4 bg-yellow-400 text-black font-semibold text-lg rounded-lg shadow-lg hover:bg-yellow-300 transform transition duration-300"
        >
          Start Your Journey
        </Link>
      </div>

      {/* Trust Badge */}
      <div className="text-sm text-gray-300 italic">
        Trusted by <span className="text-white font-semibold">500+</span> students across India
      </div>
    </div>
  </section>
);

export default Homepage;
