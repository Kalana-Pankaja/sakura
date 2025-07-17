<script lang="ts">
	import { selectedLanguage, languages, getTranslation, type Language } from '$lib/stores/language';
	
	let isOpen = false;
	let currentLang: Language;
	
	selectedLanguage.subscribe(lang => {
		currentLang = lang;
	});
	
	function selectLanguage(langCode: Language) {
		selectedLanguage.set(langCode);
		isOpen = false;
	}
	
	function toggleDropdown() {
		isOpen = !isOpen;
	}
	
	const currentLanguage = languages.find(lang => lang.code === currentLang);
</script>

<div class="relative">
	<button
		on:click={toggleDropdown}
		class="sakura-input flex items-center space-x-3 px-4 py-3 min-w-48 cursor-pointer"
	>
		<span class="text-lg">{currentLanguage?.flag}</span>
		<span class="text-sm font-medium flex-1 text-left">{currentLanguage?.nativeName}</span>
		<svg class="w-4 h-4 transition-transform duration-300 {isOpen ? 'rotate-180' : ''}" 
			 fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: var(--text-muted);">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
		</svg>
	</button>
	
	{#if isOpen}
		<div class="absolute top-full left-0 mt-2 w-full min-w-48 z-50 slide-in">
			<div class="sakura-card p-2">
				{#each languages as language}
					<button
						on:click={() => selectLanguage(language.code)}
						class="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-all duration-200 hover:bg-opacity-50 {currentLang === language.code ? 'selected-lang' : ''}"
						style="color: var(--text-primary);"
					>
						<span class="text-lg">{language.flag}</span>
						<div class="flex-1">
							<div class="font-medium">{language.nativeName}</div>
							<div class="text-sm" style="color: var(--text-muted);">{language.name}</div>
						</div>
						{#if currentLang === language.code}
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style="color: var(--rose-accent);">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
							</svg>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.selected-lang {
		background: var(--rose-light) !important;
		color: var(--text-primary) !important;
	}
	
	.selected-lang:hover {
		background: var(--rose-medium) !important;
	}
</style>