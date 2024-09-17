import React, { useState, useEffect } from 'react';
import { getCategories, deleteCategory, updateCategory } from '../../service/api'; // Ensure updateCategory is imported

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [viewAll, setViewAll] = useState(false);
    const [editMode, setEditMode] = useState(false); // For edit mode
    const [currentCategory, setCurrentCategory] = useState(null); // Current category for editing
    const [categoryName, setCategoryName] = useState(''); // For category name input
    const [categoryImage, setCategoryImage] = useState(null); // For image input

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
        setCurrentCategory(category); // Set current category for editing
        setCategoryName(category.name); // Pre-fill name
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', categoryName); // Append the new/updated category name
        if (categoryImage) {
            formData.append('image', categoryImage); // Append the new image if uploaded
        }

        try {
            await updateCategory(currentCategory._id, formData); // Send update request
            alert('Category updated successfully');
            setEditMode(false); // Close edit mode
            setCurrentCategory(null); // Clear current category
            setCategoryName(''); // Clear input fields
            setCategoryImage(null); // Clear image field
            const updatedCategories = await getCategories();
            setCategories(updatedCategories);//refresh the categories list to reflect the updated category
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

                {/* Edit form section */}
                {editMode && (
                    <div className="edit-form">
                        <h2>Edit Category</h2>
                        <form onSubmit={handleUpdateCategory}>
                            <div className="form-group">
                                <label>Category Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) => setCategoryImage(e.target.files[0])}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Update Category</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Category;
