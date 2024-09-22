import mongoose from 'mongoose';

// Define the Category schema
const categorySchema = mongoose.Schema({
    name: { type: String, unique: true, index: true },
    image: String,
});

const Category = mongoose.model('Category', categorySchema);

// Define the Product schema
const productSchema = mongoose.Schema({
    name: String,
    price: String,
    discountPrice: String,
    description: String,
    image: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    brand: String,
    stockQuantity: String,
    rating: Number,
    sku: String,


});

const Product = mongoose.model('Product', productSchema);

// Define the User schema
const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    address: String,
    mobile: String,
});

const User = mongoose.model('User', userSchema);

// Define the Order schema
const orderSchema = mongoose.Schema({
    paymentID: { type: String, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    totalAmount: Number,
    status: { type: String, default: 'Pending' },
    orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export { Category, Product, User, Order };
