import { expect, test } from "@playwright/test";
import { expectProperty } from "./util";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/stop-light.html");
});

test("is attached", async ({ page }) => {
  const component = page.locator("stop-light");
  await expect(component).toBeAttached();
});

test("can click to change state", async ({ page }) => {
  const stoplight = page.locator("stop-light");
  await expectProperty(stoplight, "state", "stop");
  await stoplight.click();
  await expectProperty(stoplight, "state", "yield");
  await stoplight.click();
  await expectProperty(stoplight, "state", "go");
});

test("can call next to change state", async ({ page }) => {
  const stoplight = page.locator("stop-light");
  await expectProperty(stoplight, "state", "stop");
  await stoplight.evaluate((el) => el.next());
  await expectProperty(stoplight, "state", "yield");
  await stoplight.evaluate((el) => el.next());
  await expectProperty(stoplight, "state", "go");
});

test("snapshot", async ({ page }) => {
  await expect(page).toHaveScreenshot();
});
