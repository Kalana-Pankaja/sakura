import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import axios from 'axios';
import { songTasks } from '$lib/songTasks';

const checkSunoStatus = async (sunoTaskId: string): Promise<{ status: string, songUrl?: string, error?: string }> => {
	// Try multiple ways to get the API key
	const apiKey = process.env.SUNO_API_KEY || '578d457be085623870b24b79703bb29c';
	const baseUrl = process.env.SUNO_BASE_URL || 'https://api.sunoapi.org';
	
	if (!apiKey) {
		throw new Error('Suno API key not configured');
	}
	
	const response = await axios.get(`${baseUrl}/api/v1/generate/record-info?taskId=${sunoTaskId}`, {
		headers: {
			'Authorization': `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		timeout: 10000
	});
	
	if (response.data.code === 200) {
		const data = response.data.data;
		console.log('Suno status check response:', JSON.stringify(data, null, 2));
		
		if (data.status === 'SUCCESS' && data.response && data.response.sunoData && data.response.sunoData.length > 0) {
			// Return the first song's audio URL
			const song = data.response.sunoData[0];
			console.log('Song generated successfully:', song.title, song.audioUrl);
			return {
				status: 'completed',
				songUrl: song.audioUrl
			};
		} else if (data.status === 'FAILED' || data.status === 'ERROR') {
			console.log('Song generation failed:', data.errorMessage);
			return {
				status: 'failed',
				error: data.errorMessage || 'Song generation failed'
			};
		} else {
			console.log('Song still processing, status:', data.status);
			return {
				status: 'pending'
			};
		}
	} else {
		console.log('Suno API error response:', response.data);
		throw new Error(`Suno API Error: ${response.data.msg}`);
	}
};

export const GET: RequestHandler = async ({ params }) => {
	const { taskId } = params;
	
	if (!taskId) {
		throw error(400, 'Task ID is required');
	}
	
	const task = songTasks[taskId];
	
	if (!task) {
		throw error(404, 'Task not found');
	}
	
	// If we have a Suno task ID, check its status
	if (task.sunoTaskId && task.status === 'pending') {
		try {
			const sunoStatus = await checkSunoStatus(task.sunoTaskId);
			
			if (sunoStatus.status === 'completed') {
				task.status = 'completed';
				task.songUrl = sunoStatus.songUrl;
			} else if (sunoStatus.status === 'failed') {
				task.status = 'failed';
				task.error = sunoStatus.error;
			}
		} catch (err) {
			console.error('Error checking Suno status:', err);
			// Don't update task status on error, just return current status
		}
	}
	
	return json({
		taskId,
		status: task.status,
		songUrl: task.songUrl,
		error: task.error,
		sunoTaskId: task.sunoTaskId
	});
};