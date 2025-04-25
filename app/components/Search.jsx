'use client';
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

const fetchSearchResults = async (name) => {
  try {
    const res = await fetch(`/api/search?name=${name}`);
    if (!res.ok) {
      console.error("Server error:", await res.text());
      return [];
    }
    return await res.json();
  } catch (err) {
    console.error("Error fetching results:", err);
    return [];
  }
};

const SearchAssignments = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const [results, setResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(true);
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [filterPractical, setFilterPractical] = useState('all');

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('niosCart') || '[]');
    setCart(savedCart);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    const search = async () => {
      if (debouncedText.trim()) {
        const data = await fetchSearchResults(debouncedText);
        const normalized = data.map(item => ({
          ...item,
          language: item.language === 'english' || item.language === false ? 'hindi' : 'english',
          hasPractical: item.hasPractical === true || item.hasPractical === 'yes',
        }));
        setResults(normalized);
      } else {
        setResults([]);
      }
    };
    search();
  }, [debouncedText]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      const data = await fetchSearchResults(searchText);
      const normalized = data.map(item => ({
        ...item,
        language: item.language === 'english' || item.language === false ? 'hindi' : 'english',
        hasPractical: item.hasPractical === true || item.hasPractical === 'yes',
      }));
      setResults(normalized);
    }
  };

  const filteredResults = results.filter(item => {
    const langMatch = filterLanguage === 'all' || item.language === filterLanguage;
    const practicalMatch = filterPractical === 'all' || item.hasPractical === (filterPractical === 'yes');
    return langMatch && practicalMatch;
  });

  const renderCard = (assignment) => (
    <div
      key={assignment._id}
      className="bg-gray-200  rounded-2xl shadow-xl hover:shadow-2xl p-6 transition-transform duration-300 ease-in-out  flex flex-col justify-between"
    >
      <div>
        <h2 className="text-xl font-bold text-blue-700 mb-2 hover:text-blue-900 transition duration-200">
          {assignment.name}
        </h2>
        <p className="text-gray-700 mb-1 capitalize text-sm">{assignment.description}</p>
        <p className="text-sm mb-1 text-gray-600 capitalize"><strong>Language:</strong> {assignment.language}</p>
        <p className="text-sm mb-1 text-gray-600"><strong>class:</strong> {assignment.source || 'Not available'}</p>
        <p className="text-gray-900 font-bold mt-3 text-base">
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
        className={`mt-6 w-full flex items-center justify-center gap-2 ${isInCart(assignment._id) ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-2 rounded-lg transition-all duration-300 ease-in-out shadow`}
        onClick={() =>
          isInCart(assignment._id) ? removeFromCart(assignment._id) : addToCart(assignment)
        }
      >
        {isInCart(assignment._id) ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div>
  );

  return (
    <>
      <Head>
        <title>Search Assignments | NIOS 10th & 12th</title>
        <meta name="description" content="Search and purchase high-quality assignments and practical files for NIOS Class 10th and 12th students. Get immediate access to ready-to-submit assignments and practicals." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://your-website.com/search-assignments" />
      </Head>
      <div className="max-w-6xl mx-auto py-6">
        <form onSubmit={handleSubmit} className="flex flex-row justify-center gap-1 p-2 md:gap-4 mb-6">
          <input
            type="text"
            placeholder="Search assignment or practical..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-[90%] sm:w-3/4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            type="submit"
            className="flex items-center justify-center px-5 py-3 bg-blue-600 text-white rounded-lg transition-all hover:scale-105 shadow-md"
          >
            <Search size={20} />
          </button>
        </form>

        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 p-3 md:p-2  gap-7">
            {filteredResults.map(renderCard)}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">No results found.</p>
        )}

        {cart.length > 0 && (
          <>
            {showCart && (
              <div className="fixed top-6 right-6 z-50 bg-white border rounded-lg shadow-xl p-4 max-w-xs w-full">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">🛒 Cart ({cart.length})</h3>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-gray-400 hover:text-gray-700 text-2xl font-bold"
                  >
                    &times;
                  </button>
                </div>
                <ul className="mb-3 max-h-60 overflow-auto text-sm space-y-2">
                  {cart.map(item => (
                    <li key={item._id} className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <button onClick={() => removeFromCart(item._id)} className="text-red-500 text-xs">
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

export default SearchAssignments;
