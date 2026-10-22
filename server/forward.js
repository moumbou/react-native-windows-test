export async function forward(upstreamUrl, cacheSeconds) {
  try {
    const upstream = await fetch(upstreamUrl);
    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, s-maxage=${cacheSeconds}`,
      },
    });
  } catch (error) {
    console.error('Upstream failed:', error);
    return Response.json({ error: 'upstream_failed' }, { status: 502 });
  }
}
