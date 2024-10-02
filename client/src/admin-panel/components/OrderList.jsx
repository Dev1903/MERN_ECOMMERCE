import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../../api/api';

const OrderList = () => {
    const [viewAll, setViewAll] = useState(false);
    const [orders, setOrders] = useState([]);
    const [expandedRows, setExpandedRows] = useState({}); // Track expanded state for each row

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await getOrders();
            setOrders(data);
        };
        fetchOrders();
    }, []);

    const handleViewAllClick = () => {
        setViewAll(!viewAll);
    };

    const toggleRowExpansion = (orderId) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId]
        }));
    };

    const calculateTotalQuantity = (products) => {
        return products.reduce((total, item) => total + item.quantity, 0);
    };

    const calculateTotalPrice = (products) => {
        return products.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const handleUpdateOrderStatus = async (id) => {
        const response = await updateOrderStatus(id, 'Delivered'); // Update the order status to 'delivered'
        if (response.status === 200) {
            const updatedOrders = orders.map(order => 
                order._id === id ? { ...order, status: 'Delivered' } : order
            );
            setOrders(updatedOrders); // Update state with the new order status
            alert("Order status successfully updated to Delivered");
        } else {
            alert("Error updating order status");
        }
    };

    return (
        <div className="order-list main">
            <h1>Order List</h1>
            <button className="btn btn-outline-primary" onClick={handleViewAllClick}>
                {viewAll ? 'View Less' : 'View All'}
            </button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Products Ordered</th>
                        <th>Order Amount</th>
                        <th>Order Date & Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.slice(0, viewAll ? orders.length : 3).map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user.name}</td>
                            <td>
                                {/* Display total quantity */}
                                {calculateTotalQuantity(order.products)} items
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => toggleRowExpansion(order._id)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    {expandedRows[order._id] ? 'Hide Details' : 'Show Details'}
                                </button>

                                {/* Show product details if expanded */}
                                {expandedRows[order._id] && (
                                    <div className="product-details" style={{ marginTop: '10px' }}>
                                        <table style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>Product ID</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.products.map(item => (
                                                    <tr key={item.product._id}>
                                                        <td>{item.product._id}</td>
                                                        <td>{item.product.name}</td>
                                                        <td>₹{item.product.price}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>₹{item.product.price * item.quantity}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </td>
                            <td>₹{calculateTotalPrice(order.products)}</td>
                            <td>
                                {(() => {
                                    const dateObj = new Date(order.orderDate);
                                    const formattedDate = dateObj.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    }); // Format: MM/DD/YYYY
                                    const formattedTime = dateObj.toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true, // Set to false for 24-hour format
                                    }); // Format: HH:MM AM/PM
                                    return `${formattedDate} & ${formattedTime}`;
                                })()}
                            </td>
                            <td><div className={`badge text-bg-${order.status === 'Delivered' ? 'success' : 'warning'}`}>{order.status}</div></td>
                            <td>
                                <button
                                    className="btn btn-success" // Changed class to success for delivered status
                                    onClick={() => handleUpdateOrderStatus(order._id)}
                                    disabled={order.status === "Delivered"}
                                >
                                    Set Order as Delivered
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
