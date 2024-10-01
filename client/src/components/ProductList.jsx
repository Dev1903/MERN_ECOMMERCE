import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getProducts, updateWishlist, fetchWishlist } from '../api/api'; // Import fetchWishlist to get user's wishlist
import { useCart } from '../context/CartContext'; 
import Swal from 'sweetalert2';
import { getUserId } from '../context/authUtils.js'; 

const ProductList = ({ category, heading }) => {
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const { updateCart } = useCart(); 
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]); // Initialize wishlist state
    const [addedProductId, setAddedProductId] = useState(null); 
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const storedUserId = getUserId(); 
        if (storedUserId) {
            setUser(storedUserId);
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const productList = await getProducts();
            setProducts(productList);
            if (user) {
                const userWishlist = await fetchWishlist(user); // Fetch user's wishlist from the database
                setWishlist(Array.isArray(userWishlist.items) ? userWishlist.items : []); // Ensure wishlist is an array of items
            }
        };
        fetchProducts();
    }, [user]);

    const filteredProducts = products.filter(product => {
        const matchesCategory = category ? product.category.name === category : true;
        
        return matchesCategory ;
    });

    const handleAddToCart = (product) => {
        if (!user) {
            Swal.fire({
                title: 'User Not Signed In',
                text: "Please Sign In",
                icon: 'warning'
            }).then(() => {
                navigate('/signUp'); 
            });
            return;
        }
        updateCart(product); 
        setAddedProductId(product._id); 
        setTimeout(() => setAddedProductId(null), 800); 
    };

    const handleWishlist = async (product) => {
        if (!user) {
            Swal.fire({
                title: 'User Not Signed In',
                text: "Please Sign In",
                icon: 'warning'
            }).then(() => {
                navigate('/signUp'); 
            });
            return;
        }

        setWishlist(prevWishlist => {
            const isInWishlist = prevWishlist.some(item => item.productId === product._id);
            const updatedWishlist = isInWishlist
                ? prevWishlist.filter(item => item.productId !== product._id)
                : [...prevWishlist, { productId: product._id, name: product.name, brand: product.brand }];

            // Update the wishlist in the database
            const updateWishlistInDatabase = async () => {
                try {
                    await updateWishlist(user, updatedWishlist); 
                } catch (error) {
                    console.error("Error updating wishlist:", error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Unable to update wishlist. Please try again later.',
                        icon: 'error'
                    });
                }
            };

            updateWishlistInDatabase(); 
            return updatedWishlist; 
        });
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -300,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 300,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="col product-list-container">
            <div className="container">
                <h4>{heading}</h4>
                <hr className="mb-4 mt-0" style={{ width: '40vw', border: '1px solid black' }} />
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
                                    isInWishlist={wishlist.some(item => item.productId === product._id)} // Ensure wishlist check is correct
                                    isAddedToCart={user && addedProductId === product._id} 
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
