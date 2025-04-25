'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

function NiosCategoryCard({ title, description, route, icon, bgColor }) {
  const router = useRouter();

  return (
    <section
      onClick={() => router.push(route)}
      className="relative group cursor-pointer rounded-2xl overflow-hidden p-6 bg-white shadow-xl transition-transform duration-500"
      aria-label={`Explore ${title} category`}
    >
      {/* Glowing Bubble Effect */}
      <div
        className={`absolute -top-10 -left-10 w-36 h-36 rounded-full opacity-30 blur-xl ${bgColor} group-hover:opacity-50 transition-all duration-500`}
      ></div>

      {/* Icon with Circle */}
      <div
        className={`mb-2 w-12 h-12 flex items-center justify-center rounded-full ${bgColor} text-white shadow-md transform transition duration-300 group-hover:rotate-12`}
        role="img"
        aria-label={`${title} category icon`}
      >
        {icon}
      </div>

      {/* Title */}
      <header>
        <h2 className="text-2xl text-gray-800 mb-2 group-hover:text-gray-900 font-[500] transition-colors duration-300 ease-in-out">
          {title}
        </h2>
      </header>

      {/* Description */}
      <p className="text-gray-600 font-light leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-300 ease-in-out">
        {description}
      </p>

      {/* CTA */}
      <div className="mt-2 inline-block text-sm font-semibold text-blue-600 group-hover:underline transform transition-all duration-300 ease-in-out">
        Explore Assignments →
      </div>
    </section>
  );
}

export default NiosCategoryCard;
