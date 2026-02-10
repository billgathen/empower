import { test, expect, Page } from "@playwright/test"
import { mockAssistant, mockUnauthorizedAssistant } from "./mock-assistant"

const goalText = "lose weight"
const labelName = "New Goal"
const addButtonName = "Add"
const deleteButtonName = "Delete"
const assistantResponse = "This is the assistant's response"

test("with pointing device", async ({ page }) => {
  mockAssistant(page, assistantResponse)

  const [goals, input] = await (submitGoal(page))

  // check list
  const items = goals.locator('#goals-list')

  const radioWithLabel = items.getByRole('radio', { name: goalText })

  await expect(radioWithLabel).toBeVisible()

  // check input is cleared
  await expect(input).toBeEmpty()

  // confirm response returned from assistant
  const assistantText = page.locator('#assistant-text')
  await expect(assistantText).toContainText(assistantResponse)

  // handle delete confirmation
  page.on("dialog", async dialog => {
    expect(dialog.type()).toBe("confirm");
    expect(dialog.message()).toContain(`Delete goal '${goalText}'?`);
    await dialog.accept();
  });

  // delete goal
  await goals.getByRole('button', { name: deleteButtonName }).click()

  await expect(radioWithLabel).not.toBeVisible()
})

test("without assistant API key", async ({ page }) => {
  mockUnauthorizedAssistant(page)

  await (submitGoal(page))

  await expect(page.locator('#assistant')).not.toBeVisible()
})

async function submitGoal(page: Page) {
  await page.goto("/")

  const goals = page.locator('section#goals')

  // fill out goal
  const input = goals.getByLabel(labelName)
  await input.fill(goalText)

  // submit
  await goals.getByRole('button', { name: addButtonName }).click()

  return [goals, input]
}
