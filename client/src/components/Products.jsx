import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProducts } from '../service/api'; // Ensure this function fetches data from MongoDB
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

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
    const [addedProductId, setAddedProductId] = useState(null);

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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productList = await getProducts();
                setProducts(productList);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const validCategories = Array.from(new Set(products.map(product => product.category.name)));
    const isCategoryValid = !category || validCategories.includes(category);

    const filteredProducts = products.filter((product) => {
        const matchesCategory = !category || product.category.name.includes(category);
        const matchesSearch = !searchTerm || matchesSearchTerm(product);
        return matchesCategory && matchesSearch;
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item._id === product._id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });

        setAddedProductId(product._id);
        setTimeout(() => setAddedProductId(null), 800);
        setTimeout(() => window.location.reload(), 1000);
    };

    const handleWishlist = (product) => {
        setWishlist(prevWishlist => {
            const isInWishlist = prevWishlist.some(item => item._id === product._id);
            if (isInWishlist) {
                return prevWishlist.filter(item => item._id !== product._id);
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
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4" key={product._id}>
                                            <ProductCard
                                                product={product}
                                                handleAddToCart={() => handleAddToCart(product)}
                                                handleWishlist={() => handleWishlist(product)}
                                                isInWishlist={wishlist.some(item => item._id === product._id)}
                                                isAddedToCart={addedProductId === product._id}
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
