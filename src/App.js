import React from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import Header from "./components/Header";
import Slider from "./components/Slider";
import {Categories} from "./components/Categories";
import ProductList from "./components/ProductList";
import {Newsletter,Footer} from "./components/Footer";
function App() {
  return (
    <div className="App container-fluid">
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
      <div className="row popular">
        <ProductList filterByPopular={true} heading={"Popular Products 2024"} />
      </div>
      <div className="row furniture">
        <ProductList
          category={"furniture"}
          heading={"Our Furniture Collection"}
        />
      </div>
      <div className="row shoes">
        <ProductList category={"shoes"} heading={"New Shoes Collection"} />
      </div>
      <div className="row footer">
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}

export default App;
