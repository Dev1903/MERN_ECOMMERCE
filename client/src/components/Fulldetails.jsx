import React, { useEffect, useState } from 'react';
import { Text, Button, Box, Image, Spinner } from '@chakra-ui/react'; // Added Spinner
import { useParams } from 'react-router-dom';
import { getProducts } from '../api/api.js';
import Searchbar from './Searchbar';
import Header from './Header';
import { Footer, Newsletter } from './Footer';
import { useCart } from '../context/CartContext'; // Import the CartContext

const Fulldetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [addedProductId, setAddedProductId] = useState(null); // Track added product ID
    const { updateCart } = useCart(); // Access updateCart from CartContext
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true); // Set loading to true before fetching

            const products = await getProducts();
            const foundProduct = products.find((p) => p._id === id);
            setProduct(foundProduct);
            setLoading(false); // Set loading to false once fetching is done

        };

        fetchProduct();
    }, [id]);

    if (loading) {
        // While loading, show a spinner or some other loading indicator
        return (
            <Box className="d-flex flex-column justify-content-center align-items-center vh-100">
                <Spinner width="100px" // Set custom width
                    height="100px"
                    thickness="1px" />
                <Text mt={4}>Loading product details...</Text>
            </Box>
        );
    }

    if (!product) {
        return (
            <Box className="oops" textAlign="center" mt={10}>
                <Image
                    src="/images/product-not-found.jpeg"
                    alt="Product not found"
                    boxSize="200px"
                    mb={4}
                />
                <Text className="head mb-4">Oops!</Text>
                <Text className="desc">
                    It looks like currently there is no such product available to us.
                </Text>
                <Button className="btn btn-dark mb-5 mt-2" onClick={() => window.history.back()}>
                    Browse Products
                </Button>
            </Box>
        );
    }

    const handleAddToCart = (product) => {
        updateCart(product); // Use the context to update the cart
        setAddedProductId(product._id); // Set the added product ID
        setTimeout(() => setAddedProductId(null), 800); // Reset after 800ms
    };

    return (
        <div className="container-fluid">
            <div className="row mb-2 searchbar">
                <Searchbar />
            </div>
            <div className="row mb-5 header">
                <Header />
            </div>
            <div className="container">
                <div className="row product-details">
                    <div className="col-md-6 image-container">
                        <img
                            src={`${process.env.REACT_APP_API_URL}/images/product-images/${product.image}`}
                            alt={product.name}
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-6 details-container">
                        <h3 className="product-title">{product.name}</h3>
                        <p className="product-brand"><strong>Brand:</strong> {product.brand}</p>
                        <p className="product-category"><strong>Category:</strong> {product.category.name}</p>
                        <p className="product-rating"><strong>Rating:</strong> {product.rating}</p>
                        <div className="price-info">
                            <p className="product-price">
                                <strong>Price:</strong> {isNaN(parseFloat(product.discountPrice))
                                    ? `₹${product.price}`
                                    : `₹${product.discountPrice}`}
                            </p>
                            <p className="product-discount">
                                {isNaN(parseFloat(product.discountPrice)) ? '' : `₹${product.price}`}
                            </p>
                        </div>
                        <p className="product-sold"><strong>Sold:</strong> {product.sold ? product.sold : 0} units</p>
                        <p className="product-popular"><strong>Popular:</strong> {product.popular ? 'Yes' : 'No'}</p>
                        <div className="product-description">
                            <strong>Description:</strong>
                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>
                        <Button
                            className={`btn btn-${addedProductId === product._id ? 'success' : 'dark'} mt-3`}
                            onClick={() => handleAddToCart(product)} // Pass the product to handleAddToCart
                            disabled={addedProductId === product._id} // Disable button temporarily after adding to cart
                        >
                            {addedProductId === product._id ? 'Added to Cart' : 'Add to Cart'}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="row mb-2 footer">
                <Newsletter />
                <Footer />
            </div>
        </div>
    );
};

export default Fulldetails;
