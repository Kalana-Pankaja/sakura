import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { SUNO_API_KEY } from '$env/static/private';


const BASE_URL = "https://api.sunoapi.org";
console.log("Suno API Key:", SUNO_API_KEY); // For debugging, remove in production


// In-memory storage for demo purposes
const songTasks: Record<string, {
	status: 'pending' | 'completed' | 'failed',
	songUrl?: string,
	error?: string
}> = {};

// Generate random task ID
const generateTaskId = (): string => {
	return Math.random().toString(36).substring(2, 15);
};

// Utility function to call Suno API
async function callSunoApi(endpoint: string, data: object) {
	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${SUNO_API_KEY}`
			},
			body: JSON.stringify(data)
		});

		const result = await response.json();

		if (result.code !== 200) {
			throw new Error(`API error: ${result.msg}`);
		}

		return result;
	} catch (error) {
		console.error("API request failed:", error);
		throw error;
	}
}

// Generates the audio track asynchronously
async function generateAudio(prompt: string, taskId: string): Promise<void> {
	try {
		const data = {
			prompt,
			customMode: true,
			instrumental: false, // false to allow lyrics-based generation
			model: "V3_5",
			callBackUrl: `https://6899e2cfcd2f.ngrok-free.app/api/song-status/${taskId}` // Replace this with your real endpoint
		};

		const result = await callSunoApi(`/api/song-status/${taskId}`, data);

		songTasks[taskId] = {
			status: 'completed',
			songUrl: result?.data?.[0]?.audioUrl || `/demo-song-${taskId}.mp3`
		};
	} catch (error: any) {
		songTasks[taskId] = {
			status: 'failed',
			error: error?.message || 'Unknown error during audio generation'
		};
	}
}

// POST endpoint to start generating a song
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { emotions, keywords, lyrics, language } = await request.json();

		// Construct a prompt string using user input
		const prompt = `${language}: A song evoking ${emotions}, featuring keywords like ${keywords}. Lyrics: "${lyrics}"`;

		// Create a new task ID and mark it as pending
		const taskId = generateTaskId();
		songTasks[taskId] = { status: 'pending' };

		// Start the audio generation in the background
		generateAudio(prompt, taskId);

		return json({
			success: true,
			taskId,
			message: 'Song generation started',
			language
		});
	} catch (error) {
		console.error("POST error:", error);
		return json({
			success: false,
			error: 'Failed to start song generation'
		}, { status: 500 });
	}
};

// GET endpoint to check task status and audio URL
export const GET: RequestHandler = async ({ url }) => {
	const taskId = url.searchParams.get('taskId');

	if (!taskId || !songTasks[taskId]) {
		return json({
			success: false,
			error: 'Invalid or missing taskId'
		}, { status: 400 });
	}

	const task = songTasks[taskId];

	return json({
		success: true,
		status: task.status,
		songUrl: task.songUrl,
		error: task.error
	});
};
