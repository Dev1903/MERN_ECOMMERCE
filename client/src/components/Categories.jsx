import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import category from '../js/category';

const Categories = () => {
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();

    const handleClick = (title) => {
        navigate(`/products?category=${title}`);
    };

    return (
        <div className="col">
            <div className="container">
                <div className="row d-flex justify-content-between align-items-center mb-3">
                    <div className="col-4 d-flex align-items-center">
                        <h4 className="m-0 p-0">Our Top Categories</h4>
                    </div>
                    {!showAll && (
                        <div className="col-3 text-center d-flex align-items-center showall">
                            <button className="btn btn-outline-dark" onClick={() => setShowAll(true)}>
                                View All
                            </button>
                        </div>
                    )}
                    {showAll && (
                        <div className="col-3 text-center showall">
                            <button className="btn btn-outline-info" onClick={() => setShowAll(false)}>
                                Show Less
                            </button>
                        </div>
                    )}
                </div>
                <div className={`categories-container ${showAll ? 'expanded' : ''}`}>
                    {category.map((item) => (
                        <div key={item.id} className="category-item" onClick={() => handleClick(item.title)} style={{ cursor: 'pointer' }}>
                            <div className="image">
                                <img src={item.logo} alt={item.title} className="img-fluid" />
                            </div>
                            <p className="desc">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Categories;
