<script lang="ts">
	import { selectedLyricsLanguage, lyricsLanguages, type LyricsLanguage } from '$lib/stores/language';
	
	let currentLang: LyricsLanguage;
	
	selectedLyricsLanguage.subscribe(lang => {
		currentLang = lang;
	});
	
	function selectLanguage(event: Event) {
		const target = event.target as HTMLSelectElement;
		selectedLyricsLanguage.set(target.value as LyricsLanguage);
	}
	
	const currentLanguage = lyricsLanguages.find(lang => lang.code === currentLang);
</script>

<select 
	on:change={selectLanguage}
	value={currentLang}
	class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none bg-white text-sm"
>
	{#each lyricsLanguages as language}
		<option value={language.code}>
			{language.flag} {language.nativeName}
		</option>
	{/each}
</select>