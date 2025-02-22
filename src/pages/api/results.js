import { google } from "googleapis";
import { JWT } from "google-auth-library";

export default async function handler(req, res) {
  try {
    // Extract the school query parameter from the request
    const { school } = req.query;

    console.log("Received school parameter:", school); // Debugging

    // Validate the school parameter
    if (!school) {
      return res.status(400).json({ error: "School parameter is required." });
    }

    // Map school names to their respective sheet names
    const schoolSheets = {
      abrsm: "results_abrsm",
      trinity: "results_trinity",
      lcm: "results_lcm",
      rsl: "results_rsl",
      mtb: "results_mtb",
    };

    // Get the sheet name for the requested school
    const sheetName = schoolSheets[school.toLowerCase()];

    if (!sheetName) {
      return res.status(400).json({ error: "Invalid school specified." });
    }

    // Load service account credentials
    const auth = new JWT({
      email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
      key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
    const range = sheetName; // Use the sheet name for the requested school

    // Fetch data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const data = response.data;

    if (data.values) {
      // Convert the data into JSON format
      const headers = data.values[0];
      const rows = data.values.slice(1);
      const jsonData = rows.map((row) => {
        const obj = {};
        row.forEach((cell, index) => {
          obj[headers[index]] = cell;
        });
        return obj;
      });

      // Send the data as a response
      res.status(200).json(jsonData);
    } else {
      res.status(404).json({ error: "No data found in the sheet." });
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Error loading exam data from Google Sheets." });
  }
}