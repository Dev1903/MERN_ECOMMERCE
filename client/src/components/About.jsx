import React from 'react';
import Header from './Header';
import { Newsletter, Footer } from './Footer';

const About = () => {
    return (
        <div className="container-fluid">
            <div className="row header">
                <Header />
            </div>
            <div className="row">
                <div className="col">
                    <div className="container mt-5 mb-5">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="text-center mb-4">About Us</h1>
                                <p>
                                    Welcome to our company! We are dedicated to providing top-notch products and services to our customers. Our team is passionate about delivering quality and excellence in every aspect of our work.
                                </p>
                                <p>
                                    Our mission is to ensure customer satisfaction by offering a wide range of high-quality products and exceptional customer service. We value integrity, innovation, and commitment to our clients.
                                </p>
                                <p>
                                    Thank you for choosing us as your trusted partner. We look forward to serving you and meeting your needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row footer">
                <Newsletter />
                <Footer />
            </div>
        </div>
    );
};

export default About;
