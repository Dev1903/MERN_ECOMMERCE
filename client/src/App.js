import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Products from "./components/Products";
import ErrorPage from "./components/ErrorPage";
import Blog from "./components/Blog";
import Cart from "./components/Cart";
import Wishlist from "./components/WishList";
import About from "./components/About";
import AdminPage from "./components/AdminPage";
import { SignUp, Login } from "./components/UserLogin";
import Fulldetails from "./components/Fulldetails";
import { CartProvider } from "./context/CartContext"; // Import CartProvider

const App = () => {
  return (
    <CartProvider> {/* Wrap Router with CartProvider */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Fulldetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
