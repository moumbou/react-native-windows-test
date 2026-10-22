import { skipToken, useQuery } from '@tanstack/react-query';
import { City } from '../../cities/type';
import { getForecast, getForecastNow } from '../api/forecast';

export function useForecast(city: City | null) {
  return useQuery({
    queryKey: ['forecast', city?.latitude, city?.longitude],
    queryFn: city
      ? ({ signal }) => getForecast(city.latitude, city.longitude, signal)
      : skipToken,
  });
}

export function useForecastNow(city: City | null) {
  return useQuery({
    queryKey: ['forecast-now', city?.latitude, city?.longitude],
    queryFn: city
      ? ({ signal }) => getForecastNow(city.latitude, city.longitude, signal)
      : skipToken,
  });
}
