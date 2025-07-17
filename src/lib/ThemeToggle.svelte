<script lang="ts">
	import { theme, toggleTheme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	
	let currentTheme: 'light' | 'dark';
	
	theme.subscribe(t => {
		currentTheme = t;
	});
	
	onMount(() => {
		// Ensure theme is applied on mount
		document.documentElement.setAttribute('data-theme', currentTheme);
	});
</script>

<button
	on:click={toggleTheme}
	class="theme-toggle"
	aria-label="Toggle theme"
	title={currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
>
	<div class="toggle-track">
		<div class="toggle-thumb" class:dark={currentTheme === 'dark'}>
			<div class="toggle-icon">
				{#if currentTheme === 'light'}
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="5"/>
						<path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
					</svg>
				{:else}
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
					</svg>
				{/if}
			</div>
		</div>
	</div>
</button>

<style>
	.theme-toggle {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.toggle-track {
		width: 48px;
		height: 26px;
		background: var(--border-subtle);
		border-radius: 13px;
		position: relative;
		transition: all 0.3s ease;
		border: 1px solid var(--border-medium);
	}
	
	.toggle-thumb {
		width: 20px;
		height: 20px;
		background: var(--bg-secondary);
		border-radius: 50%;
		position: absolute;
		top: 2px;
		left: 3px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 2px 8px var(--shadow-soft);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--border-subtle);
	}
	
	.toggle-thumb.dark {
		transform: translateX(22px);
		background: var(--rose-medium);
		border-color: var(--rose-accent);
	}
	
	.toggle-icon {
		color: var(--text-secondary);
		transition: all 0.3s ease;
	}
	
	.toggle-thumb.dark .toggle-icon {
		color: white;
	}
	
	.theme-toggle:hover .toggle-track {
		background: var(--rose-light);
		border-color: var(--rose-medium);
	}
	
	.theme-toggle:hover .toggle-thumb {
		box-shadow: 0 4px 12px var(--shadow-medium);
	}
</style>