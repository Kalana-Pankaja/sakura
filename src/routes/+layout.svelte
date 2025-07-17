<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Sakura - AI Song Generator</title>
	<meta name="description" content="Create beautiful AI-generated songs from your emotions and keywords" />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header />
	
	<main class="flex-1">
		{@render children()}
	</main>
	
	<Footer />
</div>
