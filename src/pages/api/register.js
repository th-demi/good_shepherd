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

// API route handler for form submission
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Get the form data from the request body
      const {
        Name,
        'Activity Status': activityStatus,
        Gender,
        'School / College / Occupation': schoolOccupation,
        'E - mail': email,
        'Phone number': phoneNumber,
        'Residence Address': residenceAddress,
        'Type of Musical Instrument': instrumentType,
        'Date of Birth': dateOfBirth,
      } = req.body;

      // Ensure dateOfBirth is in a valid Date format
      const parsedDateOfBirth = new Date(dateOfBirth);

      if (isNaN(parsedDateOfBirth)) {
        return res.status(400).json({ error: 'Invalid date format for Date of Birth' });
      }

      // Connect to MongoDB
      const db = await connectToDatabase();

      // Prepare the data to be inserted into MongoDB
      const formData = {
        Name,
        'Activity Status': activityStatus || '',
        Gender,
        'School / College / Occupation': schoolOccupation || '',
        'E - mail': email || '',
        'Phone number': phoneNumber || '',
        'Residence Address': residenceAddress || '',
        'Type of Musical Instrument': instrumentType || '',
        'Date of Birth': parsedDateOfBirth,  // Store as a Date type
        createdAt: new Date(), // Optionally add a timestamp for when the form is submitted
      };

      // Insert the form data into MongoDB
      const result = await db.collection(COLLECTION_NAME).insertOne(formData);

      // Send a success response
      return res.status(200).json({ message: 'Form submitted successfully!', data: result });
    } catch (error) {
      console.error('Error inserting data into MongoDB:', error);
      return res.status(500).json({ error: 'Failed to submit the form. Please try again.' });
    }
  } else {
    // Handle any other HTTP methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
