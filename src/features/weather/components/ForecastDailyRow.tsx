import { View } from 'react-native';
import { AppText } from '../../../shared/ui/AppText';
import { WeatherIcon } from './WeatherICon';
import tw from '../../../shared/lib/tw';
import { Forecast } from '../api/forecast';
import { CONDITION_LABEL } from '../lib/weatherCode';
import { formatDayName, formatTemp } from '../lib/formatWeather';

export function ForecastDailyRow({
  condition,
  date,
  max,
  min,
  isToday,
  timezone,
}: Forecast['daily'][0] & { isToday: boolean; timezone: string }) {
  const startingBar = min <= 15 ? 0 : Math.max((min * 100) / 15) - 100;
  const endingBar = max >= 30 ? 100 : Math.min((max * 100) / 30);

  return (
    <View
      style={tw`py-3.5 flex-row items-center gap-4 border-b border-zinc-200 dark:border-zinc-700`}
    >
      <AppText variant="body" style={tw`font-semibold`}>
        {isToday ? 'Today' : formatDayName(date, timezone)}
      </AppText>

      <WeatherIcon condition={condition} color="primary" size={22} />

      <AppText variant="caption" style={tw`flex-1`}>
        {CONDITION_LABEL[condition]}
      </AppText>

      <AppText variant="caption">{formatTemp(min)}</AppText>

      <View
        style={tw`w-[180px] h-1.5 dark:bg-zinc-700 bg-zinc-200 rounded-full relative`}
      >
        <View
          style={[
            tw`h-full rounded-full bg-primary`,
            {
              width: `${endingBar}%`,
              left: `${startingBar}%`,
            },
          ]}
        />
      </View>

      <AppText variant="body" style={tw`font-semibold`}>
        {formatTemp(max)}
      </AppText>
    </View>
  );
}
