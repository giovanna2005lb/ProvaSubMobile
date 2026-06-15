import { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext({});

const THEME_KEY = '@moviehub:theme';

export const lightColors = {
  background: '#F5F6FA',
  card: '#FFFFFF',
  text: '#1A1A1A',
  subtext: '#666666',
  primary: '#E50914',
  border: '#E0E0E0',
};

export const darkColors = {
  background: '#0D1117',
  card: '#161B22',
  text: '#FFFFFF',
  subtext: '#9CA3AF',
  primary: '#E50914',
  border: '#30363D',
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    async function loadTheme() {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (storedTheme) {
          setTheme(storedTheme);
        }
      } catch (error) {
        console.log('Erro ao carregar tema:', error);
      }
    }
    loadTheme();
  }, []);

  async function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    await AsyncStorage.setItem(THEME_KEY, newTheme);
  }

  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
