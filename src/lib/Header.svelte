<script lang="ts">
	import { page } from '$app/stores';
	import ThemeToggle from './ThemeToggle.svelte';
	
	let isMenuOpen = false;
	
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<header class="bg-white border-b border-gray-200 sticky top-0 z-50">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-14">
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-2">
					<span class="text-2xl">🌸</span>
					<span class="text-xl font-bold" style="color: var(--rose-accent);">Sakura</span>
				</a>
			</div>
			
			<nav class="hidden md:flex space-x-6">
				<a 
					href="/" 
					class="text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 {$page.url.pathname === '/' ? 'text-rose-600 bg-rose-50' : ''}"
				>
					Home
				</a>
				<a 
					href="/features" 
					class="text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
				>
					Features
				</a>
				<a 
					href="/about" 
					class="text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
				>
					About
				</a>
				<a 
					href="/history" 
					class="text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
				>
					History
				</a>
			</nav>
			
			<div class="hidden md:flex items-center space-x-3">
				<ThemeToggle />
				<!-- <button class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors">
					EN
				</button>
				<button class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors">
					$
				</button>
				<button class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors">
					👤
				</button> -->
			</div>
			
			<div class="md:hidden">
				<button
					on:click={toggleMenu}
					class="text-gray-700 hover:text-rose-600 focus:outline-none focus:text-rose-600"
				>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
			</div>
		</div>
		
		{#if isMenuOpen}
			<div class="md:hidden">
				<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white rounded-lg mt-2 shadow-lg border border-gray-200">
					<a href="/" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50">
						Home
					</a>
					<a href="/features" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50">
						Features
					</a>
					<a href="/about" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50">
						About
					</a>
					<a href="/history" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50">
						History
					</a>
					<div class="pt-3 pb-2 space-y-2 border-t border-gray-200">
						<div class="flex justify-center space-x-4">
							<ThemeToggle />
							<button class="px-3 py-1 text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors">
								EN
							</button>
							<button class="px-3 py-1 text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors">
								$
							</button>
							<button class="px-3 py-1 text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors">
								👤
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</header>