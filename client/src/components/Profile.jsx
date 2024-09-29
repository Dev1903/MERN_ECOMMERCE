import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import Header from './Header';
import { Newsletter, Footer } from './Footer';
import { getUser, getUserOrders } from '../api/api'; // Fetch user and orders

const Profile = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser) {
                    const userData = await getUser(storedUser);
                    setUser(userData);

                    // Fetch user orders using the user ID after user data is set
                    fetchUserOrders(userData._id);
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

        fetchUserDetails(); // Call to fetch user details
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid">
            <div className="row searchbar mb-2">
                <Searchbar />
            </div>
            <div className="row header mb-2">
                <Header />
            </div>
            <div className="row mb-2">
                <div className="col">
                    <div className="container">
                        <h2 style={{ fontFamily: 'Bebas Neue, cursive', letterSpacing: '3px', fontSize: 'xx-large' }}>
                            My Profile
                        </h2>
                        <hr style={{ width: '40vw', border: '1px solid black' }} />
                        <p>Name: {user.name}</p>
                        <p>Address: {user.address}</p>
                        <h3>Your Orders</h3>
                        <ul>
                            {orders.map(order => {
                                // Calculate total price for the order
                                const totalPrice = order.products.reduce((total, item) => {
                                    return total + item.product.price * item.quantity;
                                }, 0);

                                return (
                                    <div className="row mt-3" key={order._id}>
                                        {order.products.map(item => (
                                            <div className="row" key={item._id}>
                                                <div className="col-md-6 d-flex flex-row align-items-center mb-1">
                                                    <div>
                                                        <img
                                                            src={`${process.env.REACT_APP_API_URL}/images/product-images/${item.product.image}`}
                                                            alt={item.product.name}
                                                            width="100"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h5 className="ms-4">{item.product.name}</h5>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 d-flex flex-column justify-content-center align-items-end">
                                                    <h3>{item.product.price}</h3>
                                                    <h6>Quantity: {item.quantity}</h6>
                                                </div>
                                                <hr className="mb-4" style={{ width: '20vw', margin: '0 auto' }} />
                                            </div>
                                        ))}
                                        <div className="row h2 totalprice d-flex justify-content-end">
                                            Total Price: {totalPrice}
                                        </div>
                                        <hr />
                                    </div>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row footer mb-2">
                <Newsletter />
                <Footer />
            </div>
        </div>
    );
};

export default Profile;
