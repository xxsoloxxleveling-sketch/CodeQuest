'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { SHOP_ITEMS } from '@/lib/shopData';

export default function ThemeProvider() {
  const equippedThemeId = useGameStore((state) => state.equippedTheme);

  useEffect(() => {
    const theme = SHOP_ITEMS.themes.find(t => t.id === equippedThemeId);
    if (!theme) return;

    const root = document.documentElement;

    // Apply the theme's background to our CSS variables
    root.style.setProperty('--background', theme.bg);
    root.style.setProperty('--surface', theme.bg);
    
    // We can also try to derive some surface container colors, but a simple 
    // approach is to just apply the bg to the main surface variables.
    
    // For lighter themes, we might want to adjust the foreground text
    // A simple brightness check to determine if text should be dark or light
    const isLight = isLightColor(theme.bg);
    
    if (isLight) {
      root.style.setProperty('--foreground', '#1e293b'); // slate-800
      root.style.setProperty('--on-surface', '#1e293b');
      root.style.setProperty('--on-surface-variant', '#475569'); // slate-600
    } else {
      root.style.setProperty('--foreground', '#dee1fd');
      root.style.setProperty('--on-surface', '#dee1fd');
      root.style.setProperty('--on-surface-variant', '#bbcac5');
    }

  }, [equippedThemeId]);

  return null;
}

// Helper to check if a hex color is light or dark
function isLightColor(hex: string) {
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }
  // Convert 3-char hex to 6-char
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  
  // HSP equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );
  
  return hsp > 127.5;
}
