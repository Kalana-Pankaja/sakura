import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

const defaultTheme: Theme = 'light';

const initialTheme = browser 
  ? (localStorage.getItem('sakura-theme') as Theme) || defaultTheme
  : defaultTheme;

export const theme = writable<Theme>(initialTheme);

export function toggleTheme() {
  theme.update(currentTheme => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    if (browser) {
      localStorage.setItem('sakura-theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
    
    return newTheme;
  });
}

export function setTheme(newTheme: Theme) {
  theme.set(newTheme);
  
  if (browser) {
    localStorage.setItem('sakura-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }
}

// Initialize theme on client side
if (browser) {
  theme.subscribe(currentTheme => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  });
}