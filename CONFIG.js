/**
 * Configuration file for Samplify Chatbot
 * 
 * This file contains the configuration values needed for the chatbot to function properly.
 */

// Google Sheet ID - DO NOT CHANGE THIS
// This is the ID of your Google Sheet where chat data will be stored
const GOOGLE_SHEET_ID = '1v6f_0YYf65yHuBBEtVusPBJJF5rjkFcnKLthhp3IWf4';

// Google Apps Script Web App URL - Updated with your actual URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw-FJHuxcPgJdgEGUNW4JkUqPmN23AylvWydBW9CBDTptIWcZrPvLYQRhmK47QVQsIZ/exec';

// Export for use in other files
window.SamplifyConfig = {
    GOOGLE_SHEET_ID: GOOGLE_SHEET_ID,
    GOOGLE_SCRIPT_URL: GOOGLE_SCRIPT_URL
};