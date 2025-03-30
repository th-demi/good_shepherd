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
      customer_name,
      registration_id,
      customer_phone,
      order_id,
      payment_id,
      payment_method,
      base_amount,
      gateway_charges,
      tax_on_gateway,
      amount_paid,
      courses,
      student_count,
      discount = 0
    } = req.body;

    const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;

    // Prepare the new row data
    const newRow = [
      new Date().toISOString(),
      customer_name,
      registration_id,
      customer_phone,
      order_id,
      payment_id,
      payment_method,
      base_amount,
      discount,
      gateway_charges,
      tax_on_gateway,
      amount_paid,
      student_count,
      courses.map(c => {
        const [name, days] = c.split(' (');
        return `${name} - ${days.replace(')', '')}`;
      }).join('; ')
    ];

    // Get sheet metadata to find the sheet ID
    const { data: { sheets: sheetList } } = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: 'sheets(properties(sheetId,title))'
    });

    const paymentSheet = sheetList.find(s => s.properties.title === 'payments');
    if (!paymentSheet) {
      throw new Error('Payments sheet not found');
    }

    // Batch update request
    const requests = [
      // Insert new row at row 2 (below headers)
      {
        insertDimension: {
          range: {
            sheetId: paymentSheet.properties.sheetId,
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
            sheetId: paymentSheet.properties.sheetId,
            startRowIndex: 1,
            endRowIndex: 2,
            startColumnIndex: 0,
            endColumnIndex: newRow.length
          },
          rows: [{
            values: newRow.map(value => ({
              userEnteredValue: typeof value === 'number' 
                ? { numberValue: value } 
                : { stringValue: value.toString() }
            }))
          }],
          fields: 'userEnteredValue'
        }
      }
    ];

    // Execute batch update
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: { requests }
    });

    return res.status(200).json({ 
      success: true,
      message: 'Payment stored successfully at the top'
    });

  } catch (error) {
    console.error('Error storing payment:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Failed to store payment',
      details: error.message 
    });
  }
}