import React, { useState, useRef } from "react";
import { ChakraProvider, FormControl, FormLabel, FormHelperText, Input, FormErrorMessage, Button } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { addProduct, checkCategoryExists } from "../../api/api.js";

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        discountPrice: '',
        stockQuantity: '',
        category: '',
        brand: '',
        image: '',
        sku: '',
        rating: ''
    });


    const handleInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    };

    const handleDescriptionChange = (value) => {
        setProduct({ ...product, description: value });
    };

    const isErrorCategory = product.category === '';
    const isErrorImage = product.image === '';
    const isErrorPrice = product.price === '';

    const categoryValid = useRef(null);
    const imageValid = useRef(null);
    const priceValid = useRef(null);

    const submitData = async (e) => {
        e.preventDefault();
        if (!product.name) {
            alert('Please Enter Product Name!');
        } else if (!product.image) {
            alert('Please Upload Image!');
        } else if (!product.category) {
            alert('Please Enter a Category!');
        } else if (!product.price) {
            alert('Please Enter Price of the Product!');
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
                formData.append('description', product.description || null);
                formData.append('price', product.price);
                formData.append('discountPrice', product.discountPrice || null);
                formData.append('stockQuantity', product.stockQuantity || null);
                formData.append('category', product.category);
                formData.append('brand', product.brand || null);
                formData.append('rating', product.rating || null);
                formData.append('sku', product.sku || null);

                const res = await addProduct(formData);
                if (res.status === 201) {
                    Swal.fire({
                        title: "Success",
                        text: res.data,
                        icon: "success"
                    });
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);

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
                                <FormControl isInvalid={product.name === ''}>
                                    <FormLabel fontSize={'14px'}>Product Name <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                    <Input
                                        type='text'
                                        name="name"
                                        value={product.name}
                                        placeholder="Enter Product Name"
                                        pb={1}
                                        onChange={handleInputChange}
                                    />
                                    {product.name === '' ? (
                                        <FormErrorMessage>Field is required.</FormErrorMessage>
                                    ) : (
                                        <FormHelperText>Success</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel fontSize={'14px'}>Description</FormLabel>
                                    <ReactQuill
                                        value={product.description}
                                        onChange={handleDescriptionChange}
                                        placeholder="Enter Product Description"
                                    />
                                </FormControl>

                                <FormControl mt={4} isInvalid={isErrorPrice}>
                                    <FormLabel fontSize={'14px'}>Price <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                    <Input
                                        type='number'
                                        name="price"
                                        value={product.price}
                                        placeholder="Enter Price"
                                        ref={priceValid}
                                        onChange={handleInputChange}
                                    />
                                    {isErrorPrice ? (
                                        <FormErrorMessage>Price is required.</FormErrorMessage>
                                    ) : (
                                        <FormHelperText>Success</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel fontSize={'14px'}>Category <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                    <Input
                                        type='text'
                                        name="category"
                                        value={product.category}
                                        placeholder="Enter Category Name"
                                        ref={categoryValid}
                                        pb={1}
                                        onChange={handleInputChange}
                                    />
                                    {isErrorCategory ? (
                                        <FormErrorMessage>Field is required.</FormErrorMessage>
                                    ) : (
                                        <FormHelperText>Success</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl mt={4} isInvalid={isErrorImage}>
                                    <FormLabel fontSize={'14px'}>Product Image <sup><span style={{ color: 'red' }}>*</span></sup></FormLabel>
                                    <Input
                                        type='file'
                                        name="image"
                                        accept="image/*"
                                        ref={imageValid}
                                        onChange={handleImage}
                                    />
                                    {isErrorImage ? (
                                        <FormErrorMessage>Image is required.</FormErrorMessage>
                                    ) : (
                                        <FormHelperText>Success</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel fontSize={'14px'}>Discount Price</FormLabel>
                                    <Input
                                        type='number'
                                        name="discountPrice"
                                        value={product.discountPrice}
                                        placeholder="Enter Discount Price"
                                        onChange={handleInputChange}
                                    />
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
                                    <FormLabel fontSize={'14px'}>Rating</FormLabel>
                                    <Input
                                        type='number'
                                        name="rating"
                                        value={product.rating}
                                        placeholder="Enter Rating"
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

                                <Button type="submit" colorScheme='blue' mt={4} onClick={submitData}>Upload</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ChakraProvider>
    );
};

export default ProductForm;
