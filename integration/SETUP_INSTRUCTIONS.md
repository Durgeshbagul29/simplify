# Google Sheets Integration Setup Instructions

## Prerequisites
1. A Google account
2. Access to Google Sheets and Google Apps Script

## Setup Steps

### 1. Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Note the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

### 2. Create Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the contents of `google_sheets_script.js`
4. Replace `YOUR_SHEET_ID` with your actual Sheet ID
5. Save the project (Ctrl+S or Cmd+S)

### 3. Initialize the Sheet
1. In the Apps Script editor, select `initializeSheet` function from the dropdown
2. Click the "Run" button to initialize your sheet with headers
3. Grant necessary permissions when prompted

### 4. Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Click the gear icon and select "Web app"
3. Set the following options:
   - Description: Samplify Chat Data Storage
   - Execute as: Me
   - Who has access: Anyone, even anonymous
4. Click "Deploy"
5. Copy the Web App URL - you'll need this for the chatbot configuration

### 5. Update Chatbot Configuration
1. In your chatbot JavaScript code, replace the placeholder URL with your Web App URL
2. Test the integration by submitting data through the chatbot

## Troubleshooting
- If you get permission errors, check that you've set "Who has access" to "Anyone, even anonymous"
- If data isn't saving, verify that your Sheet ID is correct
- Check the Apps Script execution logs for error messages