'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await fetch('/api/sol/read');
      const data = await res.json();
      setAssignments(data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this assignment?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/sol/delete/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Assignment deleted successfully!');
        // Refresh assignments list after delete
        setAssignments(assignments.filter((assignment) => assignment._id !== id));
      } else {
        alert('Failed to delete assignment.');
      }
    } catch (err) {
      console.error('Error deleting assignment:', err);
      alert('Error deleting assignment.');
    }
  };

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
                <button
                  onClick={() => handleDelete(assignment._id)}
                  className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
