"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import img from "@/public/example-animate.svg";
import { FaWhatsapp } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await axios.post('https://api.web3forms.com/submit', {
        ...formData,
        access_key: 'ddca6fd5-39cc-4abe-81ee-9d889d44a198',
      });

      if (response.data.success) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('There was an error sending your message.');
      }
    } catch (error) {
      setStatus('There was an error sending your message.');
    }
  };

  return (
    <div className="relative max-w-8xl mx-auto px-6 py-16 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left side (Image) */}
        <div className="flex justify-center transform transition duration-500 ease-in-out">
          <Image
            src={img}
            alt="Contact Us"
            className="rounded-xl -mt-20"
            width={600}
            height={500}
          />
        </div>

        {/* Right side (Form) */}
        <div className="bg-white p-10 md:mr-44 rounded-xl shadow-2xl max-w-lg mx-auto space-y-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
            Get in Touch with Us
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Have questions, suggestions, or just want to connect? We’re here to help.
          </p>

          {status && (
            <p className="text-center text-gray-600 mb-4">{status}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-semibold text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 block w-full border border-gray-300 rounded-md p-4 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full border border-gray-300 rounded-md p-4 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-semibold text-gray-700">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="mt-2 block w-full border border-gray-300 rounded-md p-4 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Write your message here..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition duration-300 transform "
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* WhatsApp Floating Icon */}
      <a
  href="https://wa.me/917210010912?text=Hi!!%20I%20am%20here%20from%20the%20website%20*nios-nios-sol*.%20I%20have%20a%20query%20regarding..."
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-12 right-16 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300"
  title="Chat on WhatsApp"
>
  <FaWhatsapp size={28} />
</a>

    </div>
  );
};

export default ContactUs;
