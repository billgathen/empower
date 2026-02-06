import { test, expect } from "@playwright/test";
import { mockAssistant } from "./mock-assistant";

test("home page loads", async ({ page }) => {
  mockAssistant(page, "shouldn't be needed");
  await page.goto("/");
  await expect(page).toHaveTitle(/Empower/);
});
