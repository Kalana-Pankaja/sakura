<script lang="ts">
	import { goto } from '$app/navigation';
	import { selectedLyricsLanguage, type LyricsLanguage } from '$lib/stores/language';
	import LyricsLanguageSelector from '$lib/LyricsLanguageSelector.svelte';
	
	const emotions = [
		{ name: 'Joy', emoji: '😊', color: 'bg-yellow-400' },
		{ name: 'Sadness', emoji: '😢', color: 'bg-blue-400' },
		{ name: 'Love', emoji: '❤️', color: 'bg-red-400' },
		{ name: 'Anger', emoji: '😠', color: 'bg-red-600' },
		{ name: 'Fear', emoji: '😨', color: 'bg-gray-600' },
		{ name: 'Hope', emoji: '🌟', color: 'bg-green-400' },
		{ name: 'Nostalgia', emoji: '🌅', color: 'bg-purple-400' },
		{ name: 'Excitement', emoji: '🎉', color: 'bg-orange-400' }
	];
	
	let selectedEmotions: string[] = [];
	let keywords = '';
	let currentLyricsLang: LyricsLanguage;
	let musicStyle = 'Pop';
	let intensity = 'Calm & Gentle';
	let length = 'Short (2-3 verses)';
	
	selectedLyricsLanguage.subscribe(lang => {
		currentLyricsLang = lang;
	});
	
	function toggleEmotion(emotion: string) {
		if (selectedEmotions.includes(emotion)) {
			selectedEmotions = selectedEmotions.filter(e => e !== emotion);
		} else {
			selectedEmotions = [...selectedEmotions, emotion];
		}
	}
	
	function generateLyrics() {
		if (selectedEmotions.length === 0) {
			alert('Please select at least one emotion');
			return;
		}
		
		const params = new URLSearchParams({
			emotions: selectedEmotions.join(','),
			keywords: keywords,
			language: currentLyricsLang
		});
		
		goto(`/lyrics?${params}`);
	}
	
	function generateSong() {
		if (selectedEmotions.length === 0) {
			alert('Please select at least one emotion');
			return;
		}
		
		const params = new URLSearchParams({
			emotions: selectedEmotions.join(','),
			keywords: keywords,
			language: currentLyricsLang
		});
		
		goto(`/song?${params}`);
	}
</script>

<div class="min-h-screen bg-gray-50 py-6 px-4">
	<!-- Header content -->
	<div class="max-w-6xl mx-auto mb-8">
		<div class="text-center mb-6">
			<h1 class="text-4xl font-bold mb-3" style="background: linear-gradient(135deg, var(--rose-accent), var(--rose-deep)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
				Transform Your Emotions Into Music
			</h1>
			<p class="text-gray-600 text-base max-w-2xl mx-auto">
				Generate beautiful, personalized lyrics using AI and bring them to life with stunning audio. Express yourself in Sinhala, Tamil, or English.
			</p>
		</div>
		
		<!-- Feature cards -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
			<div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
				<div class="text-rose-500 text-xl mb-2">🎵</div>
				<h3 class="font-semibold text-gray-800 mb-1 text-sm">AI-Powered Lyrics</h3>
				<p class="text-gray-600 text-xs">Advanced AI creates personalized lyrics from your emotions</p>
			</div>
			<div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
				<div class="text-rose-500 text-xl mb-2">🌍</div>
				<h3 class="font-semibold text-gray-800 mb-1 text-sm">Multi-Language Support</h3>
				<p class="text-gray-600 text-xs">Create lyrics in English, Sinhala, or Tamil</p>
			</div>
			<div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
				<div class="text-rose-500 text-xl mb-2">🎧</div>
				<h3 class="font-semibold text-gray-800 mb-1 text-sm">Suno AI Music</h3>
				<p class="text-gray-600 text-xs">Transform your lyrics into beautiful music with Suno AI</p>
			</div>
		</div>
	</div>
	
	<!-- Main content - Two column layout -->
	<div class="max-w-6xl mx-auto">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- Left column - Create Your Lyrics -->
			<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				<h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
					<span class="mr-2">✨</span>
					Create Your Lyrics
				</h2>
				
				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-700 mb-2">
						What emotions are you feeling?
					</label>
					<textarea
						bind:value={keywords}
						class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none resize-none text-sm"
						rows="2"
						placeholder="Describe your emotions... (e.g., feeling nostalgic about childhood memories)"
					></textarea>
				</div>
				
				<div class="mb-4">
					<div class="grid grid-cols-3 gap-2 mb-3">
						{#each emotions.slice(0, 6) as emotion}
							<button
								class="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs {selectedEmotions.includes(emotion.name) ? 'bg-rose-50 border-rose-300' : ''}"
								on:click={() => toggleEmotion(emotion.name)}
							>
								<span class="mr-1 text-sm">{emotion.emoji}</span>
								<span class="font-medium">{emotion.name}</span>
							</button>
						{/each}
					</div>
					<div class="grid grid-cols-2 gap-2">
						{#each emotions.slice(6) as emotion}
							<button
								class="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs {selectedEmotions.includes(emotion.name) ? 'bg-rose-50 border-rose-300' : ''}"
								on:click={() => toggleEmotion(emotion.name)}
							>
								<span class="mr-1 text-sm">{emotion.emoji}</span>
								<span class="font-medium">{emotion.name}</span>
							</button>
						{/each}
					</div>
				</div>
				
				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Select Language
					</label>
					<LyricsLanguageSelector />
				</div>
				
				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Music Style
					</label>
					<select 
						bind:value={musicStyle}
						class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none bg-white text-sm"
					>
						<option value="Pop">Pop</option>
						<option value="Rock">Rock</option>
						<option value="Classical">Classical</option>
						<option value="Folk">Folk</option>
					</select>
				</div>
				
				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Intensity
					</label>
					<select 
						bind:value={intensity}
						class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none bg-white text-sm"
					>
						<option value="Calm & Gentle">Calm & Gentle</option>
						<option value="Moderate">Moderate</option>
						<option value="Intense & Passionate">Intense & Passionate</option>
					</select>
				</div>
				
				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Length
					</label>
					<select 
						bind:value={length}
						class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none bg-white text-sm"
					>
						<option value="Short (2-3 verses)">Short (2-3 verses)</option>
						<option value="Medium (4-5 verses)">Medium (4-5 verses)</option>
						<option value="Long (6+ verses)">Long (6+ verses)</option>
					</select>
				</div>
				
				<button
					on:click={generateLyrics}
					disabled={selectedEmotions.length === 0}
					class="w-full py-2.5 px-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold rounded-lg hover:from-rose-600 hover:to-rose-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
				>
					<span class="mr-2">🎵</span>
					Generate Lyrics
				</button>
			</div>
			
			<!-- Right column - Your Creation -->
			<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				<h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
					<span class="mr-2">🎵</span>
					Your Creation
				</h2>
				
				<div class="border-t-4 border-rose-500 bg-gray-50 rounded-lg p-4 mb-4">
					<div class="text-center text-gray-500">
						<div class="text-3xl mb-3">🎶</div>
						<p class="text-base font-medium mb-2">Your generated lyrics will appear here</p>
						<p class="text-sm">Fill in your emotions and click "Generate Lyrics" to create something beautiful! 🎭</p>
					</div>
				</div>
				
				{#if selectedEmotions.length > 0}
					<div class="mb-4">
						<h3 class="text-sm font-medium text-gray-700 mb-2">Selected Emotions:</h3>
						<div class="flex flex-wrap gap-2">
							{#each selectedEmotions as emotion}
								<span class="px-2 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-medium">
									{emotion}
								</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
