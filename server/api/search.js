import { forward } from '../forward.js';

export function GET(request) {
  const { search } = new URL(request.url);
  return forward(
    `https://geocoding-api.open-meteo.com/v1/search${search}`,
    86400,
  );
}
