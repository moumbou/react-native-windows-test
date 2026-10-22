import { Pressable, View } from 'react-native';
import { formatCityDetails } from '../lib/formatCity';
import { City } from '../type';
import { Icon } from '../../../shared/ui/Icon';
import tw from '../../../shared/lib/tw';
import { AppText } from '../../../shared/ui/AppText';
import { useState } from 'react';

type CitySearchResultRowProps = {
  city: City;
  onSelect: (city: City) => void;
};
export function CitySearchResultRow({
  city,
  onSelect,
}: CitySearchResultRowProps) {
  const [hovered, setHovered] = useState(false);
  const details = formatCityDetails(city);

  return (
    <Pressable
      onPress={() => onSelect(city)}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      accessibilityRole="button"
      accessibilityLabel={details ? `${city.name}, ${details}` : city.name}
      style={({ pressed }) =>
        tw.style(
          'flex-row items-center gap-3 px-3 py-2.5 rounded-lg',
          (hovered || pressed) && 'bg-subtle dark:bg-subtle-dark',
        )
      }
    >
      <Icon name="map-pin" size={18} color="muted" />

      <View style={tw`flex-1`}>
        <AppText variant="body" style={tw`font-semibold`}>
          {city.name}
        </AppText>

        {details ? (
          <AppText variant="caption" style={tw`font-semibold`}>
            {details}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
}
