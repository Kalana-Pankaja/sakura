import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';


// Ideally, this should be imported from a shared module
const songTasks: Record<string, {
	status: 'pending' | 'completed' | 'failed',
	songUrl?: string,
	error?: string
}> = {};


export const POST: RequestHandler = async ({ request, params }) => {
	const taskId = params.taskId;
	const body = await request.json();

	console.log("Callback received for task:", taskId);
	console.log("Data:", body);

	// handle and store song URL
	songTasks[taskId] = {
		status: 'completed',
		songUrl: body?.data?.[0]?.audioUrl || `/demo-song-${taskId}.mp3`
	};

	return json({ success: true });
};


// POST: Suno sends final audio to this endpoint
// export const POST: RequestHandler = async ({ request, params }) => {
// 	const { taskId } = params;

// 	if (!taskId) {
// 		return new Response('Missing taskId', { status: 400 });
// 	}

// 	try {
// 		const data = await request.json();
// 		const audioUrl = data?.audioUrl || data?.data?.[0]?.audioUrl;

// 		if (!audioUrl) {
// 			songTasks[taskId] = {
// 				status: 'failed',
// 				error: 'No audioUrl returned in webhook data'
// 			};
// 			return new Response('Missing audioUrl', { status: 400 });
// 		}

// 		songTasks[taskId] = {
// 			status: 'completed',
// 			songUrl: audioUrl
// 		};

// 		console.log(`✅ Suno completed for ${taskId}:`, audioUrl);
// 		return new Response('OK', { status: 200 });
// 	} catch (err) {
// 		songTasks[taskId] = {
// 			status: 'failed',
// 			error: 'Webhook processing error'
// 		};
// 		console.error(`❌ Webhook error for ${taskId}:`, err);
// 		return new Response('Webhook error', { status: 500 });
// 	}
// };

export const GET: RequestHandler = async ({ params }) => {
	const { taskId } = params;

	if (!taskId || !songTasks[taskId]) {
		return json({ success: false, error: 'Invalid or missing taskId' }, { status: 404 });
	}

	const task = songTasks[taskId];

	return json({
		success: true,
		status: task.status,
		songUrl: task.songUrl,
		error: task.error
	});
};
