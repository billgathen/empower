import { Page } from "@playwright/test"

export async function mockAssistant(page: Page, message: string) {
  await page.route("**/api/assistant/authorized", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: "OK"
    })
  });

  await page.route("**/api/suggest", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        suggestion: message
      })
    })
  });
}

export async function mockUnauthorizedAssistant(page: Page) {
  await page.route("**/api/assistant/authorized", async route => {
    await route.fulfill({
      status: 401,
      contentType: "application/json",
      body: "Unauthorized"
    })
  });
}
