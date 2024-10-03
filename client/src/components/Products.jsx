import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Image, Spinner } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProducts, fetchWishlist, updateWishlist } from '../api/api'; // Ensure getWishlist is added to your API functions
import Header from './Header';
import Searchbar from './Searchbar';
import { Footer, Newsletter } from './Footer';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext'; // Import the CartContext
import { isAuthenticated, getUserId } from '../context/authUtils.js'; // Import functions from authUtils
import Swal from 'sweetalert2';

const Products = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('search') || '';
    const category = queryParams.get('category') || '';

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const { updateCart } = useCart(); // Access updateCart from CartContext
    const [wishlist, setWishlist] = useState([]);
    const [addedProductId, setAddedProductId] = useState(null);
    const [user, setUser] = useState(null); // State for user ID
    const [loading, setLoading] = useState(true); // New loading state

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
        const isLoggedIn = isAuthenticated(); // Check if the user is authenticated
        if (isLoggedIn) {
            const id = getUserId(); // Get the user ID from the token
            setUser(id); // Set the user ID state
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Start loading
            try {
                const productList = await getProducts();
                setProducts(productList);
                if (user) {
                    const userWishlist = await fetchWishlist(user); // Fetch user's wishlist from the database
                    setWishlist(Array.isArray(userWishlist.items) ? userWishlist.items : []); // Ensure wishlist is an array of items
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false); // Stop loading once the data is fetched
            }
        };
        fetchProducts();
    }, [user]);

    const validCategories = Array.from(new Set(products.map(product => product.category?.name))); // Safe access
    const isCategoryValid = !category || validCategories.includes(category);

    const filteredProducts = products.filter((product) => {
        const matchesCategory = !category || (product.category && product.category.name.includes(category));
        const matchesSearch = !searchTerm || matchesSearchTerm(product);
        return matchesCategory && matchesSearch;
    });

    const handleAddToCart = (product) => {
        if (!user) {
            Swal.fire({
                title: 'User Not Signed In',
                text: "Please Sign In",
                icon: 'warning'
            }).then(() => {
                navigate('/signUp'); // Redirect to the login page
            });
            return;
        }

        updateCart(product); // Add product to cart
        setAddedProductId(product._id); // Set the added product ID
        setTimeout(() => setAddedProductId(null), 800); // Clear the added product ID after a short delay
    };

    const handleWishlist = async (product) => {
        if (!user) {
            Swal.fire({
                title: 'User Not Signed In',
                text: "Please Sign In",
                icon: 'warning'
            }).then(() => {
                navigate('/signUp'); // Redirect to the login page
            });
            return;
        }

        setWishlist(prevWishlist => {
            const isInWishlist = prevWishlist.some(item => item.productId === product._id);
            const updatedWishlist = isInWishlist
                ? prevWishlist.filter(item => item.productId !== product._id) // Remove from wishlist if already present
                : [...prevWishlist, { productId: product._id, name: product.name, brand: product.brand }]; // Add to wishlist if not present

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
                            {loading ? ( // Show loading spinner while fetching
                                <Box className="d-flex flex-column justify-content-center align-items-center vh-100">
                                    <Spinner width="100px" // Set custom width
                                        height="100px"
                                        thickness="1px" />
                                    <Text mt={4}>Searching Filtered Products...</Text>
                                </Box>
                            ) : filteredProducts.length > 0 && isCategoryValid ? (
                                <div>
                                    <h2 className="mb-4">Products</h2>
                                    <div className="d-flex flex-wrap justify-content-center">
                                        {filteredProducts.map((product) => (
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4" key={product._id}>
                                                <ProductCard
                                                    product={product}
                                                    handleAddToCart={() => handleAddToCart(product)}
                                                    handleWishlist={() => handleWishlist(product)}
                                                    isInWishlist={wishlist.some(item => item.productId === product._id)} // Ensure wishlist check is correct
                                                    isAddedToCart={user && addedProductId === product._id}
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
                                    minHeight="50vh"
                                    textAlign="center"
                                    bgColor="white"
                                    p={5}
                                    borderRadius="md"
                                    boxShadow="lg"
                                >
                                    <Image
                                        src="/images/no-products.jpeg"
                                        style={{ height: '200px', width: 'auto' }}
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
            <div className="row footer">
                <Footer />
            </div>
            <div className="row newsletter">
                <Newsletter />
            </div>
        </div>
    );
};

export default Products;
