// src/utils/grokApi.js
const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';
const GROK_API_KEY = 'your-grok-api-key'; // Use environment variables

export const analyzeEmailWithGrok = async (emailContent) => {
    try {
        const response = await fetch(GROK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROK_API_KEY}`
            },
            body: JSON.stringify({
                model: "grok-beta",
                messages: [
                    {
                        role: "system",
                        content: "You are an email analysis assistant. Analyze emails for intent, sentiment, urgency, and extract key information for ERPNext integration."
                    },
                    {
                        role: "user",
                        content: `Analyze this email: ${emailContent}`
                    }
                ],
                temperature: 0.3
            })
        });

        if (!response.ok) {
            throw new Error(`Grok API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Grok API Error:', error);
        throw error;
    }
};