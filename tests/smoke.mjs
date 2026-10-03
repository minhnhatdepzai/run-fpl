import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import assert from "node:assert/strict";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:4173";
await mkdir("test-results", { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROMIUM_PATH || "/snap/bin/chromium",
});

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
const failed = [];

page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("requestfailed", (request) => {
  const reason = request.failure()?.errorText || "";
  if (reason !== "net::ERR_ABORTED") {
    failed.push(`${request.method()} ${request.url()} ${reason}`);
  }
});
page.on("response", (response) => {
  if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`);
});

await page.goto(baseURL, { waitUntil: "domcontentloaded" });
await page.locator("#play").waitFor({ state: "visible", timeout: 30_000 });
await page.waitForTimeout(4_000);
assert.equal(await page.title(), "Run FPL — Thế giới Anime");
assert.equal(await page.locator("html").getAttribute("lang"), "vi");
assert.equal(await page.locator("#play-label").textContent(), "Chơi");
assert.equal(await page.locator("#title-social-links a").count(), 3);
assert.equal(await page.locator('#title-social-links a[href^="mailto:"]').count(), 1);
assert.equal(await page.locator("[data-run-fpl-level]").count(), 8);
await page.screenshot({ path: "test-results/title-local.png", fullPage: true });

await page.locator("#settings").click();
await page.locator("#dialog:not(.hidden)").waitFor({ state: "visible", timeout: 10_000 });
await page.locator('[data-character="clay"] strong').getByText("Doraemon", { exact: true }).waitFor();
assert.equal(await page.locator("[data-character]").count(), 6);
assert.equal(await page.locator('[data-character="clay"]').getAttribute("aria-checked"), "true");
assert.equal(
  await page.locator('[data-action="settings-stopmotion"]').getAttribute("aria-checked"),
  "false",
);
await page.locator("[data-run-fpl-language]").click();
assert.equal(await page.locator("html").getAttribute("lang"), "en");
assert.equal(await page.title(), "Run FPL — Anime Worlds");
assert.equal(await page.locator("[data-run-fpl-language] strong").textContent(), "EN");
await page.locator("[data-run-fpl-language]").click();
assert.equal(await page.locator("html").getAttribute("lang"), "vi");
await page.screenshot({ path: "test-results/settings-local.png", fullPage: true });
await page.keyboard.press("Escape");

await page.locator("#chapters").click();
await page.locator(".chapters-list").waitFor({ state: "visible", timeout: 10_000 });
assert.ok((await page.locator(".chapter-choice").count()) >= 6);
await page.screenshot({ path: "test-results/worlds-local.png", fullPage: true });
await page.keyboard.press("Escape");

// Start the forest directly from the new scenery picker. This verifies that
// the scenery controls launch a genuinely different game world.
await page.locator('[data-run-fpl-level="2"]').click();
let playing = false;
for (let attempt = 0; attempt < 18; attempt += 1) {
  await page.waitForTimeout(5_000);
  const state = await page.evaluate(() => ({
    body: document.body.className,
    menu: document.getElementById("menu")?.className,
    loading: document.getElementById("loading")?.className,
    loadingStatus: document.getElementById("loading-status")?.textContent,
    loadingProgress: document.getElementById("loading-fill")?.style.width,
    hud: document.getElementById("hud")?.className,
    error: document.getElementById("error")?.className,
    errorText: document.getElementById("error-text")?.textContent,
    gameResources: performance
      .getEntriesByType("resource")
      .map((entry) => entry.name)
      .filter((name) => /\.(json|glb)(?:$|\?)/.test(name)),
  }));
  console.log(JSON.stringify(state));
  if (!state.hud?.includes("hidden")) {
    playing = true;
    break;
  }
  if (!state.error?.includes("hidden")) {
    console.error(JSON.stringify({ errors, failed }, null, 2));
    throw new Error(state.errorText);
  }
}
if (!playing) throw new Error("Gameplay HUD did not appear within 90 seconds.");
await page.waitForTimeout(2_000);
assert.match((await page.locator("#intro-name").textContent()) || "", /Khu Rừng/);
await page.screenshot({ path: "test-results/game-local.png", fullPage: true });

const updates = await browser.newPage({ viewport: { width: 1200, height: 800 } });
await updates.goto(`${baseURL}/updates.html?from=smoke`, { waitUntil: "networkidle" });
assert.equal(await updates.locator("html").getAttribute("lang"), "vi");
assert.equal(await updates.locator("#updates-social a").count(), 3);
await updates.locator("#signup-email").fill("local@example.com");
await updates.locator("#signup-submit").click();
await updates.getByText("Đã lưu email trên thiết bị này.").waitFor({ timeout: 5_000 });

const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
await mobile.goto(baseURL, { waitUntil: "domcontentloaded" });
await mobile.locator("#play").waitFor({ state: "visible", timeout: 30_000 });
await mobile.waitForTimeout(4_000);
await mobile.screenshot({ path: "test-results/title-mobile.png", fullPage: true });
assert.equal(await mobile.locator("[data-run-fpl-level]").count(), 8);
assert.ok(await mobile.locator("#jump").count());
assert.ok(await mobile.locator("#move-pad").count());

await browser.close();

if (errors.length || failed.length) {
  console.error(JSON.stringify({ errors, failed }, null, 2));
  process.exit(1);
}

console.log("Smoke test passed: title, settings, gameplay, and local signup.");
