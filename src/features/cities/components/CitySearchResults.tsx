import { ScrollView, View } from 'react-native';
import { City } from '../type';
import tw from '../../../shared/lib/tw';
import { AppText } from '../../../shared/ui/AppText';
import { CitySearchResultRow } from './CitySearchResultRow';

type CitySearchResultProps = {
  query: string;
  cities: City[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onSelect: (city: City) => void;
};

export function CitySearchResults({ ...props }: CitySearchResultProps) {
  return (
    <View
      style={tw`absolute top-full left-0 right-0 p-2 rounded-card border border-line dark:border-line-dark bg-card dark:bg-card-dark z-10`}
    >
      <ResultsBody {...props} />
    </View>
  );
}

function ResultsBody({
  cities,
  isError,
  isLoading,
  onSelect,
  query,
}: CitySearchResultProps) {
  if (isError) {
    return (
      <AppText variant="caption" style={tw`p-3`}>
        Couldn't search right now. Try again in a moment
      </AppText>
    );
  }
  if (isLoading) {
    return (
      <AppText variant="caption" style={tw`p-3`}>
        Searching...
      </AppText>
    );
  }
  if (!cities || cities.length === 0) {
    return (
      <AppText
        variant="caption"
        style={tw`p-3`}
      >{`No city called "${query}"`}</AppText>
    );
  }
  return (
    <ScrollView>
      {cities.map(city => (
        <CitySearchResultRow key={city.id} city={city} onSelect={onSelect} />
      ))}
    </ScrollView>
  );
}
