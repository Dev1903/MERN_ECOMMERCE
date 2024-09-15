import React from 'react';
import { Routes, Route } from "react-router-dom";
import Category from "../admin-panel/components/Category";
import OrderList from '../admin-panel/components/OrderList';
import Sidebar from '../admin-panel/components/Sidebar';
import CategoryForm from '../admin-panel/components/CategoryUpload';
import ProductForm from '../admin-panel/components/ProductUpload';
import ProductList from '../admin-panel/components/ProductList';

const AdminPage = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar />
                </div>
                <div className="col-md-10">
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
        </div>
    );
};

export default AdminPage;
