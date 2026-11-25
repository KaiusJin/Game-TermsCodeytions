import { defineConfig, devices } from '@playwright/test';

const port = 5175;

export default defineConfig({
  testDir: 'e2e',
  timeout: 60_000,
  fullyParallel: true,
  // Several levels animate continuously; too many parallel browsers starve each other of frames.
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    ...devices['Desktop Chrome'],
    // Full Chromium (new headless) instead of the headless shell, which can stall input on static frames.
    channel: 'chromium',
    viewport: { width: 1280, height: 900 },
  },
  // Tests run against the production build, which is also what gets deployed.
  webServer: { command: `npm run build && npx vite preview --port ${port} --strictPort`, url: `http://127.0.0.1:${port}`, reuseExistingServer: false },
});
