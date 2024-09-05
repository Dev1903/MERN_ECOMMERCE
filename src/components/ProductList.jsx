import React, { useRef } from 'react';
import products from '../js/products';

const ProductCard = ({ product, quantity, handleAdd, handleRemove }) => (
  <div className="card" style={{ minWidth: '245px' }}>
    <img src={product.image} className="card-img-top" alt={product.name} />
    <div className="card-body">
      <h5 className="card-title">{product.name}</h5>
      <p className="card-text">{product.brand}</p>
      <div className="d-flex justify-content-between flex-column">
        <div>
          <span className="text-warning pe-5 me-4n">★ {product.rating}</span>
          <span className="text-success"> {product.sold} Sold</span>
        </div>
        <div className="d-flex justify-content-end">
          <span className="text-muted"><s>${product.originalPrice}</s></span>
          <span className="fw-bold ps-2"> ${product.price}</span>
        </div>
      </div>
      <div className="mt-2 d-flex justify-content-between align-items-center">
        <button className="btn btn-outline-secondary"><i className="fa-solid fa-heart"></i></button>
        {quantity === 0 ? (
          <button className="btn btn-dark" onClick={handleAdd}>
            <i className="fa-solid fa-plus"></i>
          </button>
        ) : (
          <div className="d-flex align-items-center">
            <button className="btn btn-dark" onClick={handleRemove}>
              <i className="fa-solid fa-minus"></i>
            </button>
            <span className="mx-2">{quantity}</span>
            <button className="btn btn-dark" onClick={handleAdd}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

const ProductList = ({ category, heading, filterByPopular = false }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    const cardWidth = scrollRef.current.querySelector('.card').offsetWidth + 16; // Add 16 for margin-right
    scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const cardWidth = scrollRef.current.querySelector('.card').offsetWidth + 16; // Add 16 for margin-right
    scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  // Filter the products based on the passed category
  const filteredProducts = filterByPopular
    ? products.filter(product => product.popular)
    : products.filter(product => product.category === category);

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
                  quantity={product.quantity || 0}
                  handleAdd={() => product.handleAdd(product.id)}
                  handleRemove={() => product.handleRemove(product.id)}
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
