import express from 'express';
import multer from 'multer';
import { User, Category, Product } from '../schema/schemas.js';

const router = express.Router();

// Storage configuration for category images
const categoryStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/category-logo');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const categoryUpload = multer({ storage: categoryStorage });

// Storage configuration for product images
const productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/product-images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const productUpload = multer({ storage: productStorage });

// Add User
router.post('/addUser', async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone
        });
        await user.save();
        res.status(201).json('User Successfully Inserted');
    } catch (error) {
        res.status(500).json('Error While Adding User');
    }
});

// Add Category
router.post('/addCategory', categoryUpload.single('image'), async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            image: req.file.originalname
        });
        await category.save();
        res.status(201).json('Category Successfully Inserted');
    } catch (error) {
        res.status(500).json('Error While Adding Category');
    }
});

// Add Product
router.post('/addProduct', productUpload.single('image'), async (req, res) => {
    try {
        const category = await Category.findOne({ name: req.body.category });
        if (!category) {
            return res.status(400).json('Category does not exist');
        }

        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            discountPrice: req.body.discountPrice, // Add discountPrice
            stockQuantity: req.body.stockQuantity, // Add stockQuantity
            category: category._id,
            brand: req.body.brand, // Add brand
            rating: req.body.rating, // Add rating
            sku: req.body.sku, // Add SKU
            description: req.body.description,
            image: req.file.originalname// Ensure image is uploaded
        });

        await product.save();
        res.status(201).json('Product Successfully Inserted');
    } catch (error) {
        res.status(500).json('Error While Adding Product');
    }
});

// Check if Category Exists
router.get('/checkCategory', async (req, res) => {
    const { categoryName } = req.query;
    try {
        const category = await Category.findOne({ name: categoryName });
        if (category) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        res.status(500).json('Error While Checking Category');
    }
});

// Get Categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json('Error While Fetching Categories');
    }
});

// Delete Category
router.delete('/deleteCategory/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (category) {
            res.status(200).json('Category Successfully Deleted');
        } else {
            res.status(404).json('Category Not Found');
        }
    } catch (error) {
        res.status(500).json('Error While Deleting Category');
    }
});

//Update Category
router.put('/updateCategory/:id', categoryUpload.single('image'), async (req, res) => {
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
            return res.status(404).json('Category Not Found');
        }

        // Update fields
        category.name = name || category.name;
        if (image) {
            category.image = image;
        }

        await category.save(); // Save updated category
        res.status(200).json('Category Successfully Updated');
    } catch (error) {
        res.status(500).json('Error While Updating Category');
    }
});

// Get products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json('Error While Fetching Products');
    }
});

export default router;
