import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import axios from 'axios';
import { songTasks } from '$lib/songTasks';

const generateTaskId = (): string => {
	return Math.random().toString(36).substring(2, 15);
};

const generateSunoPrompt = (emotions: string[], keywords: string, language: string): string => {
	// Create a concise prompt that fits within Suno's 400 character limit
	// This is just for style/mood guidance, not the actual lyrics
	let prompt = '';
	
	// Add language instruction
	if (language === 'si') {
		prompt += 'Sinhala song. ';
	} else if (language === 'ta') {
		prompt += 'Tamil song. ';
	} else {
		prompt += 'English song. ';
	}
	
	// Add emotional context
	if (emotions.length > 0) {
		prompt += `${emotions.join(' and ')} emotions. `;
	}
	
	// Add keywords context
	if (keywords) {
		prompt += `About ${keywords}. `;
	}
	
	// Add style guidance
	prompt += 'Create emotional song with vocals. Professional production.';
	
	// Ensure prompt is under 400 characters
	if (prompt.length > 400) {
		prompt = prompt.substring(0, 397) + '...';
	}
	
	return prompt;
};

const callSunoAPI = async (lyrics: string, stylePrompt: string, language: string): Promise<string> => {
	// Try multiple ways to get the API key
	const apiKey = process.env.SUNO_API_KEY || '578d457be085623870b24b79703bb29c';
	const baseUrl = process.env.SUNO_BASE_URL || 'https://api.sunoapi.org';
	
	if (!apiKey) {
		throw new Error('Suno API key not configured');
	}
	
	// Generate a title from the first line of lyrics
	const title = lyrics.split('\n')[0].substring(0, 80) || 'Generated Song';
	
	// Create tags based on language and style
	const tags = language === 'si' ? 'sinhala, pop, emotional' : 
	             language === 'ta' ? 'tamil, pop, emotional' : 
	             'pop, emotional, heartfelt';
	
	const response = await axios.post(`${baseUrl}/api/v1/generate`, {
		custom_mode: true,  // Enable custom mode to use lyrics
		prompt: lyrics,     // The actual lyrics go here
		title: title,       // Song title
		tags: tags,         // Style tags
		instrumental: false,  // Include vocals (correct parameter name)
		model: 'V3_5',
		callBackUrl: 'https://your-app.com/callback'
	}, {
		headers: {
			'Authorization': `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		timeout: 30000
	});
	
	if (response.data.code === 200) {
		return response.data.data.taskId;
	} else {
		throw new Error(`Suno API Error: ${response.data.msg}`);
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { emotions, keywords, lyrics, language } = await request.json();
		
		console.log('Received song generation request:', { emotions, keywords, language, lyricsLength: lyrics?.length });
		
		// Create a task ID for tracking
		const taskId = generateTaskId();
		
		// Generate style prompt for Suno (just for mood/style guidance)
		const stylePrompt = generateSunoPrompt(emotions, keywords, language);
		console.log('Generated style prompt (length:', stylePrompt.length, '):', stylePrompt);
		console.log('Using lyrics (length:', lyrics.length, '):', lyrics.substring(0, 100) + '...');
		
		// Call Suno API with the actual lyrics
		const sunoTaskId = await callSunoAPI(lyrics, stylePrompt, language);
		console.log('Suno API response - Task ID:', sunoTaskId);
		
		// Initialize task with Suno task ID
		songTasks[taskId] = { 
			status: 'pending', 
			sunoTaskId: sunoTaskId 
		};
		
		return json({
			success: true,
			taskId,
			sunoTaskId,
			message: 'Song generation started with Suno AI using your lyrics',
			language,
			stylePrompt: stylePrompt,
			lyricsUsed: lyrics.substring(0, 100) + '...'
		});
	} catch (error) {
		console.error('Suno API Error:', error);
		return json({
			success: false,
			error: error instanceof Error ? error.message : 'Failed to start song generation'
		}, { status: 500 });
	}
};