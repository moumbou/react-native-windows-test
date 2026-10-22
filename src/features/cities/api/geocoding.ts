import { z } from 'zod';
import { City } from '../type';
import { getJson } from '../../../shared/lib/http';
import { API_BASE_URL } from '../../../shared/config';

const GEOCODING_URL = `${API_BASE_URL}/api/search`;

const GeoResult = z
  .object({
    id: z.number(),
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    country: z.string().optional(),
    admin1: z.string().optional(),
  })
  .transform(
    (r): City => ({
      id: r.id,
      name: r.name,
      country: r.country || '',
      region: r.admin1,
      latitude: r.latitude,
      longitude: r.longitude,
    }),
  );

const GeoResponse = z.object({
  results: z.array(GeoResult).optional(),
});

export async function searchCities(
  query: string,
  signal?: AbortSignal,
): Promise<City[]> {
  const url = `${GEOCODING_URL}?name=${encodeURIComponent(
    query,
  )}&count=8&language=en&format=json`;
  const json = await getJson(url, signal);

  return GeoResponse.parse(json).results ?? [];
}
