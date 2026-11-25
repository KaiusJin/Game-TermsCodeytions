/** URL of a file in public/assets, respecting Vite's base path. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;
