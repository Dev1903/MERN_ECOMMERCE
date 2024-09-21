import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const client = new MongoClient(process.env.MONGODB_URI);

    if (req.method === 'GET') {
        try {
            await client.connect();
            const database = client.db('MERN_ECOMMERCE');
            const collection = database.collection('categories');

            const categories = await collection.find({}).toArray();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch categories' });
        } finally {
            await client.close();
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
