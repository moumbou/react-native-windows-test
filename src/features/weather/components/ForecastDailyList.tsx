import { View } from 'react-native';
import tw from '../../../shared/lib/tw';
import { AppText } from '../../../shared/ui/AppText';
import { Forecast } from '../api/forecast';
import { ForecastDailyRow } from './ForecastDailyRow';

type ForecastDailyListProps = {
  daily: Forecast['daily'];
  timezone: string;
};

export function ForecastDailyList({ daily, timezone }: ForecastDailyListProps) {
  return (
    <View style={tw`p-5 bg-card dark:bg-card-dark rounded-card`}>
      <AppText variant="body" style={tw`font-semibold mb-1`}>
        7 days forecast
      </AppText>

      {daily.map((day, index) => {
        return (
          <ForecastDailyRow
            {...day}
            timezone={timezone}
            isToday={index === 0}
            key={day.date}
          />
        );
      })}
    </View>
  );
}
