import React, { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react';
import {FormControl, FormLabel,FormHelperText,Input,FormErrorMessage} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useRef } from "react";
import Swal from 'sweetalert2';
import { addUser,loginUser } from "../service/api.js";
import { Link } from "react-router-dom";


const SignUp = () => {

    const [user, setUser] = useState({
        name: '',
        mobile: '',
        email: '',
        address: '',
        password: '',
    })

    const [input, setInput] = useState('')
    const [inputmobile, setInputMobile] = useState('')
    const [inputemail, setInputEmail] = useState('')
    const [inputaddress, setInputAddress] = useState('')
    const [inputpassword, setInputPassword] = useState('')

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        setInput(e.target.value)
        console.log(user)
    }

    const handleMobile = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })

        const onlyNums = e.target.value.replace(/[^0-9]/g, '')
        setInputMobile(onlyNums)
        console.log(user)
    }

    const handleEmail = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })

        const emailCheck = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, '');
        setInputEmail(emailCheck)
        console.log(user)
    }
    const handleAddress = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setInputAddress(e.target.value)
        console.log(user);
    };

    const handlePassword = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        const passwordCheck = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}[\]:;"'<>,.?/-]/g, '');
        setInputPassword(passwordCheck);
        console.log(user);
    };


    const isError = input === ''
    const isErrorMobile = inputmobile === ''
    const isErrorEmail = inputemail === ''
    const isErrorAddress = inputaddress === ''
    const isErrorPassword = inputpassword === ''

    const nameValid = useRef(null);
    const validMobile = useRef(null)
    const emailValid = useRef(null)
    const addressValid = useRef(null)
    const passwordValid = useRef(null)

    const submitData = async (e) => {
        e.preventDefault();

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
        } else if (!/\S+@\S+\.\S+/.test(user.email)) { // Basic email validation
            alert("Please Enter A Valid Email Address!");
            emailValid.current.focus();
        } else if (!user.address) {
            alert("Please Enter Your Address!");
            addressValid.current.focus();
        } else if (!user.password) {
            alert("Please Enter Your Password!");
            passwordValid.current.focus();
        } else if (user.password.length < 6) { // Example password validation
            alert("Password must be at least 6 characters long!");
            passwordValid.current.focus();
        } else {
            const formData = new FormData();
            formData.append('image', user.image, user.image.name);
            formData.append('name', user.name);
            formData.append('mobile', user.mobile);
            formData.append('email', user.email);
            formData.append('address', user.address);
            formData.append('password', user.password);

            const res = await addUser(formData)
            if (res.status === 201) {
                Swal.fire({
                    title: "Success",
                    text: res.data,
                    icon: "success"
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        }
    }

    return (
        <>
            <ChakraProvider>
                <div className="container main pt-3 " >
                    <div className="row">
                        <div className="col-12 col-md-3"></div>
                        <div className="col-12 col-md-6">
                            <div className="card p-3">
                                <h6>Sign Up</h6><hr></hr>
                                <form>
                                    <FormControl isInvalid={isError}>
                                        <FormLabel fontSize={'14px'}>Name <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                        <Input
                                            type='text'
                                            name="name"
                                            value={input}
                                            placeholder="Enter Your Name"
                                            ref={nameValid}
                                            pb={1}
                                            onChange={handleInputChange}
                                        />
                                        {!isError ? (
                                            <FormHelperText>
                                                Success
                                            </FormHelperText>
                                        ) : (
                                            <FormErrorMessage>Field is required.</FormErrorMessage>
                                        )}
                                    </FormControl>

                                    <FormControl isInvalid={isErrorMobile}>
                                        <FormLabel fontSize={'14px'} mt={4}>Mobile No. <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                        <Input
                                            type='text'
                                            name="mobile"
                                            value={inputmobile}
                                            placeholder="Enter Your Phone no."
                                            ref={validMobile}
                                            pb={1}
                                            onChange={handleMobile}
                                        />
                                        {!isErrorMobile ? (
                                            <FormHelperText>
                                                Success
                                            </FormHelperText>
                                        ) : (
                                            <FormErrorMessage>Field is required.</FormErrorMessage>
                                        )}
                                    </FormControl>

                                    <FormControl isInvalid={isErrorEmail}>
                                        <FormLabel fontSize={'14px'} mt={4}>Email ID <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                        <Input
                                            type='text'
                                            name="email"
                                            value={inputemail}
                                            placeholder="Enter Your Email ID"
                                            ref={emailValid}
                                            pb={1}
                                            onChange={handleEmail}
                                        />
                                        {!isErrorEmail ? (
                                            <FormHelperText>
                                                Success
                                            </FormHelperText>
                                        ) : (
                                            <FormErrorMessage>Field is required.</FormErrorMessage>
                                        )}
                                    </FormControl>

                                    <FormControl isInvalid={isErrorPassword}>
                                        <FormLabel fontSize={'14px'} mt={4}>Password <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                        <Input
                                            type='text'
                                            name="password"
                                            value={inputpassword}
                                            placeholder="Enter Your Password"
                                            ref={passwordValid}
                                            pb={1}
                                            onChange={handlePassword}
                                        />
                                        {!isErrorPassword ? (
                                            <FormHelperText>
                                                Success
                                            </FormHelperText>
                                        ) : (
                                            <FormErrorMessage>Field is required.</FormErrorMessage>
                                        )}
                                    </FormControl>

                                    <FormControl isInvalid={isErrorAddress}>
                                        <FormLabel fontSize={'14px'} mt={4}>Address <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                        <Input
                                            type='text'
                                            name="address"
                                            value={input}
                                            placeholder="Enter Your Address"
                                            ref={addressValid}
                                            pb={1}
                                            onChange={handleAddress}
                                        />
                                        {!isErrorAddress ? (
                                            <FormHelperText>
                                                Success
                                            </FormHelperText>
                                        ) : (
                                            <FormErrorMessage>Field is required.</FormErrorMessage>
                                        )}
                                    </FormControl>



                                    <div className="row">
                                        <div className="col-6 pt-1">                                            
                                                <Button onClick={submitData} mt={2} colorScheme='blue'>Sign Up</Button>  
                                        </div>

                                        <div className="col-6 pt-3">
                                        Already have an account?                                       
                                        <Link to="/login" className="text-decoration-underline text-primary">Login</Link>
                                        
                                            
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </ChakraProvider>
        </>
    )
}




const Login = () => {
    const [inputemail, setInputEmail] = useState('');
    const [inputpassword, setInputPassword] = useState('');
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleEmail = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        const emailCheck = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, '');
        setInputEmail(emailCheck);
    };

    const handlePassword = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        const passwordCheck = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}[\]:;"'<>,.?/-]/g, '');
        setInputPassword(passwordCheck);
    };

    const isErrorEmail = inputemail === '';
    const isErrorPassword = inputpassword === '';

    const emailValid = useRef(null);
    const passwordValid = useRef(null);

    const submitData = async (e) => {
        e.preventDefault();

        if (!user.email) {
            alert('Please Enter Your Email Address!');
            emailValid.current.focus();
        } else if (!/\S+@\S+\.\S+/.test(user.email)) { // Basic email validation
            alert('Please Enter A Valid Email Address!');
            emailValid.current.focus();
        } else if (!user.password) {
            alert('Please Enter Your Password!');
            passwordValid.current.focus();
        } else if (user.password.length < 6) {
            alert('Password must be at least 6 characters long!');
            passwordValid.current.focus();
        } else {
            const res = await loginUser(user);
            if (res.status === 200) {
                Swal.fire({
                    title: 'Success',
                    text: res.data,
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            }
        }
    };

    return (
        <ChakraProvider>
            <div className="container main pt-3">
                <div className="row">
                    <div className="col-12 col-md-3"></div>
                    <div className="col-12 col-md-6">
                        <div className="card p-3">
                            <h6>Login</h6>
                            <hr />
                            <form>
                                <FormControl isInvalid={isErrorEmail}>
                                    <FormLabel fontSize={'14px'} mt={4}>
                                        Email ID <sup><span style={{ color: 'red' }}>*</span></sup>
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        name="email"
                                        value={inputemail}
                                        placeholder="Enter Your Email ID"
                                        ref={emailValid}
                                        pb={1}
                                        onChange={handleEmail}
                                    />
                                    {!isErrorEmail ? (
                                        <FormHelperText>Success</FormHelperText>
                                    ) : (
                                        <FormErrorMessage>Field is required.</FormErrorMessage>
                                    )}
                                </FormControl>

                                <FormControl isInvalid={isErrorPassword}>
                                    <FormLabel fontSize={'14px'} mt={4}>
                                        Password <sup><span style={{ color: 'red' }}>*</span></sup>
                                    </FormLabel>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={inputpassword}
                                        placeholder="Enter Your Password"
                                        ref={passwordValid}
                                        pb={1}
                                        onChange={handlePassword}
                                    />
                                    {!isErrorPassword ? (
                                        <FormHelperText>Success</FormHelperText>
                                    ) : (
                                        <FormErrorMessage>Field is required.</FormErrorMessage>
                                    )}
                                </FormControl>

                                <div className="row">
                                    <div className="col-12">
                                        <div className="d-block text-center">
                                            <Button onClick={submitData} mt={2} colorScheme="blue">
                                                Login
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ChakraProvider>
    );
};
export { SignUp,Login};