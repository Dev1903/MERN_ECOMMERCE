import React from 'react';
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Products from './components/Products';
import ErrorPage from './components/ErrorPage';
import Blog from './components/Blog';
import Cart from './components/Cart';
import About from './components/About';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<Products />} />
          {/* <Route path="/today-deals" element={<TodayDeals />} />
          <Route path="/customer-services" element={<CustomerServices />} />
          <Route path="/trending-products" element={<TrendingProducts />} /> */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/special-offers" element={<SpecialOffers />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
