import React, { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '../service/api'; // Import the API call to get products
import '../css/productlist.css'; // Import the CSS file

const ProductList = ({ category, heading, filterByPopular = false }) => {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
  const [addedProductId, setAddedProductId] = useState(null); // New state to track the added product

  // Fetch products from MongoDB using API
  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
    };
    fetchProducts();
  }, []);

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

    // Set the addedProductId to show "Added" and reset after 1 second
    setAddedProductId(product._id);
    setTimeout(() => setAddedProductId(null), 800); // Reset after 1 second
  
  setTimeout(() => window.location.reload(), 1000); // Reset after 1 second
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

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const scrollLeft = () => {
    const cardWidth = scrollRef.current.querySelector('.product-card').offsetWidth + 16;
    scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const cardWidth = scrollRef.current.querySelector('.product-card').offsetWidth + 16;
    scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  // Filter products based on category or search
  const filteredProducts = filterByPopular
    ? products.filter(product => product.popular)
    : products.filter(product =>
        product.category.name === category ||
        product.name.toLowerCase().includes(category.toLowerCase())
      );

  return (
    <div className="col product-list-container">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>{heading}</h4>
          <div>
            <button className="btn btn-light mx-2" onClick={scrollLeft}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="btn btn-light" onClick={scrollRight}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="product-list-scroller" ref={scrollRef}>
          {filteredProducts.map(product => (
            <div className="me-3" key={product._id}> {/* Use _id for MongoDB IDs */}
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
      </div>
    </div>
  );
};

export default ProductList;
