import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const client = new MongoClient(process.env.MONGODB_URI);

    if (req.method === 'POST') {
        try {
            await client.connect();
            const database = client.db('MERN_ECOMMERCE');
            const collection = database.collection('users');

            const newUser = req.body;
            const result = await collection.insertOne(newUser);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add user' });
        } finally {
            await client.close();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
