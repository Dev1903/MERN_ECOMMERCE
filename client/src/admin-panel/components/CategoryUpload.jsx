import React, {useState} from "react";
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
  import { addUser } from "../../service/api.js";


const CategoryForm = () =>{

    const [user, setUser] = useState({
        name:'',
        mobile:'',
        image:''
    })

    const [input, setInput] = useState('')
    const [inputmobile, setInputMobile] = useState('')
    const [inputImage, setImage] = useState('')

    const handleInputChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
        setInput(e.target.value)
        console.log(user)
    }

    const handleMobile = (e) =>{
        setUser({...user, [e.target.name] : e.target.value})
        setInputMobile(e.target.value)
        const onlyNums = e.target.value.replace(/[^0-9]/g, '')
        setInputMobile(onlyNums)
        console.log(user)
    }

    const handleImage = (e) =>{
        setImage(e.target.file)
        setUser({...user, image : e.target.files[0]});
    }
  
    const isError = input === ''
    const isErrorMobile = inputmobile === ''
    const isErrorImage = inputImage === ''

    const nameValid = useRef(null);
    const validMobile = useRef(null)
    const imageValid = useRef(null)

    const submitData = async (e) =>{
        e.preventDefault()
        if(!user.name){
            alert('Please Enter Your Name !')
            nameValid.current.focus()
        }else if(!user.mobile){
            alert("Enter Your Mobile !")
            validMobile.current.focus()
        }else if(user.mobile.length !== 10){
            alert("Please Enter Your Valid Mobile No!")
            validMobile.current.focus()
        }else if(!user.image){
            alert("Please Upload Image!")
            imageValid.current.focus()
        }else{
            const formData = new FormData()
            formData.append('image', user.image, user.image.name)
            formData.append('name', user.name)
            formData.append('mobile', user.mobile)

            const res = await addUser(formData)
            if(res.status === 201){
                Swal.fire({
                    title: "Success",
                    text: res.data,
                    icon: "success"
                  });
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        }
    }

    return(
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
                                        <FormLabel fontSize={'14px'}>Name <sup><span style={{color:'red'}}>*</span></sup></FormLabel>
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
                                        <FormLabel fontSize={'14px'} mt={4}>Mobile No. <sup><span style={{color:'red'}}>*</span></sup></FormLabel>
                                        <Input 
                                            type='text' 
                                            name="mobile"
                                            value={inputmobile} 
                                            placeholder="Enter Your Name"
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

                                    <FormControl isInvalid={isErrorImage}>
                                        <FormLabel fontSize={'14px'} mt={4}>Image <sup><span style={{color:'red'}}>*</span></sup></FormLabel>
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