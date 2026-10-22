export class HttpError extends Error {
  readonly status: number;

  constructor(status: number, url: string) {
    super(`Request failed (${status}): ${url}`);

    this.name = 'HttpError';
    this.status = status;
  }
}

export async function getJson(
  url: string,
  signal?: AbortSignal,
): Promise<unknown> {
  const response = await fetch(url, {
    signal,
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new HttpError(response.status, url);
  }

  return response.json();
}
