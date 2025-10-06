// This file exports constants used throughout the application.

// The BASE_URL is dynamically set based on the environment (development or production).
// Vite automatically loads variables from `.env.development` when you run `npm run dev`
// and from `.env.production` when you run `npm run build`.
// The variable name must start with `VITE_`.
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;