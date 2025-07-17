<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold mb-6" style="background: linear-gradient(135deg, var(--rose-accent), var(--rose-deep)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
				Features
			</h1>
			<p class="text-gray-600 text-lg max-w-2xl mx-auto">
				Discover the powerful features that make Sakura your perfect creative companion
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
			<div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
				<div class="text-rose-500 text-3xl mb-4">🎵</div>
				<h3 class="text-xl font-semibold text-gray-800 mb-3">AI-Powered Lyrics Generation</h3>
				<p class="text-gray-600 mb-4">Advanced AI technology creates personalized lyrics based on your emotions and keywords</p>
				<ul class="text-sm text-gray-500 space-y-1">
					<li>• Emotion-based content creation</li>
					<li>• Keyword integration</li>
					<li>• Multiple verse lengths</li>
				</ul>
			</div>

			<div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
				<div class="text-rose-500 text-3xl mb-4">🌍</div>
				<h3 class="text-xl font-semibold text-gray-800 mb-3">Multi-Language Support</h3>
				<p class="text-gray-600 mb-4">Create beautiful lyrics in English, Sinhala, or Tamil with native language support</p>
				<ul class="text-sm text-gray-500 space-y-1">
					<li>• English lyrics</li>
					<li>• Sinhala lyrics</li>
					<li>• Tamil lyrics</li>
				</ul>
			</div>

			<div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
				<div class="text-rose-500 text-3xl mb-4">🎧</div>
				<h3 class="text-xl font-semibold text-gray-800 mb-3">Audio Generation</h3>
				<p class="text-gray-600 mb-4">Transform your lyrics into beautiful music with AI-powered audio generation</p>
				<ul class="text-sm text-gray-500 space-y-1">
					<li>• Multiple music styles</li>
					<li>• Adjustable intensity</li>
					<li>• Professional quality</li>
				</ul>
			</div>

			<div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
				<div class="text-rose-500 text-3xl mb-4">🎨</div>
				<h3 class="text-xl font-semibold text-gray-800 mb-3">Emotion Recognition</h3>
				<p class="text-gray-600 mb-4">Select from a wide range of emotions to create lyrics that truly resonate</p>
				<ul class="text-sm text-gray-500 space-y-1">
					<li>• 8 core emotions</li>
					<li>• Emotion combinations</li>
					<li>• Contextual understanding</li>
				</ul>
			</div>

			<div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
				<div class="text-rose-500 text-3xl mb-4">⚡</div>
				<h3 class="text-xl font-semibold text-gray-800 mb-3">Fast & Responsive</h3>
				<p class="text-gray-600 mb-4">Get your lyrics and music generated quickly with our optimized AI processing</p>
				<ul class="text-sm text-gray-500 space-y-1">
					<li>• Instant generation</li>
					<li>• Real-time feedback</li>
					<li>• Seamless experience</li>
				</ul>
			</div>

			<div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
				<div class="text-rose-500 text-3xl mb-4">🔧</div>
				<h3 class="text-xl font-semibold text-gray-800 mb-3">Customizable Settings</h3>
				<p class="text-gray-600 mb-4">Fine-tune your creations with adjustable music style, intensity, and length</p>
				<ul class="text-sm text-gray-500 space-y-1">
					<li>• Music style selection</li>
					<li>• Intensity control</li>
					<li>• Length customization</li>
				</ul>
			</div>
		</div>

		<div class="text-center">
			<button
				on:click={() => goto('/')}
				class="py-3 px-8 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold rounded-lg hover:from-rose-600 hover:to-rose-700 transition-all duration-200"
			>
				Start Creating
			</button>
		</div>
	</div>
</div>