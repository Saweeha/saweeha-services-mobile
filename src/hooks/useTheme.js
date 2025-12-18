import { useContext, useEffect, useMemo } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState } from 'react';
import { getColorsForScheme } from '../constants/colors';

export const THEME_PREFERENCE_KEY = 'themePreference';

const ThemeContext = createContext({
  scheme: 'light',
  colors: getColorsForScheme('light'),
  setScheme: () => {},
  toggleScheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [scheme, setScheme] = useState('light');

  // Load saved theme or fall back to system
  useEffect(() => {
    let isMounted = true;

    const loadTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        if (!isMounted) return;

        if (stored === 'light' || stored === 'dark') {
          setScheme(stored);
        } else {
          const systemScheme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
          setScheme(systemScheme);
        }
      } catch {
        const systemScheme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
        setScheme(systemScheme);
      }
    };

    loadTheme();

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Only react to system changes when no explicit preference is stored.
      AsyncStorage.getItem(THEME_PREFERENCE_KEY).then((stored) => {
        if (!stored) {
          setScheme(colorScheme === 'dark' ? 'dark' : 'light');
        }
      });
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  const colors = useMemo(() => getColorsForScheme(scheme), [scheme]);

  const updateScheme = async (nextScheme) => {
    const normalized = nextScheme === 'dark' ? 'dark' : 'light';
    setScheme(normalized);
    try {
      await AsyncStorage.setItem(THEME_PREFERENCE_KEY, normalized);
    } catch {
      // ignore storage errors, theme will still change in-memory
    }
  };

  const toggleScheme = () => {
    updateScheme(scheme === 'dark' ? 'light' : 'dark');
  };

  const value = useMemo(
    () => ({
      scheme,
      colors,
      setScheme: updateScheme,
      toggleScheme,
    }),
    [scheme, colors],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

export const useThemeColors = () => {
  const { colors } = useTheme();
  return colors;
};


