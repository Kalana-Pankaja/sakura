import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

async function testSunoAPI() {
    console.log('Testing Suno API...');
    console.log('API Key:', process.env.SUNO_API_KEY ? 'Found' : 'Not found');
    
    if (!process.env.SUNO_API_KEY) {
        console.error('SUNO_API_KEY not found in environment');
        return;
    }
    
    try {
        const response = await axios.post('https://api.sunoapi.org/api/v1/generate', {
            prompt: 'A cheerful pop song about coding and technology',
            customMode: false,
            instrumental: false,
            model: 'V3_5',
            callBackUrl: 'https://your-app.com/callback'
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.SUNO_API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });
        
        console.log('✅ Suno API Response:', response.data);
    } catch (error) {
        console.error('❌ Suno API Error:', error.response ? error.response.data : error.message);
    }
}

testSunoAPI();
