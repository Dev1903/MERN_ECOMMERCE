import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom'; // Import Link
import products from '../js/products';
import Header from './Header';
import Searchbar from './Searchbar';
import { Footer, Newsletter } from './Footer';

const Products = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('search') || '';
    const category = queryParams.get('category') || '';

    const searchWords = searchTerm.split(' ').map(word => word.toLowerCase());

    const matchesSearchTerm = (product) => {
        const productName = product.name.toLowerCase();
        const productBrand = product.brand.toLowerCase();
        const productCategory = product.category.toLowerCase();
        const productPrice = product.price.toString().toLowerCase();

        return searchWords.some(word => 
            productName.includes(word) ||
            productBrand.includes(word) ||
            productCategory.includes(word) ||
            productPrice.includes(word)
        );
    };

    const validCategories = Array.from(new Set(products.map(product => product.category.toLowerCase())));
    const isCategoryValid = !category || validCategories.includes(category.toLowerCase());

    const filteredProducts = products.filter((product) => {
        const matchesCategory = !category || product.category.toLowerCase().includes(category.toLowerCase());
        const matchesSearch = !searchTerm || matchesSearchTerm(product);
        return matchesCategory && matchesSearch;
    });

    useEffect(() => {
        if (!isCategoryValid || filteredProducts.length === 0) {
            navigate('/error', { replace: true });
        }
    }, [isCategoryValid, filteredProducts.length, navigate]);

    return (
        <div className="container-fluid">
            <div className="row searchbar mb-2">
                <Searchbar />
            </div>
            <div className="row header mb-2">
                <Header />
            </div>
            <div className="row product-display mb-2">
                <div className="col">
                    <div className="container mt-4">
                        <div className="row">
                            {filteredProducts.length > 0 && isCategoryValid ? (
                                filteredProducts.map((product) => (
                                    <div className="col-md-4 mb-4" key={product.id}>
                                        <Link to={`/product/${product.id}`} className="card-link">
                                            <div className="card">
                                                <img src={product.image} className="card-img-top" alt={product.name} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{product.name}</h5>
                                                    <p className="card-text">Brand: {product.brand}</p>
                                                    <p className="card-text">Price: ₹{product.price.toFixed(2)}</p>
                                                    <p className="card-text">Rating: {product.rating}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>No products found for the given criteria.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer mb-2">
                <Newsletter />
                <Footer />
            </div>
        </div>
    );
};

export default Products;
