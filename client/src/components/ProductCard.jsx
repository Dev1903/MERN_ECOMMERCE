// ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/productcard.css'; // Import the CSS file

const ProductCard = ({ product, quantity, handleAddToCart, handleWishlist, isInWishlist, isAddedToCart }) => (
  <div className="card d-flex flex-column product-card">
    <Link to={`/product/${product.id}`} className="text-decoration-none text-black">
      <img 
        src={product.image} 
        className="card-img-top" 
        alt={product.name} 
        style={{ objectFit: 'contain' }} 
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{product.name}</h5>
        <p className="card-text text-truncate">{product.brand}</p>
        <div className="d-flex justify-content-between mt-auto" style={{ fontSize: '16px' }}>
          <div>
            <span className="text-warning pe-5 me-4">★ {product.rating}</span>
          </div>
          <div className="d-flex justify-content-end">
            <span className="text-danger"><s>${product.price}</s></span>
            <span className="fw-bold ps-2 text-success"> ${product.originalPrice}</span>
          </div>
        </div>
      </div>
    </Link>
    <div className="mt-2 d-flex justify-content-between align-items-center p-2">
      <button 
        className={`btn ${isInWishlist ? 'btn-danger' : 'btn-outline-secondary'}`} 
        onClick={() => handleWishlist(product)}
      >
        <i className="fa-solid fa-heart"></i>
      </button>
      <button 
        className={`btn btn-lg ${isAddedToCart ? 'btn-success' : 'btn-dark'} add-to-cart-btn`} 
        onClick={() => handleAddToCart(product)}
      >
        {isAddedToCart ? 'Added' : 'Add to Cart'}
      </button>
    </div>
  </div>
);

export default ProductCard;
