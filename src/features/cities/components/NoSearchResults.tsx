import { StateMessage } from '../../../shared/ui/StateMessage';

export function WeatherErrorSearch({ query }: { query: string }) {
  return (
    <StateMessage
      icon="search"
      title={`No city called “${query}”`}
      message="Check the spelling, or try a larger city nearby."
      tone="default"
    />
  );
}
