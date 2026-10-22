import { View } from 'react-native';
import tw from '../../../shared/lib/tw';
import { Icon } from '../../../shared/ui/Icon';
import { AppText } from '../../../shared/ui/AppText';
import { type IconName } from '../../../shared/ui/Icon';

type DetailedWeatherRowProps = {
  title: string;
  value: string | number;
  unit: 'km/h' | '%';
  icon: IconName;
};

export function DetailedWeatherRow({
  icon,
  title,
  unit,
  value,
}: DetailedWeatherRowProps) {
  return (
    <View
      style={tw`flex-1 rounded-card bg-card dark:bg-card-dark px-5 py-4.5 flex-col gap-2`}
    >
      <View style={tw`flex-row gap-2 items-center`}>
        <Icon name={icon} color="muted" size={16} />

        <AppText variant="caption" style={tw`capitalize`}>
          {title}
        </AppText>
      </View>

      <View style={tw`flex flex-row gap-1 items-end`}>
        <AppText variant="body" style={tw`font-semibold`}>
          {value}
        </AppText>

        <AppText variant="caption">{unit}</AppText>
      </View>
    </View>
  );
}
