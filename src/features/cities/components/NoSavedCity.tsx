import { StateMessage } from '../../../shared/ui/StateMessage';

export function NoSavedCity() {
  return (
    <StateMessage
      icon="star"
      title="No saved cities yet"
      message="Search for a city and press the star to keep it here."
      tone="primary"
      action={{
        label: 'Search a city',
        icon: 'search',
        onPress: () => console.log('hello'),
      }}
    />
  );
}
