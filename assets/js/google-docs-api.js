/**
 * Google Docs API Integration for Samplify Chatbot
 * 
 * This module handles fetching custom knowledge from Google Docs
 * to enhance the Gemini API responses with domain-specific information.
 */

// Google Docs document ID - Replace with your actual document ID
// Format: https://docs.google.com/document/d/DOCUMENT_ID/edit
const GOOGLE_DOC_ID = '1_b1hnQ4hyelVgfj1ft2Xv6yfI8-CqkKHzI7A4m7FYZM';

// Cache for storing fetched content to avoid repeated requests
let googleDocCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

/**
 * Fetch content from a Google Doc
 * Note: This requires the document to be publicly accessible or use proper authentication
 * For simplicity in this implementation, we're assuming public access
 * 
 * @returns {Promise<string>} The content of the Google Doc
 */
async function fetchGoogleDocContent() {
    try {
        // Check if we have cached content that's still valid
        const now = Date.now();
        if (googleDocCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
            console.log('Using cached Google Doc content');
            return googleDocCache;
        }
        
        console.log('Fetching Google Doc content with ID:', GOOGLE_DOC_ID);
        
        // Try multiple methods to fetch the content
        // Method 1: Try the export URL
        const exportUrl = `https://docs.google.com/document/export?format=txt&id=${GOOGLE_DOC_ID}`;
        console.log('Fetching from export URL:', exportUrl);
        
        const exportResponse = await fetch(exportUrl);
        
        if (exportResponse.ok) {
            const content = await exportResponse.text();
            console.log('Google Doc content length (export):', content.length);
            
            // Cache the content
            googleDocCache = content.trim();
            cacheTimestamp = now;
            
            return googleDocCache;
        }
        
        // Method 2: If export fails, try direct fetch with CORS proxy
        console.log('Export failed, trying alternative method');
        
        // For now, return empty if both methods fail
        // In a production environment, you might want to use a CORS proxy
        console.warn('Failed to fetch Google Doc content');
        return '';
    } catch (error) {
        console.error('Error fetching Google Doc content:', error);
        // Return cached content if available, otherwise empty string
        return googleDocCache || '';
    }
}

/**
 * Process Google Doc content to extract relevant knowledge
 * This implementation cleans and formats the content for better use
 * 
 * @returns {Promise<string>} Processed knowledge content
 */
async function getCustomKnowledge() {
    try {
        const docContent = await fetchGoogleDocContent();
        
        if (!docContent) {
            console.log('No content found in Google Doc');
            return '';
        }
        
        // Process the content to make it more useful
        // Remove excessive whitespace and normalize line endings
        let processedContent = docContent
            .replace(/\r\n/g, '\n')  // Normalize line endings
            .replace(/\r/g, '\n')    // Handle old Mac line endings
            .replace(/\n{3,}/g, '\n\n')  // Replace 3+ newlines with double newline
            .replace(/^\s+/gm, '')   // Remove leading whitespace from each line
            .trim();
        
        // If content is very long, we might want to summarize or extract key sections
        // For now, we'll return the processed content
        console.log('Processed Google Doc content length:', processedContent.length);
        
        return processedContent;
    } catch (error) {
        console.error('Error getting custom knowledge:', error);
        return '';
    }
}

/**
 * Enhanced Gemini API function that incorporates custom knowledge
 * 
 * @param {string} prompt - The user's message
 * @param {object} userData - User information (name, phone, email)
 * @returns {Promise<string>} The AI response enhanced with custom knowledge
 */
async function getEnhancedGeminiResponse(prompt, userData) {
    try {
        // Get custom knowledge from Google Docs
        const customKnowledge = await getCustomKnowledge();
        console.log('Custom knowledge fetched:', customKnowledge ? 'Content available' : 'No content', customKnowledge?.length || 0, 'characters');
        
        // Enhanced context for the AI about Samplify with custom knowledge
        // Limit the custom knowledge to prevent excessively large requests
        const maxKnowledgeLength = 8000; // Increased limit for better context
        const limitedKnowledge = customKnowledge && customKnowledge.length > maxKnowledgeLength 
            ? customKnowledge.substring(0, maxKnowledgeLength) + '\n\n... (content truncated)'
            : customKnowledge || '';
            
        // Create a more structured prompt that emphasizes using the knowledge base
        const context = `You are SamplifyBot, an expert assistant for Samplify, an advanced environmental sampling solution. 
        
YOUR PRIMARY ROLE:
You must answer user questions using the CUSTOM KNOWLEDGE BASE as your main source of truth. Only when the knowledge base doesn't contain relevant information should you use your general knowledge.

USER INFORMATION:
Name: ${userData.name}
Phone: ${userData.phone}
Email: ${userData.email}

ABOUT SAMPLIFY:
Samplify provides water and air quality testing solutions with real-time data entry, GPS capabilities, and comprehensive reporting.
The app supports multiple sample types including Water/Effluent, Ambient Air/Fugitive Emissions, Stack Emission, Environmental, Air/Swabs, Food, Noise, Solid Waste, and more.
Users can download the mobile app from Google Play Store.

CUSTOM KNOWLEDGE BASE FROM GOOGLE DOCS:
${limitedKnowledge || 'No specific knowledge base content available.'}

INSTRUCTIONS FOR ANSWERING:
1. SEARCH the knowledge base first for relevant information
2. If found, use that information as your primary answer
3. If not found, use your general knowledge but mention the limitation
4. Keep answers concise, no more than 3-4 lines
5. DO NOT mention or cite sources, just provide the information directly
6. Structure your answers clearly with bullet points or numbered lists when appropriate

Please answer the user's question using the above information:`;
        
        // Use the existing Gemini API key and URL from gemini-api.js
        const GEMINI_API_KEY = 'AIzaSyBpHF60Yx0KQ0fdJCmhfFbwVKhWekZBdbE'; // This should match gemini-api.js
        // Using the correct model name for Gemini API
        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        
        const requestBody = {
            contents: [{
                parts: [{
                    text: `${context}

USER QUESTION: ${prompt}

PROVIDE A CONCISE, ACCURATE ANSWER BASED ON THE ABOVE INFORMATION. KEEP YOUR ANSWER TO 3-4 LINES MAXIMUM. DO NOT MENTION OR CITE SOURCES. USE BULLET POINTS OR NUMBERED LISTS FOR CLARITY WHEN APPROPRIATE.`
                }]
            }],
            generationConfig: {
                temperature: 0.3, // Lower temperature for more factual responses
                topK: 30,
                topP: 0.9,
                maxOutputTokens: 500, // Reduced token limit for concise responsess
            }
        };

        // Debug information
        console.log('Enhanced Gemini API Request:', {
            url: GEMINI_API_URL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            // Note: Not logging full body to avoid exposing sensitive information
        });
        
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        console.log('Enhanced Gemini API Response:', {
            status: response.status,
            statusText: response.statusText
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
        console.error('Error getting enhanced Gemini response:', error);
        throw error;
    }
}

// Export functions for use in other modules
window.GoogleDocsAPI = {
    fetchGoogleDocContent,
    getCustomKnowledge,
    getEnhancedGeminiResponse
};

// Test function to verify Google Docs integration
async function testGoogleDocsIntegration() {
    try {
        console.log('Testing Google Docs integration...');
        const content = await fetchGoogleDocContent();
        console.log('Google Docs content fetched successfully:', content ? `${content.length} characters` : 'No content');
        
        if (content) {
            const knowledge = await getCustomKnowledge();
            console.log('Custom knowledge processed successfully:', knowledge ? `${knowledge.length} characters` : 'No knowledge');
            return true;
        }
        return false;
    } catch (error) {
        console.error('Google Docs integration test failed:', error);
        return false;
    }
}

// Expose test function globally
window.testGoogleDocsIntegration = testGoogleDocsIntegration;