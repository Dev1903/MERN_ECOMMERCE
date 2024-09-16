import React, { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    FormErrorMessage
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useRef } from "react";
import Swal from 'sweetalert2';
import { addCategory } from "../../service/api.js";


const CategoryForm = () => {

    const [user, setUser] = useState({
        name: '',
        image: ''
    })

    const [input, setInput] = useState('')
    const [inputImage, setImage] = useState('')

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        setInput(e.target.value)
        console.log(user)
    }

    const handleImage = (e) => {
        setImage(e.target.file)
        setUser({ ...user, image: e.target.files[0] });
    }

    const isError = input === ''
    const isErrorImage = inputImage === ''

    const nameValid = useRef(null);
    const imageValid = useRef(null)

    const submitData = async (e) => {
        e.preventDefault()
        if (!user.name) {
            alert('Please Enter Your Name !')
            nameValid.current.focus()
        }
        else if (!user.image) {
            alert("Please Upload Image!")
            imageValid.current.focus()
        }
        else {
            const formData = new FormData()
            formData.append('image', user.image, user.image.name)
            formData.append('name', user.name)

            const res = await addCategory(formData)
            if (res.status === 201) {
                Swal.fire({
                    title: "Success",
                    text: res.data,
                    icon: "success"
                });

                // Add a delay before reloading the page
                setTimeout(() => {
                    window.location.reload();
                }, 1000); // 2000 milliseconds = 2 seconds
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
                <div className="container main pt-5">
                    <div className="row">
                        <div className="col-12 col-md-3"></div>
                        <div className="col-12 col-md-6">
                            <div className="card p-3">
                                <h6>Category Upload Form</h6><hr></hr>
                                <form>
                                    <FormControl isInvalid={isError}>
                                        <FormLabel fontSize={'14px'}>Category Name <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
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

                                    <FormControl isInvalid={isErrorImage}>
                                        <FormLabel fontSize={'14px'} mt={4}>Upload Image <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                        <Input
                                            type='file'
                                            name="image"
                                            value={inputImage}
                                            accept=".png, .jpg"
                                            ref={imageValid}
                                            pt={1}
                                            onChange={handleImage}
                                        />
                                        {!isErrorImage ? (
                                            <FormHelperText>
                                                Uploaded
                                            </FormHelperText>
                                        ) : (
                                            <FormErrorMessage>Field is required.</FormErrorMessage>
                                        )}
                                    </FormControl>

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-block float-right">
                                                <Button onClick={submitData} colorScheme='blue'>Submit</Button>
                                            </div>
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

export default CategoryForm