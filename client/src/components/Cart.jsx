import React from 'react';
import { Text, Box, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Searchbar from './Searchbar';
import { Newsletter, Footer } from './Footer';
import { useCart } from '../context/CartContext'; // Import the CartContext

const Cart = () => {
    const { cart, changeQuantity, totalQuantity } = useCart(); // Use changeQuantity from context

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className='container-fluid'>
            <div className="row mb-2 searchbar">
                <Searchbar totalQuantity={totalQuantity} /> {/* Pass totalQuantity as a prop */}
            </div>
            <div className="row mb-5 header">
                <Header />
            </div>
            <div className="container my-5">
                <h2 className="" style={{
                    fontFamily: 'Bebas Neue, cursive',
                    letterSpacing: '3px',
                    fontSize: 'xx-large'
                }}
                >My Cart</h2>
                <hr className="mb-4 mt-0" style={{ width: '40vw', border: '1px solid black' }} />
                {cart.length === 0 ? (
                    <Box className="oops" textAlign="center" mt={10}>
                        <Image
                            src="/images/cart-empty.png"
                            style={{ height: '', width: 'auto' }}
                            alt="No items in wishlist"
                            boxSize="200px"
                            mb={4}
                        />
                        <Text className="head mb-4">
                            Oops!
                        </Text>
                        <Text className="desc">
                            It looks like you haven't added any items to your wishlist yet.
                        </Text>
                        <Button className="btn btn-dark mb-5 mt-2" onClick={() => window.location.href = '/products'}>
                            Browse Products
                        </Button>
                    </Box>
                ) : (
                    <div className="mt-5">
                        {cart.map(item => (
                            <div key={item._id}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <Link to={`/product/${item._id}`} className="d-flex text-decoration-none text-black" style={{ flexGrow: 1 }}>
                                        <img src={`http://localhost:8000/images/product-images/${item.image}`} alt={item.name} className="cart-item-img" style={{ width: '100px' }} />
                                        <div className="flex-grow-1 ms-3">
                                            <h5 className="mb-1">{item.name}</h5>
                                            <p className="mb-1">{item.brand}</p>
                                        </div>
                                    </Link>
                                    <div className="buttons">
                                        <h5 className="mb-1">₹{(item.price * item.quantity).toFixed(2)}</h5>
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-dark btn-sm" onClick={() => changeQuantity(item._id, -1)}>
                                                <i className="fa-solid fa-minus"></i>
                                            </button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button className="btn btn-dark btn-sm" onClick={() => changeQuantity(item._id, 1)}>
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{ borderTop: "dashed 1px black" }} />
                            </div>
                        ))}
                        <div className="d-flex justify-content-between">
                            <h5>Total Price:</h5>
                            <h5>₹{totalPrice.toFixed(2)}</h5>
                        </div>
                    </div>
                )}
            </div>
            <div className="row mb-2 footer">
                <Newsletter />
                <Footer />
            </div>
        </div>
    );
};

export default Cart;
