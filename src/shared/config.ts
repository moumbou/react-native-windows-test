const LOCAL_API_URL = 'http://localhost:3000';
const DEPLOYED_API_URL = 'https://your-weather-proxy.vercel.app';

export const API_BASE_URL = __DEV__ ? LOCAL_API_URL : DEPLOYED_API_URL;
