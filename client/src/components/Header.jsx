import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryDropdown from './CategoryDropdown'; // Adjust the path as necessary

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="container">
      <header>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light">
            {/* Navbar Toggler for Mobile */}
            <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Categories Dropdown */}
            <CategoryDropdown />

            {/* Navbar links */}
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => navigate('/')}>Home</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => navigate('/today-deals')}>Today's Deals</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => navigate('/customer-services')}>Customer Services</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => navigate('/trending-products')}>Trending Products</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => navigate('/blog')}>Blog</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => navigate('/special-offers')}>Special Offers</button>
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
            <button className="nav-link btn" onClick={() => navigate('/')}>Home</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn" onClick={() => navigate('/today-deals')}>Today's Deals</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn" onClick={() => navigate('/customer-services')}>Customer Services</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn" onClick={() => navigate('/trending-products')}>Trending Products</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn" onClick={() => navigate('/blog')}>Blog</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn" onClick={() => navigate('/special-offers')}>Special Offers</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
