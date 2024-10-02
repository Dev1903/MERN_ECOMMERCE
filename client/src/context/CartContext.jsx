import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCart, updateCart } from '../api/api'; // Ensure to import your API functions
import { getUserId } from '../context/authUtils.js'; // Import the function from authUtils
import Swal from 'sweetalert2'; // For user alerts
import { useNavigate } from 'react-router-dom'; // For navigation
import { Box, Spinner, Text } from '@chakra-ui/react';

// Create Cart Context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Initialize as empty array
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [user, setUser] = useState(null); // Token state
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const navigate = useNavigate(); // For navigation

  // Fetch cart from the database once when component mounts
  useEffect(() => {
    const storedUserId = getUserId(); // Use the function to get the user ID
    setUser(storedUserId);

    if (storedUserId) {
      const fetchUserCart = async () => {
        try {
          const fetchedCart = await fetchCart(storedUserId); // Fetch cart from the database
          setCart(fetchedCart.items || []); // Ensure items are always an array
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };
      fetchUserCart();
    }
  }, []); 

  // Update total quantity whenever cart changes
  useEffect(() => {
    if (Array.isArray(cart)) { // Ensure cart is an array
      const total = cart.reduce((acc, item) => acc + item.quantity, 0);
      setTotalQuantity(total);
    }
  }, [cart]);

  // Save cart to the database whenever cart changes
  useEffect(() => {
    const saveCartToDatabase = async () => {
      if (user) {
        setLoading(true); // Set loading to true while saving
        <Box className="d-flex flex-column justify-content-center align-items-center vh-100">
                <Spinner width="100px" // Set custom width
                    height="100px"
                    thickness="1px" />
                <Text mt={4}>Loading product details...</Text>
            </Box>
        try {
          await updateCart(user, cart); // Update cart in the database
        } catch (error) {
          console.error("Error saving cart data:", error);
        } finally {
          setLoading(false); // Reset loading state
        }
      }
    };

    saveCartToDatabase();
  }, [cart, user]); // Trigger save when cart or token changes

  // Function to update cart
  const updateCartItems = (product) => {
    if (!user) {
      Swal.fire({
        title: 'User Not Signed In',
        text: "Please Sign In",
        icon: 'warning'
      }).then(() => {
        navigate('/signUp'); // Redirect to the login page
      });
      return; // Prevent further execution if the user is not signed in
    }

    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item._id === product._id);
      //console.log(product);
      
      if (existingProductIndex !== -1) {
        // Product exists, increment its quantity
        return prevCart.map((item, index) => {
          if (index === existingProductIndex) {
            return { ...item, quantity: item.quantity + 1 }; // Increment quantity
          }
          return item; // Return the rest unchanged
        });
      } else {
        // Product does not exist, add it to the cart
        return [
          ...prevCart,
          { name: product.name, brand: product.brand, price: product.price, quantity: 1, _id: product._id, image: product.image } // Include _id for future references
        ];
      }
    });
  };

  // Function to change quantity directly
  const changeQuantity = (id, change) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item._id === id) {
          const newQuantity = Math.max(item.quantity + change, 0); // Prevent negative quantity
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0); // Remove items with zero quantity

      return updatedCart; // Return the updated cart
    });
  };

  return (
    <CartContext.Provider value={{ cart,setCart,  updateCart: updateCartItems, totalQuantity, changeQuantity, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider };
