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

  // Update total quantity whenever cart changes
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalQuantity(total);
  }, [cart]);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function to update cart
  const updateCart = (product) => {
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
