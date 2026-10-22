import { View } from 'react-native';
import tw from '../../../shared/lib/tw';
import { Skeleton } from '../../../shared/ui/Skeleton';

export function WeatherSkeleton() {
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel="Loading forecast"
      style={tw`gap-6`}
    >
      <Skeleton width={`100%`} height={230} rounded="card" />

      <View style={tw`flex-row flex-wrap gap-4`}>
        <View style={tw`flex-1`}>
          <Skeleton width="100%" height={60} rounded="card" />
        </View>
        <View style={tw`flex-1`}>
          <Skeleton width="100%" height={60} rounded="card" />
        </View>
        <View style={tw`flex-1`}>
          <Skeleton width="100%" height={60} rounded="card" />
        </View>
      </View>

      <Skeleton width={'100%'} height={140} rounded="card" />

      <Skeleton width={'100%'} height={300} rounded="card" />
    </View>
  );
}
