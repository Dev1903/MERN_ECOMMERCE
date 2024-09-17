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
        return false;
    }
};


// Fetch Categories
export const getCategories = async () => {
    try {
        const response = await axios.get(`${URL}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error While Fetching Categories:', error);
        return error.response ? error.response : { message: 'Unknown error occurred' };
    }
};

// Delete Category
export const deleteCategory = async (id) => {
    try {
        return await axios.delete(`${URL}/deleteCategory/${id}`);
    } catch (error) {
        console.error('Error While Deleting Category:', error);
        return error.response ? error.response : { message: 'Unknown error occurred' };
    }
};

//Update Category
export const updateCategory = async (id, categoryData) => {
    try {
        const response = await axios.put(`http://localhost:8000/updateCategory/${id}`, categoryData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating category', error);
        throw error;
    }
};

