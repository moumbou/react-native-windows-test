import tw from '../lib/tw';
import { Animated, DimensionValue } from 'react-native';
import { useEffect, useRef } from 'react';

type SkeletonProps = {
  width: DimensionValue;
  height: number;
  rounded?: 'sm' | 'card' | 'full';
};

const RADIUS = {
  sm: 'rounded-md',
  card: 'rounded-card',
  full: 'rounded-full',
} as const;

export function Skeleton({ height, width, rounded }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 700,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: false,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      accessible={false}
      style={[
        tw.style('bg-zinc-200 dark:bg-zinc-700', RADIUS[rounded || 'sm']),
        {
          width,
          height,
          opacity,
        },
      ]}
    />
  );
}
