import { createContext, useContext } from 'react';

type ThemeContextValue = {
  isDark: boolean;
  toggleColorScheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error('useTheme must be used inside AppRoot');
  }

  return value;
}
