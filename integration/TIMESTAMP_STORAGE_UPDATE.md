# Timestamp Storage Update

## Overview
This update ensures that timestamps are only stored once in Google Sheets when user data is first collected, preventing duplicate timestamp entries for subsequent interactions.

## Changes Made

### 1. Google Apps Script (`google_sheets_script.js`)
- Modified the script to only use a timestamp when explicitly provided by the client
- Removed automatic timestamp generation on every request
- Added conditional logic to only store timestamp when it's provided (first-time data collection)

### 2. Client-side JavaScript (`assets/js/script.js`)
- Updated the `storeUserDataWithApps` function to only send the timestamp parameter when it exists
- Ensured timestamp is only sent during the initial user data collection
- Improved the logic for constructing the request body to conditionally include timestamp

## Implementation Details

### Google Apps Script Changes
```javascript
// Before: Always generated a new timestamp
const timestamp = new Date();
sheet.appendRow([timestamp, name, phone, email, apps]);

// After: Only use provided timestamp, don't generate a new one
const timestamp = e.parameter.timestamp || '';
if (timestamp) {
  sheet.appendRow([timestamp, name, phone, email, apps]);
} else {
  sheet.appendRow(['', name, phone, email, apps]);
}
```

### Client-side JavaScript Changes
```javascript
// Before: Always sent a timestamp (generated if not existing)
const timestamp = data.timestamp ? data.timestamp : new Date().toISOString();
const body = `type=user&name=...&timestamp=${encodeURIComponent(timestamp)}`;

// After: Only send timestamp if it exists
let body = `type=user&name=...`;
if (data.timestamp) {
  body += `&timestamp=${encodeURIComponent(data.timestamp)}`;
}
```

## Verification
These changes ensure that:
1. Timestamps are only stored when user data is first collected
2. Subsequent interactions without new user details won't update or add timestamps
3. Only the required fields (name, phone, email, apps) are stored in Google Sheets
4. The existing functionality for storing user data remains intact