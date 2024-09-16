import express from 'express';
import multer from 'multer';
import { User, Category, Product } from '../schema/schemas.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/category-logo');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

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
router.post('/addCategory', upload.single('image'), async (req, res) => {
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
router.post('/addProduct', upload.single('image'), async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.originalname,
            category: req.body.category // Assuming category ID is sent in request
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

export default router;
