/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  // Browser tests in e2e/ belong to Playwright, not Vitest.
  test: { include: ['src/**/*.test.ts'] },
});
