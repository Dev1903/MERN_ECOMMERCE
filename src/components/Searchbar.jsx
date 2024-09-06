import React from 'react';
import { category } from './Categories';
const Searchbar = () => {
    const uniqueCategories = Array.from(new Set(category.map(item => item.title)));
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3 logo mt-4 mb-3 d-flex justify-content-center justify-content-lg-start">
                    <img src="images/ecommerce_logo.png" alt="" />
                </div>
                <div className="col-md-5 mt-4 mb-3">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for Products" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <i class="fa-solid fa-magnifying-glass search-icon"></i>
                        <div className="dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#temp"
                                id="categoriesDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                CATEGORIES
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
                                {uniqueCategories.map((title, index) => (
                                    <li key={index}>
                                        <a className="dropdown-item" href="#temp">{title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button class="btn btn-dark search" type="button" id="button-addon2"><i class="fa-solid fa-magnifying-glass text-white text-center search"></i></button>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-end align-items-center right mt-4 mb-3">
                    <div className="col-4 account text-end">
                        <i class="fa-regular fa-user"></i>&nbsp;
                        <span>Account</span>
                    </div>
                    <div className="col-4 wishlist text-center">
                    <i class="fa-regular fa-heart"></i>
                    </div>
                    <div className="col-4 cart">
                        <span className="total">Total</span>
                        <a href="#temp"><i class="fa-solid fa-cart-shopping text-black"></i></a>
                        <span className="totalprice">₹0.00</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Searchbar;
