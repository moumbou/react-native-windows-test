import { FlatList, View } from 'react-native';
import tw from '../../../shared/lib/tw';
import { AppText } from '../../../shared/ui/AppText';
import { SavedCityRow } from './SavedCityRow';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { useCityStore } from '../store/useCityStore';
import { useCityStoreHydrated } from '../store/useCityStoreHudrated';

export function SavedCityList() {
  const cities = useCityStore(state => state.savedCities);
  const isHydrated = useCityStoreHydrated();

  return (
    <View style={tw`flex-col gap-2 w-[240px]`}>
      <View style={tw`flex-row justify-between items-center`}>
        <AppText variant="caption" style={tw`font-semibold`}>
          SAVED
        </AppText>

        <AppText variant="caption">{cities.length} cities</AppText>
      </View>

      <View>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={cities}
          contentContainerStyle={tw`gap-3`}
          renderItem={({ item }) => <SavedCityRow {...item} />}
        />

        {cities.length === 0 && isHydrated ? (
          <AppText variant="caption" style={tw`text-center mt-5`}>
            No saved cities yet.
          </AppText>
        ) : null}

        {isHydrated ? null : (
          <View style={tw`flex-col gap-2`}>
            <Skeleton width={'100%'} height={48} rounded="card" />

            <Skeleton width={'100%'} height={48} rounded="card" />

            <Skeleton width={'100%'} height={48} rounded="card" />
          </View>
        )}
      </View>
    </View>
  );
}
