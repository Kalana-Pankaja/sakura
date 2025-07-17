import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// In-memory storage for demo purposes
const songTasks: Record<string, { status: 'pending' | 'completed' | 'failed', songUrl?: string, error?: string }> = {};

const generateTaskId = (): string => {
	return Math.random().toString(36).substring(2, 15);
};

const simulateSongGeneration = async (taskId: string): Promise<void> => {
	// Simulate processing time (3-8 seconds)
	const processingTime = Math.random() * 5000 + 3000;
	
	setTimeout(() => {
		// 90% success rate for demo
		const success = Math.random() > 0.1;
		
		if (success) {
			// Generate a demo song URL (in real app, this would be actual audio file)
			const songUrl = `/demo-song-${taskId}.mp3`;
			songTasks[taskId] = {
				status: 'completed',
				songUrl
			};
		} else {
			songTasks[taskId] = {
				status: 'failed',
				error: 'Song generation failed due to server error'
			};
		}
	}, processingTime);
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { emotions, keywords, lyrics, language } = await request.json();
		
		// Create a task ID for tracking
		const taskId = generateTaskId();
		
		// Initialize task
		songTasks[taskId] = { status: 'pending' };
		
		// Start song generation simulation
		simulateSongGeneration(taskId);
		
		return json({
			success: true,
			taskId,
			message: 'Song generation started',
			language
		});
	} catch (error) {
		return json({
			success: false,
			error: 'Failed to start song generation'
		}, { status: 500 });
	}
};