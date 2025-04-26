'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head'; // Import Head for SEO

const FilterButton = ({ type, currentFilter, setFilter, label }) => (
  <button
    onClick={() => setFilter(type)}
    className={`px-5 py-2 rounded-full text-[0.85rem] whitespace-nowrap font-semibold transition-colors duration-300 ease-in-out transform border-2 ${
      currentFilter === type
        ? 'bg-blue-600 text-white border-blue-600'
        : 'bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-600 border-gray-300'
    }`}
  >
    {label}
  </button>
);

const NiosTen = () => {
  const router = useRouter();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [filterPractical, setFilterPractical] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(true);
  const currentYear = new Date().getFullYear();
  // Load cart from localStorage only if it's empty
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('niosCart') || '[]');
    if (savedCart.length > 0) {
      setCart(savedCart);
    }
  }, []); // Run only once when component mounts

  // Load assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch('/api/sol/read');
        if (!res.ok) throw new Error('Failed to fetch assignments');
        const data = await res.json();

        const normalized = data.map(item => ({
          ...item,
          language: item.language === 'english' || item.language === true ? 'english' : 'hindi',
          hasPractical: item.hasPractical === true || item.hasPractical === 'yes',
        }));

        setAssignments(normalized);
      } catch (err) {
        console.error('Error fetching assignments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('niosCart', JSON.stringify(cart));
    }
  }, [cart]); // Only run when cart changes

  const addToCart = (assignment) => {
    if (!cart.find(item => item._id === assignment._id)) {
      setCart(prev => [...prev, assignment]);
    }
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const isInCart = (id) => cart.some(item => item._id === id);

  const renderCard = (assignment) => (
    <div
      key={assignment._id}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 flex flex-col justify-between"
    >
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-blue-700 mb-2 hover:text-blue-900 transition-colors">
          {assignment.name}
        </h2>
        <p className="text-gray-700 mb-3 text-sm">{assignment.description}</p>
        <p className="text-gray-600 mb-1 text-sm">
          <strong>Language:</strong> {assignment.language === 'hindi' ? 'Hindi' : 'English'}
        </p>
        <p className="text-gray-900 font-bold mt-2">
          ₹{assignment.price}{' '}
          <span className="line-through text-sm text-gray-500 ml-2">
            ₹{assignment.actualPrice}
          </span>
        </p>
        {assignment.document?.fileName && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 font-medium mb-1">Document Preview</p>
            <div className="relative border rounded-md bg-gray-100 p-4 text-center text-gray-400 text-xs italic">
              🔒 Preview locked. Purchase to access "{assignment.document.fileName}"
            </div>
          </div>
        )}
      </div>

      <button
        className={`mt-6 w-full ${
          isInCart(assignment._id) ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
        } text-white font-semibold py-2 rounded-lg transition-all`}
        onClick={() =>
          isInCart(assignment._id)
            ? removeFromCart(assignment._id)
            : addToCart(assignment)
        }
      >
        {isInCart(assignment._id) ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div>
  );

  if (loading)
    return (
      <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-xl" />
        ))}
      </div>
    );

  const filteredAssignments = assignments.filter(assignment => {
    const languageMatch = filterLanguage === 'all' || assignment.language === filterLanguage;
    const practicalMatch =
      filterPractical === 'all' ||
      (filterPractical === 'assignments' && !assignment.hasPractical) ||
      (filterPractical === 'practical' && assignment.hasPractical);
    return languageMatch && practicalMatch;
  });

  const assignmentFiles = filteredAssignments.filter(item => !item.hasPractical);
  const practicalFiles = filteredAssignments.filter(item => item.hasPractical);

  return (
    <>
      <Head>
        <title>SOL-DU Assignments & Practicals | NIOS-IGNOU-SOL</title>
        <meta
          name="description"
          content="Download SOL DU assignments and practicals. Filter by language and type. Safe and affordable."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:py-16 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-800 mb-4">
            SOL-DU Assignments & Practicals
          </h1>
          <p className="text-center font-extralight text-[1.05rem] text-gray-600 text-base sm:text-lg mb-10">
            Filter and download assignments or practical files based on your medium of study.
          </p>

          {/* Language Filter */}
          <div className="flex flex-row justify-center items-center gap-4 sm:gap-6 mb-8">
            {['all', 'english', 'hindi'].map((type) => (
              <FilterButton
                key={type}
                type={type}
                currentFilter={filterLanguage}
                setFilter={setFilterLanguage}
                label={type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
              />
            ))}
          </div>

          {/* Practical Filter */}
          <div className="flex flex-row flex-wrap justify-center items-center gap-2 sm:gap-6 mb-12">
            {['all', 'assignments', 'practical'].map((type) => (
              <FilterButton
                key={type}
                type={type}
                currentFilter={filterPractical}
                setFilter={setFilterPractical}
                label={type === 'all' ? 'All Files' : type.charAt(0).toUpperCase() + type.slice(1)}
              />
            ))}
          </div>

          {/* Assignments Section */}
          {assignmentFiles.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Assignments</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
                {assignmentFiles.map(renderCard)}
              </div>
            </div>
          )}

          {/* Practicals Section */}
          {practicalFiles.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Practical Files</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
                {practicalFiles.map(renderCard)}
              </div>
            </div>
          )}
{/* Hidden FAQs for SEO - visible to search engines, hidden from users */}
<section aria-hidden="true" className="sr-only">
  <h2>Frequently Asked Questions (FAQs)</h2>
  <ul>
    <li>
      <strong>Where can I buy SOL DU assignments?</strong><br />
      You can buy high-quality, ready-to-submit SOL DU  assignments right here.
    </li>
    <li>
      <strong>Are the SOL DU assignments updated for {currentYear}?</strong><br />
      Yes, every assignment is written specifically for the {currentYear} SOL DU session.
    </li>
    <li>
      <strong>Is instant download available?</strong><br />
      Absolutely. All files are available for immediate download after purchase.
    </li>
    <li>
      <strong>Do you provide SOL DU practical files?</strong><br />
      Yes, we offer pre-written practical files for SOL DU students.
    </li>
    <li>
      <strong>Are these assignments accepted by SOL DU?</strong><br />
      Yes. These assignments follow the latest SOL DU guidelines and are created for maximum scoring.
    </li>
    <li>
      <strong>Do you provide SOL DU assignment answers?</strong><br />
      Yes, we provide comprehensive SOL DU assignment answers that align with the latest guidelines and can help you score well.
    </li>
    <li>
      <strong>Are these SOL DU assignments available in PDF format?</strong><br />
      Yes, all assignments are available in PDF format for easy download and submission.
    </li>
    <li>
      <strong>What are the SOL DU practical exam guidelines?</strong><br />
      Our practical files follow SOL DU's specific guidelines to ensure you are fully prepared for your practical exams.
    </li>
    <li>
      <strong>How do I submit SOL DU assignments?</strong><br />
      You can submit your SOL DU assignments online via the SOL DU student portal or at your designated study center.
    </li>
    <li>
      <strong>Can I get help with my SOL DU practical exams?</strong><br />
      Yes, we provide detailed guidance and ready-to-submit practical files to help you prepare for your SOL DU practical exams.
    </li>
  </ul>
</section>

          {/* Nothing Found */}
          {assignmentFiles.length === 0 && practicalFiles.length === 0 && (
            <p className="text-center text-gray-500 text-sm mt-10">
              No files found for the selected filters.
            </p>
          )}
        </div>

        {/* Cart Component */}
        {cart.length > 0 && (
          <>
            {showCart && (
              <div className="fixed top-6 right-6 z-50 bg-white border rounded-lg shadow-xl p-4 max-w-xs w-full">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">🛒 Cart ({cart.length})</h3>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-gray-400 hover:text-gray-700 text-2xl font-bold"
                    aria-label="Close Cart"
                  >
                    &times;
                  </button>
                </div>
                <ul className="mb-3 max-h-60 overflow-auto text-sm">
                  {cart.map(item => (
                    <li key={item._id} className="flex justify-between items-center mb-2">
                      <span>{item.name}</span>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 text-xs"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg z-50 animate-bounce"
              onClick={() => router.push('/cart')}
            >
              🛒 Proceed to Checkout ({cart.length})
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default NiosTen;
