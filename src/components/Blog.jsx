import React from 'react';
import Header from './Header';
import Searchbar from './Searchbar';
import { Newsletter, Footer } from './Footer';

const Blog = () => {
    return (
        <div className="container-fluid">
            <div className="row searchbar">
                <Searchbar />
            </div>
            <div className="row header">
                <Header />
            </div>
            <div className="row">
                <div className="col">
                    <div className="container mt-5 mb-5">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="text-center mb-4">Our Blog</h1>
                                <div className="post">
                                    <h2 className="post-title">Blog Post Title 1</h2>
                                    <p className="post-date">September 1, 2024</p>
                                    <p className="post-content">
                                        This is a brief overview of our first blog post. It covers various topics relevant to our industry and provides insights into the latest trends and updates.
                                    </p>
                                    <a href="#read-more" className="btn btn-primary">Read More</a>
                                </div>
                                <div className="post mt-4">
                                    <h2 className="post-title">Blog Post Title 2</h2>
                                    <p className="post-date">August 25, 2024</p>
                                    <p className="post-content">
                                        Here we share details about our second blog post. It includes valuable information and advice on topics of interest to our readers.
                                    </p>
                                    <a href="#read-more" className="btn btn-primary">Read More</a>
                                </div>
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

export default Blog;
