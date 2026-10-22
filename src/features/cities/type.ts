export type WeatherData = {
  condition: 'sunny' | 'partly-cloudy' | 'cloudy' | 'rain';
  country: string;
  temperature: number;
  city: string;
};

export type City = {
  id: number;
  name: string;
  country: string;
  region?: string;
  latitude: number;
  longitude: number;
};
