import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// This endpoint simulates serving an audio file
// In a real app, this would serve actual generated audio files
export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;
	
	if (!id) {
		throw error(400, 'Song ID is required');
	}
	
	// Create a simple demo audio response
	// In reality, you'd return actual audio data
	const demoAudioData = new ArrayBuffer(1024);
	
	return new Response(demoAudioData, {
		headers: {
			'Content-Type': 'audio/mpeg',
			'Content-Length': demoAudioData.byteLength.toString(),
			'Cache-Control': 'public, max-age=3600'
		}
	});
};