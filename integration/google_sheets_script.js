/**
 * Google Apps Script to handle user data storage in Google Sheets
 * 
 * To use this script:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this code
 * 4. Deploy as Web App with access set to "Anyone, even anonymous"
 * 5. Copy the Web App URL for use in your chatbot
 */

// Using your specific Google Sheet ID: 1v6f_0YYf65yHuBBEtVusPBJJF5rjkFcnKLthhp3IWf4
const SHEET_ID = '1v6f_0YYf65yHuBBEtVusPBJJF5rjkFcnKLthhp3IWf4';

/**
 * Handle POST requests to store user data
 */
function doPost(e) {
  try {
    // Get the sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Get parameters from the request
    const name = e.parameter.name || '';
    const phone = e.parameter.phone || '';
    const email = e.parameter.email || '';
    const apps = e.parameter.apps || '';
    const timestamp = new Date();
    
    // Add data to the sheet (without message)
    sheet.appendRow([timestamp, name, phone, email, apps]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({result: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({result: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput('Google Sheets Integration Script is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Initialize the sheet with headers (run this once manually)
 */
function initializeSheet() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  sheet.clear(); // Clear existing data
  sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'Apps']);
}