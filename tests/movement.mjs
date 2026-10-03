import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:4173";
const output = "test-results/movement";
await mkdir(output, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROMIUM_PATH || "/snap/bin/chromium",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});

await page.goto(baseURL, { waitUntil: "domcontentloaded" });
await page.locator("#play").waitFor({ state: "visible", timeout: 30_000 });
await page.locator("#play").click();
await page.locator("#hud:not(.hidden)").waitFor({ state: "visible", timeout: 90_000 });
await page.waitForTimeout(2_000);

await page.keyboard.down("ArrowRight");
for (let frame = 0; frame < 24; frame += 1) {
  if ([2, 7, 12, 17, 22].includes(frame)) await page.keyboard.down("Space");
  if ([4, 9, 14, 19, 23].includes(frame)) await page.keyboard.up("Space");
  await page.screenshot({ path: `${output}/frame-${String(frame).padStart(2, "0")}.png` });
  await page.waitForTimeout(350);
}
await page.keyboard.up("Space");
await page.keyboard.up("ArrowRight");
await browser.close();

console.log(JSON.stringify({ frames: 24, errors }, null, 2));
