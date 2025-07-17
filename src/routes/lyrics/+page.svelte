<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	
	let emotions: string[] = [];
	let keywords = '';
	let lyrics = '';
	let isLoading = false;
	let error = '';
	let lyricsLanguage = 'en';
	
	onMount(() => {
		const urlEmotions = $page.url.searchParams.get('emotions');
		const urlKeywords = $page.url.searchParams.get('keywords');
		const urlLanguage = $page.url.searchParams.get('language');
		
		if (urlEmotions) {
			emotions = urlEmotions.split(',');
		}
		if (urlKeywords) {
			keywords = urlKeywords;
		}
		if (urlLanguage) {
			lyricsLanguage = urlLanguage;
		}
		
		if (emotions.length > 0) {
			generateLyrics();
		}
	});
	
	async function generateLyrics() {
		isLoading = true;
		error = '';
		
		try {
			const response = await fetch('/api/generate-lyrics', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					emotions,
					keywords,
					language: lyricsLanguage
				})
			});
			
			if (!response.ok) {
				throw new Error('Failed to generate lyrics');
			}
			
			const data = await response.json();
			lyrics = data.lyrics;
		} catch (err) {
			error = 'Failed to generate lyrics. Please try again.';
			console.error('Error:', err);
		} finally {
			isLoading = false;
		}
	}
	
	function proceedToSong() {
		const params = new URLSearchParams({
			emotions: emotions.join(','),
			keywords: keywords,
			lyrics: lyrics,
			language: lyricsLanguage
		});
		
		goto(`/song?${params}`);
	}
	
	function goBack() {
		goto('/');
	}
</script>

<div class="min-h-screen py-12 px-4 relative overflow-hidden">
	<div class="max-w-4xl mx-auto">
		<div class="text-center mb-12 fade-in">
			<h1 class="text-5xl font-light mb-6 title-gradient">🌸 Your Lyrics</h1>
			<p class="text-xl font-light" style="color: var(--text-secondary);">Generated from your emotions and keywords</p>
		</div>
		
		<div class="section-card mb-8 fade-in">
			<div class="mb-8">
				<h3 class="text-lg font-medium mb-4 text-center" style="color: var(--text-primary);">Emotions Used:</h3>
				<div class="flex flex-wrap gap-3 justify-center">
					{#each emotions as emotion}
						<span class="px-4 py-2 rounded-full text-sm font-medium" style="background: var(--rose-light); color: var(--text-primary);">
							{emotion}
						</span>
					{/each}
				</div>
				{#if keywords}
					<div class="mt-6">
						<h3 class="text-lg font-medium mb-3 text-center" style="color: var(--text-primary);">Keywords:</h3>
						<p class="text-center italic" style="color: var(--text-secondary);">"{keywords}"</p>
					</div>
				{/if}
			</div>
			
			{#if isLoading}
				<div class="text-center py-16">
					<div class="sakura-spinner mb-6"></div>
					<p class="text-lg font-light" style="color: var(--text-secondary);">Generating your lyrics...</p>
				</div>
			{:else if error}
				<div class="text-center py-16">
					<div class="text-red-500 mb-6 text-lg">❌ {error}</div>
					<button
						on:click={generateLyrics}
						class="button-card"
					>
						Try Again
					</button>
				</div>
			{:else if lyrics}
				<div class="mb-10">
					<h2 class="text-2xl font-medium text-center mb-8" style="color: var(--text-primary);">Your Generated Lyrics</h2>
					<div class="poetry-card fade-in">
						<div class="poetry-text">{lyrics}</div>
					</div>
				</div>
				
				<div class="flex flex-col sm:flex-row gap-6 justify-center">
					<button
						on:click={goBack}
						class="button-card"
						style="background: var(--rose-soft); color: var(--text-primary);"
					>
						← Back to Emotions
					</button>
					<button
						on:click={generateLyrics}
						class="button-card"
						style="background: linear-gradient(135deg, var(--rose-light), var(--rose-medium));"
					>
						🔄 Regenerate Lyrics
					</button>
					<button
						on:click={proceedToSong}
						class="button-card"
					>
						Create Song 🎵
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>