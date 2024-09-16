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
    price: Number,
    description: String,
    image: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category
});

const Product = mongoose.model('Product', productSchema);

// Define the User schema
const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    address: String,
    phone: String,
});

const User = mongoose.model('User', userSchema);

// Define the Order schema
const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Array of Product references
    totalAmount: Number,
    status: { type: String, default: 'Pending' },
    orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export { Category, Product, User, Order };
