'use client';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { Trash2, ShoppingCart, RefreshCcw } from 'lucide-react';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 relative">
        {/* Reload Button */}
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
            <p className="text-lg sm:text-xl mb-2 sm:mb-4">Your cart is empty.</p>
            <p className="text-sm sm:text-base">Start shopping to fill it up!</p>
          </div>
        ) : (
          <>
            <ul className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition"
                >
                  <div className="flex-1">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-500 mt-1 sm:mt-2">₹{item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="mt-3 sm:mt-0 text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="text-right text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
              Total: ₹{total}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 items-center">
              <button
                onClick={() => clearCart()}
                className="text-sm sm:text-base text-gray-600 hover:text-gray-800 underline"
              >
                Clear Cart
              </button>
              <button
                onClick={() => alert('Proceeding to payment...')}
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
