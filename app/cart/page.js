'use client';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingCart, RefreshCcw } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import logo from "@/public/logo.png";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const [email, setEmail] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('email') || '' : ''));
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState([]);
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
      <h2>🛒 Your Purchased Documents</h2>
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
      console.error(data.error)
      // alert(data.error ? 'Failed to send email. Please try again.' : 'Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      // alert('Something went wrong while sending the email.');
    }
  };

  const handlePayment = () => {

    if (!isValidEmail(email)) {
      alert("Please enter a valid email before proceeding to payment.");
      return;
    }
    
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

          const data = await res.json();

          await sendEmail();
          setPurchasedItems([...cart]);
          setPaymentSuccess(true);
          clearCart();
          if (data.success) {
          } else {
            console.log('Payment verification failed.');
          }
        } catch (error) {
          console.error('Payment verification error:', error);
        }
      },
      prefill: { email },
      theme: { color: '#3399cc' },
    };

    const rzp = new (window).Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Your Cart - NIOS IGNOU Sol</title>
        <meta name="description" content="Checkout your cart for NIOS Ignou Sol assignments and practicals. View your cart summary and make payments securely." />
        <meta property="og:title" content="Your Cart - NIOS IGNOU Sol" />
        <meta property="og:description" content="Checkout your cart for NIOS Ignou Sol assignments and practicals. View your cart summary and make payments securely." />
        <meta property="og:image" content={logo.src} />
        <meta property="og:url" content="https://nios-ignou-sol.com/cart" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
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
                  aria-label="Enter your email address"
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
      {paymentSuccess && (
  <div className="fixed inset-0 bg-opacity-80 backdrop-blur-lg flex justify-center items-center z-50 animate-fadeIn">
    <div className="bg-blue-100 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center relative">

      {/* Close Button */}
      <button
        onClick={() => setPaymentSuccess(false)}
        className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition text-3xl font-bold"
      >
        ×
      </button>

      <h2 className="text-2xl font-extrabold text-green-500 mb-6">✅ Payment Successful</h2>
      <p className="text-gray-950 mb-2 text-base">Thank you for your purchase! Your transaction has been completed successfully.</p>
      <p className="text-sm text-gray-800 mb-4">A order email has been sent to:</p>
      <p className="text-base text-blue-700 font-semibold mb-3 break-words">{email}</p>

      {/* Extra note */}
      <p className="text-xs text-gray-500 italic mb-6">
        The email may take up to 24 hours to arrive. If you don't see it in your inbox, please check your spam folder.
      </p>

      {/* Documents List */}
      <div className="text-left">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">📄 Your Documents:</h3>
        <ul className="space-y-3 max-h-48 overflow-y-auto">
          {purchasedItems.map((item) => (
            <li key={item._id} className="text-center">
              <a
                href={item.document?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline font-medium"
              >
                {item.document?.fileName || 'View Document'}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)}




    </>
  );
};

export default CartPage;
