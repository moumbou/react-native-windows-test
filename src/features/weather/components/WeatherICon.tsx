import { View } from 'react-native';
import { Icon, IconColor } from '../../../shared/ui/Icon';
import { conditionIcon } from '../lib/conditionIcon';
import { CONDITION_LABEL, WeatherCondition } from '../lib/weatherCode';

type WeatherIconProps = {
  condition: WeatherCondition;
  isDay?: boolean;
  size?: number;
  color?: IconColor;
  label?: boolean;
};

export function WeatherIcon({
  condition,
  color,
  isDay,
  label,
  size,
}: WeatherIconProps) {
  const icon = (
    <Icon name={conditionIcon(condition, isDay)} size={size} color={color} />
  );

  if (!label) {
    return icon;
  }

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={CONDITION_LABEL[condition]}
    >
      {icon}
    </View>
  );
}
