// src/components/LandingPage.jsx
import React from 'react';
import Searchbar from './Searchbar';
import Header from './Header';
import Slider from './Slider';
import Categories from './Categories';
import ProductList from './ProductList';
import { Newsletter, Footer } from './Footer';

const LandingPage = () => {
  return (
    <div className="container-fluid">
      <div className="row searchbar mb-2">
        <Searchbar />
      </div>
      <div className="row header mb-5">
        <Header />
      </div>
      <div className="row slider mb-5">
        <Slider />
      </div>
      <div className="row categories mb-5">
        <Categories />
      </div>
      <div className="row popular mb-5" id="popular">
        <ProductList filterByPopular={true} heading={"Popular Products 2024"} />
      </div>
      <div className="row furniture mb-5">
        <ProductList category={"furniture"} heading={"Our Furniture Collection"} />
      </div>
      <div className="row shoes mb-5">
        <ProductList category={"shoes"} heading={"New Shoes Collection"} />
      </div>
      <div className="row footer">
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
