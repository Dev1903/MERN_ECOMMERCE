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
    products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Product ID
      quantity: { type: Number, required: true } // Quantity
    }
  ],
    totalAmount: Number,
    orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

const CartSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true }, // User ID
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 }, // Ensure quantity is at least 1
    price: { type: Number, required: true },
    image: {type: String}
  }]
});

const Cart = mongoose.model('Cart', CartSchema);

const WishlistSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true }, // User ID
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true }
  }]
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

export { Category, Product, User, Order, Cart, Wishlist };
