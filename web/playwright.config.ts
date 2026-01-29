import { defineConfig, devices } from "@playwright/test";

const HOST = "127.0.0.1"
const PORT = 3000
const URL = `http://${HOST}:${PORT}`

export default defineConfig({
  testDir: "./e2e",
  timeout: 5_000,

  use: {
    baseURL: URL,
    trace: "on-first-retry",
    actionTimeout: 5_000,
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});

