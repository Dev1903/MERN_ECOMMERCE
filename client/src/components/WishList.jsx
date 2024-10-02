import React, { useState, useEffect } from 'react';
import { Box, Text, Image, Button, Spinner } from '@chakra-ui/react';
import ProductCard from './ProductCard'; // Import the ProductCard component
import Header from './Header';
import Searchbar from './Searchbar';
import { Newsletter, Footer } from './Footer';
import { useCart } from '../context/CartContext'; // Import the CartContext
import { fetchWishlist, getProduct, updateWishlist } from '../api/api'; // Import fetchWishlist and getProduct functions
import { getUserId } from '../context/authUtils.js'; // Import the function to get user ID
import Swal from 'sweetalert2';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const { updateCart } = useCart(); 
    const [addedProductId, setAddedProductId] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUserId = getUserId(); 
        if (storedUserId) {
            setUser(storedUserId);
        }
    }, []);

    useEffect(() => {
        const fetchWishlistData = async () => {
            if (user) {
                try {
                    const wishlistData = await fetchWishlist(user);
                    if (wishlistData && wishlistData.items && Array.isArray(wishlistData.items)) { 
                        const wishlistWithDetails = await Promise.all(
                            wishlistData.items.map(async (item) => {
                                if (item && item._id) { // Check if item and its _id are valid
                                    const product = await getProduct(item.productId);
                                    return product ? { ...item, product } : null; // Ensure product is not null
                                }
                                return null;
                            })
                        );

                        // Filter out any null products from the wishlist
                        setWishlist(wishlistWithDetails.filter(item => item)); 
                    } else {
                        setWishlist([]); 
                    }
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching wishlist:", error);
                    setLoading(false); // Ensure loading state is set to false on error
                }
            }
        };

        if (user) {
            fetchWishlistData();
        }
    }, [user]);

    const handleRemoveFromWishlist = (product) => {
        setWishlist(prevWishlist => {
            const updatedWishlist = prevWishlist.filter(item => item.productId !== product._id);
            
        

        // Update the wishlist in the database
        const updateWishlistInDatabase = async () => {
            try {
                await updateWishlist(user, updatedWishlist); // Update wishlist in the database
            } catch (error) {
                console.error("Error updating wishlist:", error);
                Swal.fire({
                    title: 'Error',
                    text: 'Unable to update wishlist. Please try again later.',
                    icon: 'error'
                });
            }
        };

        updateWishlistInDatabase(); // Call the function to update wishlist
        return updatedWishlist; // Return the updated wishlist state
    });
    };

    const handleAddToCart = (product) => {
        updateCart(product);
        setAddedProductId(product._id); 
        setTimeout(() => setAddedProductId(null), 800);
    };

    if (loading) {
        return (
            <Box className="d-flex flex-column justify-content-center align-items-center vh-100">
                <Spinner width="100px" // Set custom width
                    height="100px"
                    thickness="1px" />
                <Text mt={4}>Loading WishList...</Text>
            </Box>
        ); 
    }

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
                    fontSize: 'xx-large'}}>My Wishlist</h2>
                <hr className="mb-4 mt-0" style={{border: '1px solid black' }} />
                <div className="row mt-5">
                    {wishlist.length > 0 ? (
                        wishlist.map(item => (
                            <div className="col-md-4 mb-4" key={item._id}>
                                <ProductCard
                                    product={item.product} 
                                    handleAddToCart={() => handleAddToCart(item.product)}
                                    handleWishlist={() => handleRemoveFromWishlist(item.product)}
                                    isInWishlist={true} 
                                    isAddedToCart={addedProductId === item.productId} 
                                />
                            </div>
                        ))
                    ) : (
                        <Box className="oops" textAlign="center" mt={10}>
                            <Image
                                src="/images/empty-wishlist.jpeg"
                                alt="No items in wishlist"
                                boxSize="200px"
                                mb={4}
                            />
                            <Text className="head mb-4">Oops!</Text>
                            <Text className="desc">It looks like you haven't added any items to your wishlist yet.</Text>
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
