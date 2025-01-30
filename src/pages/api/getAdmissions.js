// /pages/api/getAdmissions.js

import { MongoClient } from 'mongodb';

// MongoDB URI from environment variable
const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = 'gsimDB'; // Database name
const COLLECTION_NAME = 'admissions'; // Collection name

let cachedDb = null;

// Function to connect to MongoDB
async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DATABASE_NAME);
  cachedDb = db;
  return db;
}

// API route handler for fetching data
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Connect to MongoDB
      const db = await connectToDatabase();

      // Fetch data from the collection
      const admissionsData = await db.collection(COLLECTION_NAME).find({}).toArray();

      // Send the fetched data as the response
      return res.status(200).json({ data: admissionsData });
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      return res.status(500).json({ error: 'Failed to fetch data. Please try again.' });
    }
  } else {
    // Handle any other HTTP methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
