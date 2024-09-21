import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getCategories, deleteCategory, updateCategory } from '../../api/api';

const Category = () => {
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
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        
        if (result.isConfirmed) {
            await deleteCategory(id);
            setCategories(categories.filter(category => category._id !== id));
            Swal.fire(
                'Deleted!',
                'The category has been deleted.',
                'success'
            );
        }
    };

    const handleEditClick = (category) => {
        setEditMode(true);
        setCurrentCategory(category);
        setCategoryName(category.name);
        setCategoryImage(null);
        // Open modal
        const editModal = new window.bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();
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
            const updatedCategories = await getCategories();
            setCategories(updatedCategories);
            Swal.fire(
                'Updated!',
                'Category updated successfully.',
                'success'
            );
            setEditMode(false);
            setCurrentCategory(null);
            setCategoryName('');
            setCategoryImage(null);
            // Close modal
            const editModal = window.bootstrap.Modal.getInstance(document.getElementById('editModal'));
            editModal.hide();
        } catch (error) {
            console.error('Error updating category', error);
            Swal.fire(
                'Error!',
                'There was an error updating the category.',
                'error'
            );
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
                <table className="table">
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
                                        <img src={`${process.env.REACT_APP_API_URL}/images/category-logo/${elem.image}`} alt="logo" style={{ width: '50px', height: 'auto' }} />
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

            {/* Edit Modal */}
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">Edit Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUpdateCategory}>
                                <div className="mb-3">
                                    <label htmlFor="categoryName" className="form-label">Category Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="categoryName"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="categoryImage" className="form-label">Category Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="categoryImage"
                                        onChange={(e) => setCategoryImage(e.target.files[0])}
                                    />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary me-2">Update Category</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
