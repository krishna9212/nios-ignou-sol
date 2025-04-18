import React from 'react';

function WhyUs() {
  const features = [
    {
      icon: '⏱️',
      title: 'On-Time Delivery',
      description: 'Assignments delivered well before the deadline.',
    },
    {
      icon: '💸',
      title: 'Affordable Pricing',
      description: 'Quality work at student-friendly prices.',
    },
    {
      icon: '🎯',
      title: 'Guaranteed Results',
      description: 'Assignments designed to help you score higher.',
    },
    {
      icon: '📱',
      title: 'Quick Support',
      description: 'Fast support whenever you need us.',
    },
    {
      icon: '🔒',
      title: 'Safe Payments',
      description: 'Secure payments with Razorpay.',
    },
    {
      icon: '📄',
      title: 'Original Work',
      description: 'No plagiarism, 100% custom work.',
    },
  ];

  return (
    <section className="bg-white py-20 px-6 sm:px-10 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          Why Choose Us?
        </h2>
        <p className="text-gray-600 text-lg mb-14 max-w-3xl mx-auto">
          We make your studies easier with high-quality assignments and 24/7 support.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-left"
            >
              <div className="text-4xl mb-4 text-blue-600">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
