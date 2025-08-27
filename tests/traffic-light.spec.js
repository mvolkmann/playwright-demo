import { expect, test } from "@playwright/test";
import { expectProperty } from "./util";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/traffic-light.html");
});

test("is attached", async ({ page }) => {
  const component = page.locator("traffic-light");
  await expect(component).toBeAttached();
});

test("can click to change state", async ({ page }) => {
  const trafficLight = page.locator("traffic-light");
  await expectProperty(trafficLight, "state", "stop");
  await trafficLight.click();
  await expectProperty(trafficLight, "state", "yield");
  await trafficLight.click();
  await expectProperty(trafficLight, "state", "go");
});

test("can call next to change state", async ({ page }) => {
  const trafficLight = page.locator("traffic-light");
  await expectProperty(trafficLight, "state", "stop");
  await trafficLight.evaluate((el) => el.next());
  await expectProperty(trafficLight, "state", "yield");
  await trafficLight.evaluate((el) => el.next());
  await expectProperty(trafficLight, "state", "go");
});

test("snapshot", async ({ page }) => {
  await expect(page).toHaveScreenshot();
});
