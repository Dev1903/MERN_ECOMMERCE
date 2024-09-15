// Wishlist.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; // Import the ProductCard component

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const handleRemoveFromWishlist = (product) => {
        setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== product.id));
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">My Wishlist</h2>
            <div className="row">
                {wishlist.length > 0 ? (
                    wishlist.map(product => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <ProductCard
                                product={product}
                                quantity={(product.quantity || 0)}
                                handleAddToCart={() => {}}
                                handleWishlist={() => handleRemoveFromWishlist(product)}
                                isInWishlist={true} // Since it's already in wishlist, this is true
                            />
                        </div>
                    ))
                ) : (
                    <p>Your wishlist is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
