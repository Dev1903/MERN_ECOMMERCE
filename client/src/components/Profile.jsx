import React, { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import Header from './Header';
import { Newsletter, Footer } from './Footer';
import { getUser, getUserOrders, updateUser } from '../api/api';
import { isAuthenticated, getUserId, clearToken } from '../context/authUtils.js';
import { Box, Spinner, Text } from '@chakra-ui/react';
import Wishlist from './WishList.jsx';
import Swal from 'sweetalert2';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    const ProfileOverview = ({ user }) => {
        const [isEditing, setIsEditing] = useState(false);
        const [formData, setFormData] = useState({
            firstName: user?.name?.split(" ")[0] || "",
            lastName: user?.name?.split(" ")[1] || "",
            address: user?.address || "",
            mobile: user?.mobile || "",
            email: user?.email || "",
        });
        const [originalData, setOriginalData] = useState(formData);

        useEffect(() => {
            if (user) {
                const newFormData = {
                    firstName: user?.name?.split(" ")[0] || "",
                    lastName: user?.name?.split(" ")[1] || "",
                    address: user?.address || "",
                    mobile: user?.mobile || "",
                    email: user?.email || "",
                };
                setFormData(newFormData);
                setOriginalData(newFormData); // Store the original data for canceling
            }
        }, [user]);

        const handleEditClick = () => {
            setIsEditing(!isEditing);
        };

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };

        const handleSave = async () => {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to update the user details?',
                showCancelButton: true,
                confirmButtonColor: '#198754',
                cancelButtonColor: '#343A40',
                confirmButtonText: 'Yes, update it!',
                cancelButtonText: 'No, cancel',
                reverseButtons: true,
                customClass:{
                    popup: 'small-swal'
                }
            });

            if (result.isConfirmed) {
                try {
                    await updateUser(user._id, formData); // Call the API to update user data
                    setIsEditing(false); // Exit edit mode
                    Swal.fire('Updated!', 'User details have been updated.', 'success');
                } catch (error) {
                    console.error("Error updating user", error);
                    Swal.fire('Error!', 'There was a problem updating the user.', 'error');
                }
            }
        };

        const handleCancel = () => {
            setFormData(originalData); // Reset to original data
            setIsEditing(false); // Exit edit mode
        };

        return (
            <div className="col-md-12 profile-main">
                <div className="row profile-overview mb-4">
                    <div className="profile-container">
                        <div className="d-flex justify-content-center heading pt-2">
                            <h3>My Profile</h3>
                            <i
                                className="fas fa-edit py-2 px-4"
                                style={{ cursor: "pointer" }}
                                onClick={handleEditClick}
                            ></i>
                        </div>

                        <div className="details">
                            <form>
                                <div className="form-group mb-3">
                                    <label><strong>First Name:</strong></label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="form-control"
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label><strong>Last Name:</strong></label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="form-control"
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label><strong>Address:</strong></label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="form-control"
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label><strong>Mobile:</strong></label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="form-control"
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label><strong>Email:</strong></label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        disabled={!isEditing}
                                    />
                                </div>

                                {isEditing && (
                                    <div className="form-group">
                                        
                                        <button
                                            type="button"
                                            className="btn btn-secondary me-3"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-success "
                                            onClick={handleSave}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </form>
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
                                                    <Link to={`/product/${item.product._id}`} className="text-decoration-none text-black">
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
                                                    </Link>
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
        Swal.fire({
            title: 'Are You Sure?',
            text: "You Want to Logout",

            showCancelButton: true,
            cancelButtonColor: '#353535',
            confirmButtonColor: '#e65e5e',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'LogOut',
            reverseButtons: true,
            customClass: {
                popup: 'small-swal' // Apply custom class
            }
        }).then((result) => {
            if (result.isConfirmed) {
                clearToken();
                window.history.replaceState(null, null, '/');
                window.location.href = '/';
            }
        });

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
                            <Link to="overview ">
                                <li className="list-group-item ">

                                    <i className="fa-solid fa-id-badge pe-2"></i>My Profile
                                </li>
                            </Link>
                            <Link to="orders">
                                <li className="list-group-item">

                                    <i className="fa-solid fa-people-carry-box pe-2"></i>My Orders
                                </li>
                            </Link>
                            <Link to="/wishlist">
                                <li className="list-group-item">

                                    <i className="fa-solid fa-hand-holding-heart pe-2"></i>
                                    My Wishlist
                                </li>
                            </Link>
                            <li className="list-group-item logout" onClick={handleLogout}>
                                <i className="fa-solid fa-power-off pe-2"></i>Logout
                            </li>

                        </ul>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="col-md-9 profile-main">
                    <Routes>
                        <Route path="/" element={<ProfileOverview user={user} />} />
                        <Route path="overview" element={<ProfileOverview user={user} />} />
                        <Route path="orders" element={<Orders orders={orders} />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                    </Routes>
                </div>
            </div>

            {/* Newsletter */}
            <div className="row newsletter">
                <Newsletter />
            </div>

            {/* Footer */}
            <div className="row footer">
                <Footer />
            </div>
        </div>
    );
};

export default Profile;
