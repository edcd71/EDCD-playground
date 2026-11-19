import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:net";
import { randomBytes } from "node:crypto";
import { existsSync } from "node:fs";
import { access, mkdir, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const onlyMissing = args.includes("--missing");
const requested = [];
for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  if (arg === "--slug" && args[index + 1]) requested.push(args[++index]);
  else if (arg === "--slugs" && args[index + 1]) requested.push(...args[++index].split(",").filter(Boolean));
  else if (arg === "--missing") continue;
  else throw new Error(`Unknown or incomplete option: ${arg}\nUse --slug <slug>, --slugs <one,two>, repeated --slug, or --missing.`);
}

const directories = await readdir(path.join(root, "app", "prototypes"), { withFileTypes: true });
const discovered = [];
for (const entry of directories.filter((item) => item.isDirectory() && !item.name.startsWith("["))) {
  try {
    const metadata = JSON.parse(await readFile(path.join(root, "app", "prototypes", entry.name, "metadata.json"), "utf8"));
    if (metadata.slug === entry.name) discovered.push(entry.name);
  } catch { /* Invalid/incomplete prototype folders are not capturable. */ }
}
const unique = [...new Set(requested)];
const unknown = unique.filter((slug) => !discovered.includes(slug));
if (unknown.length) throw new Error(`Unknown prototype slug(s): ${unknown.join(", ")}`);
let slugs = unique.length ? unique : discovered;
const thumbPath = (slug, theme) => path.join(root, "public", "thumbnails", `${slug}-${theme}.png`);
if (onlyMissing) {
  const missing = [];
  for (const slug of slugs) {
    const hasLight = await access(thumbPath(slug, "light")).then(() => true, () => false);
    const hasDark = await access(thumbPath(slug, "dark")).then(() => true, () => false);
    if (!hasLight || !hasDark) missing.push(slug);
  }
  slugs = missing;
}
if (!slugs.length) { console.log("All selected thumbnails already exist."); process.exit(0); }

function run(command, commandArgs, env = process.env) {
  const result = spawnSync(command, commandArgs, { cwd: root, env, stdio: "inherit", shell: process.platform === "win32" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${commandArgs.join(" ")} exited with ${result.status ?? result.signal}`);
}

const password = process.env.SITE_PASSWORD || randomBytes(24).toString("base64url");
const secret = process.env.AUTH_SECRET || randomBytes(48).toString("base64url");
const captureEnv = { ...process.env, NODE_ENV: "production", SITE_PASSWORD: password, AUTH_SECRET: secret };
console.log("Building production app for thumbnail capture…");
run("npm", ["run", "build"], captureEnv);

const portServer = createServer();
await new Promise((resolve) => portServer.listen(0, "127.0.0.1", resolve));
const port = portServer.address().port;
await new Promise((resolve) => portServer.close(resolve));
const server = spawn("npm", ["run", "start", "--", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: root, env: captureEnv, stdio: "inherit", shell: process.platform === "win32" });
let browser;
try {
  const origin = `http://127.0.0.1:${port}`;
  let ready = false;
  for (let attempt = 0; attempt < 90; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`Production server exited with ${server.exitCode}`);
    try { const response = await fetch(origin); if (response.status < 500) { ready = true; break; } } catch { /* Wait for server startup. */ }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  if (!ready) throw new Error("Production server did not become ready within 90 seconds.");

  const { chromium } = await import("playwright");
  const systemChrome = process.env.CHROME_PATH || [
    process.platform === "darwin" && "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    process.platform === "win32" && "C:/Program Files/Google/Chrome/Application/chrome.exe",
    process.platform === "linux" && "/usr/bin/google-chrome",
  ].find((candidate) => candidate && existsSync(candidate));
  browser = await chromium.launch({ headless: true, ...(systemChrome ? { executablePath: systemChrome } : {}) });
  const output = path.join(root, "public", "thumbnails");
  await mkdir(output, { recursive: true });
  for (const slug of slugs) {
    for (const theme of ["light", "dark"]) {
      if (onlyMissing && await access(thumbPath(slug, theme)).then(() => true, () => false)) continue;
      const context = await browser.newContext({ viewport: { width: 720, height: 450 }, colorScheme: theme });
      await context.addInitScript((value) => localStorage.setItem("theme", value), theme);
      const page = await context.newPage();
      await page.goto(`${origin}/login`, { waitUntil: "networkidle" });
      await page.locator("#password").fill(password);
      await page.getByRole("button", { name: "Open the playground" }).click();
      await page.waitForURL(`${origin}/`);
      await page.goto(`${origin}/prototypes/${slug}`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: thumbPath(slug, theme), animations: "disabled" });
      await context.close();
      console.log(`Captured ${slug} (${theme})`);
    }
  }
} catch (error) {
  if (error?.message?.includes("Executable doesn't exist")) throw new Error("Playwright's Chromium is not installed. Run `npx playwright install chromium`, then retry.");
  throw error;
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}
