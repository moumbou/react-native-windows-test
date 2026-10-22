import {
  CloudSun,
  RefreshCw,
  Search,
  Star,
  WifiOff,
  Wind,
  Moon,
  type LucideIcon,
  Sun,
  MapPin,
  Droplet,
  CloudRain,
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudSnow,
} from 'lucide-react-native';
import tw from '../lib/tw';

const icons = {
  weather: CloudSun,
  refresh: RefreshCw,
  search: Search,
  star: Star,
  wifiOff: WifiOff,
  wind: Wind,
  moon: Moon,
  sun: Sun,
  droplet: Droplet,
  'map-pin': MapPin,
  'cloud-rain': CloudRain,
  cloud: Cloud,
  'cloud-sun': CloudSun,
  'cloud-moon': CloudMoon,
  'cloud-fog': CloudFog,
  'cloud-drizzle': CloudDrizzle,
  'cloud-snow': CloudSnow,
  'cloud-lightning': CloudLightning,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;
export type IconColor =
  | 'default'
  | 'primary'
  | 'muted'
  | 'danger'
  | 'onPrimary';

function resolveColor(color: IconColor): string | undefined {
  const dark = tw.prefixMatch('dark');
  switch (color) {
    case 'primary':
      return tw.color(dark ? 'primary-light' : 'primary');
    case 'muted':
      return tw.color(dark ? 'muted-dark' : 'muted');
    case 'danger':
      return tw.color(dark ? 'danger-dark' : 'danger');
    case 'onPrimary':
      return tw.color('primary-foreground');
    default:
      return tw.color(dark ? 'zinc-100' : 'zinc-900');
  }
}

type IconProps = {
  name: IconName;
  size?: number;
  color?: IconColor;
  filled?: boolean;
};

export function Icon({
  name,
  size = 20,
  color = 'default',
  filled,
}: IconProps) {
  const Component = icons[name];
  const resolvedColor = resolveColor(color);

  return (
    <Component
      size={size}
      color={resolvedColor}
      fill={filled ? resolvedColor : 'none'}
    />
  );
}
