# Samplify Chatbot Setup Guide

This guide will walk you through setting up the complete chatbot solution with user data collection and knowledge-based responses.

## Overview

The chatbot now:
1. Collects user information (name, phone, address) before starting the conversation
2. Stores all user data and chat conversations in Google Sheets
3. Uses Google's Gemini AI for knowledge-based responses

## Prerequisites

1. A Google account
2. Access to Google Sheets, Google Apps Script, and Google AI Studio

## Setup Steps

### 1. Google Sheets Integration

1. Navigate to the `integration` directory
2. Follow the instructions in `SETUP_INSTRUCTIONS.md` to:
   - Create a Google Sheet for data storage
   - Set up the Google Apps Script
   - Deploy it as a Web App
   - Copy the Web App URL

3. Update the Web App URL in `assets/js/script.js`:
   - Find the line with `'YOUR_WEB_APP_URL'`
   - Replace it with your actual Web App URL (should appear twice)

### 2. Gemini API Integration

1. Follow the instructions in `integration/GEMINI_API_SETUP.md` to:
   - Obtain a Gemini API key from Google AI Studio
   - Copy the API key

2. Update the API key in `assets/js/gemini-api.js`:
   - Find the line with `'YOUR_GEMINI_API_KEY'`
   - Replace it with your actual API key

### 3. Final Configuration Check

Ensure your `index.html` includes both JavaScript files:
```html
<script src="assets/js/script.js"></script>
<script src="assets/js/gemini-api.js"></script>
```

### 4. Testing

1. Open `index.html` in a web browser
2. Click the chatbot button (circular icon in the bottom right)
3. Complete the user information collection:
   - Enter your name
   - Enter your phone number
   - Enter your address
4. Ask questions to test the Gemini AI integration
5. Check your Google Sheet to verify data is being stored

## Troubleshooting

### Common Issues

1. **Data not saving to Google Sheets**
   - Verify the Web App URL is correct in `script.js`
   - Check that the Google Apps Script is deployed with "Anyone" access
   - Look for CORS errors in the browser console

2. **Gemini API not responding**
   - Verify the API key is correct in `gemini-api.js`
   - Check that the API key has proper permissions
   - Look for network errors in the browser console

3. **Chatbot not collecting user data**
   - Ensure JavaScript files are loaded correctly
   - Check for JavaScript errors in the browser console

### Browser Console

Always check the browser's developer console (F12) for errors during testing. Look for:
- Network errors
- JavaScript exceptions
- CORS issues

## Customization

### Modifying User Data Fields

To collect additional user information:
1. Update the `userData` object in `script.js`
2. Modify the `collectionStep` logic to include new fields
3. Update the Google Apps Script to handle new fields
4. Modify the Google Sheet column structure

### Customizing Gemini AI Context

To provide more specific context to the AI:
1. Edit the `context` variable in `gemini-api.js`
2. Add information about your specific services or products
3. Adjust the prompt structure as needed

## Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **User Data**: Ensure compliance with data protection regulations
3. **Web App Access**: Restrict access to your Google Apps Script Web App as needed

## Support

For issues with this implementation, check:
1. Browser console for error messages
2. Google Apps Script execution logs
3. Google AI Studio API usage and quotas