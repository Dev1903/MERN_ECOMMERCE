import React from 'react';
import { useLocation } from 'react-router-dom';
import products from '../js/products';

const Products = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('search') || '';
    const category = queryParams.get('category') || '';

    // Check if the category is valid
    const validCategories = Array.from(new Set(products.map(product => product.category.toLowerCase())));
    const isCategoryValid = !category || validCategories.includes(category.toLowerCase());

    // Filter products
    const filteredProducts = products.filter((product) => {
        const matchesCategory = !category || product.category.toLowerCase().includes(category.toLowerCase());
        const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container mt-4">
            <div className="row">
                {filteredProducts.length > 0 && isCategoryValid ? (
                    filteredProducts.map((product) => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <div className="card">
                                <img src={product.image} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">Brand: {product.brand}</p>
                                    <p className="card-text">Price: ₹{product.price.toFixed(2)}</p>
                                    <p className="card-text">Rating: {product.rating}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found for the given criteria.</p>
                )}
            </div>
        </div>
    );
};

export default Products;
