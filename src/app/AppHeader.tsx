import { Pressable, View } from 'react-native';
import tw from '../shared/lib/tw';
import { Icon } from '../shared/ui/Icon';
import { AppText } from '../shared/ui/AppText';
import { useTheme } from '../shared/lib/themeContext';
import { CitySearchField } from '../features/cities/components/CitySearchField';

export function AppHeader() {
  const { isDark, toggleColorScheme } = useTheme();

  return (
    <View
      style={tw`py-4 px-6 flex-row justify-between bg-surface dark:bg-surface-dark border-b border-muted dark:border-muted-dark`}
    >
      <View style={tw`flex-row items-center gap-2.5`}>
        <Icon name="weather" color="primary" />

        <AppText variant="body" style={tw`font-semibold`}>
          Weather
        </AppText>
      </View>

      <View style={tw`flex-row items-center gap-4 w-1/2`}>
        <CitySearchField />

        <Pressable
          accessibilityRole="button"
          onPress={() => toggleColorScheme()}
        >
          <View style={tw`p-3`}>
            {isDark ? (
              <Icon name="moon" size={20} color="muted" />
            ) : (
              <Icon name="sun" size={20} color="muted" />
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
}
