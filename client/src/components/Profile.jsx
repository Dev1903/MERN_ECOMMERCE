import React, { useEffect, useState } from 'react';
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
                console.log(userOrders)
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
