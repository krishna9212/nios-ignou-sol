'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function CreateAssignmentPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    description: '',
    actualPrice: '',
    price: '',
    practical: 'no',
    language: 'english',
    documentLink: '',
    fileName: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const isAdmin = Cookies.get('admin') === 'true';
    if (!isAdmin) router.push('/');
  }, [router]);

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
      if (!value) {
        newErrors[key] = 'This field is required';
        isValid = false;
      }
    });

    if (!/^https:\/\/drive\.google\.com\/.+$/.test(form.documentLink)) {
      newErrors.documentLink = 'Enter a valid Google Drive link';
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
      setSubmitting(true);

      const payload = {
        name: form.name,
        description: form.description,
        actualPrice: Number(form.actualPrice),
        price: Number(form.price),
        hasPractical: form.practical === 'yes',
        language: form.language === 'english',
        document: {
          link: form.documentLink,
          fileName: form.fileName,
        },
      };

      const res = await fetch('/api/nios-12/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      setSubmitting(false);

      if (res.ok) {
        alert('Assignment uploaded successfully!');
        router.refresh();
        setForm({
          name: '',
          description: '',
          actualPrice: '',
          price: '',
          practical: 'no',
          language: 'english',
          documentLink: '',
          fileName: '',
        });
      } else {
        alert(result.message || 'Something went wrong.');
      }
    } catch (err) {
      setSubmitting(false);
      console.error(err);
      alert('Upload failed.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Assignment</h1>
        <p className="text-gray-500 mb-8">Fill out the details and provide the Google Drive link for the assignment.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name, Price, Actual Price */}
          {[
            { name: 'name', label: 'Assignment Name', type: 'text', placeholder: 'English Assignment' },
            { name: 'actualPrice', label: 'Actual Price', type: 'number', placeholder: '99' },
            { name: 'price', label: 'Discounted Price', type: 'number', placeholder: '49' },
          ].map(({ name, label, ...rest }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                id={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="mt-2 capitalize w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
                {...rest}
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
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short description..."
              rows={4}
              className="mt-2 w-full capitalize px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>

          {/* Practical */}
          <div>
            <label htmlFor="practical" className="block text-sm font-medium text-gray-700">Practical File</label>
            <select
              id="practical"
              name="practical"
              value={form.practical}
              onChange={handleChange}
              className="mt-2 w-full px-4 capitalize py-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
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
              className="mt-2 w-full capitalize px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
            </select>
          </div>

          {/* Document Link */}
          <div>
            <label htmlFor="documentLink" className="block text-sm font-medium text-gray-700">Google Drive Link</label>
            <input
              id="documentLink"
              name="documentLink"
              type="url"
              value={form.documentLink}
              onChange={handleChange}
              placeholder="https://drive.google.com/..."
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
            {errors.documentLink && <p className="text-sm text-red-500 mt-1">{errors.documentLink}</p>}
          </div>

          {/* File Name */}
          <div>
            <label htmlFor="fileName" className="block text-sm font-medium text-gray-700">File Name</label>
            <input
              id="fileName"
              name="fileName"
              value={form.fileName}
              onChange={handleChange}
              placeholder="Assignment1.pdf"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
            {errors.fileName && <p className="text-sm text-red-500 mt-1">{errors.fileName}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
          >
            {submitting ? 'Submitting...' : 'Submit Assignment'}
          </button>
        </form>
      </div>
    </div>
  );
}
