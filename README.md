# MERN E-Commerce Website

Welcome to the MERN E-Commerce Website project! This application is a full-featured e-commerce platform built using the MERN stack, providing users with a seamless online shopping experience.

## Project Overview

This project is a comprehensive e-commerce platform that allows users to browse products, add them to a cart, and proceed to checkout. The application is designed to be responsive and user-friendly, ensuring a smooth shopping experience across various devices.

## Features

- **User Authentication**: Secure user registration and login functionality.
- **Product Management**: Admins can add, edit, and delete products.
- **Shopping Cart**: Users can add products to their cart and manage quantities.
- **Order Processing**: Users can place orders and view their order history.
- **Responsive Design**: Optimized for various screen sizes to provide a consistent user experience.

## Technologies Used

### Frontend

- **React.js**: A JavaScript library for building user interfaces.
- **Redux**: State management for React applications.
- **React Router**: Declarative routing for React applications.
- **Axios**: Promise-based HTTP client for the browser and Node.js.

### Backend

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: For secure user authentication.

## Installation and Setup

To run this project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Dev1903/MERN_ECOMMERCE.git
   cd MERN_ECOMMERCE
   ```

2. **Install Dependencies**:

   - For the backend:
     ```bash
     cd server
     npm install
     ```

   - For the frontend:
     ```bash
     cd client
     npm install
     ```

3. **Environment Variables**:

   Create a `.env` file in the `server` directory with the following variables:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the Application**:

   - Start the backend server:
     ```bash
     cd server
     npm start
     ```

   - Start the frontend application:
     ```bash
     cd client
     npm start
     ```

   The application will be accessible at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
