import { View } from 'react-native';
import { Icon, type IconName, type IconColor } from './Icon';
import tw from '../lib/tw';
import { AppText } from './AppText';
import { Pressable } from 'react-native';
type Tone = 'default' | 'primary' | 'danger';

type StateMessageProps = {
  icon: IconName;
  title: string;
  message?: string;
  tone?: Tone;
  action?: { label: string; icon?: IconName; onPress: () => void };
};

const TONE_COLOR: Record<Tone, IconColor> = {
  default: 'muted',
  danger: 'danger',
  primary: 'primary',
};

export function StateMessage({
  icon,
  title,
  action,
  message,
  tone = 'default',
}: StateMessageProps) {
  return (
    <View
      accessibilityLiveRegion="polite"
      style={tw`flex-1 flex-col items-center justify-center gap-3 rounded-card bg-card dark:bg-card-dark py-5`}
    >
      <Icon name={icon} color={TONE_COLOR[tone]} size={40} />

      <AppText variant="subtitle" style={tw`text-center font-semibold`}>
        {title}
      </AppText>

      {message ? (
        <AppText variant="caption" style={tw`max-w-[360px] text-center`}>
          {message}
        </AppText>
      ) : null}

      {action ? (
        <Pressable
          onPress={action.onPress}
          accessibilityRole="button"
          style={({ pressed }) =>
            tw.style(
              `mt-2 h-11 px-5 rounded-card bg-primary flex-row items-center gap-2`,
              pressed && 'opacity-80',
            )
          }
        >
          {action.icon ? (
            <Icon name={action.icon} size={18} color="onPrimary" />
          ) : null}

          <AppText
            variant="body"
            style={tw`font-semibold text-primary-foreground`}
          >
            {action.label}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}
