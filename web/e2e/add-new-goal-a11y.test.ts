import { test, expect } from "@playwright/test";

const goalText = "lose weight";
const labelName = "New Goal";
const buttonName = "Add";

test("with keyboard + screen reader", async ({ page }) => {
  await page.goto("/");

  // fill out goal, ignoring tabbable elements above
  const input = page.getByLabel(labelName);
  await expect(input).toHaveAccessibleName(labelName);
  await input.focus();

  await page.keyboard.type(goalText);

  // submit
  await page.keyboard.press("Tab");

  const addButton = page.getByRole("button", { name: buttonName });
  await expect(addButton).toBeFocused();

  await page.keyboard.press("Enter");

  // check list
  const items = page.locator(".goals");
  const radioWithLabel = items.getByRole("radio", { name: goalText });

  await page.keyboard.press("Tab");

  await expect(radioWithLabel).toBeVisible();
  await expect(radioWithLabel).toBeFocused();
  await expect(radioWithLabel).toHaveAccessibleName(goalText)

  // check input is cleared
  await expect(input).toBeEmpty();
});
