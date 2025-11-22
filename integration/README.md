# Samplify Chatbot Integration

This directory contains all the necessary files and instructions to integrate a knowledge-based chatbot with Google Sheets data storage.

## Components

1. **Google Sheets Integration** (`google_sheets_script.js`)
   - Google Apps Script to store user data and chat conversations in Google Sheets
   - Includes setup instructions in `SETUP_INSTRUCTIONS.md`

2. **Gemini API Integration** (`gemini-api.js`)
   - JavaScript module for integrating with Google's Gemini AI
   - Includes setup instructions in `GEMINI_API_SETUP.md`

3. **Chatbot Logic** (modified `assets/js/script.js`)
   - Enhanced chatbot with user data collection flow
   - Integration with both Google Sheets and Gemini API

4. **Google Docs Integration** (`google-docs-api.js`)
   - JavaScript module for integrating with Google Docs for custom knowledge
   - Includes setup instructions in `GOOGLE_DOCS_INTEGRATION.md`

## Setup Process

1. **Set up Google Sheets Integration**
   - Follow instructions in `SETUP_INSTRUCTIONS.md`
   - Deploy the Google Apps Script as a Web App
   - Update the Web App URL in `assets/js/script.js`

2. **Set up Gemini API Integration**
   - Follow instructions in `GEMINI_API_SETUP.md`
   - Obtain a Gemini API key
   - Update the API key in `assets/js/gemini-api.js`

3. **Set up Google Docs Integration**
   - Follow instructions in `GOOGLE_DOCS_INTEGRATION.md`
   - Create a Google Doc with your custom knowledge base
   - Make the document publicly accessible
   - Update the document ID in `assets/js/google-docs-api.js`

3. **Test the Integration**
   - Open the website in a browser
   - Click the chatbot button (bottom right)
   - Complete the user information collection
   - Ask questions to test the knowledge-based responses

## File Structure

```
integration/
├── google_sheets_script.js     # Google Apps Script code
├── gemini-api.js              # Gemini API integration
├── google-docs-api.js         # Google Docs integration
├── SETUP_INSTRUCTIONS.md      # Google Sheets setup guide
├── GEMINI_API_SETUP.md        # Gemini API setup guide
├── GOOGLE_DOCS_INTEGRATION.md # Google Docs setup guide
└── README.md                  # This file
```

## How It Works

1. When a user clicks the chatbot button, they're prompted to provide their:
   - Name
   - Phone number
   - Address

2. This information is immediately stored in Google Sheets via the Apps Script Web App

3. After collecting user information, the chatbot uses Gemini AI enhanced with custom knowledge from Google Docs to provide more accurate knowledge-based responses

4. All chat conversations are also stored in the same Google Sheet for future reference

## Customization

You can customize the chatbot behavior by modifying:
- The context provided to Gemini in `gemini-api.js`
- The user data collection flow in `assets/js/script.js`
- The Google Sheets column structure in `google_sheets_script.js`
- The custom knowledge base in your Google Doc