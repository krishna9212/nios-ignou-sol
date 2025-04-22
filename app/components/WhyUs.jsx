import React from 'react';
import {
  ClockIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  LockClosedIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

function WhyUs() {
  const features = [
    {
      icon: ClockIcon,
      title: 'On-Time Delivery',
      description: 'Get your assignment before the deadline. No last-minute stress.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Low Student Price',
      description: 'Pocket-friendly rates. Best quality at a budget price.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'High Marks Guaranteed',
      description: 'Neat, complete, and correct work that helps you score better.',
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Fast Support',
      description: 'Have a doubt? Message us anytime — we’re always online.',
    },
    {
      icon: LockClosedIcon,
      title: 'Safe Payment',
      description: 'Pay easily and securely with UPI, Razorpay, etc.',
    },
    {
      icon: DocumentDuplicateIcon,
      title: 'Handwritten-style Work',
      description: 'Looks handwritten. Practical files, assignments — all ready to submit.',
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-14 px-6 sm:px-10 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
          Why Choose Us?
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto mb-16">
          We provide ready-to-submit assignments that save your time and help you score more.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/70 backdrop-blur-lg border border-gray-200 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.005] transition-all duration-700 text-left"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 mb-5 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 text-white shadow-lg transition-transform group-hover:rotate-[6deg]">
                <feature.icon className="h-8 w-8" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-[-60px] right-[-60px] w-[220px] h-[220px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-60px] left-[-60px] w-[220px] h-[220px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
    </section>
  );
}

export default WhyUs;
