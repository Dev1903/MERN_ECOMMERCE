import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch categories from the backend API
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/categories'); // API call to your backend
                setCategories(response.data); // Assuming response contains category data
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

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
                    {categories.map((item) => (
                        <div key={item._id} className="category-item" onClick={() => handleClick(item.name)} style={{ cursor: 'pointer' }}>
                            <div className="image">
                                {/* Use the category image from the uploads folder */}
                                <img src={`http://localhost:8000/images/category-logo/${item.image}`} alt={item.name} className="img-fluid" />
                            </div>
                            <p className="desc">{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
