import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../service/api';

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
        const categoryList = await getCategories();
        setCategories(categoryList);
    };
    fetchCategories();
}, []);

  const uniqueCategories = Array.from(new Set(categories.map(item => item.name)));

  const handleCategorySelect = (selectedCategory) => {
    navigate(`/products?category=${selectedCategory}`);
  };

  return (
    <div className="dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#temp"
        id="categoriesDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="fa-regular fa-rectangle-list"></i> CATEGORIES
      </a>
      <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
        {uniqueCategories.map((title, index) => (
          <li key={index}>
            <button
              className="dropdown-item"
              onClick={() => handleCategorySelect(title)}
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDropdown;
