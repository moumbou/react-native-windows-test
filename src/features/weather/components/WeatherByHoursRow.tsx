import { View } from 'react-native';
import tw from '../../../shared/lib/tw';
import { AppText } from '../../../shared/ui/AppText';
import { Forecast } from '../api/forecast';
import { WeatherIcon } from './WeatherICon';
import { formatHour, formatTemp } from '../lib/formatWeather';

export function WeatherByHoursRow({
  time,
  condition,
  isDay,
  temperature,
  isNow,
  timezone,
}: Forecast['hourly'][0] & { isNow: boolean; timezone: string }) {
  return (
    <View
      style={tw.style(
        'w-[72px] py-3 items-center gap-2 rounded-card',
        isNow && 'bg-subtle dark:bg-subtle-dark',
      )}
    >
      <AppText variant="caption">
        {isNow ? 'Now' : formatHour(time, timezone)}
      </AppText>

      <WeatherIcon
        condition={condition}
        color="primary"
        size={26}
        isDay={isDay}
        label
      />

      <AppText variant="body" style={tw`font-semibold`}>
        {formatTemp(temperature)}
      </AppText>
    </View>
  );
}
