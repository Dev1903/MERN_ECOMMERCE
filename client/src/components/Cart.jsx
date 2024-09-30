import React, { useEffect, useState } from 'react';
import { Text, Box, Button, Image } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Searchbar from './Searchbar';
import { Newsletter, Footer } from './Footer';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';
import { getUser, createOrder } from '../api/api'; // Fetch user data and create order
import { isAuthenticated, getUserId } from '../context/authUtils.js'; // Import functions from authUtils

const Cart = () => {
    const navigate = useNavigate();
    const { cart, changeQuantity, totalQuantity } = useCart();
    const totalPrice = Array.isArray(cart)
        ? cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        : 0;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (isAuthenticated()) { // Check if the user is authenticated
                    const storedUser = getUserId(); // Get user ID from the token
                    //console.log(`Stored user ID: ${storedUser}`);
                    if (storedUser) {
                        const userData = await getUser(storedUser);
                        setUser(userData);
                    }
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleOrderCreation = async (response) => {
        try {
            const orderData = {
                paymentId: response.razorpay_payment_id,
                user: user._id, // Use user ID
                products: cart.map(item => ({
                    product: item._id, // Convert string ID to ObjectId
                    quantity: item.quantity,
                })),
                amount: totalPrice
            };

            await createOrder(orderData);

            Swal.fire({
                title: 'Order Placed',
                text: "Order will be delivered to you with utmost care",
                icon: 'success',
                confirmButtonText: 'Continue Shopping',
            }).then(() => {
                navigate('/');
            });
        } catch (error) {
            console.error('Error while creating order:', error);
            Swal.fire('Error', 'Failed to place the order. Please try again.', 'error');
        }
    };

    const handlePayment = async () => {
        if (!user) {
            Swal.fire('Error', 'User details not found. Please log in.', 'error');
            return;
        }

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: totalPrice * 100,
            currency: 'INR',
            name: 'MERN-KART',
            description: 'Order Description',
            handler: async (response) => {
                await handleOrderCreation(response); // Call the new order creation function
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.mobile,
            },
            theme: {
                color: '#A3E0E6',
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <div className='container-fluid'>
            <div className="row mb-2 searchbar">
                <Searchbar totalQuantity={totalQuantity} />
            </div>
            <div className="row mb-5 header">
                <Header />
            </div>
            <div className="container my-5">
                <h2 style={{ fontFamily: 'Bebas Neue, cursive', letterSpacing: '3px', fontSize: 'xx-large' }}>
                    My Cart
                </h2>
                <hr style={{ width: '40vw', border: '1px solid black' }} />
                {Array.isArray(cart) && cart.length === 0 ? (
                    <Box className="oops" textAlign="center" mt={10}>
                        <Image src="/images/cart-empty.png" boxSize="200px" mb={4} />
                        <Text className="head mb-4">Oops!</Text>
                        <Text className="desc">It looks like you haven't added any items to your cart yet.</Text>
                        <Button className="btn btn-dark" onClick={() => window.location.href = '/products'}>
                            Browse Products
                        </Button>
                    </Box>
                ) : (
                    <div className="mt-5">
                        {cart.map(item => (
                            <div key={item._id}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <Link to={`/product/${item._id}`} className="d-flex text-decoration-none text-black">
                                        <img src={`${process.env.REACT_APP_API_URL}/images/product-images/${item.image}`} alt={item.name} className="cart-item-img" style={{ width: '100px' }} />
                                        <div className="flex-grow-1 ms-3">
                                            <h5 className="mb-1">{item.name}</h5>
                                            <p className="mb-1">{item.brand}</p>
                                        </div>
                                    </Link>
                                    <div className="buttons">
                                        <h5 className="mb-1">₹{(item.price * item.quantity).toFixed(2)}</h5>
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-dark btn-sm" onClick={() => changeQuantity(item._id, -1)}>
                                                <i className="fa-solid fa-minus"></i>
                                            </button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button className="btn btn-dark btn-sm" onClick={() => changeQuantity(item._id, 1)}>
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{ borderTop: "dashed 1px black" }} />
                            </div>
                        ))}
                        <div className="d-flex flex-column justify-content-between align-items-end">
                            <h4>Total Price:</h4>
                            <h4 className="totalprice">₹{totalPrice.toFixed(2)}</h4>
                            <Button className="btn btn-lg d-flex btn-dark gradient-button" onClick={handlePayment} colorScheme="teal" mt={15}>
                                Proceed to Payment
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <div className="row mb-2 footer">
                <Newsletter />
                <Footer />
            </div>
        </div>
    );
};

export default Cart;
