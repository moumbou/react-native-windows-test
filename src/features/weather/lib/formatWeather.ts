export const formatTemp = (value: number) => `${Math.round(value)}°`;

export function formatHour(unixSeconds: number, timeZone: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
  }).format(unixSeconds * 1000);
}

export function formatDayName(unixSeconds: number, timeZone: string): string {
  return new Intl.DateTimeFormat('en-GB', { timeZone, weekday: 'long' }).format(
    unixSeconds * 1000,
  );
}

export function formatLongDate(unixSeconds: number, timeZone: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(unixSeconds * 1000);
}
