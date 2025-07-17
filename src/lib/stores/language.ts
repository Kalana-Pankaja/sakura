import { writable } from 'svelte/store';

export type LyricsLanguage = 'en' | 'si' | 'ta';

export interface LyricsLanguageOption {
	code: LyricsLanguage;
	name: string;
	nativeName: string;
	flag: string;
}

export const lyricsLanguages: LyricsLanguageOption[] = [
	{ code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
	{ code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰' },
	{ code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇱🇰' }
];

export const selectedLyricsLanguage = writable<LyricsLanguage>('en');