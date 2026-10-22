import { View } from 'react-native';
import tw from '../../../shared/lib/tw';
import { DetailedWeatherRow } from './DetailedWeatherRow';

type DetailedWeatherListProps = {
  wind: number;
  humidity: number;
  chanceOfRain: number;
};

export function DetailedWeatherList({
  chanceOfRain,
  humidity,
  wind,
}: DetailedWeatherListProps) {
  return (
    <View style={tw`flex-row gap-4 flex-wrap`}>
      <DetailedWeatherRow icon="wind" title="wind" unit="km/h" value={wind} />
      <DetailedWeatherRow
        icon="droplet"
        title="humidity"
        unit="%"
        value={humidity}
      />
      <DetailedWeatherRow
        icon="cloud-rain"
        title="chance of rain"
        unit="%"
        value={chanceOfRain}
      />
    </View>
  );
}
