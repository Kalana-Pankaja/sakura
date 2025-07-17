import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// This would be shared with the generate-song endpoint in a real app
const songTasks: Record<string, { status: 'pending' | 'completed' | 'failed', songUrl?: string, error?: string }> = {};

export const GET: RequestHandler = async ({ params }) => {
	const { taskId } = params;
	
	if (!taskId) {
		throw error(400, 'Task ID is required');
	}
	
	const task = songTasks[taskId];
	
	if (!task) {
		throw error(404, 'Task not found');
	}
	
	return json({
		taskId,
		status: task.status,
		songUrl: task.songUrl,
		error: task.error
	});
};