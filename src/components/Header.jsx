import React, { useState, useEffect } from 'react';
import { category } from './Categories';

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Automatically close sidebar when resizing to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992 && showSidebar) {
        setShowSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [showSidebar]);

  // Filter unique categories
  const uniqueCategories = Array.from(new Set(category.map(item => item.title)));

  return (

    <div className="container">
      <header>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light">
            {/* Navbar Toggler for Mobile */}
            <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Categories Dropdown with FontAwesome icon */}
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
                    <a className="dropdown-item" href="#temp">{title}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navbar links */}
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#temp">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#temp">Today's Deals</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#temp">Customer Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#temp">Trending Products</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#temp">Blog</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#temp">Special Offers</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* Sidebar for Mobile View */}
      <div className={`sidebar ${showSidebar ? 'active' : ''}`}>
        <button className="btn-close" onClick={toggleSidebar}></button>
        <ul className="navbar-nav flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#temp">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#temp">Today's Deals</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#temp">Customer Services</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#temp">Trending Products</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#temp">Blog</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#temp">Special Offers</a>
          </li>
        </ul>
      </div>
    </div>

  );
};

export default Header;
