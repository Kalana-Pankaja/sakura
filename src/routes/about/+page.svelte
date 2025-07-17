<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4">
	<div class="max-w-4xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold mb-6" style="background: linear-gradient(135deg, var(--rose-accent), var(--rose-deep)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
				About Sakura
			</h1>
			<p class="text-gray-600 text-lg max-w-2xl mx-auto">
				Where emotions bloom into beautiful music
			</p>
		</div>

		<div class="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-8">
			<div class="text-center mb-8">
				<div class="text-6xl mb-4">🌸</div>
				<h2 class="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
				<p class="text-gray-600 leading-relaxed">
					Sakura was born from the belief that every emotion deserves to be expressed through the universal language of music. 
					Just like the cherry blossom represents the fleeting beauty of life, our platform captures your momentary emotions 
					and transforms them into lasting musical memories.
				</p>
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
			<div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
				<div class="text-rose-500 text-3xl mb-4">🎯</div>
				<h3 class="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
				<p class="text-gray-600">
					To democratize music creation by making it accessible to everyone, regardless of musical background. 
					We believe that everyone has a song within them waiting to be discovered.
				</p>
			</div>

			<div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
				<div class="text-rose-500 text-3xl mb-4">👁️</div>
				<h3 class="text-xl font-semibold text-gray-800 mb-3">Our Vision</h3>
				<p class="text-gray-600">
					To create a world where technology and creativity unite to help people express their deepest emotions 
					through personalized music that resonates with their unique experiences.
				</p>
			</div>
		</div>

		<div class="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-8">
			<h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Why Choose Sakura?</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="text-center">
					<div class="text-rose-500 text-2xl mb-3">🤖</div>
					<h4 class="font-semibold text-gray-800 mb-2">AI-Powered</h4>
					<p class="text-gray-600 text-sm">Advanced AI understands your emotions and creates meaningful lyrics</p>
				</div>
				<div class="text-center">
					<div class="text-rose-500 text-2xl mb-3">🌏</div>
					<h4 class="font-semibold text-gray-800 mb-2">Cultural Diversity</h4>
					<p class="text-gray-600 text-sm">Support for multiple languages including English, Sinhala, and Tamil</p>
				</div>
				<div class="text-center">
					<div class="text-rose-500 text-2xl mb-3">💝</div>
					<h4 class="font-semibold text-gray-800 mb-2">Personal Touch</h4>
					<p class="text-gray-600 text-sm">Every creation is unique and tailored to your specific emotions</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-8">
			<h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">How It Works</h2>
			<div class="space-y-4">
				<div class="flex items-start space-x-4">
					<div class="flex-shrink-0 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
					<div>
						<h4 class="font-semibold text-gray-800">Express Your Emotions</h4>
						<p class="text-gray-600 text-sm">Select the emotions you're feeling and describe your thoughts</p>
					</div>
				</div>
				<div class="flex items-start space-x-4">
					<div class="flex-shrink-0 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
					<div>
						<h4 class="font-semibold text-gray-800">AI Creates Your Lyrics</h4>
						<p class="text-gray-600 text-sm">Our AI processes your emotions and generates personalized lyrics</p>
					</div>
				</div>
				<div class="flex items-start space-x-4">
					<div class="flex-shrink-0 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
					<div>
						<h4 class="font-semibold text-gray-800">Transform to Music</h4>
						<p class="text-gray-600 text-sm">Convert your lyrics into beautiful audio with customizable settings</p>
					</div>
				</div>
			</div>
		</div>

		<div class="text-center">
			<button
				on:click={() => goto('/')}
				class="py-3 px-8 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold rounded-lg hover:from-rose-600 hover:to-rose-700 transition-all duration-200"
			>
				Start Your Journey
			</button>
		</div>
	</div>
</div>