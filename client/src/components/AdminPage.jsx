import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Category from '../admin-panel/components/Category';
import OrderList from '../admin-panel/components/OrderList';
import Sidebar from '../admin-panel/components/Sidebar';
import CategoryForm from '../admin-panel/components/CategoryUpload';
import ProductForm from '../admin-panel/components/ProductUpload';
import ProductList from '../admin-panel/components/ProductList';


const AdminPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className=" justify-content-center ms-5 me-5">
            <Sidebar sidebarOpen={sidebarOpen} />
            <div className={`main-content ${sidebarOpen ? 'shifted' : ''}`}>
                <button className="sidebar-toggle d-md-none" onClick={toggleSidebar}>
                    <i className={`fas ${sidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
                </button>
                <Routes>
                    <Route path="/" element={<Category />} />
                    <Route path="categories" element={<Category />} />
                    <Route path="orders" element={<OrderList />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="categoryUpload" element={<CategoryForm />} />
                    <Route path="productUpload" element={<ProductForm />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminPage;
