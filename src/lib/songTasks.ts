// Shared task storage for song generation
export interface SongTask {
	status: 'pending' | 'completed' | 'failed';
	songUrl?: string;
	error?: string;
	sunoTaskId?: string;
}

export const songTasks: Record<string, SongTask> = {};
