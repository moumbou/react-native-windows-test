import type { IconName } from '../../../shared/ui/Icon';
import type { WeatherCondition } from './weatherCode';

const DAY_ICONS: Record<WeatherCondition, IconName> = {
  clear: 'sun',
  'partly-cloudy': 'cloud-sun',
  cloudy: 'cloud',
  fog: 'cloud-fog',
  drizzle: 'cloud-drizzle',
  rain: 'cloud-rain',
  snow: 'cloud-snow',
  thunderstorm: 'cloud-lightning',
};

const NIGHT_ICONS: Partial<Record<WeatherCondition, IconName>> = {
  clear: 'moon',
  'partly-cloudy': 'cloud-moon',
};

export function conditionIcon(
  condition: WeatherCondition,
  isDay = true,
): IconName {
  if (!isDay && NIGHT_ICONS[condition]) {
    return NIGHT_ICONS[condition];
  }
  return DAY_ICONS[condition];
}
