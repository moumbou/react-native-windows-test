import { Pressable, View } from 'react-native';
import tw from '../../../shared/lib/tw';
import { AppText } from '../../../shared/ui/AppText';
import { City } from '../type';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { useForecastNow } from '../../weather/hooks/useForecast';
import { WeatherIcon } from '../../weather/components/WeatherICon';
import { formatTemp } from '../../weather/lib/formatWeather';
import { useCityStore } from '../store/useCityStore';
import { useShallow } from 'zustand/react/shallow';

export function SavedCityRow({ ...city }: City) {
  const forecast = useForecastNow(city);
  const { selectedCity, selectCity } = useCityStore(
    useShallow(s => ({
      selectedCity: s.selectedCity,
      selectCity: s.selectCity,
    })),
  );

  if (forecast.isError || !forecast.data) return null;

  const { condition, isDay, temperature } = forecast.data;
  const isSelected = selectedCity?.id === city.id;

  return (
    <Pressable accessibilityRole="button" onPress={() => selectCity(city)}>
      <View
        style={tw.style(
          'flex-row items-center px-3 py-2 rounded-md',
          isSelected && 'bg-card dark:bg-card-dark',
        )}
      >
        <View style={tw`flex-col flex-1`}>
          <AppText variant="body" style={tw`font-semibold`}>
            {city.name}
          </AppText>

          <AppText variant="caption" style={tw`font-semibold`}>
            {city.country}
          </AppText>
        </View>

        <View style={tw`flex-row items-center gap-5`}>
          {forecast.isLoading ? (
            <Skeleton height={20} width={40} rounded="sm" />
          ) : (
            <>
              <WeatherIcon
                isDay={isDay}
                color="primary"
                size={20}
                condition={condition}
              />

              <AppText variant="body" style={tw`font-semibold`}>
                {formatTemp(temperature)}
              </AppText>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
}
