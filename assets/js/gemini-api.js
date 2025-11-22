/**
 * Gemini API Integration for Samplify Chatbot
 * 
 * To use this integration:
 * 1. Get an API key from Google AI Studio: https://makersuite.google.com/app/apikey
 * 2. Replace 'YOUR_GEMINI_API_KEY' with your actual API key
 * 3. Include this script in your HTML after the main script.js
 */

// Replace 'YOUR_GEMINI_API_KEY' with your actual Gemini API key
const GEMINI_API_KEY = 'AIzaSyBpHF60Yx0KQ0fdJCmhfFbwVKhWekZBdbE';
// Using the correct model name for Gemini API
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Get response from Gemini API
 * @param {string} prompt - The user's message
 * @param {object} userData - User information (name, phone, email)
 * @returns {Promise<string>} - The AI response
 */
async function getGeminiResponse(prompt, userData) {
    try {
        // Context for the AI about Samplify
        const context = `You are a helpful assistant for Samplify, an environmental sampling solution. 
        The user's name is ${userData.name}, phone is ${userData.phone}, and email is ${userData.email}.
        Samplify provides water and air quality testing solutions with real-time data entry, GPS capabilities, and comprehensive reporting.
        The app supports multiple sample types including Water/Effluent, Ambient Air/Fugitive Emissions, Stack Emission, Environmental, Air/Swabs, Food, Noise, Solid Waste, and more.
        Users can download the mobile app from Google Play Store.
        
        INSTRUCTIONS: Keep answers concise (3-4 lines maximum) and do not mention or cite sources.`;
        
        const requestBody = {
            contents: [{
                parts: [{
                    text: `${context}\n\nUser: ${prompt}\nAssistant: Please provide a concise answer (3-4 lines maximum) without mentioning sources:`
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 500, // Reduced token limit for concise responses
            }
        };

        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('No response content received from Gemini API');
        }
    } catch (error) {
        console.error('Error getting Gemini response:', error);
        throw error;
    }
}

/**
 * Test function to verify API key and connectivity
 */
async function testGeminiAPI() {
    try {
        const testResponse = await getGeminiResponse("Hello, this is a test message.", {
            name: "Test User",
            phone: "123-456-7890",
            email: "test@example.com"
        });
        console.log('Gemini API test successful:', testResponse);
        return true;
    } catch (error) {
        console.error('Gemini API test failed:', error);
        return false;
    }
}