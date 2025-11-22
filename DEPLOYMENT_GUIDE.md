# Deployment Guide for Google Apps Script

## Steps to Deploy Your Google Apps Script

1. **Copy the Script Code**
   - Open the file `integration/google_sheets_script.js`
   - Copy all the code from this file

2. **Create a New Google Apps Script Project**
   - Go to https://script.google.com/
   - Sign in with your Google account
   - Click "New Project"

3. **Paste the Code**
   - Delete the default code in the new project
   - Paste the code you copied from `google_sheets_script.js`

4. **Save the Project**
   - Click the "Save project" button (disk icon) or press Ctrl+S
   - Give your project a name like "Samplify Chat Data Storage"

5. **Initialize Your Google Sheet**
   - In the Apps Script editor, select `initializeSheet` function from the dropdown next to the Debug button
   - Click the "Run" button to initialize your sheet with the correct headers
   - Grant necessary permissions when prompted

6. **Deploy as Web App**
   - Click "Deploy" → "New deployment"
   - Click the gear icon and select "Web app"
   - Set the following options:
     - Description: Samplify Chat Data Storage
     - Execute as: Me
     - Who has access: Anyone, even anonymous
   - Click "Deploy"
   - Copy the Web App URL - you'll need this for the next step

7. **Update the JavaScript Files**
   - Open `assets/js/script.js`
   - Find both instances of `'YOUR_WEB_APP_URL'` (lines ~370 and ~389)
   - Replace them with your actual Web App URL
   - Save the file

8. **Test the Integration**
   - Open your website
   - Click the chatbot button
   - Complete the user information collection
   - Check your Google Sheet to verify data is being stored

## Troubleshooting

- If you get permission errors, make sure you set "Who has access" to "Anyone, even anonymous"
- If data isn't saving, verify that your Sheet ID is correct in the script
- Check the Apps Script execution logs for error messages by going to "Executions" in the left sidebar