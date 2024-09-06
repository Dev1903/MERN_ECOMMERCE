import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const category = [
    { id: 1, title: "Electronics", logo: "images/category-logo/electronics.png" },
    { id: 2, title: "Fashion", logo: "images/category-logo/fashion.png" },
    { id: 3, title: "Makeup", logo: "images/category-logo/beautypersonalcare.png" },
    { id: 4, title: "Books", logo: "images/category-logo/books.png" },
    { id: 5, title: "Furniture", logo: "images/category-logo/homeandkitchen.png" },
    { id: 6, title: "Medicines", logo: "images/category-logo/healthandwellness.png" },
    { id: 1, title: "Electronics", logo: "images/category-logo/electronics.png" },
    { id: 2, title: "Fashion", logo: "images/category-logo/fashion.png" },
    { id: 3, title: "Makeup", logo: "images/category-logo/beautypersonalcare.png" },
    { id: 4, title: "Books", logo: "images/category-logo/books.png" },
    { id: 5, title: "Furniture", logo: "images/category-logo/homeandkitchen.png" },
    { id: 6, title: "Medicines", logo: "images/category-logo/healthandwellness.png" }
];

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

export { Categories, category };
