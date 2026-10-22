import { Text, TextProps } from 'react-native';
import tw from '../lib/tw';

const variants = {
  display: 'text-7xl md:text-8xl font-light',
  title: 'text-[28px] font-semibold',
  subtitle: 'text-xl',
  heading: 'text-base font-semibold',
  body: 'text-[15px]',
  caption: 'text-[13px] text-muted dark:text-muted-dark',
} as const;

type Variant = keyof typeof variants;

type AppTextProps = TextProps & { variant: Variant };

export function AppText({ style, variant, ...rest }: AppTextProps) {
  return (
    <Text
      style={[
        tw`text-zinc-900 dark:text-zinc-100`,
        tw.style(variants[variant]),
        style,
      ]}
      {...rest}
    />
  );
}
