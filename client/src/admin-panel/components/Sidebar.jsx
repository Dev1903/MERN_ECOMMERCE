import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/sidebar.css'; // Ensure you have a CSS file to include styling

const Sidebar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true); // State to manage sidebar visibility

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className={`sidebar-admin ${sidebarOpen ? 'open' : 'closed'}`}>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                <i className={`fas ${sidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
            </button>
            <h2>Admin Panel</h2>
            <ul>
                <li><Link to="/admin/categories">Categories</Link></li>
                <li><Link to="/admin/products">Products</Link></li>
                <li><Link to="/admin/orders">Orders</Link></li>

                {/* Dropdown */}
                <li onClick={toggleDropdown} style={{ cursor: 'pointer', fontSize: '18px' }}>
                    Upload
                    <span style={{ marginLeft: '5px' }}>
                        <i className={`fas ${dropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i> {/* FontAwesome icon */}
                    </span>
                    <ul className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
                        <li><Link to="/admin/categoryUpload">Category</Link></li>
                        <li><Link to="/admin/productUpload">Product</Link></li>
                    </ul>
                </li>

                <li><Link to="/admin/email">Email</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
