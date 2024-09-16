// api.js
import axios from "axios";

const URL = 'http://localhost:8000';

// Add User
export const addUser = async (data) => {
    try {
        return await axios.post(`${URL}/addUser`, data);
    } catch (error) {
        console.error('Error While Connecting API:', error);
        return error.response ? error.response : { message: 'Unknown error occurred' };
    }
};

// Add Category
export const addCategory = async (data) => {
    try {
        return await axios.post(`${URL}/addCategory`, data);
    } catch (error) {
        console.error('Error While Connecting API:', error);
        return error.response ? error.response : { message: 'Unknown error occurred' };
    }
};

// Add Product
export const addProduct = async (data) => {
    try {
        return await axios.post(`${URL}/addProduct`, data);
    } catch (error) {
        console.error('Error While Connecting API:', error);
        return error.response ? error.response : { message: 'Unknown error occurred' };
    }
};

// Login user function
export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${URL}/login`, user);
        return response;
    } catch (error) {
        console.error('Error during login:', error);
        return error.response ? error.response : { message: 'Unknown error occurred' };
    }
};

// Check if category exists
export const checkCategoryExists = async (categoryName) => {
    try {
        const response = await axios.get(`${URL}/checkCategory`, { params: { categoryName } });
        if (response.data.exists) {
            console.log('Category exists, you can proceed.');
            return true;
        } else {
            console.log('Category does not exist, please add the category first.');
            return false;
        }
    } catch (error) {
        console.error('Error checking category:', error.response ? error.response.data : error.message);
        return false; // Return false in case of an error
    }
};
