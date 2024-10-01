import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getProducts, deleteProduct, updateProduct } from '../../api/api';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [viewAll, setViewAll] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [description, setDescription] = useState('');
    const [sold, setSold] = useState('');
    const [rating, setRating] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [sku, setSku] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        fetchProducts();
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
            await deleteProduct(id);
            setProducts(products.filter(product => product._id !== id));
            Swal.fire(
                'Deleted!',
                'The product has been deleted.',
                'success'
            );
        }
    };

    const handleEditClick = (product) => {
        setEditMode(true);
        setCurrentProduct(product);
        setProductName(product.name);
        setBrand(product.brand);
        setCategory(product.category.name);
        setProductPrice(product.price);
        setDiscountPrice(product.discountPrice);
        setDescription(product.description);
        setSold(product.sold);
        setRating(product.rating);
        setStockQuantity(product.stockQuantity);
        setSku(product.sku);
        setProductImage(null);
        // Open modal
        const editModal = new window.bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', currentProduct.name);
        formData.append('price', currentProduct.price);
        formData.append('quantity', currentProduct.quantity);
        
        // Use the category ObjectId from currentProduct
        formData.append('category', currentProduct.category._id); // Assuming category is an object with _id
        
        if (productImage) {
            formData.append('image', productImage);
        }
    
        try {
            await updateProduct(currentProduct._id, formData);
            const updatedProducts = await getProducts();
            setProducts(updatedProducts);
            Swal.fire('Updated!', 'Product updated successfully.', 'success');
            setEditMode(false);
            setCurrentProduct(null);
            setProductImage(null);
            // Close modal
            const editModal = window.bootstrap.Modal.getInstance(document.getElementById('editModal'));
            editModal.hide();
        } catch (error) {
            console.error('Error updating product', error);
            Swal.fire('Error!', 'There was an error updating the product.', 'error');
        }
    };
    

    return (
        <div className="main">
            <div className="report-container">
                <div className="report-header">
                    <h1>Products</h1>
                    <button className='btn btn-outline-primary' onClick={handleViewAllClick}>
                        {viewAll ? 'View Less' : 'View All'}
                    </button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sno.</th>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Image</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Discount Price</th>
                            <th>Description</th>
                            <th>Items Sold</th>
                            <th>Rating</th>
                            <th>Stock Quantity</th>
                            <th>SKU</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.slice(0, viewAll ? products.length : 5).map((elem, index) => (
                                <tr key={elem._id}>
                                    <td>{index + 1}</td>
                                    <td>{elem._id}</td>
                                    <td>{elem.name}</td>
                                    <td style={{ minWidth: "100px", display: 'flex', justifyContent: 'center' }}>
                                        <img src={`${process.env.REACT_APP_API_URL}/images/product-images/${elem.image}`} alt={elem.name} style={{ maxHeight: '60px', width: 'auto' }} />
                                    </td>
                                    <td>{elem.brand}</td>
                                    <td>{elem.category.name}</td>
                                    <td>{`₹${elem.price}`}</td>
                                    <td>{elem.discountPrice === 'null' ? elem.price : elem.discountPrice}</td>
                                    <td className="description-cell">{elem.description}</td>
                                    <td>{elem.sold}</td>
                                    <td className='text-warning'>{`★${elem.rating}`}</td>
                                    <td>{elem.stockQuantity === 'null' ? 0 : elem.stockQuantity}</td>
                                    <td>{elem.sku}</td>
                                    
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
                            <h5 className="modal-title" id="editModalLabel">Edit Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUpdateProduct}>
                                <div className="mb-3">
                                    <label htmlFor="productName" className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productName"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="brand" className="form-label">Brand</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="brand"
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productPrice" className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="productPrice"
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="discountPrice" className="form-label">Discount Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="discountPrice"
                                        value={discountPrice}
                                        onChange={(e) => setDiscountPrice(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="sold" className="form-label">Items Sold</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="sold"
                                        value={sold}
                                        onChange={(e) => setSold(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="rating" className="form-label">Rating</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="rating"
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="stockQuantity" className="form-label">Stock Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="stockQuantity"
                                        value={stockQuantity}
                                        onChange={(e) => setStockQuantity(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="sku" className="form-label">SKU</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="sku"
                                        value={sku}
                                        onChange={(e) => setSku(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productImage" className="form-label">Product Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="productImage"
                                        accept="image/*"
                                        onChange={(e) => setProductImage(e.target.files[0])}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Update Product</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
