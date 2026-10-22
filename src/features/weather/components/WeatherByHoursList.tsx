import { ScrollView, View } from 'react-native';
import tw from '../../../shared/lib/tw';
import { AppText } from '../../../shared/ui/AppText';
import { Forecast } from '../api/forecast';
import { WeatherByHoursRow } from './WeatherByHoursRow';

export function WeatherByHoursList({
  hourly,
  timezone,
}: Pick<Forecast, 'hourly'> & { timezone: string }) {
  return (
    <View style={tw`p-5 bg-card dark:bg-card-dark rounded-card`}>
      <AppText variant="body" style={tw`font-semibold mb-3`}>
        Next hours
      </AppText>

      <ScrollView horizontal contentContainerStyle={tw`gap-2 flex-row`}>
        {hourly.map((item, index) => (
          <WeatherByHoursRow
            {...item}
            isNow={index === 0}
            timezone={timezone}
            key={item.time}
          />
        ))}
      </ScrollView>
    </View>
  );
}
