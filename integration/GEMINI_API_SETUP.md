# Gemini API Integration Setup Instructions

## Prerequisites
1. A Google account
2. Access to Google AI Studio

## Setup Steps

### 1. Get Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key - you'll need this for the chatbot configuration

### 2. Update Configuration
1. Open `assets/js/gemini-api.js` in a text editor
2. Replace `YOUR_GEMINI_API_KEY` with your actual API key
3. Save the file

### 3. Test the Integration
1. Open the website in a browser
2. Click the chatbot button
3. Complete the user information collection
4. Ask a question to test the Gemini API integration

## Troubleshooting
- If you get API key errors, verify that your API key is correct and has proper permissions
- If the chatbot doesn't respond, check the browser console for error messages
- Make sure you've included both `script.js` and `gemini-api.js` in your HTML