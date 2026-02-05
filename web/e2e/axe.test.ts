import { test, expect } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

test("page has no obvious a11y violations", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Inject axe into the page
  await injectAxe(page);

  // Fail test if violations are found
  await checkA11y(page, undefined, {
    detailedReport: true,
    detailedReportOptions: { html: true },
  });
});

test("ARIA tree looks right", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByRole("heading", { name: "Goals" })).toBeVisible();

  // Snapshot the accessibility tree for part of the UI
  await expect(page.getByRole("region", { name: "Goals" })).toMatchAriaSnapshot();
  await expect(page.getByRole("region", { name: "Actions" })).toMatchAriaSnapshot();
  await expect(page.getByRole("region", { name: "Assistant Suggestions" })).toMatchAriaSnapshot();
});

test("no unnamed buttons/inputs", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Buttons should have an accessible name
  const unnamedButtons = page.locator('button:not([aria-label]):not(:has-text(*))');
  await expect(unnamedButtons).toHaveCount(0);
});
