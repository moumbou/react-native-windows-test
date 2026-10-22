import { useState } from 'react';
import { City } from '../type';
import { useCitySearch } from '../hooks/useCitySearch';
import { TextInput, View } from 'react-native';
import tw from '../../../shared/lib/tw';
import { Icon } from '../../../shared/ui/Icon';
import { CitySearchResults } from './CitySearchResults';
import { useCityStore } from '../store/useCityStore';

export function CitySearchField() {
  const selectCity = useCityStore(state => state.selectCity);

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const search = useCitySearch(query);

  const trimmedQuery = query.trim();
  const showResults = isOpen && trimmedQuery.length >= 2;

  const handleSelect = (city: City) => {
    selectCity(city);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <View style={tw`flex-1`}>
      <View
        style={tw`flex-row items-center gap-2.5 py-2 px-3 rounded-md border border-line dark:border-line-dark bg-card dark:bg-card-dark`}
      >
        <Icon name="search" size={18} color="muted" />
        <TextInput
          value={query}
          onChangeText={text => {
            setQuery(text);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Escape') {
              setIsOpen(false);
            }
          }}
          placeholder="Search a city"
          accessibilityLabel="Search a city"
          placeholderTextColor={tw.color(
            tw.prefixMatch('dark') ? 'muted-dark' : 'muted',
          )}
          style={tw`flex-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100`}
        />
      </View>

      {showResults ? (
        <CitySearchResults
          query={trimmedQuery}
          cities={search.data}
          isLoading={search.isLoading}
          isError={search.isError}
          onSelect={handleSelect}
        />
      ) : null}
    </View>
  );
}
