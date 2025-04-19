"use client";
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
      className="group relative bg-gray-100 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out hover:ring-1 hover:ring-offset-2 hover:ring-blue-400"
    >
      {/* Glowing gradient ring */}
      <div
        className={`absolute -inset-0.5 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500 z-0`}
      ></div>

      {/* Icon */}
      <div className="relative z-10 flex items-center justify-center w-16 h-16 mb-5 rounded-2xl bg-white shadow-inner shadow-gray-200">
        <div
          className={`w-full h-full flex items-center justify-center rounded-2xl bg-gradient-to-tr ${feature.iconGradient} text-white shadow-md transition-transform duration-700 group-hover:rotate-6`}
        >
          <feature.icon className="h-7 w-7" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight z-10 relative">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed z-10 relative">
        {feature.description}
      </p>
    </motion.div>
  </Link>
);

// Main Section
function WhatWeDo() {
  return (
    <section id="whatwedo" className="relative py-20 px-6 sm:px-10 lg:px-24  bg-gray-100">
      {/* Section Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          What We Offer
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Ready-to-submit assignments and practical files for NIOS, IGNOU, and DU SOL — created with clarity and care.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} feature={feature} />
        ))}
      </div>
    </section>
  );
}

export default WhatWeDo;
