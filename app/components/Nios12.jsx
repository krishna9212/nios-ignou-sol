  'use client';

  import React, { useEffect, useState } from 'react';
  import { useRouter } from 'next/navigation';

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
      
      useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('niosCart') || '[]');
        setCart(savedCart);
      }, []);
    // Load assignments
    useEffect(() => {
      const fetchAssignments = async () => {
        try {
          const res = await fetch('/api/nios-12/read');
          if (!res.ok) throw new Error('Failed to fetch assignments');
          const data = await res.json();

          const normalized = data.map(item => ({
            ...item,
            language:
              item.language === 'english' || item.language === true ? 'english' : 'hindi',
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

   
    // Save cart to localStorage
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
            isInCart(assignment._id)
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-600 hover:bg-blue-700'
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

    if (loading) return <p className="text-center py-10">Loading assignments...</p>;

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:py-16 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-800 mb-4">
            NIOS Class 12 Files
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
            <div className="fixed top-6 right-6 z-50 bg-white border rounded-lg shadow-xl p-4 max-w-xs w-full">
              <h3 className="text-lg font-bold mb-3">🛒 Cart ({cart.length})</h3>
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
              🛒 Proceed to Checkout ({cart.length})
            </button>
          </>
        )}
      </div>
    );
  };

  export default NiosTen;
