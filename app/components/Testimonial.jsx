import React from 'react';

function Testimonial() {
  return (
    <section className="bg-gray-50 py-16 px-6 sm:px-10 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          What Students Say
        </h2>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Testimonial 1 - NIOS */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full">
            <p className="italic text-gray-600 mb-4">
              "I got good marks in my NIOS 10th because of these assignments!"
            </p>
            <span className="block text-lg font-semibold text-gray-800">- Rajesh Kumar</span>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <span className="text-gray-500 text-sm">NIOS 10th Student</span>
            </div>
          </div>

          {/* Testimonial 2 - IGNOU */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full">
            <p className="italic text-gray-600 mb-4">
              "Very helpful for IGNOU! Got everything on time."
            </p>
            <span className="block text-lg font-semibold text-gray-800">- Priya Rajput</span>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <span className="text-gray-500 text-sm">IGNOU Student</span>
            </div>
          </div>

          {/* Testimonial 3 - DU SOL */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full">
            <p className="italic text-gray-600 mb-4">
              "DU SOL work was easy with this site. Got good marks too!"
            </p>
            <span className="block text-lg font-semibold text-gray-800">- Aarav Singh</span>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <span className="text-gray-500 text-sm">DU SOL Student</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
