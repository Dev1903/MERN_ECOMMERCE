import React, { useEffect, useState } from 'react';
import { Text, Button, Box, Image } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../service/api.js';
import Searchbar from './Searchbar';
import Header from './Header';
import { Footer, Newsletter } from './Footer';
import '../css/fulldetails.css'; // Import the CSS file

const Fulldetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const products = await getProducts();
            const foundProduct = products.find((p) => p._id === id);
            setProduct(foundProduct);
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return (
            <Box className="oops" textAlign="center" mt={10}>
                            <Image
                                src="/images/product-not-found.jpeg"
                                alt="No items in wishlist"
                                boxSize="200px"
                                mb={4}
                            />
                            <Text className="head mb-4">
                                Oops!
                            </Text>
                            <Text className="desc">
                                It looks like currently there is no such product available to us.
                            </Text>
                            <Button className="btn btn-dark mb-5 mt-2" onClick={() => window.history.back()}>
                                Browse Products
                            </Button>
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
            <div className="container">
                <div className="row product-details">
                    <div className="col-md-6 image-container">
                        <img
                            src={`http://localhost:8000/images/product-images/${product.image}`}
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
                            <p className="product-price"><strong>Price:</strong> ₹{parseFloat(product.price).toFixed(2)}</p>
                            <p className="product-discount">{isNaN(parseFloat(product.discountPrice)) ?'': `₹${product.discountPrice}`}</p>
                        </div>
                        <p className="product-sold"><strong>Sold:</strong> {product.sold ? product.sold : 0} units</p>
                        <p className="product-popular"><strong>Popular:</strong> {product.popular ? 'Yes' : 'No'}</p>
                        <div className="product-description">
                            <strong>Description:</strong>
                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>
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
