'use client';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingCart, RefreshCcw } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import logo from "@/public/logo.png";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const [email, setEmail] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('email') || '' : ''));
  const addEmailBtnRef = useRef(null);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    if (isValidEmail(email)) localStorage.setItem('email', email);
  }, [email]);

  const handleReload = () => window.location.reload();

  const handleAddEmail = () => {
    alert(isValidEmail(email)
      ? `Email saved: ${email}`
      : 'Please enter a valid email.');
  };

  const sendEmail = async () => {
    if (!isValidEmail(email)) {
      alert('Please enter a valid email before proceeding to payment.');
      return;
    }

    const subject = `Purchase Summary`;
    const message = `
      <h2>🛒 Your Cart Items</h2>
      <ul>
        ${cart.map(item => `
          <li>
            <strong>${item.name}</strong><br/>
            Description: ${item.description}<br/>
            File Type: ${item.hasPractical ? 'Practical' : 'Assignment'}<br/>
            Language: ${item.language ? 'English' : 'Hindi'}<br/>
            Price: ₹${item.price}<br/>
            Document: <a href="${item.document?.link}" target="_blank">${item.document?.fileName || 'Download'}</a>
          </li>
        `).join('')}
      </ul>
      <p><strong>Total:</strong> ₹${total}</p>
      <p>Thank you for choosing us! 🎓</p>
    `;

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject, message }),
      });

      const data = await res.json();
      alert(data.error ? 'Failed to send email. Please try again.' : 'Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Something went wrong while sending the email.');
    }
  };

  const handlePayment = () => {
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!key) return alert('Razorpay key not found.');

    const options = {
      key,
      amount: total * 100,
      currency: 'INR',
      name: 'nios ignou sol',
      description: 'Payment for Assignments/Practicals',
      handler: async function (response) {
        try {
          const res = await fetch('/api/create-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });

          await sendEmail();

          const data = await res.json();
          if (!data.success) {
            console.log('Payment verification failed.');
          }
        } catch (error) {
          console.error('Payment verification error:', error);
        }
      },
      prefill: { email },
      theme: { color: '#3399cc' },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 relative">
        <button
          onClick={handleReload}
          className="absolute top-4 right-4 p-2 sm:p-3 bg-white rounded-full shadow hover:ring-2 ring-blue-300 transition"
          title="Reload Cart"
        >
          <RefreshCcw className="w-5 h-5 text-gray-600" />
        </button>

        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center flex justify-center items-center gap-2">
          <span>Your Cart</span>
          <ShoppingCart className="w-6 sm:w-7 h-6 sm:h-7 ml-1" />
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-12 sm:py-16 text-gray-500">
            <p className="text-lg sm:text-xl mb-2">Your cart is empty.</p>
            <p className="text-sm">Start shopping to fill it up!</p>
          </div>
        ) : (
          <>
            <ul className="space-y-4 sm:space-y-6 mb-6">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition"
                >
                  <div className="flex-1">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">₹{item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="mt-3 sm:mt-0 text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="mb-8 flex flex-col sm:flex-row items-stretch gap-3 w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm placeholder-gray-400 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                ref={addEmailBtnRef}
                type="button"
                onClick={handleAddEmail}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 text-sm font-medium transition-all duration-200"
              >
                Add Email
              </button>
            </div>

            {email && (
              <p className={`text-sm ml-2 mb-6 ${isValidEmail(email) ? 'text-green-600' : 'text-red-500'}`}>
                {isValidEmail(email) ? 'Email is valid.' : 'Invalid email address.'}
              </p>
            )}

            <div className="text-right text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Total: ₹{total}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
              <button
                onClick={clearCart}
                className="text-sm sm:text-base text-gray-600 hover:text-gray-800 underline"
              >
                Clear Cart
              </button>
              <button
                onClick={handlePayment}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-medium shadow-md transition"
              >
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </div>

      
    </div>
  );
};

export default CartPage;
