import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Cart Context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [token, setToken] = useState(null); // Token state

  // Check for token once when component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  // Update total quantity whenever cart changes
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalQuantity(total);
  }, [cart]);

  // Update localStorage whenever cart changes
  useEffect(() => {
    const cartData = cart.map(item => ({
      _id: item._id,
      quantity: item.quantity,
      price: item.price,
    }));
    localStorage.setItem('cart', JSON.stringify(cartData)); // Storing the data in localStorage
  }, [cart]); 

  // Function to update cart
  const updateCart = (product) => {
    if (!token) {
      alert('Please login first');
      return;
    }

    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item._id === product._id);
      if (existingProduct) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to change quantity directly
  const changeQuantity = (id, change) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item._id === id) {
          const newQuantity = Math.max(item.quantity + change, 0); // Prevent negative quantity
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0); // Remove items with zero quantity

      return updatedCart; // Return the updated cart
    });
  };

  return (
    <CartContext.Provider value={{ cart, updateCart, totalQuantity, changeQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider };
