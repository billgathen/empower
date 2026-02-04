import { Page } from "@playwright/test"

export default async function mockAssistant(page: Page, message: string) {
  await page.route("**/api/suggest", async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        suggestion: message
      })
    })
  });
}
