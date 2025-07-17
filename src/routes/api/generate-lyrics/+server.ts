import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GOOGLE_AI_STUDIO_API_KEY } from '$env/static/private';

const demoLyrics: Record<string, Record<string, string[]>> = {
	'Joy': {
		'en': [
			'Sunshine breaking through the clouds\nLaughter echoing so loud\nEvery step feels like a dance\nLife\'s a beautiful romance',
			'Golden rays upon my face\nHappiness in every place\nSmiling wide without a care\nMagic floating in the air'
		],
		'si': [
			'හිරුව වලාකුළු මැදින් එලිය\nසිනහව දෙන ඝෝෂාව\nප්‍රීතියෙන් පියවර තබන මග\nජීවිතය ලස්සන ගීතයක්',
			'සිනහවෙන් මුව පිරී\nහදයේ සන්තෝෂය නිරී\nසුන්දර ලෝකයක් මට\nඅනාගතයට බලාපොරොත්තුව'
		],
		'ta': [
			'மேகங்கள் வழியே சூரியன் வருகிறது\nசிரிப்பு எதிரொலிக்கும் சத்தம்\nஒவ்வொரு அடியும் நடனம் போல\nவாழ்க்கை ஒரு அழகான காதல்',
			'என் முகத்தில் தங்க கிரணங்கள்\nஎல்லா இடத்திலும் மகிழ்ச்சி\nகவலையின்றி அகலமாக சிரிக்கிறேன்\nகாற்றில் மிதக்கும் மாயம்'
		]
	},
	'Sadness': {
		'en': [
			'Raindrops on my window pane\nEchoing my silent pain\nMemories of yesterday\nSlowly fading away',
			'Empty rooms and hollow sounds\nLoneliness that knows no bounds\nTears that fall like autumn leaves\nHeart that silently grieves'
		],
		'si': [
			'ජනේල කුඩුවේ වැස්ස\nමගේ නිහඬ වේදනාව\nඊයේ මතකයන්\nටිකෙන් ටික අතුරුදහන්',
			'හිස් කාමර සහ හිස් හඬ\nසීමා නොදන්නා තනිකම\nරැගෙනියන සරත් කොළ සේ කඳුළු\nනිහඬව වේදනා විඳින හදය'
		],
		'ta': [
			'என் ஜன்னல் கண்ணாடியில் மழை துளிகள்\nஎன் அமைதியான வலியின் எதிரொலி\nநேற்றைய நினைவுகள்\nமெதுவாக மறைந்து செல்கின்றன',
			'காலி அறைகளும் குழியான சத்தங்களும்\nஎல்லையே தெரியாத தனிமை\nஇலையுதிர் இலைகள் போல் விழும் கண்ணீர்\nமௌனமாக துக்கம் கொள்ளும் இதயம்'
		]
	},
	'Love': {
		'en': [
			'In your eyes I see my home\nNever again will I roam\nHearts that beat as one\nOur love has just begun',
			'Hold me close and never let go\nIn this love we both will grow\nTwo souls dancing in the night\nEverything will be alright'
		],
		'si': [
			'ඔබේ දෑසින් මගේ නිවස දකිනවා\nආයේ මම නොඇවිදිනවා\nඑකට ගැහෙන හදවත් දෙක\nඅපේ ආදරය දැන් ආරම්භයි',
			'මාව තදින් අල්ලාගෙන පිටත් නොවෙන්න\nමේ ආදරයෙන් අපි දෙන්නාම වැඩෙනවා\nරාත්‍රියේ නටන ආත්මයක් දෙක\nහැම දෙයක්ම හරි වෙයි'
		],
		'ta': [
			'உன் கண்களில் எனது வீடு காண்கிறேன்\nஇனி நான் அலைய மாட்டேன்\nஒன்றாக அடிக்கும் இரண்டு இதயங்கள்\nநம் காதல் இப்போதுதான் தொடங்கியது',
			'என்னை அருகில் பிடித்து ஒருபோதும் விடாதே\nஇந்த காதலில் நாம் இருவரும் வளர்வோம்\nராத்திரியில் நடனமாடும் இரண்டு ஆன்மாக்கள்\nஎல்லாம் சரியாகிவிடும்'
		]
	},
	'Hope': {
		'en': [
			'Tomorrow brings a brand new day\nAll my fears will fade away\nStars will guide me through the night\nLeading to the morning light',
			'Even in the darkest hour\nI can feel hope\'s gentle power\nRising up to meet the dawn\nStrength to carry on'
		],
		'si': [
			'හෙට අලුත් දවසක් එනවා\nමගේ සියලු භීතිකා නැති වෙනවා\nතරු රාත්‍රිය පුරා මගට මගපෙන්වනවා\nඅලුයම එළියට යන්න',
			'අන්ධකාරම වේලාවේ පවා\nබලාපොරොත්තුවේ මෘදු බලය දැනෙනවා\nඅලුයම හමුවන්න නැගී සිටිනවා\nදිගටම යන්න බලය'
		],
		'ta': [
			'நாளை ஒரு புதிய நாள் கொண்டு வருகிறது\nஎன் எல்லா பயங்களும் மறைந்து விடும்\nநட்சத்திரங்கள் இரவு முழுவதும் என்னை வழிநடத்தும்\nகாலை வெளிச்சத்திற்கு இட்டுச் செல்லும்',
			'இருண்ட நேரத்திலும் கூட\nநம்பிக்கையின் மென்மையான சக்தியை உணர முடிகிறது\nவிடியலை சந்திக்க எழுந்து கொண்டிருக்கிறேன்\nதொடர்ந்து செல்ல வலிமை'
		]
	}
};

const generateLyricsWithGoogleAI = async (emotions: string[], keywords: string, language: string = 'en'): Promise<string> => {
	if (!GOOGLE_AI_STUDIO_API_KEY) {
		throw new Error('Google AI Studio API key not configured');
	}

	const languageMap = {
		'en': 'English',
		'si': 'Sinhala',
		'ta': 'Tamil'
	};

	const prompt = `Generate song lyrics in ${languageMap[language] || 'English'} based on these emotions: ${emotions.join(', ')}${keywords ? ` and keywords: ${keywords}` : ''}. 
	Create 2-3 verses that capture the essence of these emotions. Make the lyrics poetic and meaningful.`;

	try {
		const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_AI_STUDIO_API_KEY}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				contents: [{
					parts: [{
						text: prompt
					}]
				}]
			})
		});

		if (!response.ok) {
			throw new Error(`API request failed: ${response.status}`);
		}

		const data = await response.json();
		const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
		
		if (!generatedText) {
			throw new Error('No content generated from AI');
		}

		return generatedText;
	} catch (error) {
		console.error('Error generating lyrics with Google AI:', error);
		// Fallback to demo lyrics if API fails
		return generateDemoLyrics(emotions, keywords, language);
	}
};

const generateDemoLyrics = (emotions: string[], keywords: string, language: string = 'en'): string => {
	const selectedEmotion = emotions[0] || 'Joy';
	const emotionLyrics = demoLyrics[selectedEmotion]?.[language] || demoLyrics['Joy'][language] || demoLyrics['Joy']['en'];
	let lyrics = emotionLyrics[Math.floor(Math.random() * emotionLyrics.length)];
	
	// Add a second verse with keywords if provided
	if (keywords.trim()) {
		const keywordWords = keywords.split(' ').filter(word => word.length > 2);
		if (keywordWords.length > 0) {
			const randomKeyword = keywordWords[Math.floor(Math.random() * keywordWords.length)];
			
			// Language-specific keyword verses
			const keywordVerses = {
				'en': `\n\n${randomKeyword} whispers in the breeze\nBringing memories with such ease\nIn this moment I believe\nAll the dreams we can achieve`,
				'si': `\n\n${randomKeyword} සුළඟේ කෙඳිරිගාන හඬ\nමතකයන් පහසුවෙන් ගෙන එනවා\nමේ මොහොතේ මම විශ්වාස කරනවා\nලබා ගත හැකි සියලු සිහින`,
				'ta': `\n\n${randomKeyword} காற்றில் கிசுகிசுக்கும் சத்தம்\nநினைவுகளை எளிதாக கொண்டு வருகிறது\nஇந்த நேரத்தில் நான் நம்புகிறேன்\nநாம் அடைய முடிந்த எல்லா கனவுகளையும்`
			};
			
			lyrics += keywordVerses[language] || keywordVerses['en'];
		}
	}
	
	// Add more verses for multiple emotions
	if (emotions.length > 1) {
		const secondEmotion = emotions[1];
		const secondEmotionLyrics = demoLyrics[secondEmotion]?.[language];
		if (secondEmotionLyrics) {
			lyrics += '\n\n' + secondEmotionLyrics[Math.floor(Math.random() * secondEmotionLyrics.length)];
		}
	}
	
	return lyrics;
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { emotions, keywords, language } = await request.json();
		
		const lyrics = await generateLyricsWithGoogleAI(emotions, keywords, language);
		
		// Generate a title from the first line of lyrics
		const firstLine = lyrics.split('\n')[0];
		const title = firstLine.length > 40 ? firstLine.substring(0, 40) + '...' : firstLine;
		
		return json({
			success: true,
			lyrics,
			emotions,
			keywords,
			language,
			title,
			timestamp: new Date().toISOString()
		});
	} catch (error) {
		console.error('Error in lyrics generation:', error);
		return json({
			success: false,
			error: 'Failed to generate lyrics'
		}, { status: 500 });
	}
};