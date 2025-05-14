const config = {
  API_BASE_URL: 'https://jsonplaceholder.typicode.com',
  DEFAULT_TIMEOUT: 10000,
} as const; //

export type AppConfig = typeof config;
export default config;