import { ScrollView, View } from 'react-native';
import tw from '../../../shared/lib/tw';
import { Screen } from '../../../shared/ui/Screen';
import { SavedCityList } from '../../cities/components/SavedCityList';
import { WeatherPanel } from '../components/WeatherPanel';

export function WeatherScreen() {
  return (
    <Screen>
      <View style={tw`flex-1`}>
        <View style={tw`p-6 flex-1 flex-row gap-6`}>
          <SavedCityList />

          <ScrollView style={tw`flex-1`} contentContainerStyle={tw`pb-6 gap-6`}>
            <WeatherPanel />
          </ScrollView>
        </View>
      </View>
    </Screen>
  );
}
