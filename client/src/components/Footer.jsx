import React from 'react';
import { Link } from 'react-router-dom';

const Newsletter = () => {
    return (
        <div className="row">
            <div className="col">
                <div className="container">
                    <div className="row mt-5 mb-4">
                        <div className="col-md-6 d-flex flex-column justify-content-center">
                            <div className="row newsletter">
                                <h2>Subscribe To Our NewsLetter</h2>
                            </div>
                            <div className="row">
                                <p className="text-muted">Subscribe to our newsletter to get 10% off on your first order</p>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex align-items-center subscribe">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Enter your Email" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <button className="btn btn-dark" type="button" id="button-addon2">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <div className="col rest mt-1">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-lg-3 pt-5">
                        <div className="row logo mb-4">
                            <Link to={'/'}><img src="/images/ecommerce_logo.png" alt="logo" /></Link>
                        </div>
                        <div className="row desc">
                            <p className="text-muted text-md-nowrap">We support all Credit Cards and Payment Methods</p>
                        </div>
                        <div className="row payimg d-flex ms-1">
                            <div className="col g-0 m-0 p-0">
                                <img src="/images/payment-logo/gpay.png" alt="Google Pay" />
                            </div>
                            <div className="col g-0 m-0 p-0">
                                <img src="/images/payment-logo/mastercard.png" alt="Master Card" />
                            </div>
                            <div className="col g-0 m-0 p-0">
                                <img src="/images/payment-logo/paypal.png" alt="PayPal" />
                            </div>
                            <div className="col g-0 m-0 p-0">
                                <img src="/images/payment-logo/visa.png" alt="Visa" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 pt-5 d-md-flex flex-column align-items-lg-end">
                        <div className="row">
                            <Link to="/">Home</Link>
                        </div>
                        <div className="row">
                            <Link to="/about">About</Link>
                        </div>
                        <div className="row">
                            <Link to="/popular-products">Popular Products</Link>
                        </div>
                        <div className="row">
                            <Link to="/contact">Contact</Link>
                        </div>
                    </div>
                    <div className="col-lg-2 pt-5">
                        <div className="row">
                            <Link to="/my-account">My Account</Link>
                        </div>
                        <div className="row">
                            <Link to="/order-tracking">Order Tracking</Link>
                        </div>
                        <div className="row">
                            <Link to="/checkout">Checkout</Link>
                        </div>
                        <div className="row">
                            <Link to="/wishlist">Wishlist</Link>
                        </div>
                    </div>
                    <div className="col-lg-3 pt-5 d-flex flex-column align-items-lg-end">
                        <div className="row">
                            <a href="tel:+919330243841">+91-933-024-3841</a>
                        </div>
                        <div className="row">
                            <p>Baranagar, Kolkata,<br />West Bengal</p>
                        </div>
                        <div className="row d-flex justify-content-evenly">
                            <div className="col-3 social me-lg-2">
                                <a href="https://www.x.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i></a>
                            </div>
                            <div className="col-3 social me-lg-2">
                                <a href="https://www.instagram.com/bristidev.burman2004/" target="_blank" rel="noopener noreferrer" title="Visit the Creator's Instagram"><i className="fa-brands fa-instagram"></i></a>
                            </div>
                            <div className="col-3 social me-lg-2">
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
                            </div>
                            <div className="col-3 social me-lg-2">
                                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{ border: '1px solid black' }} />
                <div className="row text-center text-muted mb-4">
                    <div className="col">CopyRight &copy; 2024 All Rights Reserved</div>
                    <div className="col">Terms & Conditions</div>
                </div>
            </div>
        </div>
    );
};

export { Newsletter, Footer };
