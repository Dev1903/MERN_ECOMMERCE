import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Products from "./components/Products";
import ErrorPage from "./components/ErrorPage";
import Cart from "./components/Cart";
import Wishlist from "./components/WishList";
import About from "./components/About";
import Profile from "./components/Profile";
import AdminPage from "./components/AdminPage";
import { SignUp, Login } from "./components/UserLogin";
import Fulldetails from "./components/Fulldetails";
import UnderMaintenance from "./components/UnderMaintenence";
import { CartProvider } from "./context/CartContext"; // Import CartProvider

const App = () => {
  return (
    <Router>
      <CartProvider>
        {/* Wrap Router with CartProvider */}
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Fulldetails />} />
            <Route path="/blog" element={<UnderMaintenance />} />
            <Route path="/about" element={<About />} />
            <Route path="/today-deals" element={<UnderMaintenance />} />
            <Route path="/customer-services" element={<UnderMaintenance />} />
            <Route path="/trending-products" element={<UnderMaintenance />} />
            <Route path="/special-offers" element={<UnderMaintenance />} />
            <Route path="/order-tracking" element={<UnderMaintenance />} />
            <Route path="/checkout" element={<UnderMaintenance />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path={`/${process.env.REACT_APP_ADMIN_ENTRY_URL}/*`} element={<AdminPage />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
