# Google Docs Integration for Samplify Chatbot

## Overview
This integration allows the Samplify chatbot to access custom knowledge stored in Google Docs, enabling more accurate and detailed responses to user queries.

## Setup Instructions

### 1. Prepare Your Google Doc
1. Your knowledge base document is already configured: https://docs.google.com/document/d/1_b1hnQ4hyelVgfj1ft2Xv6yfI8-CqkKHzI7A4m7FYZM/edit?usp=sharing
2. Make sure the document is publicly accessible:
   - Click "Share" in the top right corner
   - Change access to "Anyone with the link can view"
   - This ensures the chatbot can access the content

### 2. Configure the Integration
1. Open `assets/js/google-docs-api.js` in a text editor
2. The document ID has already been configured to use your knowledge base document: `1_b1hnQ4hyelVgfj1ft2Xv6yfI8-CqkKHzI7A4m7FYZM`
3. Save the file

### 3. Test the Integration
1. Open the website in a browser
2. Click the chatbot button
3. Complete the user information collection
4. Ask questions related to the content in your Google Doc

## How It Works
1. When a user sends a message, the chatbot first attempts to get a response from the enhanced Gemini API
2. The enhanced API fetches content from your Google Doc
3. The Google Doc content is added to the context provided to Gemini
4. Gemini generates a response based on both its general knowledge and your custom knowledge
5. The response is displayed to the user and stored in Google Sheets

## Troubleshooting
- If the chatbot doesn't access your Google Doc content, verify that:
  - The document ID is correct (should be: 1_b1hnQ4hyelVgfj1ft2Xv6yfI8-CqkKHzI7A4m7FYZM)
  - The document is publicly accessible
  - The document contains text content (not just images)
- Check the browser console for error messages
- Ensure all JavaScript files are properly loaded in your HTML

## Best Practices
1. Keep your Google Doc organized with clear headings and sections
2. Regularly update the document with new information
3. Avoid including sensitive information in publicly accessible documents
4. Test the chatbot with various queries to ensure it's using your custom knowledge effectively