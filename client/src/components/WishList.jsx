// Wishlist.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; // Import the ProductCard component
import Header from './Header';
import Searchbar from './Searchbar';
import { Newsletter, Footer } from './Footer';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const [addedProductId, setAddedProductId] = useState(null);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleRemoveFromWishlist = (product) => {
        setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== product.id));
    };

    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });

        // Set the addedProductId to show "Added" and reset after 1 second
        setAddedProductId(product.id);
        setTimeout(() => setAddedProductId(null), 1600); // Reset after 1 second

        setAddedProductId(product.id);
        setTimeout(() => window.location.reload(), 2000);
    };

    return (
        <div className='container-fluid'>
            <div className="row mb-2 searchbar">
                <Searchbar />
            </div>
            <div className="row mb-5 header">
                <Header />
                
            </div>
            <div className="container mt-4">
            <h2 className="mb-4">My Wishlist</h2>
            <div className="row">
                {wishlist.length > 0 ? (
                    wishlist.map(product => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <ProductCard
                                product={product}
                                quantity={(product.quantity || 0)}
                                handleAddToCart={() => handleAddToCart(product)}
                                handleWishlist={() => handleRemoveFromWishlist(product)}
                                isInWishlist={true} // Since it's already in wishlist, this is true
                                isAddedToCart={addedProductId === product.id}
                            />
                        </div>
                    ))
                ) : (
                    <p>Your wishlist is empty.</p>
                )}
            </div>
        </div>
            <div className="row mb-2 footer">
                <Newsletter />
                <Footer />
            </div>
        </div>
    );
};

export default Wishlist;
