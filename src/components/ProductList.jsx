// ProductList.jsx
import React, { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import productsData from '../js/products';

const ProductList = ({ category, heading, filterByPopular = false }) => {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState(productsData);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);

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

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const scrollLeft = () => {
    const cardWidth = scrollRef.current.querySelector('.card').offsetWidth + 16;
    scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const cardWidth = scrollRef.current.querySelector('.card').offsetWidth + 16;
    scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  const filteredProducts = filterByPopular
    ? products.filter(product => product.popular)
    : products.filter(product =>
        product.category === category ||
        product.name.toLowerCase().includes(category.toLowerCase())
      );

  return (
    <div className="col">
      <div className="container my-5">
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
        <div className="d-flex overflow-hidden position-relative">
          <div className="d-flex overflow-auto" ref={scrollRef} style={{ scrollSnapType: 'x mandatory' }}>
            {filteredProducts.map(product => (
              <div className="me-3" key={product.id}>
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
        </div>
      </div>
    </div>
  );
};

export default ProductList;
