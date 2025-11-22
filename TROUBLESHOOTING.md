# Troubleshooting Google Sheets Data Storage

If data is not being stored in your Google Sheet, follow these steps to diagnose and fix the issue:

## 1. Verify Google Apps Script Deployment

1. Go to https://script.google.com/
2. Open your Samplify project
3. Click "Deploy" → "Manage deployments"
4. Make sure your Web App is deployed with these settings:
   - Execute as: Me
   - Who has access: Anyone, even anonymous
5. If settings are different, click the edit icon and update them
6. Click "Deploy" to redeploy with new settings

## 2. Test the Web App URL

1. Visit your Web App URL directly in a browser:
   https://script.google.com/macros/s/AKfycbw-FJHuxcPgJdgEGUNW4JkUqPmN23AylvWydBW9CBDTptIWcZrPvLYQRhmK47QVQsIZ/exec
2. You should see the message: "Google Sheets Integration Script is running"
3. If you see an error or warning about verification, click "Advanced" and then "Go to [app] (unsafe)"

## 3. Check Google Sheet Headers

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1v6f_0YYf65yHuBBEtVusPBJJF5rjkFcnKLthhp3IWf4/edit
2. The first row should have these headers:
   - Timestamp
   - Name
   - Phone
   - Address
   - Message
3. If headers are missing, run the `initializeSheet()` function in your Google Apps Script:
   - Go to https://script.google.com/
   - Open your project
   - Select `initializeSheet` from the function dropdown
   - Click the "Run" button

## 4. Test the Integration

1. Open your website in a browser
2. Click the chatbot button (bottom right)
3. Complete the user information collection
4. Check your Google Sheet to see if the data was added
5. Check the browser console (F12) for any errors

## 5. Check Browser Console for Errors

1. Open your website in a browser
2. Press F12 to open Developer Tools
3. Click the "Console" tab
4. Try to use the chatbot and submit data
5. Look for any error messages in red

## 6. Common Issues and Solutions

### Issue: CORS errors in console
**Solution**: This is expected with `mode: 'no-cors'` and doesn't prevent data from being stored.

### Issue: 404 or 403 errors
**Solution**: Check that your Web App is deployed with "Anyone, even anonymous" access.

### Issue: Data not appearing in sheet
**Solution**: Verify that the Sheet ID in your Google Apps Script is correct.

### Issue: Empty rows in sheet
**Solution**: Check that the parameter names in the JavaScript match those in the Google Apps Script.

## 7. Debugging Steps

1. Add more console.log statements in the storeUserData and storeChatData functions
2. Check the Google Apps Script execution logs:
   - Go to https://script.google.com/
   - Open your project
   - Click "Executions" in the left sidebar
   - Look for failed executions and check their logs

If you're still having issues after following these steps, please share any error messages you see in the browser console or Google Apps Script logs.