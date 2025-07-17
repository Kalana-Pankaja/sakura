import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface HistoryItem {
	id: string;
	title: string;
	lyrics: string;
	emotions: string[];
	keywords: string;
	language: string;
	dateCreated: string;
	excerpt: string;
}

// Initialize with empty array or load from localStorage
const initialHistory: HistoryItem[] = [];

if (browser) {
	const savedHistory = localStorage.getItem('sakura-history');
	if (savedHistory) {
		try {
			initialHistory.push(...JSON.parse(savedHistory));
		} catch (error) {
			console.error('Failed to parse history from localStorage:', error);
		}
	}
}

export const historyStore = writable<HistoryItem[]>(initialHistory);

export function addToHistory(item: Omit<HistoryItem, 'id' | 'dateCreated' | 'excerpt'>) {
	const historyItem: HistoryItem = {
		...item,
		id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
		dateCreated: new Date().toISOString(),
		excerpt: item.lyrics.split('\n')[0].substring(0, 60) + '...'
	};

	historyStore.update(history => {
		const newHistory = [historyItem, ...history];
		
		// Keep only the last 50 items
		if (newHistory.length > 50) {
			newHistory.splice(50);
		}
		
		// Save to localStorage
		if (browser) {
			localStorage.setItem('sakura-history', JSON.stringify(newHistory));
		}
		
		return newHistory;
	});
}

export function clearHistory() {
	historyStore.set([]);
	if (browser) {
		localStorage.removeItem('sakura-history');
	}
}

export function removeFromHistory(id: string) {
	historyStore.update(history => {
		const newHistory = history.filter(item => item.id !== id);
		
		// Save to localStorage
		if (browser) {
			localStorage.setItem('sakura-history', JSON.stringify(newHistory));
		}
		
		return newHistory;
	});
}

export function getHistoryStats(history: HistoryItem[]) {
	const totalSongs = history.length;
	const languages = new Set(history.map(item => item.language));
	const emotions = history.flatMap(item => item.emotions);
	const emotionCounts = emotions.reduce((acc, emotion) => {
		acc[emotion] = (acc[emotion] || 0) + 1;
		return acc;
	}, {} as Record<string, number>);
	
	const favoriteEmotion = Object.entries(emotionCounts).reduce((a, b) => 
		emotionCounts[a[0]] > emotionCounts[b[0]] ? a : b
	)?.[0] || 'None';
	
	const thisWeek = history.filter(item => {
		const itemDate = new Date(item.dateCreated);
		const weekAgo = new Date();
		weekAgo.setDate(weekAgo.getDate() - 7);
		return itemDate >= weekAgo;
	}).length;
	
	const thisMonth = history.filter(item => {
		const itemDate = new Date(item.dateCreated);
		const monthAgo = new Date();
		monthAgo.setMonth(monthAgo.getMonth() - 1);
		return itemDate >= monthAgo;
	}).length;
	
	return {
		totalSongs,
		languagesUsed: languages.size,
		favoriteEmotion,
		thisWeek,
		thisMonth
	};
}