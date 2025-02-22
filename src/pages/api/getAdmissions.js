import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Google Sheets API credentials from environment variables
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const SHEET_NAME = 'admissions'; // Name of the sheet where data is stored

// Authenticate with Google Sheets API
const auth = new JWT({
  email: GOOGLE_CLIENT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'], // Read-only access
});

const sheets = google.sheets({ version: 'v4', auth });

// API route handler for fetching data
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch data from the Google Sheet
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${SHEET_NAME}!A1:Z`, // Fetch all rows and columns from the sheet
      });

      const data = response.data.values;

      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'No data found in the sheet.' });
      }

      // Convert the sheet data into JSON format
      const headers = data[0]; // First row contains headers
      const rows = data.slice(1); // Remaining rows contain data

      const admissionsData = rows.map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] || ''; // Map each header to its corresponding row value
        });
        return obj;
      });

      // Send the fetched data as the response
      return res.status(200).json({ data: admissionsData });
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
      return res.status(500).json({ error: 'Failed to fetch data. Please try again.' });
    }
  } else {
    // Handle any other HTTP methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}