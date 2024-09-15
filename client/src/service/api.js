import axios from "axios";

const URL = 'http://localhost:8000';

export const addUser = async (data) =>{
    try{
        return await axios.post(`${URL}/add`, data)
    }catch(error){
        console.log('Error While Connecting API', error)
    }
}
// const API_URL = 'http://your-api-endpoint.com'; // Replace with your actual API endpoint

export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${URL}/login`, user);
        return response;
    } catch (error) {
        console.error('Error during login:', error);
        return error.response;
    }
};
