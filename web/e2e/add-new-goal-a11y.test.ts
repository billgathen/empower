import { test, expect } from "@playwright/test";
import mockAssistant from "./mock-assistant";

const goalText = "lose weight";
const labelName = "New Goal";
const buttonName = "Add";
const assistantResponse = "This is the assistant's response";

test("with keyboard + screen reader", async ({ page }) => {
  mockAssistant(page, assistantResponse);

  await page.goto("/");

  const assistant = page.locator('section#assistant')
  await expect(assistant).toHaveAttribute("aria-live", "polite")
  await expect(assistant).toHaveAttribute("aria-atomic", "true")
  const assistantText = page.locator("#assistant-text")
  await expect(assistantText).toBeEmpty()

  const goals = page.locator('section#goals');

  // fill out goal, ignoring tabbable elements above
  const input = goals.getByLabel(labelName);
  await expect(input).toHaveAccessibleName(labelName);
  await input.focus();

  await page.keyboard.type(goalText);

  // submit
  await page.keyboard.press("Tab");

  const addButton = goals.getByRole("button", { name: buttonName });
  await expect(addButton).toBeFocused();

  await page.keyboard.press("Enter");

  // check list
  const items = page.locator("#goals-list");
  const radioWithLabel = items.getByRole("radio", { name: goalText });

  await page.keyboard.press("Tab");

  await expect(radioWithLabel).toBeVisible();
  await expect(radioWithLabel).toBeFocused();
  await expect(radioWithLabel).toHaveAccessibleName(goalText)

  // check input is cleared
  await expect(input).toBeEmpty();

  // confirm response returned from assistant
  await expect(assistantText).toContainText(assistantResponse)
});
