import { forward } from '../forward.js';

export function GET(request) {
  const { search } = new URL(request.url);
  return forward(`https://api.open-meteo.com/v1/forecast${search}`, 600);
}
