//index.js
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import Connection from './database/db.js';
import Routes from './routes/route.js';

const app = express()
const PORT = 8000;

app.use(cors({
    origin:'http://localhost:3000' || 'https://your-vercel-app-url.vercel.app', // Adjust to your Vercel URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add methods as needed
}));
app.use(bodyParser.json({ extended : true }))
app.use(bodyParser.urlencoded({ extended : true }))
Connection()

app.use('/', Routes)
app.use('/images/category-logo', express.static('images/category-logo'))
app.use('/images/product-images', express.static('images/product-images'))

app.listen(PORT, () => console.log(`Server Running On Port Number ${PORT}`))