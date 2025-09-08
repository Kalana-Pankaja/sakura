import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GOOGLE_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async () => {
	return json({
		sunoApiKey: process.env.SUNO_API_KEY ? 'Found' : 'Not found',
		googleApiKey: GOOGLE_API_KEY ? 'Found' : 'Not found',
		allEnvVars: Object.keys(process.env).filter(key => key.includes('SUNO') || key.includes('GOOGLE'))
	});
};
