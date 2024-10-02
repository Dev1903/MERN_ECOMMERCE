import React from 'react'
import Searchbar from './Searchbar';
import Header from './Header';
import { Newsletter, Footer } from './Footer';
import { Box, Image, Text, Button } from '@chakra-ui/react';


const UnderMaintenence = () => {
    return (
        <div className='container-fluid'>
            <div className="row mb-2 searchbar">
                <Searchbar />
            </div>
            <div className="row mb-5 header">
                <Header />
            </div>
            <div className="container mt-4">

                <Box className="oops" textAlign="center" mt={10}>
                    <Image
                        src="/images/under-maintenence.png"
                        alt="Page is Under Maintenance"
                        boxSize="200px"
                        mb={4}
                        style={{ width: '250px', height: 'auto' }}
                    />
                    <Text className="head mb-4">Under Maintenance!</Text>
                    <Text className="desc">The Page is Under Maintenance. Sorry for the Inconvenience .</Text>
                    <Button className="btn btn-dark mb-5 mt-2" onClick={() => window.location.href = '/products'}>
                        Browse Products
                    </Button>
                </Box>

            </div>

            <div className="row mb-2 footer">
                <Newsletter />
                <Footer />
            </div>
        </div>
    )
}

export default UnderMaintenence
