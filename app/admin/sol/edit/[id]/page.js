'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function EditAssignmentPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: '',
    description: '',
    actualPrice: '',
    price: '',
    hasPractical: 'no',
    language: 'english',
    documentLink: '',
    fileName: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const isAdmin = Cookies.get('admin') === 'true';
    if (!isAdmin) router.push('/');
  }, [router]);

  // Fetch existing data
  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await fetch(`/api/sol/read/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch assignment, status: ${res.status}`);
        }
        const data = await res.json();
        setForm({
          name: data.name || '',
          description: data.description || '',
          actualPrice: data.actualPrice || '',
          price: data.price || '',
          hasPractical: data.hasPractical ? 'yes' : 'no',
          language: data.language || 'english',
          documentLink: data.document?.link || '',  // Include the Google Drive link
          fileName: data.document?.fileName || '',  // Include the file name
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching assignment:', err);
      }
    };

    fetchAssignment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.entries(form).forEach(([key, value]) => {
      if (!value && key !== 'documentLink' && key !== 'fileName') { // documentLink and fileName can be optional
        newErrors[key] = 'This field is required';
        isValid = false;
      }
    });

    // Validate Google Drive link format (basic check)
    if (form.documentLink && !/^https:\/\/drive\.google\.com/.test(form.documentLink)) {
      newErrors.documentLink = 'Please provide a valid Google Drive link';
      isValid = false;
    }

    if (Number(form.actualPrice) <= Number(form.price)) {
      newErrors.price = 'Discounted price should be less than actual price';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setUpdating(true);

      const payload = {
        name: form.name,
        description: form.description,
        actualPrice: Number(form.actualPrice),
        price: Number(form.price),
        hasPractical: form.hasPractical === 'yes',
        language: form.language === 'english',
        document: {
          link: form.documentLink,   // Include the Google Drive link
          fileName: form.fileName,   // Include the file name
        }
      };

      console.log('Updating assignment with ID:', id);
      console.log('Payload:', payload);

      const res = await fetch(`/api/sol/edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', res.status);
      const resText = await res.text(); // Use .text() temporarily
      console.log('Raw response:', resText);

      if (res.ok) {
        alert('Assignment updated successfully!');
        router.push('/admin/nios');
      } else {
        // alert('Failed to update assignment. Check console for details.');
      }
    } catch (err) {
      console.error('Error during update:', err);
      alert('Error updating assignment.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Assignment</h1>
        <p className="text-gray-500 mb-8">Update the fields below.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Fields */}
          {[    
            { name: 'name', label: 'Assignment Name', type: 'text' },
            { name: 'actualPrice', label: 'Actual Price', type: 'number' },
            { name: 'price', label: 'Discounted Price', type: 'number' },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                value={form[name]} 
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
              />
              {errors[name] && <p className="text-sm text-red-500 mt-1">{errors[name]}</p>}
            </div>
          ))}

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>

          {/* Practical */}
          <div>
            <label htmlFor="practical" className="block text-sm font-medium text-gray-700">Practical File</label>
            <select
              id="practical"
              name="hasPractical"
              value={form.hasPractical}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
            <select
              id="language"
              name="language"
              value={form.language}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
            </select>
          </div>

          {/* Google Drive Link */}
          <div>
            <label htmlFor="documentLink" className="block text-sm font-medium text-gray-700">Google Drive Link</label>
            <input
              id="documentLink"
              name="documentLink"
              type="text"
              value={form.documentLink}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
            {errors.documentLink && <p className="text-sm text-red-500 mt-1">{errors.documentLink}</p>}
          </div>

          {/* File Name */}
          <div>
            <label htmlFor="fileName" className="block text-sm font-medium text-gray-700">File Name</label>
            <input
              id="fileName"
              name="fileName"
              type="text"
              value={form.fileName}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
            {errors.fileName && <p className="text-sm text-red-500 mt-1">{errors.fileName}</p>}
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
          >
            {updating ? 'Updating...' : 'Update Assignment'}
          </button>
        </form>
      </div>
    </div>
  );
}
