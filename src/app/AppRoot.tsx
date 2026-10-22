import { StatusBar } from 'react-native';
import tw, { useAppColorScheme, useDeviceContext } from '../shared/lib/tw';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StrictMode } from 'react';
import { ThemeContext } from '../shared/lib/themeContext';
import { AppHeader } from './AppHeader';
import { WeatherScreen } from '../features/weather/screens/WeatherScreen';
import { Screen } from '../shared/ui/Screen';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../shared/lib/queryClient';
import { useAppFocusRefetch } from '../shared/hooks/useAppFocusRefetch';

export default function AppRoot() {
  useDeviceContext(tw, {
    observeDeviceColorSchemeChanges: false,
    initialColorScheme: 'device',
  });
  useAppFocusRefetch();

  const [colorSchema, toggleColorScheme] = useAppColorScheme(tw);
  const isDark = colorSchema === 'dark';

  return (
    <StrictMode>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

          <ThemeContext.Provider value={{ isDark, toggleColorScheme }}>
            <Screen>
              <AppHeader />

              <WeatherScreen />
            </Screen>
          </ThemeContext.Provider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </StrictMode>
  );
}
