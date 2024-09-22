import React, { useEffect, useState } from 'react';
import { getUserProfile, getUserOrders } from '../api/api'; // Create these API calls

const Profile = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            const profileData = await getUserProfile(); // API call to get user profile
            setUser(profileData);
        };

        const fetchOrders = async () => {
            const orderData = await getUserOrders(); // API call to get user orders
            setOrders(orderData);
        };

        fetchProfile();
        fetchOrders();
    }, []);

    if (!user) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>Name: {user.name}</p>
            <p>Address: {user.address}</p>
            <h3>Your Orders</h3>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>Order ID: {order._id}, Total: {order.totalAmount}</li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
