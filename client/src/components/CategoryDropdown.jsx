import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../api/api';

const CategoryDropdown = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // Initialize categories as an empty array

  useEffect(() => {
      const fetchCategories = async () => {
          const fetchedCategories = await getCategories();
          setCategories(fetchedCategories); // Set the fetched categories to state
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
