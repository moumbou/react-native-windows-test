import http from 'node:http';

const PORT = 3000;
const ROUTES = {
  '/api/search': 'https://geocoding-api.open-meteo.com/v1/search',
  '/api/forecast': 'https://api.open-meteo.com/v1/forecast',
};

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const upstream = ROUTES[url.pathname];

    if (!upstream) {
      res.writeHead(404).end();
      return;
    }

    try {
      const response = await fetch(`${upstream}${url.search}`); // forwards ?name=… / ?latitude=… unchanged
      res.writeHead(response.status, { 'Content-Type': 'application/json' });
      res.end(await response.text());
    } catch (error) {
      console.error('Upstream failed:', error.cause ?? error);
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'upstream_failed' }));
    }
  })
  .listen(PORT, () => console.log(`Weather proxy on http://localhost:${PORT}`));
