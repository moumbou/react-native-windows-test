import { z } from 'zod';
import { toCondition } from '../lib/weatherCode';
import { getJson } from '../../../shared/lib/http';
import { API_BASE_URL } from '../../../shared/config';

const FORECAST_URL = `${API_BASE_URL}/api/forecast`;

const CURRENT =
  'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,is_day';
const HOURLY = 'temperature_2m,weather_code,is_day';
const DAILY =
  'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max';

const Current = z
  .object({
    time: z.number(),
    is_day: z.number(),
    temperature_2m: z.number(),
    apparent_temperature: z.number(),
    relative_humidity_2m: z.number(),
    weather_code: z.number(),
    wind_speed_10m: z.number(),
    wind_direction_10m: z.number(),
  })
  .transform(r => ({
    time: r.time,
    isDay: r.is_day === 1,
    temperature: r.temperature_2m,
    feelsLike: r.apparent_temperature,
    humidity: r.relative_humidity_2m,
    condition: toCondition(r.weather_code),
    windSpeed: r.wind_speed_10m,
    windDirection: r.wind_direction_10m,
  }));

export type CurrentForecast = z.infer<typeof Current>;

const ForecastResponse = z
  .object({
    timezone: z.string(),
    current: Current,
    hourly: z.object({
      time: z.array(z.number()),
      is_day: z.array(z.number()),
      temperature_2m: z.array(z.number()),
      weather_code: z.array(z.number()),
    }),
    daily: z.object({
      time: z.array(z.number()),
      weather_code: z.array(z.number()),
      temperature_2m_max: z.array(z.number()),
      temperature_2m_min: z.array(z.number()),
      precipitation_probability_max: z.array(z.number().nullable()),
    }),
  })
  .transform(r => ({
    timezone: r.timezone,
    current: r.current,
    hourly: r.hourly.time.map((time, i) => ({
      time,
      isDay: r.hourly.is_day[i] === 1,
      temperature: r.hourly.temperature_2m[i],
      condition: toCondition(r.hourly.weather_code[i]),
    })),
    daily: r.daily.time.map((date, i) => ({
      date,
      min: r.daily.temperature_2m_min[i],
      max: r.daily.temperature_2m_max[i],
      condition: toCondition(r.daily.weather_code[i]),
      rainChance: r.daily.precipitation_probability_max[i],
    })),
  }));

export type Forecast = z.infer<typeof ForecastResponse>;

export async function getForecast(
  latitude: number,
  longitude: number,
  signal?: AbortSignal,
): Promise<Forecast> {
  const url =
    `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}` +
    `&current=${CURRENT}&hourly=${HOURLY}&daily=${DAILY}&timezone=auto` +
    `&forecast_days=7&forecast_hours=12&timeformat=unixtime`;

  const json = await getJson(url, signal);
  return ForecastResponse.parse(json);
}

export async function getForecastNow(
  latitude: number,
  longitude: number,
  signal?: AbortSignal,
): Promise<CurrentForecast> {
  const url =
    `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}` +
    `&current=${CURRENT}&timeformat=unixtime`;

  const json = await getJson(url, signal);
  return Current.parse((json as unknown as { current: any }).current);
}
