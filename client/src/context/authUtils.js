// authUtils.js
import { jwtDecode } from 'jwt-decode';

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null; // Returns true if token exists, false otherwise
};

// Function to get the user ID from the token
export const getUserId = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.id; // Assuming the JWT payload contains an 'id' field
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null; // Return null if there's an error
    }
  }
  return null; // Return null if no token exists
};

// Function to clear the token (e.g., on logout)
export const clearToken = () => {
  localStorage.removeItem('token');
};
