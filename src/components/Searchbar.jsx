import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { category } from './Categories';
import CategoryDropdown from './CategoryDropdown';

const Searchbar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const uniqueCategories = Array.from(new Set(category.map(item => item.title)));

    const handleSearch = () => {
        const validCategory = uniqueCategories.includes(selectedCategory);

        if (searchTerm) {
            if (validCategory) {
                // Search with both term and valid category
                setErrorMessage(""); // Clear error if category is valid
                navigate(`/products?search=${searchTerm}&category=${selectedCategory}`);
            } else {
                // Search with term only if category is not valid
                setErrorMessage(""); // Clear error if search term is valid
                navigate(`/products?search=${searchTerm}`);
            }
        } else if (validCategory) {
            // Search with only valid category if no search term
            setErrorMessage(""); // Clear error if category is valid
            navigate(`/products?category=${selectedCategory}`);
        } else {
            // Neither search term nor valid category
            setErrorMessage("No such category exists");
            navigate('/error'); // Navigate to error page
        }
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3 logo mt-4 mb-3 d-flex justify-content-center justify-content-lg-start">
                    <img src="images/ecommerce_logo.png" alt="" />
                </div>
                <div className="col-md-5 mt-4 mb-3">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for Products"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                        />
                        <i className="fa-solid fa-magnifying-glass search-icon"></i>
                        <CategoryDropdown setSelectedCategory={setSelectedCategory} />
                        <button
                            className="btn btn-dark search"
                            type="button"
                            id="button-addon2"
                            onClick={handleSearch}
                        >
                            <i className="fa-solid fa-magnifying-glass text-white text-center search"></i>
                        </button>
                    </div>
                    {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
                </div>
                <div className="col-md-4 d-flex justify-content-end align-items-center right mt-4 mb-3">
                    <div className="col-4 account text-end">
                        <a href="#temp" className="text-black text-decoration-none">
                            <i className="fa-regular fa-user"></i>&nbsp;
                            <span>Account</span>
                        </a>
                    </div>
                    <div className="col-4 wishlist text-center">
                        <a href="#temp" className="text-black text-decoration-none"><i className="fa-regular fa-heart"></i></a>
                    </div>
                    <div className="col-4 cart">
                        <Link to="/cart" className="text-black text-decoration-none">
                            <span className="total">Total</span>
                            <i className="fa-solid fa-cart-shopping text-black"></i>
                            <span className="totalprice">₹0.00</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Searchbar;
