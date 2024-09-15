// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create a context for the cart
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

    const updateCart = (id, change) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item => {
                if (item.id === id) {
                    const newQuantity = Math.max(item.quantity + change, 0);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(item => item.quantity > 0);

            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, updateCart, totalPrice, totalQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
