import { test, expect } from "@playwright/test";

test("add new goal and see it moved into the list", async ({ page }) => {
  await page.goto("/");

  const goalText = "lose weight";

  const input = page.getByLabel("New Goal");
  await input.fill(goalText);

  await page.getByRole('button', { name: "Add" }).click();

  const items = page.locator('.goals');

  const radioWithLabel = items.getByRole('radio', { name: goalText });

  await expect(radioWithLabel).toBeVisible();

  await expect(input).toBeEmpty();
});

