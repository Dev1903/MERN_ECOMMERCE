import React, { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import Header from './Header';
import { Newsletter, Footer } from './Footer';
import { getUser, getUserOrders } from '../api/api';
import { isAuthenticated, getUserId, clearToken } from '../context/authUtils.js';
import { Button, Box, Spinner, Text, background } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Wishlist from './WishList.jsx';
import { color } from 'framer-motion';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const ProfileOverview = ({ user }) => {
        return (
            <div className="col-md-12 profile-main">
                {/* Profile Overview */}
                <div className="row profile-overview mb-4">                    
                        <div className="profile-container">
                            <div className="row heading">
                                <h3>My Profile</h3>
                            </div>

                            <div className="details">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Address:</strong> {user.address}</p>
                                <p><strong>Mobile:</strong> {user.mobile}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            
        );
    };

    const Orders = ({ orders }) => {
        return (
            <div className="row orders-section">
                <div className="col-12">
                    <div className="row heading">
                        <h3 >My Orders</h3>
                    </div>

                    {orders.length > 0 ? (
                        <div className="order-list">
                            {orders.map(order => {
                                const totalPrice = order.products.reduce((total, item) => {
                                    return total + item.product.price * item.quantity;
                                }, 0);

                                return (
                                    <div className="order-card mb-4" key={order._id}>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="order-status">
                                                <span className={order.status === 'Pending' ? 'status-pending' : 'status-success'}></span>
                                                Status: {order.status}
                                            </span>
                                            <span className="totalprice h5">Total: ₹{totalPrice}</span>
                                        </div>
                                        <div className="row">
                                            {order.products.map(item => (
                                                <div className="col-md-4 mb-3" key={item._id}>
                                                    <div className="card product-card">
                                                        <img
                                                            src={`${process.env.REACT_APP_API_URL}/images/product-images/${item.product.image}`}
                                                            alt={item.product.name}
                                                            className="card-img-top product-image"
                                                        />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{item.product.name}</h5>
                                                            <p className="card-text">₹{item.product.price}</p>
                                                            <p className="card-text">Quantity: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>

            </div>
        );
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (!isAuthenticated()) {
                    console.error('User is not authenticated');
                    return;
                }

                const storedUser = getUserId();
                if (storedUser) {
                    const userData = await getUser(storedUser);
                    setUser(userData);
                    fetchUserOrders(storedUser);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        const fetchUserOrders = async (userId) => {
            try {
                const userOrders = await getUserOrders(userId);
                setOrders(userOrders);
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleLogout = () => {
        clearToken();
        navigate('/');
    };

    if (!user) {
        return (
            <Box className="d-flex flex-column justify-content-center align-items-center vh-100">
                <Spinner width="100px" height="100px" thickness="1px" />
                <Text mt={4}>Loading Profile...</Text>
            </Box>
        );
    }

    return (
        <div className="container-fluid profile">
            {/* Searchbar */}
            <div className="row mb-2 searchbar">
                <Searchbar />
            </div>

            {/* Header */}
            <div className="row mb-2 header">
                <Header />
            </div>

            <div className="row d-flex justify-content-between">
                {/* Sidebar */}
                <div className="col-md-3 sidebar_container">
                    <div className="profile-sidebar">
                        <h4>Hello, {user.name}</h4>
                        <ul className="list-group ">
                            <li className="list-group-item ">
                                <Link to="overview ">
                                    <i className="fa-solid fa-id-badge pe-2"></i>My Profile</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="orders">
                                    <i className="fa-solid fa-people-carry-box pe-2"></i>My Orders</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/wishlist">
                                    <i className="fa-solid fa-hand-holding-heart pe-2"></i>
                                    My Wishlist</Link>
                            </li>
                            <li className="list-group-item logout" onClick={handleLogout}>
                                <i className="fa-solid fa-power-off pe-2"></i>Logout
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Profile Section */}
                <div className="col-md-9 profile-main">
                    <Routes>
                        <Route path="/" element={<ProfileOverview user={user} />} />
                        <Route path="overview" element={<ProfileOverview user={user} />} />
                        <Route path="orders" element={<Orders orders={orders} />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                    </Routes>
                </div>
            </div>

            {/* Footer */}
            <div className="row footer mb-2">
                <Newsletter />
                <Footer />
            </div>
        </div>
    );
};

export default Profile;
