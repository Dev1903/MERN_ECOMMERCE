import React, { useState } from 'react';
import products from '../../js/products';

const ProductList = () => {
    const [viewAll, setViewAll] = useState(false);

    const handleViewAllClick = () => {
        setViewAll(!viewAll);
    };

    return (
        <div className="product-list main">
            <div className="product-body">
                <div className="report-header">
                    <h1>Products</h1>
                    <button className="btn btn-outline-primary" onClick={handleViewAllClick}>
                        {viewAll ? 'View Less' : 'View All'}
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Product Brand</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Original Price</th>
                            <th>Discount Price</th>
                            <th>Items Sold</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.slice(0, viewAll ? products.length : 6).map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td style={{ minWidth: "100px", display: 'flex', justifyContent: 'center' }}>
                                    <img src={`../${product.image}`} alt="Image" style={{ height: '50px', width: 'auto' }} />
                                </td>
                                <td>{product.originalPrice}</td>
                                <td>{product.price}</td> {/* Assuming this should be discountPrice */}
                                <td>{product.sold}</td>
                                <td>{product.popular ? 'Popular' : ''}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
