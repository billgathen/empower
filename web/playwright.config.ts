import { defineConfig, devices } from "@playwright/test";

const HOST = "127.0.0.1"
const PORT = 3000
const URL = `http://${HOST}:${PORT}`

export default defineConfig({
  testDir: "./e2e",

  use: {
    baseURL: URL,
    trace: "on-first-retry",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});

