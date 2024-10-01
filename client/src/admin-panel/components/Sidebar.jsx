import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    const sidebarClosed = () => {
        setSidebarOpen(false);
    };

    return (
        <div className={`sidebar-admin ${sidebarOpen ? 'open' : 'closed'}`}>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                <i className={`fas ${sidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
            </button>
            <h2>Admin Panel</h2>
            <ul>
                <li><Link to={`/${process.env.REACT_APP_ADMIN_ENTRY_URL}/categories`} onClick={sidebarClosed}>Categories</Link></li>
                <li><Link to={`/${process.env.REACT_APP_ADMIN_ENTRY_URL}/products`} onClick={sidebarClosed}>Products</Link></li>
                <li><Link to={`/${process.env.REACT_APP_ADMIN_ENTRY_URL}/orders`} onClick={sidebarClosed}>Orders</Link></li>

                {/* Dropdown */}
                <li onClick={toggleDropdown} style={{ cursor: 'pointer', fontSize: '18px' }}>
                    Upload
                    <span style={{ marginLeft: '5px' }}>
                        <i className={`fas ${dropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i> {/* FontAwesome icon */}
                    </span>
                    <ul className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
                        <li><Link to={`/${process.env.REACT_APP_ADMIN_ENTRY_URL}/categoryUpload`} onClick={sidebarClosed}>Category</Link></li>
                        <li><Link to={`/${process.env.REACT_APP_ADMIN_ENTRY_URL}/productUpload`} onClick={sidebarClosed}>Product</Link></li>
                    </ul>
                </li>

                <li><Link to={`/${process.env.REACT_APP_ADMIN_ENTRY_URL}/email`} onClick={sidebarClosed}>Email</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
