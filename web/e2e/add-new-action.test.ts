import { test, expect } from "@playwright/test";

const goalLabelName = "New Goal";
const goalText = "lose weight";
const actionLabelName = "New Action";
const actionText = "exercise more";
const buttonName = "Add";

test("with pointing device", async ({ page }) => {
  await page.goto("/");

  const goals = page.locator('section#goals');

  // fill out goal
  const goalInput = goals.getByLabel(goalLabelName);
  await goalInput.fill(goalText);

  // submit
  await goals.getByRole('button', { name: buttonName }).click();

  // select goal
  await goals.getByRole('radio', { name: goalText }).check();

  const actions = page.locator('section#actions');

  // fill out action
  const actionInput = actions.getByLabel(actionLabelName);
  await actionInput.fill(actionText);

  // submit
  await actions.getByRole('button', { name: buttonName }).click();

  // check for action
  await expect(actions.locator(`input[value='${actionText}']`)).toBeVisible();

  // confirm input is cleared
  await expect(actionInput).toBeEmpty();
});
