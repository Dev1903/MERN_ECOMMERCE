import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Products from "./components/Products";
import ErrorPage from "./components/ErrorPage";
import Blog from "./components/Blog";
import Cart from "./components/Cart";
import About from "./components/About";
import AdminPage from "./components/AdminPage";
import { SignUp, Login } from "./components/UserLogin";
import Fulldetails from "./components/Fulldetails";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Fulldetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
