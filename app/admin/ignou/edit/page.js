'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        const res = await fetch('/api/ignou/read');
        const data = await res.json();
        setAssignments(data);
      } catch (err) {
        console.error('Error fetching assignments:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAssignments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-600 text-lg animate-pulse">Loading assignments...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">All Assignments</h1>
        <p className="text-gray-500 mt-2">Browse the latest assignments created.</p>
      </div>

      {assignments.length === 0 ? (
        <div className="text-center text-gray-600 mt-10">
          <p className="text-lg">No assignments found 📝</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-3">
                <h2 className="text-xl font-semibold text-gray-900 truncate">
                  {assignment.name}
                </h2>
              </div>

              <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                {assignment.description}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-blue-600">₹{assignment.price}</span>
                {/* Updated the Link to navigate to /edit-single-assignment/[id] */}
                <Link
                  href={`/admin/ignou/edit/${assignment._id}`}  
                  className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
