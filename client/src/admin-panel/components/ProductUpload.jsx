import React, { useState, useRef } from "react";
import { ChakraProvider, FormControl, FormLabel, FormHelperText, Input, FormErrorMessage, Button, Select, Textarea } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { addUser, checkCategoryExists } from "../../service/api.js"; // Add a function to check category existence

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        currency: '',
        stockQuantity: '',
        category: '',
        brand: '',
        image: '',
        tags: '',
        sku: ''
    });

    const [input, setInput] = useState('');
    const [inputImage, setInputImage] = useState('');

    const handleInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
        setInput(e.target.value);
    };

    const handleImage = (e) => {
        setInputImage(e.target.files[0]);
        setProduct({ ...product, image: e.target.files[0] });
    };

    const isError = input === '';
    const isErrorImage = inputImage === '';
    const isErrorCategory = product.category === '';

    const nameValid = useRef(null);
    const imageValid = useRef(null);
    const categoryValid = useRef(null);

    const submitData = async (e) => {
        e.preventDefault();
        if (!product.name) {
            alert('Please Enter Product Name!');
            nameValid.current.focus();
        } else if (!product.image) {
            alert('Please Upload Image!');
            imageValid.current.focus();
        } else if (!product.category) {
            alert('Please Enter a Category!');
            categoryValid.current.focus();
        } else {
            // Check if category exists in the database
            const categoryExists = await checkCategoryExists(product.category);
            if (!categoryExists) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Category Not Found',
                    text: 'Please add the category before entering the product.',
                });
            } else {
                const formData = new FormData();
                formData.append('image', product.image, product.image.name);
                formData.append('name', product.name);
                formData.append('description', product.description);
                formData.append('price', product.price);
                formData.append('currency', product.currency);
                formData.append('stockQuantity', product.stockQuantity);
                formData.append('category', product.category);
                formData.append('brand', product.brand);
                formData.append('tags', product.tags);
                formData.append('sku', product.sku);

                const res = await addUser(formData);
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
    };

    return (
        <ChakraProvider>
            <div className="container main pt-5">
                <div className="row">
                    <div className="col-12 col-md-3"></div>
                    <div className="col-12 col-md-6">
                        <div className="card p-3">
                            <h6>Product Upload Form</h6><hr />
                            <form>
                                <FormControl isInvalid={isError}>
                                    <FormLabel fontSize={'14px'}>Product Name <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                    <Input
                                        type='text'
                                        name="name"
                                        value={product.name}
                                        placeholder="Enter Product Name"
                                        ref={nameValid}
                                        pb={1}
                                        onChange={handleInputChange}
                                    />
                                    {!isError ? (
                                        <FormHelperText>Success</FormHelperText>
                                    ) : (
                                        <FormErrorMessage>Field is required.</FormErrorMessage>
                                    )}
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel fontSize={'14px'}>Description</FormLabel>
                                    <Textarea
                                        name="description"
                                        value={product.description}
                                        placeholder="Enter Product Description"
                                        onChange={handleInputChange}
                                    />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel fontSize={'14px'}>Price <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                    <Input
                                        type='number'
                                        name="price"
                                        value={product.price}
                                        placeholder="Enter Price"
                                        onChange={handleInputChange}
                                        isRequired
                                    />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel fontSize={'14px'}>Currency</FormLabel>
                                    <Select
                                        name="currency"
                                        value={product.currency}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Currency</option>
                                        <option value="INR">INR</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                    </Select>
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel fontSize={'14px'}>Stock Quantity</FormLabel>
                                    <Input
                                        type='number'
                                        name="stockQuantity"
                                        value={product.stockQuantity}
                                        placeholder="Enter Stock Quantity"
                                        onChange={handleInputChange}
                                    />
                                </FormControl>

                                <FormControl isInvalid={isErrorCategory} mt={4}>
                                    <FormLabel fontSize={'14px'}>Category <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                    <Input
                                        type='text'
                                        name="category"
                                        value={product.category}
                                        placeholder="Enter Category"
                                        ref={categoryValid}
                                        onChange={handleInputChange}
                                    />
                                    {!isErrorCategory ? (
                                        <FormHelperText>Success</FormHelperText>
                                    ) : (
                                        <FormErrorMessage>Field is required.</FormErrorMessage>
                                    )}
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel fontSize={'14px'}>Brand</FormLabel>
                                    <Input
                                        type='text'
                                        name="brand"
                                        value={product.brand}
                                        placeholder="Enter Brand"
                                        onChange={handleInputChange}
                                    />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel fontSize={'14px'}>Tags</FormLabel>
                                    <Input
                                        type='text'
                                        name="tags"
                                        value={product.tags}
                                        placeholder="Enter Tags (comma-separated)"
                                        onChange={handleInputChange}
                                    />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel fontSize={'14px'}>SKU</FormLabel>
                                    <Input
                                        type='text'
                                        name="sku"
                                        value={product.sku}
                                        placeholder="Enter SKU"
                                        onChange={handleInputChange}
                                    />
                                </FormControl>

                                <FormControl isInvalid={isErrorImage} mt={4}>
                                    <FormLabel fontSize={'14px'}>Image <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                    <Input
                                        type='file'
                                        name="image"
                                        accept=".png, .jpg"
                                        ref={imageValid}
                                        pt={1}
                                        onChange={handleImage}
                                    />
                                    {!isErrorImage ? (
                                        <FormHelperText>Uploaded</FormHelperText>
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
    );
}

export default ProductForm;
