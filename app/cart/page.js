'use client';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { Trash2, ShoppingCart } from 'lucide-react'; // Optional: Lucide icons

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6 text-center flex justify-center items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">Your cart is empty.</div>
            <div className="text-sm text-gray-400">Start shopping to fill it up!</div>
          </div>
        ) : (
          <>
            <ul className="space-y-4 mb-6">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="bg-gray-50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-800 text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">₹{item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="text-right text-xl font-bold text-blue-700 mb-4">
              Total: ₹{total}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
              <button
                onClick={() => clearCart()}
                className="text-sm text-gray-600 hover:underline"
              >
                Clear Cart
              </button>
              <button
                onClick={() => alert('Proceeding to payment...')}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition"
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
