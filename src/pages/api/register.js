import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const auth = new JWT({
  email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
  key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
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

    // Validate and format date
    const parsedDateOfBirth = new Date(dateOfBirth);
    if (isNaN(parsedDateOfBirth)) {
      return res.status(400).json({ error: 'Invalid date format for Date of Birth' });
    }

    // Prepare the new row data
    const newRow = [
      Name,
      activityStatus || '',
      Gender,
      schoolOccupation || '',
      email || '',
      phoneNumber || '',
      residenceAddress || '',
      instrumentType || '',
      parsedDateOfBirth.toISOString().split('T')[0], // YYYY-MM-DD format
      new Date().toISOString(), // Submission timestamp
    ];

    // Get sheet metadata
    const { data: { sheets: sheetList } } = await sheets.spreadsheets.get({
      spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
      fields: 'sheets(properties(sheetId,title))'
    });

    const admissionSheet = sheetList.find(s => s.properties.title === 'admissions');
    if (!admissionSheet) {
      throw new Error('Admissions sheet not found');
    }

    // Batch update request
    const requests = [
      // Insert new empty row at row 2 (below headers)
      {
        insertDimension: {
          range: {
            sheetId: admissionSheet.properties.sheetId,
            dimension: 'ROWS',
            startIndex: 1, // Row 2 (0-based)
            endIndex: 2
          },
          inheritFromBefore: false
        }
      },
      // Add new data to the inserted row
      {
        updateCells: {
          range: {
            sheetId: admissionSheet.properties.sheetId,
            startRowIndex: 1,
            endRowIndex: 2,
            startColumnIndex: 0,
            endColumnIndex: newRow.length
          },
          rows: [{
            values: newRow.map((value, index) => {
              // Special formatting for date columns (columns I and J)
              if (index === 8 || index === 9) { // Date of Birth and Timestamp columns
                return {
                  userEnteredValue: { stringValue: value },
                  userEnteredFormat: { numberFormat: { type: 'DATE', pattern: 'yyyy-mm-dd' } }
                };
              }
              return { userEnteredValue: { stringValue: value } };
            })
          }],
          fields: 'userEnteredValue,userEnteredFormat.numberFormat'
        }
      }
    ];

    // Execute batch update
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
      resource: { requests }
    });

    return res.status(200).json({ 
      success: true,
      message: 'Admission recorded successfully at the top'
    });

  } catch (error) {
    console.error('Error storing admission:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Failed to record admission',
      details: error.message 
    });
  }
}