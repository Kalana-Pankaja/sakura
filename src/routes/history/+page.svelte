<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { historyStore, clearHistory, removeFromHistory, getHistoryStats, type HistoryItem } from '$lib/stores/history';

	let creations: HistoryItem[] = [];
	let stats = {
		totalSongs: 0,
		languagesUsed: 0,
		favoriteEmotion: 'None',
		thisWeek: 0,
		thisMonth: 0
	};

	onMount(() => {
		historyStore.subscribe(history => {
			creations = history;
			stats = getHistoryStats(history);
		});
	});

	function handleClearHistory() {
		if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
			clearHistory();
		}
	}

	function handleRemoveItem(id: string) {
		if (confirm('Are you sure you want to remove this item from history?')) {
			removeFromHistory(id);
		}
	}

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		});
	}

	function getLanguageFlag(language: string) {
		switch(language) {
			case 'en': 
			case 'English': return '🇺🇸';
			case 'si':
			case 'Sinhala': return '🇱🇰';
			case 'ta':
			case 'Tamil': return '🇱🇰';
			default: return '🌐';
		}
	}

	function getLanguageName(language: string) {
		switch(language) {
			case 'en': return 'English';
			case 'si': return 'Sinhala';
			case 'ta': return 'Tamil';
			default: return language;
		}
	}
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold mb-6" style="background: linear-gradient(135deg, var(--rose-accent), var(--rose-deep)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
				Your Creative History
			</h1>
			<p class="text-gray-600 text-lg max-w-2xl mx-auto">
				Revisit your musical journey and the emotions that shaped your creations
			</p>
		</div>

		<div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
			<div class="flex items-center justify-between mb-6">
				<h2 class="text-xl font-semibold text-gray-800">Recent Creations</h2>
				<div class="flex items-center space-x-4">
					<div class="text-sm text-gray-500">
						{creations.length} total creations
					</div>
					{#if creations.length > 0}
						<button
							on:click={handleClearHistory}
							class="px-3 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
						>
							Clear All
						</button>
					{/if}
				</div>
			</div>

			{#if creations.length === 0}
				<div class="text-center py-12">
					<div class="text-gray-400 text-6xl mb-4">🎵</div>
					<h3 class="text-xl font-semibold text-gray-600 mb-2">No creations yet</h3>
					<p class="text-gray-500 mb-6">Start creating your first lyrics to see them here</p>
					<button
						on:click={() => goto('/')}
						class="py-3 px-8 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold rounded-lg hover:from-rose-600 hover:to-rose-700 transition-all duration-200"
					>
						Create Your First Song
					</button>
				</div>
			{:else}
				<div class="space-y-4">
					{#each creations as creation}
						<div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
							<div class="flex items-start justify-between mb-4">
								<div class="flex-1">
									<h3 class="text-lg font-semibold text-gray-800 mb-2 flex items-center">
										<span class="mr-2">{getLanguageFlag(creation.language)}</span>
										{creation.title}
									</h3>
									<div class="flex flex-wrap gap-2 mb-3">
										{#each creation.emotions as emotion}
											<span class="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-medium">
												{emotion}
											</span>
										{/each}
									</div>
									<p class="text-gray-600 text-sm mb-3 italic">"{creation.excerpt}"</p>
									<div class="flex items-center text-xs text-gray-500">
										<span class="mr-4">📅 {formatDate(creation.dateCreated)}</span>
										<span class="mr-4">🌐 {getLanguageName(creation.language)}</span>
										{#if creation.keywords}
											<span class="mr-4">🔍 {creation.keywords}</span>
										{/if}
									</div>
								</div>
								<div class="flex space-x-2 ml-4">
									<button 
										class="px-4 py-2 text-sm text-gray-600 hover:text-rose-600 transition-colors"
										on:click={() => alert(creation.lyrics)}
									>
										View
									</button>
									<button 
										class="px-4 py-2 text-sm text-red-600 hover:text-red-800 transition-colors"
										on:click={() => handleRemoveItem(creation.id)}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>

				<div class="flex justify-center mt-8">
					<button class="px-6 py-2 text-sm text-gray-600 hover:text-rose-600 transition-colors">
						Load More
					</button>
				</div>
			{/if}
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			<div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
				<div class="text-rose-500 text-3xl mb-3">📊</div>
				<h3 class="text-lg font-semibold text-gray-800 mb-2">Statistics</h3>
				<div class="space-y-2 text-sm text-gray-600">
					<div>Total Songs: <span class="font-semibold">{stats.totalSongs}</span></div>
					<div>Languages Used: <span class="font-semibold">{stats.languagesUsed}</span></div>
					<div>Favorite Emotion: <span class="font-semibold">{stats.favoriteEmotion}</span></div>
				</div>
			</div>

			<div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
				<div class="text-rose-500 text-3xl mb-3">🎯</div>
				<h3 class="text-lg font-semibold text-gray-800 mb-2">Achievements</h3>
				<div class="space-y-2 text-sm text-gray-600">
					<div>🏆 First Creation</div>
					<div>🌟 Multi-lingual Creator</div>
					<div>🎵 Emotion Explorer</div>
				</div>
			</div>

			<div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
				<div class="text-rose-500 text-3xl mb-3">📈</div>
				<h3 class="text-lg font-semibold text-gray-800 mb-2">Progress</h3>
				<div class="space-y-2 text-sm text-gray-600">
					<div>This Week: <span class="font-semibold">{stats.thisWeek} songs</span></div>
					<div>This Month: <span class="font-semibold">{stats.thisMonth} songs</span></div>
					<div>Total Created: <span class="font-semibold">{stats.totalSongs} songs</span></div>
				</div>
			</div>
		</div>

		<div class="text-center">
			<button
				on:click={() => goto('/')}
				class="py-3 px-8 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold rounded-lg hover:from-rose-600 hover:to-rose-700 transition-all duration-200"
			>
				Create New Song
			</button>
		</div>
	</div>
</div>