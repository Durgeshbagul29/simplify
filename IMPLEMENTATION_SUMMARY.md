# Samplify Chatbot Implementation Summary

## Overview
The chatbot has been enhanced to:
1. Collect user information (name, phone, address) before starting conversations
2. Store all user data and chat conversations in your Google Sheet
3. Use Google's Gemini AI for knowledge-based responses

## Files Modified/Created

### New Files
1. **CONFIG.js** - Configuration file containing your Google Sheet ID and Web App URL placeholder
2. **DEPLOYMENT_GUIDE.md** - Step-by-step guide for deploying the Google Apps Script
3. **integration/google_sheets_script.js** - Updated with your specific Google Sheet ID

### Modified Files
1. **index.html** - Added reference to CONFIG.js
2. **assets/js/script.js** - Updated to use configuration values and improved error handling

## Google Sheet Structure
Your Google Sheet (ID: 1v6f_0YYf65yHuBBEtVusPBJJF5rjkFcnKLthhp3IWf4) will have the following columns:
1. **Timestamp** - When the data was recorded
2. **Name** - User's name collected during the chat
3. **Phone** - User's phone number collected during the chat
4. **Address** - User's address collected during the chat
5. **Message** - The chat messages (both user and bot messages)

## Next Steps

### 1. Deploy Google Apps Script
Follow the steps in DEPLOYMENT_GUIDE.md:
1. Copy the code from `integration/google_sheets_script.js`
2. Create a new Google Apps Script project
3. Paste the code and save the project
4. Run `initializeSheet()` to set up your Google Sheet
5. Deploy as Web App with "Anyone, even anonymous" access
6. Copy the Web App URL

### 2. Update Configuration
1. Open `CONFIG.js`
2. Replace `'YOUR_WEB_APP_URL'` with your actual Web App URL
3. Save the file

### 3. Test the Integration
1. Open your website
2. Click the chatbot button
3. Complete the user information collection
4. Check your Google Sheet to verify data is being stored

## How It Works

1. When users click the chatbot button, they're prompted to provide their information
2. This information is immediately stored in your Google Sheet via the Apps Script Web App
3. After collecting user information, the chatbot uses Gemini AI to provide knowledge-based responses
4. All chat conversations are also stored in the same Google Sheet for future reference

## Troubleshooting

- If data isn't saving to your Google Sheet, verify the Web App URL is correctly configured in CONFIG.js
- Check that the Google Apps Script is deployed with "Anyone" access
- Look for JavaScript errors in the browser console (F12)