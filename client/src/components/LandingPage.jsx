import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import Header from './Header';
import Slider from './Slider';
import Categories from './Categories';
import ProductList from './ProductList';
import { Newsletter, Footer } from './Footer';
import { getProducts } from '../api/api'; // Import the getProducts function

const LandingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const popularProducts = products.filter(product => product.popular);

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
      {popularProducts.length > 0 && (
        <div className="row popular mb-5 pt-5" id="popular">
          <ProductList filterByPopular={true} heading={"Popular Products 2024"} />
        </div>
      )}
      <div className="row furniture mb-5 pt-5 ">
        <ProductList category={"Furniture"} heading={"Our Furniture Collection"} />
      </div>
      <div className="row shoes mb-5 pt-5 pb-5">
        <ProductList category={"Fashion"} heading={"New Shoes Collection"} />
      </div>
      <div className="row footer">
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
