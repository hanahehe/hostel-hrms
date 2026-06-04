import { chromium } from "playwright";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const outDir =
  process.env.OUT_DIR ||
  path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "dashboards");
fs.mkdirSync(outDir, { recursive: true });

const BASE = process.env.BASE_URL || "http://localhost:3000";

const roles = [
  { key: "admin", email: "admin@hostelhr.com", label: "Admin" },
  { key: "warden", email: "warden@hostelhr.com", label: "Warden" },
  { key: "staff", email: "staff@hostelhr.com", label: "Staff" },
  { key: "student", email: "student@hostelhr.com", label: "Student" },
  { key: "parent", email: "parent@hostelhr.com", label: "Parent" },
  { key: "super-admin", email: "superadmin@hostelhr.com", label: "Super Admin" },
];

const PASSWORD = "demo1234";

async function login(page, email) {
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', PASSWORD);
  const [res] = await Promise.all([
    page.waitForResponse((r) => r.url().includes("/api/auth/login") && r.ok()),
    page.click('button[type="submit"]'),
  ]);
  const data = await res.json();
  await page.goto(`${BASE}${data.redirect}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
}

const browser = await chromium.launch();

for (const role of roles) {
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await login(page, role.email);
  const file = path.join(outDir, `${role.key}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log("saved", file);
  await context.close();
}

await browser.close();
console.log("done");
