import React from 'react';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';

function Testimonial() {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      course: 'NIOS 10th Student',
      feedback: 'I passed my NIOS 10th with good marks. The assignment looked neat and ready to submit. Thank you!',
    },
    {
      name: 'Priya Rajput',
      course: 'IGNOU Student',
      feedback: 'IGNOU submissions were on time and perfect. Everything was handwritten-style and easy to understand.',
    },
    {
      name: 'Aarav Singh',
      course: 'DU SOL Student',
      feedback: 'DU SOL work was easy with their help. Practical files were ready to submit. Got good marks too!',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20 px-6 sm:px-10 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          What Our Students Say
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-14">
          Trusted by thousands of students for handwritten-style assignments, practical files, and ready-to-submit work.
        </p>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 text-left"
            >
              {/* Quote icon */}
              <div className="absolute -top-5 left-5 bg-indigo-100 p-2 rounded-full shadow-sm">
                <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-indigo-600" />
              </div>

              {/* Feedback Text */}
              <p className="text-gray-700 text-base leading-relaxed mt-4 mb-6">
                “{item.feedback}”
              </p>

              {/* Student Name */}
              <div className="pt-4 border-t border-gray-200">
                <span className="block text-lg font-semibold text-indigo-700">{item.name}</span>
                <span className="text-sm text-gray-500">{item.course}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
