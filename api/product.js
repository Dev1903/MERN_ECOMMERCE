import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const client = new MongoClient(process.env.MONGODB_URI);

    if (req.method === 'POST') {
        try {
            await client.connect();
            const database = client.db('MERN_ECOMMERCE');
            const collection = database.collection('products');

            const newProduct = req.body;
            const result = await collection.insertOne(newProduct);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add product' });
        } finally {
            await client.close();
        }
    } else if (req.method === 'GET') {
        try {
            await client.connect();
            const database = client.db('MERN_ECOMMERCE');
            const collection = database.collection('products');

            const products = await collection.find({}).toArray();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch products' });
        } finally {
            await client.close();
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
