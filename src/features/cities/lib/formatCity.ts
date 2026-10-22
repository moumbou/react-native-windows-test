import { City } from '../type';

export function formatCityDetails(city: City): string {
  return [city.region, city.country].filter(Boolean).join(', ');
}
