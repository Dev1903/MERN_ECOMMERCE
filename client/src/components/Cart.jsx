import React, { useState, useEffect } from 'react';

const Cart = () => {
    const [cart, setCart] = useState(() => {
        // Fetch cart from localStorage or any other state management solution
        return JSON.parse(localStorage.getItem('cart')) || [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleQuantityChange = (id, change) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item => {
                if (item.id === id) {
                    const newQuantity = Math.max(item.quantity + change, 0);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(item => item.quantity > 0); // Remove items with zero quantity

            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
        window.location.reload();
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container my-5">
            <h4 className="mb-4">Shopping Cart</h4>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map(item => (
                        <div className="d-flex justify-content-between align-items-center mb-3" key={item.id}>
                            <img src={item.image} alt={item.name} className="cart-item-img" style={{ width: '100px' }} />
                            <div className="flex-grow-1 ms-3">
                                <h5 className="mb-1">{item.name}</h5>
                                <p className="mb-1">{item.brand}</p>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-dark btn-sm" onClick={() => handleQuantityChange(item.id, -1)}>
                                        <i className="fa-solid fa-minus"></i>
                                    </button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button className="btn btn-dark btn-sm" onClick={() => handleQuantityChange(item.id, 1)}>
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h5 className="mb-1">₹{(item.price * item.quantity).toFixed(2)}</h5>
                            </div>
                        </div>
                    ))}
                    <hr />
                    <div className="d-flex justify-content-between">
                        <h5>Total Price:</h5>
                        <h5>₹{totalPrice.toFixed(2)}</h5>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
