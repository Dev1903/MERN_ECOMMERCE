import React, { useState } from 'react';
import category from '../../js/category';

const Category = () => {
    const [viewAll, setViewAll] = useState(false);

    const handleViewAllClick = () => {
        setViewAll(!viewAll);
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
                            <th style={{ width: '250px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category.slice(0, viewAll ? category.length : 6).map((elem) => {
                                return (
                                    <tr key={elem.id}>
                                        <td>{elem.id}</td>
                                        <td>{elem.title}</td>
                                        <td className='d-flex justify-content-center align-items-center'>
                                            <img src={`../${elem.logo}`} alt="logo" style={{ width: '50px', height: 'auto' }} />
                                        </td>
                                        <td className='text-center'>
                                            <span className="btn btn-success">Edit</span>
                                            &nbsp;&nbsp;
                                            <span className="btn btn-danger">Delete</span>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Category;
