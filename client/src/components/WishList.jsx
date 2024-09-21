import React, { useState, useEffect } from 'react';
import { Box, Text, Image, Button } from '@chakra-ui/react';
import ProductCard from './ProductCard'; // Import the ProductCard component
import Header from './Header';
import Searchbar from './Searchbar';
import { Newsletter, Footer } from './Footer';
import { useCart } from '../context/CartContext'; // Import the CartContext

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
    const { updateCart } = useCart(); // Access updateCart from CartContext
    const [addedProductId, setAddedProductId] = useState(null);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const handleRemoveFromWishlist = (product) => {
        setWishlist(prevWishlist => {
            const updatedWishlist = prevWishlist.filter(item => item._id !== product._id);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            return updatedWishlist;
        });
    };

    const handleAddToCart = (product) => {
        updateCart(product);
        setAddedProductId(product._id); // Use _id for consistency
        setTimeout(() => setAddedProductId(null), 800);
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
                <h2 className="" style={{
                    fontFamily: 'Bebas Neue, cursive',
                    letterSpacing: '3px',
                    fontSize: 'xx-large'
                }}
                >My Wishlist</h2>
                <hr className="mb-4 mt-0" style={{ width: '40vw', border: '1px solid black' }} />
                <div className="row mt-5">
                    {wishlist.length > 0 ? (
                        wishlist.map(product => (
                            <div className="col-md-4 mb-4" key={product._id}>
                                <ProductCard
                                    product={product}
                                    quantity={(product.quantity || 0)}
                                    handleAddToCart={() => handleAddToCart(product)}
                                    handleWishlist={() => handleRemoveFromWishlist(product)}
                                    isInWishlist={true} // Since it's already in wishlist, this is true
                                    isAddedToCart={addedProductId === product._id} // Check against _id
                                />
                            </div>
                        ))
                    ) : (
                        <Box className="oops" textAlign="center" mt={10}>
                            <Image
                                src="/images/empty-wishlist.jpeg"
                                style={{height: '', width: 'auto'}}
                                alt="No items in wishlist"
                                boxSize="200px"
                                mb={4}
                            />
                            <Text className="head mb-4">
                                Oops!
                            </Text>
                            <Text className="desc">
                                It looks like you haven't added any items to your wishlist yet.
                            </Text>
                            <Button className="btn btn-dark mb-5 mt-2" onClick={() => window.location.href = '/products'}>
                                Browse Products
                            </Button>
                        </Box>
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
