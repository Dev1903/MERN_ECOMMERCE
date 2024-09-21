import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const client = new MongoClient(process.env.MONGODB_URI);

    if (req.method === 'POST') {
        try {
            await client.connect();
            const database = client.db('MERN_ECOMMERCE');
            const collection = database.collection('categories');

            const newCategory = req.body;
            const result = await collection.insertOne(newCategory);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add category' });
        } finally {
            await client.close();
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        try {
            await client.connect();
            const database = client.db('MERN_ECOMMERCE');
            const collection = database.collection('categories');

            const result = await collection.deleteOne({ _id: new ObjectId(id) });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete category' });
        } finally {
            await client.close();
        }
    } else {
        res.setHeader('Allow', ['POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
