<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	
	let emotions: string[] = [];
	let keywords = '';
	let lyrics = '';
	let songUrl = '';
	let isGenerating = false;
	let error = '';
	let generationStatus = '';
	let lyricsLanguage = 'en';
	
	onMount(() => {
		const urlEmotions = $page.url.searchParams.get('emotions');
		const urlKeywords = $page.url.searchParams.get('keywords');
		const urlLyrics = $page.url.searchParams.get('lyrics');
		const urlLanguage = $page.url.searchParams.get('language');
		
		if (urlEmotions) {
			emotions = urlEmotions.split(',');
		}
		if (urlKeywords) {
			keywords = urlKeywords;
		}
		if (urlLyrics) {
			lyrics = urlLyrics;
		}
		if (urlLanguage) {
			lyricsLanguage = urlLanguage;
		}
	});
	
	async function generateSong() {
		isGenerating = true;
		error = '';
		songUrl = '';
		generationStatus = 'Connecting to Suno AI...';
		
		try {
			const response = await fetch('/api/generate-song', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					emotions,
					keywords,
					lyrics,
					language: lyricsLanguage
				})
			});
			
			if (!response.ok) {
				throw new Error('Failed to generate song');
			}
			
			const data = await response.json();
			
			if (data.taskId) {
				generationStatus = 'Song generation started with Suno AI...';
				// Poll for completion
				await pollSongGeneration(data.taskId);
			} else {
				songUrl = data.songUrl;
			}
		} catch (err) {
			error = 'Failed to generate song. Please try again.';
			console.error('Error:', err);
		} finally {
			isGenerating = false;
			generationStatus = '';
		}
	}
	
	async function pollSongGeneration(taskId: string) {
		const maxAttempts = 60; // Increased for Suno API (up to 2 minutes)
		let attempts = 0;
		
		while (attempts < maxAttempts) {
			try {
				generationStatus = `Suno AI is creating your song... (${attempts + 1}/60)`;
				
				const response = await fetch(`/api/song-status/${taskId}`);
				const data = await response.json();
				
				if (data.status === 'completed') {
					songUrl = data.songUrl;
					break;
				} else if (data.status === 'failed') {
					throw new Error(data.error || 'Song generation failed');
				}
				
				attempts++;
				await new Promise(resolve => setTimeout(resolve, 2000));
			} catch (err) {
				throw err;
			}
		}
		
		if (attempts >= maxAttempts) {
			throw new Error('Song generation timed out. Suno AI may be busy, please try again later.');
		}
	}
	
	function goBack() {
		goto(`/lyrics?emotions=${emotions.join(',')}&keywords=${keywords}&language=${lyricsLanguage}`);
	}
	
	function startOver() {
		goto('/');
	}
</script>

<div class="min-h-screen py-12 px-4 relative overflow-hidden">
	<div class="max-w-4xl mx-auto">
		<div class="text-center mb-12 fade-in">
			<h1 class="text-5xl font-light mb-6 title-gradient">🎵 Your Song</h1>
			<p class="text-xl font-light" style="color: var(--text-secondary);">AI-generated music from your emotions and lyrics</p>
		</div>
		
		<div class="section-card mb-8 fade-in">
			<div class="mb-6">
				<h3 class="text-lg font-medium mb-4 text-center" style="color: var(--text-primary);">Song Details:</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h4 class="font-medium mb-3 text-center" style="color: var(--text-secondary);">Emotions:</h4>
						<div class="flex flex-wrap gap-2 justify-center">
							{#each emotions as emotion}
								<span class="px-3 py-1 rounded-full text-sm font-medium" style="background: var(--rose-light); color: var(--text-primary);">
									{emotion}
								</span>
							{/each}
						</div>
					</div>
					{#if keywords}
						<div>
							<h4 class="font-medium mb-3 text-center" style="color: var(--text-secondary);">Keywords:</h4>
							<p class="text-center italic" style="color: var(--text-secondary);">"{keywords}"</p>
						</div>
					{/if}
				</div>
			</div>
			
			{#if lyrics}
				<div class="mb-8">
					<h3 class="text-lg font-medium mb-4 text-center" style="color: var(--text-primary);">Lyrics:</h3>
					<div class="poetry-card max-h-40 overflow-y-auto">
						<div class="poetry-text text-sm">{lyrics}</div>
					</div>
				</div>
			{/if}
			
			{#if !songUrl && !isGenerating}
				<div class="text-center">
					<button
						on:click={generateSong}
						class="button-card"
					>
						🎵 Generate Music with Suno AI 🎵
					</button>
					<p class="text-sm mt-3" style="color: var(--text-muted);">
						Powered by Suno AI - Creating personalized music from your lyrics
					</p>
				</div>
			{/if}
			
			{#if isGenerating}
				<div class="text-center py-12">
					<div class="sakura-spinner mb-6"></div>
					<p class="text-lg font-light" style="color: var(--text-secondary);">{generationStatus}</p>
					<p class="text-sm mt-2" style="color: var(--text-muted);">Suno AI is creating your personalized song... This may take 2-5 minutes.</p>
				</div>
			{/if}
			
			{#if error}
				<div class="text-center py-8">
					<div class="text-red-500 mb-4 text-lg">❌ {error}</div>
					<button
						on:click={generateSong}
						class="button-card"
					>
						Try Again
					</button>
				</div>
			{/if}
			
			{#if songUrl}
				<div class="text-center">
					<div class="mb-8">
						<h3 class="text-2xl font-medium mb-6" style="color: var(--text-primary);">🎉 Your Song is Ready!</h3>
						<div class="section-card" style="background: linear-gradient(135deg, var(--rose-soft), var(--rose-light));">
							<audio controls class="w-full mb-6">
								<source src={songUrl} type="audio/mpeg">
								Your browser does not support the audio element.
							</audio>
							<div class="flex flex-col sm:flex-row gap-4 justify-center">
								<a
									href={songUrl}
									download="sakura-song.mp3"
									class="button-card"
									style="background: linear-gradient(135deg, #10b981, #059669);"
								>
									📥 Download Song
								</a>
								<button
									on:click={() => navigator.share?.({title: 'My Sakura Song', url: songUrl})}
									class="button-card"
									style="background: linear-gradient(135deg, #3b82f6, #2563eb);"
								>
									📤 Share
								</button>
							</div>
						</div>
					</div>
				</div>
			{/if}
			
			<div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
				<button
					on:click={goBack}
					class="button-card"
					style="background: var(--rose-soft); color: var(--text-primary);"
				>
					← Back to Lyrics
				</button>
				<button
					on:click={startOver}
					class="button-card"
					style="background: linear-gradient(135deg, #6366f1, #4f46e5);"
				>
					🌸 Start Over
				</button>
			</div>
		</div>
	</div>
</div>