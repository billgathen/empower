import { test, expect } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";
import { mockAssistant } from "./mock-assistant";

const goalText = "lose weight";
const labelName = "New Goal";
const buttonName = "Add";
const assistantResponse = "This is the assistant's response";

test("page has no obvious a11y violations", async ({ page }) => {
  mockAssistant(page, assistantResponse);
  await page.goto("/");

  // Inject axe into the page
  await injectAxe(page);

  // Fail test if violations are found
  await checkA11y(page, undefined, {
    detailedReport: true,
    detailedReportOptions: { html: true },
  });
});

test("Goals ARIA tree looks right", async ({ page }) => {
  mockAssistant(page, assistantResponse);
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Goals" })).toBeVisible();

  // Snapshot the accessibility tree for part of the UI
  await expect(page.getByRole("region", { name: "Goals" })).toMatchAriaSnapshot();
})

test("Actions ARIA tree looks right", async ({ page }) => {
  mockAssistant(page, assistantResponse);
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Actions" })).toBeVisible();

  // Snapshot the accessibility tree for part of the UI
  await expect(page.getByRole("region", { name: "Actions" })).toMatchAriaSnapshot();
})

test("Assistant ARIA tree looks right", async ({ page }) => {
  mockAssistant(page, assistantResponse);

  await page.goto("/");

  const goals = page.locator('section#goals');
  const input = goals.getByLabel(labelName);
  await input.fill(goalText);
  await goals.getByRole('button', { name: buttonName }).click();

  await expect(page.getByRole("region", { name: "Assistant Suggestions" })).toMatchAriaSnapshot();
});

test("no unnamed buttons/inputs", async ({ page }) => {
  mockAssistant(page, assistantResponse);
  await page.goto("/");

  // Buttons should have an accessible name
  const unnamedButtons = page.locator('button:not([aria-label]):not(:has-text(*))');
  await expect(unnamedButtons).toHaveCount(0);
});
