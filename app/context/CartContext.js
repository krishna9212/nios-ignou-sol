'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Initialize cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('niosCart') || '[]');
    setCart(savedCart); // Set the cart from localStorage when the component mounts
  }, []); // Only run once when the component mounts

  // Update localStorage whenever the cart state changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('niosCart', JSON.stringify(cart)); // Sync cart with localStorage
    }
  }, [cart]); // Re-run when the cart changes

  // Function to add an item to the cart if it doesn't already exist
  const addToCart = (item) => {
    if (!cart.find((i) => i._id === item._id)) {
      setCart((prev) => [...prev, item]); // Add item to cart
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id)); // Remove item by id
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCart([]); // Clear all items from the cart
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
