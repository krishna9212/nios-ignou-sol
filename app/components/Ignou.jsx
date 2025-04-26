'use client';



import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

const FilterButton = ({ type, currentFilter, setFilter, label }) => (
  <button
    onClick={() => setFilter(type)}
    className={`px-5 py-2 rounded-full text-[0.85rem] whitespace-nowrap font-semibold transition-colors duration-300 ease-in-out transform border-2 ${
      currentFilter === type
        ? 'bg-blue-600 text-white border-blue-600'
        : 'bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-600 border-gray-300'
    }`}
    aria-pressed={currentFilter === type}
    aria-label={`Filter by ${label}`}
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

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('niosCart') || '[]');
    setCart(savedCart);
  }, []);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch('/api/ignou/read');
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

  useEffect(() => {
    localStorage.setItem('niosCart', JSON.stringify(cart));
  }, [cart]);

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
    <article
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
          ₹{assignment.price}
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
          isInCart(assignment._id)
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white font-semibold py-2 rounded-lg transition-all`}
        onClick={() =>
          isInCart(assignment._id)
            ? removeFromCart(assignment._id)
            : addToCart(assignment)
        }
        aria-label={isInCart(assignment._id) ? 'Remove from cart' : 'Add to cart'}
      >
        {isInCart(assignment._id) ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </article>
  );

  if (loading) {
    return (
      <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-xl" />
        ))}
      </div>
    );
  }

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
        <title>IGNOU Assignments & Practical Files | English & Hindi Medium</title>
        <meta name="description" content="Download IGNOU assignments & practicals by filtering Hindi or English medium." />
        <meta name="keywords" content="IGNOU assignments, practical files, Hindi medium, English medium, filter, NIOS" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:py-16 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-4">
              IGNOU Assignments & Practicals
            </h1>
            <p className="text-gray-600 text-base sm:text-lg font-light">
              Filter and download assignments or practical files based on your medium of study.
            </p>
          </header>

          {/* Language Filter */}
          <section aria-label="Language Filter" className="flex justify-center items-center gap-4 sm:gap-6 mb-8">
            {['all', 'english', 'hindi'].map(type => (
              <FilterButton
                key={type}
                type={type}
                currentFilter={filterLanguage}
                setFilter={setFilterLanguage}
                label={type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
              />
            ))}
          </section>

          {/* Practical Filter */}
          <section aria-label="File Type Filter" className="flex flex-wrap justify-center items-center gap-2 sm:gap-6 mb-12">
            {['all', 'assignments', 'practical'].map(type => (
              <FilterButton
                key={type}
                type={type}
                currentFilter={filterPractical}
                setFilter={setFilterPractical}
                label={type === 'all' ? 'All Files' : type.charAt(0).toUpperCase() + type.slice(1)}
              />
            ))}
          </section>

          {/* Assignments */}
          {assignmentFiles.length > 0 && (
            <section className="mb-16" aria-labelledby="assignments-heading">
              <h2 id="assignments-heading" className="text-2xl font-bold text-gray-800 mb-6">Assignments</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
                {assignmentFiles.map(renderCard)}
              </div>
            </section>
          )}

          {/* Practicals */}
          {practicalFiles.length > 0 && (
            <section aria-labelledby="practical-heading">
              <h2 id="practical-heading" className="text-2xl font-bold text-gray-800 mb-6">Practical Files</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
                {practicalFiles.map(renderCard)}
              </div>
            </section>
          )}
          <section aria-hidden="true" className="sr-only">
  <h2>Frequently Asked Questions (FAQs) – IGNOU Assignments</h2>
  <ul>
    <li>
      <strong>Where can I download solved IGNOU assignments?</strong><br />
      You can download ready-to-submit solved IGNOU assignments directly from our platform.
    </li>
    <li>
      <strong>Are the assignments valid for the 2025 session?</strong><br />
      Yes, all our assignments are updated for the latest IGNOU 2025 session.
    </li>
    <li>
      <strong>How quickly can I get the assignments?</strong><br />
      Instant download is available after purchase with no waiting time.
    </li>
    <li>
      <strong>Do you provide handwritten IGNOU assignments?</strong><br />
      Yes, we also provide scanned handwritten versions for better submission readiness.
    </li>
    <li>
      <strong>Are these accepted by IGNOU?</strong><br />
      All our assignments follow IGNOU guidelines and have high acceptance rates.
    </li>
  </ul>
</section>

          {/* No Results */}
          {assignmentFiles.length === 0 && practicalFiles.length === 0 && (
            <p className="text-center text-gray-500 text-sm mt-10">
              No files found for the selected filters.
            </p>
          )}
        </div>

        {/* Cart */}
        {cart.length > 0 && (
          <>
            <div className="fixed top-6 right-6 z-50 bg-white border rounded-lg shadow-xl p-4 max-w-xs w-full">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">🛒 Cart ({cart.length})</h3>
                <button
                  onClick={() => setCart([])}
                  className="text-red-500 text-sm font-medium"
                  aria-label="Clear Cart"
                >
                  Clear
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

            <button
              className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg z-50 animate-bounce"
              onClick={() => router.push('/cart')}
            >
              🛒 Checkout ({cart.length})
            </button>
          </>
        )}
      </main>
    </>
  );
};

export default NiosTen;
