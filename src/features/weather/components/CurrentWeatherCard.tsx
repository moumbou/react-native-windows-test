import { Pressable, View } from 'react-native';
import tw from '../../../shared/lib/tw';
import { Icon } from '../../../shared/ui/Icon';
import { AppText } from '../../../shared/ui/AppText';
import { Forecast } from '../api/forecast';
import { City } from '../../cities/type';
import { CONDITION_LABEL } from '../lib/weatherCode';
import { WeatherIcon } from './WeatherICon';
import { useCityStore } from '../../cities/store/useCityStore';
import { useShallow } from 'zustand/react/shallow';
import { formatHour, formatLongDate, formatTemp } from '../lib/formatWeather';

type CurrentWeatherCardProps = {
  city: City;
  current: Forecast['current'];
  today: Forecast['daily'][0];
  timezone: string;
};

export function CurrentWeatherCard({
  current,
  city,
  today,
  timezone,
}: CurrentWeatherCardProps) {
  const { removeCity, saveCity, savedCities } = useCityStore(
    useShallow(s => ({
      saveCity: s.saveCity,
      removeCity: s.removeCity,
      savedCities: s.savedCities,
    })),
  );

  const isFavorite = savedCities.some(saved => saved.id === city.id);

  const favoriteButtonToggle = () => {
    return isFavorite ? removeCity(city) : saveCity(city);
  };

  return (
    <View
      style={tw`p-7 rounded-card bg-card dark:bg-card-dark flex-row gap-6 items-center`}
    >
      <View style={tw`flex-1`}>
        <View style={tw`flex-row gap-2 mb-1.5`}>
          <Icon name="map-pin" color="muted" size={16} />

          <AppText variant="caption">
            {formatLongDate(today.date, timezone)} · updated{' '}
            {formatHour(current.time, timezone)}
          </AppText>
        </View>

        <AppText variant="subtitle" style={tw`font-semibold mb-3.5`}>
          {city.name}, {city.country}
        </AppText>

        <AppText variant="display" style={tw`mb-2.5`}>
          {formatTemp(current.temperature)}
        </AppText>

        <AppText variant="body" style={tw`font-semibold mb-1.5 capitalize`}>
          {CONDITION_LABEL[current.condition]}
        </AppText>

        <AppText variant="caption">
          Feels like {formatTemp(current.feelsLike)} · High{' '}
          {formatTemp(today.max)} · Low {formatTemp(today.min)}
        </AppText>
      </View>

      <View style={tw`flex-col gap-4 items-end`}>
        <Pressable accessibilityRole="button" onPress={favoriteButtonToggle}>
          <View style={tw`rounded-card p-3 dark:bg-zinc-700 bg-zinc-200`}>
            <Icon name="star" color="primary" size={20} filled={isFavorite} />
          </View>
        </Pressable>

        <WeatherIcon
          condition={current.condition}
          isDay={current.isDay}
          color="primary"
          size={140}
        />
      </View>
      <View />
    </View>
  );
}
