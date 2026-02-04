import { test, expect } from "@playwright/test";
import mockAssistant from "./mock-assistant";

const goalText = "lose weight";
const labelName = "New Goal";
const buttonName = "Add";
const assistantResponse = "This is the assistant's response";

test("with pointing device", async ({ page }) => {
  mockAssistant(page, assistantResponse);

  await page.goto("/");

  const goals = page.locator('section#goals');

  // fill out goal
  const input = goals.getByLabel(labelName);
  await input.fill(goalText);

  // submit
  await goals.getByRole('button', { name: buttonName }).click();

  // check list
  const items = goals.locator('#goals-list');

  const radioWithLabel = items.getByRole('radio', { name: goalText });

  await expect(radioWithLabel).toBeVisible();

  // check input is cleared
  await expect(input).toBeEmpty();

  // confirm response returned from assistant
  const assistantText = page.locator('#assistant-text')
  await expect(assistantText).toContainText(assistantResponse)
});
