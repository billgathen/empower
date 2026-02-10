import { test, expect } from "@playwright/test";
import { mockAssistant } from "./mock-assistant";

const goalLabelName = "New Goal";
const goalText = "lose weight";
const actionLabelName = "New Action";
const actionText = "exercise more";
const buttonName = "Add";

test("with keyboard + screen reader", async ({ page }) => {
  mockAssistant(page, "shouldn't be called");
  await page.goto("/");

  const goals = page.locator('section#goals');
  const actions = page.locator('section#actions');

  // fill out goal, ignoring tabbable elements above
  const goalInput = goals.getByLabel(goalLabelName);
  await goalInput.focus();

  await page.keyboard.type(goalText);

  // submit
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");

  // select goal
  await page.keyboard.press("Tab"); // display nav instructions
  await page.keyboard.press("Tab");


  // navigate to controls
  await page.keyboard.press("Tab");
  await expect(goals.locator("#jump-to-actions")).toBeFocused();

  // navigate to actions
  await page.keyboard.press("Space");

  const actionInput = actions.getByLabel(actionLabelName);
  await expect(actionInput).toBeVisible();
  await expect(actionInput).toBeFocused();
  await expect(actionInput).toHaveAccessibleName(actionLabelName);

  // fill out action
  await page.keyboard.type(actionText);

  // submit
  await page.keyboard.press("Tab");

  const addButton = actions.getByRole("button", { name: buttonName });
  await expect(addButton).toBeVisible();
  await expect(addButton).toBeFocused();

  await page.keyboard.press("Enter");

  // check for action
  await expect(actions.locator(`input[value='${actionText}']`)).toBeVisible();

  // confirm input is cleared
  await expect(actionInput).toBeEmpty();
});
