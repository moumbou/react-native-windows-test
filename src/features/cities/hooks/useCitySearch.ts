import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue';
import { searchCities } from '../api/geocoding';

export function useCitySearch(query: string) {
  const debouncedQuery = useDebouncedValue(query.trim(), 300);

  return useQuery({
    queryKey: ['cities', 'search', debouncedQuery],
    queryFn: ({ signal }) => searchCities(debouncedQuery, signal),
    enabled: debouncedQuery.length >= 2,
    staleTime: 24 * 60 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
