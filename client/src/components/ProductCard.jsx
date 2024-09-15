// ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, quantity, handleAddToCart, handleWishlist, isInWishlist }) => (
  <div className="card d-flex flex-column" style={{ width: '280px', height: '480px' }}>
    <Link to={`/product/${product.id}`} className="text-decoration-none text-black">
      <img src={product.image} className="card-img-top" alt={product.name} style={{ objectFit: 'cover', height: '280px' }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{product.name}</h5>
        <p className="card-text text-truncate">{product.brand}</p>
        <div className="d-flex justify-content-between mt-auto" style={{ fontSize: '16px' }}>
          <div>
            <span className="text-warning pe-5 me-4n">★ {product.rating}</span>
          </div>
          <div className="d-flex justify-content-end">
            <span className="text-muted"><s>${product.originalPrice}</s></span>
            <span className="fw-bold ps-2"> ${product.price}</span>
          </div>
        </div>
      </div>
    </Link>
    <div className="mt-2 d-flex justify-content-between align-items-center p-2">
      <button className={`btn ${isInWishlist ? 'btn-danger' : 'btn-outline-secondary'}`} onClick={() => handleWishlist(product)}>
        <i className="fa-solid fa-heart"></i>
      </button>
      <button className="btn btn-dark btn-lg" onClick={() => handleAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  </div>
);

export default ProductCard;
