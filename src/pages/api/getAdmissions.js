import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Google Sheets API credentials from environment variables
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const SHEET_NAME = 'admissions';

// Authenticate with Google Sheets API
const auth = new JWT({
  email: GOOGLE_CLIENT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Helper function to normalize headers
const normalizeHeader = (header) => {
  return header.trim()
    .replace(/\s+\/\s+/g, ' / ')  // Normalize spaces around slashes
    .replace(/\s+/g, ' ')         // Collapse multiple spaces
    .replace(/ - /g, '-')         // Fix E - mail to E-mail
    .replace(/^E ?- ?mail$/i, 'E-mail'); // Ensure consistent email header
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch data from the Google Sheet
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${SHEET_NAME}!A1:J`, // Match your 10 columns
      });

      const data = response.data.values;

      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'No data found in the sheet.' });
      }

      // Process headers
      const headers = data[0].map(normalizeHeader);
      const rows = data.slice(1);

      // Map rows to objects with normalized headers
      const admissionsData = rows.map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          // Handle empty cells
          obj[header] = row[index]?.trim() || '';
          
          // Special handling for date fields
          if (header === 'Date of Birth' || header === 'Timestamp') {
            obj[header] = row[index] || '';
          }
        });
        return obj;
      });

      return res.status(200).json({ 
        data: admissionsData.map(item => ({
          ...item,
          // Ensure consistent property names
          'E-mail': item['E-mail'] || '',
          'Phone number': item['Phone number'] || '',
          'Residence Address': item['Residence Address'] || '',
          'Type of Musical Instrument': item['Type of Musical Instrument'] || '',
          'Date of Birth': item['Date of Birth'] || '',
          'School / College / Occupation': item['School / College / Occupation'] || 
                                          item['School  /  College  /  Occupation'] || '',
          createdAt: item['Timestamp'] || new Date().toISOString()
        }))
      });

    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch data. Please try again.',
        details: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}