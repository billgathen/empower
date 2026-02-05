import { defineConfig, devices } from "@playwright/test";

const HOST = "127.0.0.1"
const PORT = 3000
const URL = `http://${HOST}:${PORT}`

export default defineConfig({
  testDir: "./e2e",
  timeout: 5_000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  use: {
    baseURL: URL,
    trace: "on-first-retry",
    actionTimeout: 5_000,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
