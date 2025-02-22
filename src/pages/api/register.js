import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Google Sheets API credentials from environment variables
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const SHEET_NAME = 'admissions'; // Name of the sheet where data will be stored

// Authenticate with Google Sheets API
const auth = new JWT({
  email: GOOGLE_CLIENT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

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

      // Prepare the data to be appended to Google Sheets
      const rowData = [
        Name,
        activityStatus || '',
        Gender,
        schoolOccupation || '',
        email || '',
        phoneNumber || '',
        residenceAddress || '',
        instrumentType || '',
        parsedDateOfBirth.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        new Date().toISOString(), // Timestamp for when the form is submitted
      ];

      // Append the data to the Google Sheet
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${SHEET_NAME}!A1`, // Append to the first row of the sheet
        valueInputOption: 'USER_ENTERED', // Treat input as user-entered data
        insertDataOption: 'INSERT_ROWS', // Insert a new row
        resource: {
          values: [rowData], // Data to append
        },
      });

      // Send a success response
      return res.status(200).json({ message: 'Form submitted successfully!', data: response.data });
    } catch (error) {
      console.error('Error appending data to Google Sheets:', error);
      return res.status(500).json({ error: 'Failed to submit the form. Please try again.' });
    }
  } else {
    // Handle any other HTTP methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}