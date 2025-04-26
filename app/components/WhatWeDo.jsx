'use client';
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import logo1 from "@/public/NIOS-Logo.png";
import logo2 from "@/public/IGNOU-Logo.png";
import logo3 from "@/public/soldu logo.png";

import { motion } from "framer-motion";

// Feature Card Data
const features = [
  {
    title: "NIOS 10th/12th",
    description: "Handwritten-style assignments and practicals ready for immediate submission.",
    href: "/nios",
    icon: logo1,
    iconGradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "IGNOU",
    description: "Well-structured assignments and complete practical files for all IGNOU programs.",
    href: "/ignou",
    icon: logo2,
    iconGradient: "from-green-500 to-teal-500",
  },
  {
    title: "DU SOL",
    description: "Neat and ready-to-use assignments and practicals prepared for DU SOL students.",
    href: "/sol-du",
    icon: logo3,
    iconGradient: "from-purple-500 to-pink-500",
  },
];

// Card Component
const Card = ({ feature }) => (
  <Link href={feature.href} aria-label={`View assignments for ${feature.title}`}>
    <motion.article
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-gray-200 shadow-lg border border-gray-200 rounded-xl p-4 md:p-6 flex flex-col h-full hover:ring-1 hover:ring-offset-1 hover:ring-indigo-500 backdrop-blur-md transition-all duration-300 ease-in-out"
    >
     {/* Icon */}
<div
  className={`relative z-10 flex items-center justify-center w-full rounded-2xl overflow-hidden ${
    feature.title === "NIOS 10th/12th" || feature.title === "DU SOL"
      ? 'h-32'
      : 'h-32 mb-3'
  }`}
>
  <div className="relative w-full h-full bg-white flex items-center justify-center">
    <Image
      src={feature.icon}
      alt={`${feature.title} logo`}
      layout="fill" // Ensure image fills the container
      objectFit="contain" // Ensures the image maintains its aspect ratio
      className={`transition-transform duration-300 ease-in-out ${
        feature.title === "NIOS 10th/12th" || feature.title === "DU SOL"
          ? 'scale-110'
          : 'scale-95'
      } ${
        feature.title === "DU SOL" ? 'p-5' : 'p-2'
      }`}
      priority
    />
  </div>
</div>


      {/* Title */}
      <h3
        className={`text-xl md:text-2xl font-bold text-gray-900 md:mb-[0.3rem] mb-1 tracking-tight z-10 relative ${
          feature.title === "NIOS 10th/12th" || feature.title === "DU SOL" ? 'mt-3' : ''
        }`}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-[1.05rem] md:text-base leading-relaxed z-10 relative flex-grow">
        {feature.description}
      </p>
    </motion.article>
  </Link>
);

// Main Section
function HeroPage() {
  return (
    <>
      <Head>
        <title>NIOS, IGNOU & DU SOL Ready-to-Submit Assignments | nios-sol-ignou</title>
        <meta
          name="description"
          content="Explore high-quality, structured, and ready-to-submit assignments for NIOS (10th/12th), IGNOU, and DU SOL. Trusted by 500+ students."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="NIOS, IGNOU & DU SOL Assignments | ExamAce" />
        <meta
          property="og:description"
          content="Get expert-written assignments and practicals for NIOS, IGNOU, and DU SOL. Stress-free and reliable."
        />
        <meta property="og:type" content="website" />
      </Head>

      <section
        id="hero"
        className="relative pt-6 pb-4 md:pt-14 md:pb-20 px-1 sm:px-10 lg:px-24 bg-white text-gray-900"
      >
        {/* Section Header */}
        <header className="max-w-9xl mx-auto text-center mb-2 md:mb-12 relative z-10">
          <p className="text-[1.05rem] sm:text-xl md:text-2xl font-[400] text-gray-700 tracking-wider">
            Complete, structured assignments and practicals, ready for submission.
          </p>
        </header>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 p-2 md:p-0 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-[75rem] mx-auto relative z-10">
          {features.map((feature, index) => (
            <Card key={index} feature={feature} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HeroPage;
