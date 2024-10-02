import express from "express";
import multer from "multer";
import { User, Category, Product, Order, Cart, Wishlist } from "../schema/schemas.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const storage = multer.memoryStorage();

// Storage configuration for category images
const categoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/category-logo");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const categoryUpload = multer({ storage: categoryStorage });

// Storage configuration for product images
const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/product-images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const productUpload = multer({ storage: productStorage });

// Add User
const userUpload = multer({ storage });

// Ensure bcrypt is imported

router.post("/addUser", userUpload.none(), async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json("User already exists. Please log in.");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user instance
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, // Store hashed password
      address: req.body.address,
      mobile: req.body.mobile,
    });

    // Save the user to the database
    await user.save();
    res.status(201).json("User Successfully Inserted");
  } catch (error) {
    console.error("Error while adding user:", error);
    res.status(500).json("Error While Adding User");
  }
});

// Update User
router.put("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, address, mobile, email } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json("User Not Found");
    }

    // Update fields if they are provided, otherwise retain current values
    user.name = firstName && lastName ? `${firstName} ${lastName}` : user.name;
    user.address = address || user.address;
    user.mobile = mobile || user.mobile;
    user.email = email || user.email;

    await user.save(); // Save updated user
    res.status(200).json("User Successfully Updated");
  } catch (error) {
    console.error("Error While Updating User:", error);
    res.status(500).json("Error While Updating User");
  }
});


// Login User
router.post("/loginUser", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if admin credentials are used
    const isAdmin = username === process.env.ADMIN_USERNAME;
    
    const isAdminMatch = isAdmin ? await bcrypt.compare(password, process.env.ADMIN_PASSWORD) : false;

    // If admin credentials are correct, respond with 201
    if (isAdmin && isAdminMatch) {
      return res.status(201).json({ message: "Admin logged in successfully" });
    }
    const user = await User.findOne({
      $or: [{ email: username }, { mobile: username }],
    });

    // Check if user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    

    // Check normal user password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate JWT for normal user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json(token);
  } catch (error) {
    console.error(error); // Log any errors for debugging
    return res.status(500).send("Server error");
  }
});

// Fetch a specific user by their userId
router.get("/getUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    //console.log(userId); // Get the userId from the request parameters
    const user = await User.findById(userId); // Fetch user from the database using the userId
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user); // Return user details as JSON
  } catch (error) {
    console.error("Error while fetching user:", error);
    res.status(500).json({ message: "Error while fetching user" });
  }
});

// Add Category
router.post("/addCategory", categoryUpload.single("image"), async (req, res) => {
    try {
      const category = new Category({
        name: req.body.name,
        image: req.file.originalname,
      });
      await category.save();
      res.status(201).json("Category Successfully Inserted");
    } catch (error) {
      res.status(500).json("Error While Adding Category");
    }
  }
);

// Add Product
router.post("/addProduct", productUpload.single("image"), async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.body.category });
    if (!category) {
      return res.status(400).json("Category does not exist");
    }

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      discountPrice: req.body.discountPrice,
      stockQuantity: req.body.stockQuantity,
      category: category._id,
      brand: req.body.brand,
      rating: req.body.rating,
      sku: req.body.sku,
      description: req.body.description,
      image: req.file.originalname,
    });

    await product.save();
    res.status(201).json("Product Successfully Inserted");
  } catch (error) {
    res.status(500).json("Error While Adding Product");
  }
});

// Check if Category Exists
router.get("/checkCategory", async (req, res) => {
  const { categoryName } = req.query;
  try {
    const category = await Category.findOne({ name: categoryName });
    if (category) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json("Error While Checking Category");
  }
});

// Get Categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch categories from the database
    res.status(200).json(categories); // Return categories as JSON (this is already an array)
  } catch (error) {
    console.error("Error While Fetching Categories:", error);
    res.status(500).json({ message: "Error While Fetching Categories" });
  }
});

// Delete Category
router.delete("/deleteCategory/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (category) {
      res.status(200).json("Category Successfully Deleted");
    } else {
      res.status(404).json("Category Not Found");
    }
  } catch (error) {
    res.status(500).json("Error While Deleting Category");
  }
});

// Update Category
router.put("/updateCategory/:id", categoryUpload.single("image"), async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      let image;

      // Check if an image file is uploaded
      if (req.file) {
        image = req.file.originalname; // Use new uploaded image if provided
      }

      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json("Category Not Found");
      }

      // Update fields
      category.name = name || category.name;
      if (image) {
        category.image = image;
      }

      await category.save(); // Save updated category
      res.status(200).json("Category Successfully Updated");
    } catch (error) {
      res.status(500).json("Error While Updating Category");
    }
  }
);

// Get products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json("Error While Fetching Products");
  }
});

// Get Product by ID
router.get("/getProduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    //console.log(`PRODUCTID:${productId}`) // Use productId instead of userId
    const product = await Product.findById(productId); // Fetch product from the database using productId
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product); // Return product details as JSON
  } catch (error) {
    console.error("Error while fetching product:", error);
    res.status(500).json({ message: "Error while fetching product" });
  }
});

// Update Product
router.put("/updateProduct/:id", productUpload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, price, discountPrice, description, sold, category, brand,
      stockQuantity, rating, sku
    } = req.body;
    let image;

    // Check if an image file is uploaded
    if (req.file) {
      image = req.file.originalname; // Use the new uploaded image if provided
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json("Product Not Found");
    }

    // Update fields if they are provided, otherwise retain current values
    product.name = name || product.name;
    product.price = price || product.price;
    product.discountPrice = discountPrice || product.discountPrice;
    product.description = description || product.description;
    product.sold = sold || product.sold; // Handle sold field
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.stockQuantity = stockQuantity || product.stockQuantity;
    product.rating = rating || product.rating;
    product.sku = sku || product.sku;

    // If a new image is uploaded, update the image field
    if (image) {
      product.image = image;
    }

    await product.save(); // Save updated product
    res.status(200).json("Product Successfully Updated");
  } catch (error) {
    console.error("Error While Updating Product:", error);
    res.status(500).json("Error While Updating Product");
  }
});

// Delete Product
router.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.status(200).json("Product Successfully Deleted");
    } else {
      res.status(404).json("Product Not Found");
    }
  } catch (error) {
    res.status(500).json("Error While Deleting Product");
  }
});

// Create Order
router.post("/createOrder", async (req, res) => {
  const { paymentId, products, totalAmount, userId, date, time } = req.body;

  try {
    // Map the product objects without converting _id, as they are already valid ObjectId strings
    const formattedProducts = products.map((item) => {
      return {
        product: item.product, // Use the _id directly as it's already an ObjectId string
        quantity: item.quantity,
      };
    });
    // Convert userId to ObjectId if necessary
    const order = new Order({
      paymentID: paymentId,
      user: req.body.user, // Convert userId to ObjectId
      products: formattedProducts, // Correctly formatted products array
      amount: totalAmount,
    });
    //console.log(order);

    await order.save();

    // Increment sold quantity for each product
    for (const item of formattedProducts) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { sold: item.quantity }, // Increment the sold field by quantity
      });
    }

    res.status(201).json("Order created successfully");
  } catch (error) {
    console.error("Error while creating order:", error.message);
    res.status(500).json("Error while creating order");
  }
});

// Get Order by userId
router.get("/orders/:userId", async (req, res) => {
  const userId = req.params.userId;
  //console.log("User ID:", userId);

  try {
    // Convert userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Fetch all orders for the given user ID
    const orders = await Order.find({ user: userObjectId })
       // Populate user data if necessary
      .populate({
        path: "products", // Assuming 'products' is an array of ObjectId references to 'Product'
        populate: {
          path: "product", // Populate the individual products within the array
          select: "name price image" // Only include these fields from the product
        }
      });

    //console.log("Orders found:", orders);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json("Error fetching orders");
  }
});

// Get Orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("products.product"); 
    // console.log(orders)// Fetch categories from the database
    res.status(200).json(orders); // Return categories as JSON (this is already an array)
  } catch (error) {
    console.error("Error While Fetching Orders:", error);
    res.status(500).json({ message: "Error While Fetching Orders" });
  }
});

// Update Order Status
router.patch("/updateOrderStatus/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json("Order Not Found");
    }

    order.status = req.body.status; // Set the new status
    await order.save(); // Save the updated order

    res.status(200).json("Order Status Successfully Updated");
  } catch (error) {
    res.status(500).json("Error While Updating Order Status");
  }
});

// Get cart data for a user
router.get('/cart/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    //console.log(`GET CART: ${userId}`);
    const cart = await Cart.findById(userId); // Fetch cart by user ID
    if (!cart) {
      return res.json([]);
    }
    res.json(cart); // Return the cart data
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update cart data for a user
router.put('/cart/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const  items  = req.body; // Get items from request body
    //console.log(JSON.stringify(req.body))

    // Upsert the cart: create if it doesn't exist, update if it does
    const updatedCart = await Cart.findByIdAndUpdate(userId,  items , { new: true, upsert: true });

    res.json(updatedCart); // Return the updated cart data
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/wishList/:userID', async (req, res) => {
  try {
    const userId = req.params.userID;
    //console.log(`GET WISHLIST: ${userId}`);
    const wishlist = await Wishlist.findById(userId);
    //console.log(wishlist) // Fetch wishlist by user ID
    if (!wishlist) {
      return res.json([]); // Return an empty array if no wishlist found
    }
    res.json(wishlist); // Return the wishlist data
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update wishlist data for a user
router.put('/wishList/:userID', async (req, res) => {
  try {
    const userId = req.params.userID;
    const items = req.body; // Get items from request body
    //console.log(JSON.stringify(req.body));

    // Upsert the wishlist: create if it doesn't exist, update if it does
    const updatedWishlist = await Wishlist.findByIdAndUpdate(userId, items, { new: true, upsert: true });

    res.json(updatedWishlist); // Return the updated wishlist data
  } catch (error) {
    console.error('Error updating wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
