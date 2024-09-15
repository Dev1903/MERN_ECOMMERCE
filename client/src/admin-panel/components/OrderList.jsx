import React, { useState } from 'react';

const OrderList = () => {
    const [viewAll, setViewAll] = useState(false);

    const orders = [
        { id: 1, customer: "John Doe", total: "$50" },
        { id: 2, customer: "Jane Smith", total: "$70" },
        { id: 3, customer: "Sam Wilson", total: "$40" },
        { id: 4, customer: "Anna Brown", total: "$90" },
        { id: 5, customer: "Mike Davis", total: "$60" },
        { id: 6, customer: "Emily Johnson", total: "$30" },
        { id: 7, customer: "Chris Lee", total: "$80" },
        { id: 8, customer: "Patricia Martinez", total: "$20" },
        { id: 9, customer: "James White", total: "$75" },
        { id: 10, customer: "Linda Taylor", total: "$65" },
    ];

    const handleViewAllClick = () => {
        setViewAll(!viewAll);
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
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.slice(0, viewAll ? orders.length : 3).map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
