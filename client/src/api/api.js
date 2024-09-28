import axios from "axios";


const URL = process.env.REACT_APP_API_URL;

console.log('API URL:', process.env.REACT_APP_API_URL);
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
export const loginUser = async ({ username, password }) => {
    try {
        const response = await axios.post(`${URL}/loginUser`, { username, password });
        return response;
    } catch (error) {
        console.error('Error during login:', error);
        if (error.response) {
            return {
                status: error.response.status,
                message: error.response.data.message || 'An error occurred during login.'
            };
        }
        return { message: 'Unknown error occurred' };
    }
};

// Fetch User
// Fetch user details by userId
export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${URL}/getUser/${userId}`); // Pass the userId in the URL
        return response.data; // Return the user details
    } catch (error) {
        console.error('Error while fetching user:', error);
        return null; // Return null on error
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
        // Ensure the response is treated as an array
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error('Error While Fetching Categories:', error);
        return []; // Return an empty array on error
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

// Update Category
export const updateCategory = async (id, categoryData) => {
    try {
        const response = await axios.put(`${URL}/updateCategory/${id}`, categoryData, {
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

// Fetch Products
export const getProducts = async (category = '', searchTerm = '') => {
    try {
        const response = await axios.get(`${URL}/products`, {
            params: { category, search: searchTerm }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

//Create Order
export const createOrder = async (orderData) => {
    try {
        const result = await axios.post(`${URL}/createOrder`, orderData);
        return result.data;
    } catch (error) {
        console.error('Error while creating order:', error);
        throw error;
    }
};

//fetch order
export const getUserOrders = async (userId) => {
    // console.log(userId);
    try {
        const response = await axios.get(`${URL}/orders/${userId}`);
        
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
};


