import { test, expect } from "@playwright/test";

const goalText = "lose weight";
const labelName = "New Goal";
const buttonName = "Add";

test("with pointing device", async ({ page }) => {
  await page.goto("/");

  // fill out goal
  const input = page.getByLabel(labelName);
  await input.fill(goalText);

  // submit
  await page.getByRole('button', { name: buttonName }).click();

  // check list
  const items = page.locator('.goals');

  const radioWithLabel = items.getByRole('radio', { name: goalText });

  await expect(radioWithLabel).toBeVisible();

  // check input is cleared
  await expect(input).toBeEmpty();
});
