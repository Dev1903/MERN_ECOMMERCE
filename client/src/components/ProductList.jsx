import React, { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '../api/api';
import { useCart } from '../context/CartContext'; // Import the CartContext

const ProductList = ({ category, heading, filterByPopular }) => {
    const scrollRef = useRef(null);
    const { updateCart } = useCart(); // Access updateCart from CartContext
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
    const [addedProductId, setAddedProductId] = useState(null); // Track added product ID
    const [token, setToken] = useState(null); // Token state


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken); // Check token once
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const productList = await getProducts();
            setProducts(productList);
        };
        fetchProducts();
    }, []);

    // Filter products based on the category and the popular prop
    const filteredProducts = products.filter(product => {
        const matchesCategory = category ? product.category.name === category : true;
        const matchesPopularity = filterByPopular ? product.popular === true : true;
        return matchesCategory && matchesPopularity;
    });

    const handleAddToCart = (product) => {
        if (!token) {
            alert('Please login first');
            return;
        }
        updateCart(product); // Use the context to update the cart
        setAddedProductId(product._id); // Set the added product ID
        setTimeout(() => setAddedProductId(null), 800); // Reset after 800ms
    };

    const handleWishlist = (product) => {
        if (!token) {
            alert('Please login first');
            return;
        }
        setWishlist(prevWishlist => {
            const isInWishlist = prevWishlist.some(item => item._id === product._id);
            const updatedWishlist = isInWishlist 
                ? prevWishlist.filter(item => item._id !== product._id) 
                : [...prevWishlist, product];
            
            // Update local storage
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            
            return updatedWishlist;
        });
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -300, // Adjust this value based on your design
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 300, // Adjust this value based on your design
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="col product-list-container">
            <div className="container">
                <h4>{heading}</h4><hr className="mb-4 mt-0" style={{width: '40vw', border: '1px solid black'}}/>
                <div className="d-flex align-items-center">
                    <button className="btn btn-secondary me-2" onClick={scrollLeft}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <div className="product-list-scroller" ref={scrollRef} style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                        {filteredProducts.map(product => (
                            <div key={product._id} className="me-3" style={{ display: 'inline-block' }}>
                                <ProductCard
                                    product={product}
                                    handleAddToCart={() => handleAddToCart(product)}
                                    handleWishlist={() => handleWishlist(product)}
                                    isInWishlist={wishlist.some(item => item._id === product._id)}
                                    isAddedToCart={token && addedProductId === product._id} // Pass the added state
                                />
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-secondary ms-2" onClick={scrollRight}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
