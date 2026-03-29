export const appEnv = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3333',
  useApi: import.meta.env.VITE_USE_API === 'true'
};
