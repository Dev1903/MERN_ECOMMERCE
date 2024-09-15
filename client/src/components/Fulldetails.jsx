import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../js/products';

const Fulldetails = () => {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return <h2>Product not found</h2>;
    }

    // Log the image URL to check if it's correct
    console.log(product.image);

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-6">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid"
                        onError={(e) => {
                            e.target.src = '/path/to/placeholder/image.jpg'; // Fallback image
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <h3>{product.name}</h3>
                    <p><strong>Brand:</strong> {product.brand}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Rating:</strong> {product.rating}</p>
                    <p><strong>Sold:</strong> {product.sold} units</p>
                    <p><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
                    <p><strong>Original Price:</strong> ₹{product.originalPrice.toFixed(2)}</p>
                    <p><strong>Popular:</strong> {product.popular ? 'Yes' : 'No'}</p>
                </div>
            </div>
        </div>
    );
};

export default Fulldetails;
