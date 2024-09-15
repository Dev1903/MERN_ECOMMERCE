import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import products from '../js/products';
import Header from './Header';
import Searchbar from './Searchbar';
import { Footer, Newsletter } from './Footer';
import ProductCard from './ProductCard';

const Products = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('search') || '';
    const category = queryParams.get('category') || '';

    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);

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

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const handleWishlist = (product) => {
        setWishlist(prevWishlist => {
            const isInWishlist = prevWishlist.some(item => item.id === product.id);
            if (isInWishlist) {
                return prevWishlist.filter(item => item.id !== product.id);
            } else {
                return [...prevWishlist, product];
            }
        });
    };

    return (
        <div className="container-fluid">
            <div className="row searchbar mb-2">
                <Searchbar />
            </div>
            <div className="row header mb-2">
                <Header />
            </div>
            <div className="row product-display mb-2">
                <div className="col-12">
                    <div className="container mt-4">
                        <div className="row justify-content-center">
                            {filteredProducts.length > 0 && isCategoryValid ? (
                                <div className="d-flex flex-wrap justify-content-center">
                                    {filteredProducts.map((product) => (
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4" key={product.id}>
                                            <ProductCard
                                                product={product}
                                                quantity={(cart.find(item => item.id === product.id) || {}).quantity || 0}
                                                handleAddToCart={() => handleAddToCart(product)}
                                                handleWishlist={() => handleWishlist(product)}
                                                isInWishlist={wishlist.some(item => item.id === product.id)}
                                            />
                                        </div>
                                    ))}
                                </div>
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
