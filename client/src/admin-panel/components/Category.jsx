import React, { useState, useEffect, useRef } from 'react';
import { getCategories, deleteCategory, updateCategory } from '../../service/api';

const Category = () => {
    const [firstClick, setFirstClick] = useState(true); // Flag for first click
    const editFormRef = useRef(null); // Create a ref for the edit form div
    const [categories, setCategories] = useState([]);
    const [viewAll, setViewAll] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    const handleViewAllClick = () => {
        setViewAll(!viewAll);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this category?');
        if (confirmDelete) {
            await deleteCategory(id);
            setCategories(categories.filter(category => category._id !== id));
        }
    };

    const handleEditClick = (category) => {
        setEditMode(true);
        setCurrentCategory(category);
        setCategoryName(category.name);
        setCategoryImage(null);

        // Scroll the edit form into view only on the first click
        if (firstClick && editFormRef.current) {
            editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setFirstClick(false); // Set flag to false after the first click
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', categoryName);
        if (categoryImage) {
            formData.append('image', categoryImage);
        }

        try {
            await updateCategory(currentCategory._id, formData);
            alert('Category updated successfully');
            setEditMode(false);
            setCurrentCategory(null);
            setCategoryName('');
            setCategoryImage(null);
            const updatedCategories = await getCategories();
            setCategories(updatedCategories);
        } catch (error) {
            console.error('Error updating category', error);
            alert('Error updating category');
        }
    };

    return (
        <div className="main">
            <div className="report-container">
                <div className="report-header">
                    <h1>Categories</h1>
                    <button className='btn btn-outline-primary' onClick={handleViewAllClick}>
                        {viewAll ? 'View Less' : 'View All'}
                    </button>
                </div>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Sno.</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.slice(0, viewAll ? categories.length : 3).map((elem, index) => (
                                <tr key={elem._id}>
                                    <td>{index + 1}</td>
                                    <td>{elem.name}</td>
                                    <td className='d-flex justify-content-center align-items-center'>
                                        <img src={`http://localhost:8000/images/category-logo/${elem.image}`} alt="logo" style={{ width: '50px', height: 'auto' }} />
                                    </td>
                                    <td className='text-center'>
                                        <button className="btn btn-success" onClick={() => handleEditClick(elem)}>Edit</button>
                                        &nbsp;&nbsp;
                                        <button className="btn btn-danger" onClick={() => handleDelete(elem._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {/* Edit form section */}
            {editMode && (
                <div className="edit-form mt-5" ref={editFormRef}> {/* Attach ref here */}
                    <h2>Edit Category</h2>
                    <form onSubmit={handleUpdateCategory}>
                        <div className="form-group pt-3">
                            <label>Category Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group pt-3">
                            <label>Category Image</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setCategoryImage(e.target.files[0])}
                            />
                        </div>

                        <div className="buttons pt-3">
                            <button type="submit" className="btn btn-primary me-3">Update Category</button>
                            <button type="button" className="btn btn-danger" onClick={() => setEditMode(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Category;
