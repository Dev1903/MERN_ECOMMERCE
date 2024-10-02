import React, { useState, useRef } from "react";
import { ChakraProvider } from '@chakra-ui/react';
import { FormControl, FormLabel, FormHelperText, Input, FormErrorMessage } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { addUser, loginUser } from "../api/api.js";
import { Link, useNavigate } from "react-router-dom";

import Searchbar from "./Searchbar.jsx";
import { Newsletter, Footer } from "./Footer.jsx";

const SignUp = () => {
    const navigate = useNavigate()
    // Existing state for user information
    const [user, setUser] = useState({
        name: '',
        mobile: '',
        email: '',
        address: '',
        password: ''
        // Added confirmPassword
    });

    // Existing input states
    const [input, setInput] = useState('');
    const [inputMobile, setInputMobile] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputAddress, setInputAddress] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputConfirmPassword, setInputConfirmPassword] = useState(''); // Added state for confirm password

    // Handlers for existing fields
    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setInput(e.target.value);
        //console.log(user);
    };

    const handleMobile = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        setInputMobile(onlyNums);
        //console.log(user);
    };

    const handleEmail = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        const emailCheck = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, '');
        setInputEmail(emailCheck);
        //console.log(user);
    };

    const handleAddress = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setInputAddress(e.target.value);
        //console.log(user);
    };

    const handlePassword = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        const passwordCheck = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}[\]:;"'<>,.?/-]/g, '');
        setInputPassword(passwordCheck);
        //console.log(user);
    };

    // New handler for Confirm Password
    const handleConfirmPassword = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        const confirmPasswordCheck = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}[\]:;"'<>,.?/-]/g, '');
        setInputConfirmPassword(confirmPasswordCheck);
        //console.log(user);
    };

    // Validation flags
    const isError = input === '';
    const isErrorMobile = inputMobile === '';
    const isErrorEmail = inputEmail === '';
    const isErrorAddress = inputAddress === '';
    const isErrorPassword = inputPassword === '';
    const isErrorConfirmPassword = inputConfirmPassword === '' || inputPassword !== inputConfirmPassword; // Added validation for confirm password

    // References for form fields
    const nameValid = useRef(null);
    const validMobile = useRef(null);
    const emailValid = useRef(null);
    const addressValid = useRef(null);
    const passwordValid = useRef(null);
    const confirmPasswordValid = useRef(null); // Reference for confirm password

    // Submit handler
    const submitData = async (e) => {
        e.preventDefault();

        // Existing validations
        if (!user.name) {
            alert('Please Enter Your Name!');
            nameValid.current.focus();
        } else if (!user.mobile) {
            alert("Enter Your Mobile!");
            validMobile.current.focus();
        } else if (user.mobile.length !== 10) {
            alert("Please Enter A Valid Mobile Number!");
            validMobile.current.focus();
        } else if (!user.email) {
            alert("Please Enter Your Email Address!");
            emailValid.current.focus();
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            alert("Please Enter A Valid Email Address!");
            emailValid.current.focus();
        } else if (!user.address) {
            alert("Please Enter Your Address!");
            addressValid.current.focus();
        } else if (!user.password) {
            alert("Please Enter Your Password!");
            passwordValid.current.focus();
        } else if (user.password.length < 6) {
            alert("Password must be at least 6 characters long!");
            passwordValid.current.focus();
        }
        // New validation for confirm password
        else if (!user.confirmPassword) {
            alert("Please Confirm Your Password!");
            confirmPasswordValid.current.focus();
        } else if (user.password !== user.confirmPassword) {
            alert("Password and Confirm Password do not match!");
            confirmPasswordValid.current.focus();
        } else {
            // Prepare form data
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('mobile', user.mobile);
            formData.append('email', user.email);
            formData.append('address', user.address);
            formData.append('password', user.password);


            try {
                const res = await addUser(formData);
                if (res.status === 201) {

                    Swal.fire({
                        title: "Success",
                        text: res.data,
                        icon: "success"
                    }).then(() => {
                        // Redirect to the login page
                        navigate('/login'); // Assuming you are using React Router
                    });
                    setUser({ name: '', email: '', password: '', address: '', phone: '' });
                } else if (res.status === 409) {
                    Swal.fire({
                        title: "Error",
                        text: "User already exists",
                        icon: "warning",
                    }).then(() => {
                        // Redirect to the login page
                        navigate('/login'); // Assuming you are using React Router
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
                console.error("Error adding user:", error);
            }
        }
    }

    return (
        <ChakraProvider>
            <div className="container-fluid">
                <div className="row searchbar">
                    <Searchbar />
                </div>

                <div className="container main pt-3 ">
                    <div className="row ">
                        <div className="col-12 col-md-3"></div>
                        <div className="col-12 col-md-6">
                            <div className="card p-3">
                                <h6>Sign Up</h6>
                                <hr />
                                <form >
                                    {/* Name Field */}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormControl isInvalid={isError}>
                                                <FormLabel fontSize={'14px'} mt={4}>Name <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                                <Input
                                                    type='text'
                                                    name="name"
                                                    value={input}
                                                    placeholder="Enter Your Name"
                                                    ref={nameValid}
                                                    pb={1}
                                                    onChange={handleInputChange}
                                                    autoComplete="name"
                                                />
                                                {!isError ? (
                                                    <FormHelperText>Looks good!</FormHelperText>
                                                ) : (
                                                    <FormErrorMessage>Field is required.</FormErrorMessage>
                                                )}
                                            </FormControl>

                                            {/* Mobile Field */}
                                            <FormControl isInvalid={isErrorMobile}>
                                                <FormLabel fontSize={'14px'} mt={4}>Mobile No. <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                                <Input
                                                    type='text'
                                                    name="mobile"
                                                    value={inputMobile}
                                                    placeholder="Enter Your Phone no."
                                                    ref={validMobile}
                                                    pb={1}
                                                    onChange={handleMobile}
                                                    autoComplete="tel"
                                                />
                                                {!isErrorMobile ? (
                                                    <FormHelperText>Looks good!</FormHelperText>
                                                ) : (
                                                    <FormErrorMessage>Field is required.</FormErrorMessage>
                                                )}
                                            </FormControl>
                                            {/* Password Field */}
                                            <FormControl isInvalid={isErrorPassword || (inputPassword.length > 0 && inputPassword.length < 6)}>
                                                <FormLabel fontSize={'14px'} mt={4}>Password <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                                <Input
                                                    type='password'
                                                    name="password"
                                                    value={inputPassword}
                                                    placeholder="Enter Your Password"
                                                    ref={passwordValid}
                                                    pb={1}
                                                    onChange={handlePassword}

                                                />
                                                {isErrorPassword ? (
                                                    <FormErrorMessage>Password is required.</FormErrorMessage>
                                                ) : inputPassword.length < 6 && inputPassword.length > 0 ? (
                                                    <FormErrorMessage>Password must be at least 6 characters long.</FormErrorMessage>
                                                ) : (
                                                    <FormHelperText>Looks Good!</FormHelperText>
                                                )}
                                            </FormControl>


                                        </div>
                                        <div className="col-md-6">
                                            {/* Address Field */}
                                            <FormControl isInvalid={isErrorAddress}>
                                                <FormLabel fontSize={'14px'} mt={4}>Address <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                                <Input
                                                    type='text'
                                                    name="address"
                                                    value={inputAddress} // Changed from 'input' to 'inputAddress'
                                                    placeholder="Enter Your Address"
                                                    ref={addressValid}
                                                    pb={1}
                                                    onChange={handleAddress}
                                                />
                                                {!isErrorAddress ? (
                                                    <FormHelperText>Looks good!</FormHelperText>
                                                ) : (
                                                    <FormErrorMessage>Field is required.</FormErrorMessage>
                                                )}
                                            </FormControl>

                                            {/* Email Field */}
                                            <FormControl isInvalid={isErrorEmail}>
                                                <FormLabel fontSize={'14px'} mt={4}>Email ID <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                                <Input
                                                    type='email'
                                                    name="email"
                                                    value={inputEmail}
                                                    placeholder="Enter Your Email ID"
                                                    ref={emailValid}
                                                    pb={1}
                                                    onChange={handleEmail}
                                                    autoComplete="email"
                                                />
                                                {!isErrorEmail ? (
                                                    <FormHelperText>Looks good!</FormHelperText>
                                                ) : (
                                                    <FormErrorMessage>Field is required.</FormErrorMessage>
                                                )}
                                            </FormControl>




                                            {/* Confirm Password Field */}
                                            <FormControl isInvalid={isErrorConfirmPassword}>
                                                <FormLabel fontSize={'14px'} mt={4}>Confirm Password <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                                <Input
                                                    type='password'
                                                    name="confirmPassword"
                                                    value={inputConfirmPassword}
                                                    placeholder="Confirm Your Password"
                                                    ref={confirmPasswordValid}
                                                    pb={1}
                                                    onChange={handleConfirmPassword}
                                                />
                                                {!isErrorConfirmPassword ? (
                                                    <FormHelperText>Passwords match!</FormHelperText>
                                                ) : (
                                                    <FormErrorMessage>
                                                        {inputConfirmPassword === '' ? "Field is required." : "Passwords do not match."}
                                                    </FormErrorMessage>
                                                )}
                                            </FormControl>
                                        </div>
                                    </div>
                                    {/* Submit Button and Login Link */}
                                    <div className="row mt-4">
                                        <div className="col-6">
                                            <Button onClick={submitData} colorScheme='blue'>Sign Up</Button>
                                        </div>
                                        <div className="col-6 d-flex align-items-center justify-content-center">
                                            <span>Already have an account?</span>
                                            <Link to="/login" className="text-decoration-underline text-primary ms-2">Login</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-12 col-md-3"></div>
                    </div>
                </div>

                <div className="row footer mt-5 ">
                    <Newsletter />
                    <Footer />
                </div>
            </div>




        </ChakraProvider>
    )
}

const Login = () => {
    const navigate = useNavigate()
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleUsername = (e) => {
        const usernameCheck = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, '');
        setInputUsername(usernameCheck);
        setUser({ ...user, username: usernameCheck });
    };

    const handlePassword = (e) => {
        const passwordCheck = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}[\]:;"'<>,.?/-]/g, '');
        setInputPassword(passwordCheck);
        setUser({ ...user, password: passwordCheck });
    };

    const isErrorUsername = inputUsername === '';
    const isErrorPassword = inputPassword === '';

    const usernameValid = useRef(null);
    const passwordValid = useRef(null);

    const submitData = async (e) => {
        e.preventDefault();

        if (!user.username) {
            alert('Please Enter Your Email Address or Phone Number!');
            usernameValid.current.focus();
        } else if (!user.password) {
            alert('Please Enter Your Password!');
            passwordValid.current.focus();
        } else if (user.password.length < 6) {
            alert('Password must be at least 6 characters long!');
            passwordValid.current.focus();
        } else {
            try {
                const res = await loginUser({ username: user.username, password: user.password });
                //console.log(res.data);
                if (res.status === 200) {
                    localStorage.setItem('token', res.data);

                    // Redirect user to dashboard
                    Swal.fire({
                        title: 'Success',
                        text: 'Successfully Logged In',
                        icon: 'success'
                    }).then(() => {
                        // Replace the current history entry (login page) with the target page
                        window.history.replaceState(null, null, '/');

                        // Redirect to the home page
                        window.location.href = '/';
                    });
                } else if (res.status === 201) {
                    // Redirect user to dashboard
                    Swal.fire({
                        title: 'Welcome Admin',
                        text: "ADMIN CREDENTIALS ENTERED",
                        icon: 'success'
                    }).then(() => {
                        // Redirect to the login page
                        navigate(`/${process.env.REACT_APP_ADMIN_ENTRY_URL}`); // Assuming you are using React Router
                    });
                } else if (res.status === 401) {
                    // Redirect user to dashboard
                    Swal.fire({
                        title: 'Wrong Password',
                        text: "Enter the Correct Password",
                        icon: 'warning'
                    }).then(() => {
                        // Redirect to the login page
                        navigate('/login'); // Assuming you are using React Router
                    });
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'User Does Not Exist!',
                        text: 'Check username'
                    });
                }
            } catch (error) {
                const errorMessage = error.response ? error.response.data.message : 'Something went wrong!';
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage
                });
                console.error("Error logging in:", error);
            }
        }
    };

    return (
        <ChakraProvider>
            <div className="container-fluid">
                <div className="row searchbar">
                    <Searchbar />
                </div>

                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-item-center">
                        <div className="col-12 col-md-6">
                            <div className="card p-3">
                                <h6>Login</h6>
                                <hr />
                                <form onSubmit={submitData}>
                                    <FormControl isInvalid={isErrorUsername}>
                                        <FormLabel fontSize={'14px'} mt={4}>
                                            Username <sup><span style={{ color: 'red' }}>*</span></sup>
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            name="username"
                                            value={inputUsername}
                                            placeholder="Enter Your Email ID or Phone Number"
                                            ref={usernameValid}
                                            pb={1}
                                            onChange={handleUsername}
                                            autoComplete="username"
                                        />
                                        {!isErrorUsername ? (
                                            <FormHelperText>Looks good!</FormHelperText>
                                        ) : (
                                            <FormErrorMessage>Field is required.</FormErrorMessage>
                                        )}
                                    </FormControl>

                                    <FormControl isInvalid={isErrorPassword || (inputPassword.length > 0 && inputPassword.length < 6)}>
                                        <FormLabel fontSize={'14px'} mt={4}>
                                            Password <sup><span style={{ color: 'red' }}>*</span></sup>
                                        </FormLabel>
                                        <Input
                                            type="password"
                                            name="password"
                                            value={inputPassword}
                                            placeholder="Enter Your Password"
                                            ref={passwordValid}
                                            pb={1}
                                            onChange={handlePassword}
                                            autoComplete="current-password"
                                        />
                                        {isErrorPassword ? (
                                            <FormErrorMessage>Password is required.</FormErrorMessage>
                                        ) : inputPassword.length < 6 && inputPassword.length > 0 ? (
                                            <FormErrorMessage>Password must be at least 6 characters long.</FormErrorMessage>
                                        ) : (
                                            <FormHelperText>Looks Good!</FormHelperText>
                                        )}
                                    </FormControl>

                                    <div className="row mt-4 text-center">
                                        <div className="col-12">
                                            <Button type="submit" colorScheme="blue">
                                                Login
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row footer mt-5">
                    <Newsletter />
                    <Footer />
                </div>
            </div>
        </ChakraProvider>
    );
};

export { SignUp, Login };
