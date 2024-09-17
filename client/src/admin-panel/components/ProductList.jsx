import React, { useState, useEffect } from 'react';
import { getProducts } from '../../service/api.js'; // Importing the API function from your api.js
import '../css/productList.css'; // Ensure to import the CSS file

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [viewAll, setViewAll] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productList = await getProducts(); // Fetch products using the API
                setProducts(productList);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array ensures the fetch runs once when the component mounts

    const handleViewAllClick = () => {
        setViewAll(!viewAll);
    };

    return (
        <div className="report-container mt-5 pt-4">
            <div className="product-body">
                <div className='d-flex align-items-center'>
                    <span className='h1 me-3'>Products</span>
                    <button className="btn btn-outline-primary" onClick={handleViewAllClick}>
                        {viewAll ? 'View Less' : 'View All'}
                    </button>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>ID</th>
                                <th>Product Name</th>
                                <th>Product Brand</th>
                                <th>Category</th>
                                <th>Image</th>
                                <th>Rating</th>
                                <th>Original Price</th>
                                <th>Discount Price</th>
                                <th>Items Sold</th>
                                <th>Stock Quantity</th>
                                <th>SKU</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.slice(0, viewAll ? products.length : 6).map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.category.name}</td> 
                                    <td style={{ minWidth: "100px", display: 'flex', justifyContent: 'center' }}>
                                        <img src={`http://localhost:8000/images/product-images/${product.image}`} alt={product.name} style={{ height: '60px', width: 'auto' }} />
                                    </td>
                                    <td className='text-warning'>{`★${product.rating}`}</td>
                                    <td>{`₹${product.price}`}</td>
                                    <td>{product.discountPrice === 'null' ? product.price : product.discountPrice}</td> 
                                    <td>{product.sold}</td>
                                    <td>{product.stockQuantity === 'null' ? 0 : product.stockQuantity}</td>
                                    <td>{product.sku === 'null' ? 0 : product.sku}</td>
                                    <td className='description-cell'>{product.description}</td>
                                    <td>{product.popular ? 'Popular' : ''}</td> {/* Check if product is marked as popular */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
