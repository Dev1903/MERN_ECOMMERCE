import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Image } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { getProducts } from '../service/api'; // Ensure this function fetches data from MongoDB
import Header from './Header';
import Searchbar from './Searchbar';
import { Footer, Newsletter } from './Footer';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext'; // Import the CartContext

const Products = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('search') || '';
    const category = queryParams.get('category') || '';

    const [products, setProducts] = useState([]);
    const { updateCart } = useCart(); // Access updateCart from CartContext
    const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
    const [addedProductId, setAddedProductId] = useState(null);

    const searchWords = searchTerm.split(' ').map(word => word.toLowerCase());

    const matchesSearchTerm = (product) => {
        const productName = product.name.toLowerCase();
        const productBrand = product.brand.toLowerCase();
        const productCategory = product.category?.name.toLowerCase() || ''; // Safe access
        const productPrice = product.price.toString().toLowerCase();

        return searchWords.some(word =>
            productName.includes(word) ||
            productBrand.includes(word) ||
            productCategory.includes(word) ||
            productPrice.includes(word)
        );
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productList = await getProducts();
                setProducts(productList);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const validCategories = Array.from(new Set(products.map(product => product.category?.name))); // Safe access
    const isCategoryValid = !category || validCategories.includes(category);

    const filteredProducts = products.filter((product) => {
        const matchesCategory = !category || (product.category && product.category.name.includes(category));
        const matchesSearch = !searchTerm || matchesSearchTerm(product);
        return matchesCategory && matchesSearch;
    });

    const handleAddToCart = (product) => {
        updateCart(product);
        setAddedProductId(product._id);
        setTimeout(() => setAddedProductId(null), 800);
    };

    const handleWishlist = (product) => {
        setWishlist(prevWishlist => {
            const isInWishlist = prevWishlist.some(item => item._id === product._id);
            const updatedWishlist = isInWishlist
                ? prevWishlist.filter(item => item._id !== product._id)
                : [...prevWishlist, product];

            // Update local storage
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

            return updatedWishlist;
        });
    };



    return (
        <div className="container-fluid">
            <div className="row searchbar mb-2">
                <Searchbar />
            </div>
            <div className="row header mb-2">
                <Header />
            </div>
            <div className="row mb-2">
                <div className="col-12">
                    <div className="container mt-4">

                        <div className="row justify-content-center">
                            {filteredProducts.length > 0 && isCategoryValid ? (
                                <div>
                                    <h2 className="mb-4">Products</h2>
                                    <div className="d-flex flex-wrap justify-content-center">

                                        {filteredProducts.map((product) => (
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4" key={product._id}>
                                                <ProductCard
                                                    product={product}
                                                    handleAddToCart={() => handleAddToCart(product)}
                                                    handleWishlist={() => handleWishlist(product)}
                                                    isInWishlist={wishlist.some(item => item._id === product._id)}
                                                    isAddedToCart={addedProductId === product._id}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Box
                                    className='oops'
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    minHeight="100vh"
                                    textAlign="center"
                                    bgColor="white"
                                    p={5}
                                    borderRadius="md"
                                    boxShadow="lg"
                                >
                                    <Image
                                        src="/images/no-products.jpeg"
                                        style={{height: '200px', width: 'auto'}}
                                        alt="Cute Illustration"
                                        boxSize="150px"
                                        mb={4}
                                    />
                                    <Text className="head mb-4">
                                        Oops!
                                    </Text>
                                    <Text className='desc'>
                                        We couldn't find any products for the given category.
                                    </Text>
                                    <Button
                                        className='btn btn-dark'
                                        onClick={() => window.history.back()}
                                    >
                                        Go Back
                                    </Button>
                                </Box>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer mb-2">
                <Newsletter />
                <Footer />
            </div>
        </div>
    );
};

export default Products;
