import { CurrentWeatherCard } from '../components/CurrentWeatherCard';
import { useCityStore } from '../../cities/store/useCityStore';
import { useForecast } from '../hooks/useForecast';
import { ForecastError } from '../components/ForecastError';
import { useCityStoreHydrated } from '../../cities/store/useCityStoreHudrated';
import { WeatherSkeleton } from '../components/WeatherSkeleton';
import { NoSavedCity } from '../../cities/components/NoSavedCity';
import { DetailedWeatherList } from './DetailedWeatherList';
import { WeatherByHoursList } from './WeatherByHoursList';
import { ForecastDailyList } from './ForecastDailyList';
export function WeatherPanel() {
  const isHydrated = useCityStoreHydrated();
  const city = useCityStore(state => state.selectedCity);
  const forecast = useForecast(city);

  if (!isHydrated) return <WeatherSkeleton />;
  if (!city) return <NoSavedCity />;
  if (forecast.isError)
    return <ForecastError onRetry={() => forecast.refetch()} />;
  if (!forecast.data) return <WeatherSkeleton />;

  const { current, daily, hourly, timezone } = forecast.data;

  console.log(hourly);
  return (
    <>
      <CurrentWeatherCard
        timezone={timezone}
        current={current}
        today={daily[0]}
        city={city}
      />

      <DetailedWeatherList
        humidity={current.humidity}
        wind={current.windSpeed}
        chanceOfRain={daily[0].rainChance || 0}
      />

      <WeatherByHoursList hourly={hourly} timezone={timezone} />

      <ForecastDailyList daily={daily} timezone={timezone} />
    </>
  );
}
