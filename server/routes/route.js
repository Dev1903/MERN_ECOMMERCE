import express from "express";
import multer from "multer";
import { User, Category, Product, Order } from "../schema/schemas.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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

// Login User
router.post("/loginUser", async (req, res) => {
  // console.log(req.body);

  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: username }, { mobile: username }],
    });
    // console.log(user._id)

    if (!user) {
      return res.status(404).send("User not found");
    }
    // console.log(bcrypt.hash(user.password, 10))
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }
    // console.log(process.env.JWT_SECRET)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // console.log(token)
    return res
      .status(200)
      .json({
        token,
        user: { id: user._id, email: user.email, mobile: user.mobile },
      });
  } catch (error) {
    console.error(error); // Log any errors for debugging
    return res.status(500).send("Server error");
  }
});

// Fetch a specific user by their userId
router.get("/getUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId); // Get the userId from the request parameters
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
router.put(
  "/updateCategory/:id",
  categoryUpload.single("image"),
  async (req, res) => {
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

    console;
    // Convert userId to ObjectId if necessary
    const order = new Order({
      paymentID: paymentId,
      user: req.body.user, // Convert userId to ObjectId
      products: formattedProducts, // Correctly formatted products array
      amount: totalAmount,
    });
    console.log(order);

    await order.save();
    res.status(201).json("Order created successfully");
  } catch (error) {
    console.error("Error while creating order:", error.message);
    res.status(500).json("Error while creating order");
  }
});

// Get Order by userId
router.get("/orders/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log("User ID:", userId);

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

    console.log("Orders found:", orders);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json("Error fetching orders");
  }
});



export default router;
