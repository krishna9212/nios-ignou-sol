// 'NiosCategoryCard.js'
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

function NiosCategoryCard({ title, description, route, icon, bgColor }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(route)}
      className={`relative group cursor-pointer rounded-2xl overflow-hidden p-6 bg-white shadow-xl transition-transform duration-300 hover:scale-[1.01] border border-gray-200`}
    >
      {/* Glowing Bubble Effect */}
      <div className={`absolute -top-10 -left-10 w-36 h-36 rounded-full opacity-20 blur-xl ${bgColor}`}></div>

      {/* Icon with Circle */}
      <div className={`mb-4 w-12 h-12 flex items-center justify-center rounded-full ${bgColor} text-white shadow-md`}>
        {icon}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition">
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">{description}</p>

      {/* CTA */}
      <div className="mt-6 inline-block text-sm font-semibold text-blue-600 group-hover:underline">
        Explore Assignments →
      </div>
    </div>
  );
}

export default NiosCategoryCard;
