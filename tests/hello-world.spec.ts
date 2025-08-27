import { expect, test } from "@playwright/test";
import {
  expectAttribute,
  expectProperty,
  setAttribute,
  setProperty,
} from "./util"; // defines helpful utility methods I wrote

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
});

test("snapshot", async ({ page }) => {
  await expect(page).toHaveScreenshot();
});

test("default name", async ({ page }) => {
  //const el = page.locator("hello-world").first();
  const els = page.locator("hello-world");
  console.log("count =", await els.count());
  const el = els.first();
  const p = el.locator("p");
  await expect(p).toHaveText("Hello, World!");
});

test("specified name", async ({ page }) => {
  const el = page.locator("hello-world").last();
  const p = el.locator("p");
  await expect(p).toHaveText("Hello, Mark!");
});

test("set attribute", async ({ page }) => {
  const el = page.locator("hello-world").last();
  const p = el.locator("p");
  const name = "Tami";
  await setAttribute(el, "name", name);
  await expect(p).toHaveText(`Hello, ${name}!`);
  // Verify that setting an attribute also sets the corresponding property.
  await expectProperty(el, "name", name);
});

test("set property", async ({ page }) => {
  const el = page.locator("hello-world").last();
  const p = el.locator("p");
  const name = "Comet";
  await setProperty(el, "name", name);
  await expect(p).toHaveText(`Hello, ${name}!`);
  // Verify that setting a property also sets the corresponding attribute.
  await expectAttribute(el, "name", name);
});
