'use client';
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

// Feature Card Data
const features = [
  {
    title: "NIOS 10th/12th",
    description: "Handwritten-style assignments and practicals ready for immediate submission.",
    href: "/nios",
    icon: ClipboardDocumentListIcon,
    iconGradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "IGNOU",
    description: "Well-structured assignments and complete practical files for all IGNOU programs.",
    href: "/ignou",
    icon: BookOpenIcon,
    iconGradient: "from-green-500 to-teal-500",
  },
  {
    title: "DU SOL",
    description: "Neat and ready-to-use assignments and practicals prepared for DU SOL students.",
    href: "/sol-du",
    icon: AcademicCapIcon,
    iconGradient: "from-purple-500 to-pink-500",
  },
];

// Card Component
const Card = ({ feature }) => (
  <Link href={feature.href}>
    <motion.div
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-white shadow-lg border border-gray-200 rounded-xl p-6 flex flex-col h-full hover:ring-1 hover:ring-offset-2 hover:ring-indigo-500 backdrop-blur-md transition-all duration-300 ease-in-out"
    >
      {/* Glowing gradient ring */}
      <div
        className={`absolute -inset-0.5 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500 z-0`}
      ></div>

      {/* Icon */}
      <div className="relative z-10 flex items-center justify-center h-12 md:h-15 w-12 md:w-15 md:mb-5 mb-3 rounded-xl bg-white shadow-xl transition-transform duration-700 group-hover:rotate-4">
        <div
          className={`w-full h-full flex items-center justify-center rounded-xl bg-gradient-to-tr ${feature.iconGradient} text-white`}
        >
          <feature.icon className="h-7 w-7" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 md:mb-[0.3rem] mb-1 tracking-tight z-10 relative">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm md:text-base leading-relaxed z-10 relative flex-grow">
        {feature.description}
      </p>
    </motion.div>
  </Link>
);

// Main Section
function HeroPage() {
  return (
    <section
      id="hero"
      className="relative py-10 md:pt-18 md:pb-20 px-1 sm:px-10 lg:px-24 bg-white
 text-gray-900"
    >
    {/* Section Header */}
<div className="max-w-9xl mx-auto text-center mb-6 md:mb-12 relative z-10">
  <h2 className="text-[2rem] capitalize sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-2 md:mb-3">
    Ready-to-Submit 
  </h2>
  <p className="text-[1rem] sm:text-xl md:text-2xl font-light text-gray-700 tracking-wider ">
    Complete, structured assignments and practicals, ready for submission.
  </p>
</div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 p-2 md:p-0 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-[75rem] mx-auto relative z-10">
        {features.map((feature, index) => (
          <Card key={index} feature={feature} />
        ))}
      </div>
    </section>
  );
}

export default HeroPage;
