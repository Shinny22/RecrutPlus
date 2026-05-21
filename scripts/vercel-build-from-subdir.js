/**
 * Used when Vercel Root Directory is set to "recrutPlus".
 * Builds the Next.js app from the repository root and copies output here.
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const subdir = path.join(root, "recrutPlus");

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(src, dest, { recursive: true });
}

console.log("Vercel: building Next.js from repository root…");
execSync("npm install", { cwd: root, stdio: "inherit" });
execSync("npm run build", { cwd: root, stdio: "inherit" });

console.log("Vercel: copying build output to recrutPlus/…");
copyRecursive(path.join(root, ".next"), path.join(subdir, ".next"));
copyRecursive(path.join(root, "public"), path.join(subdir, "public"));

const configFiles = ["next.config.ts", "package.json"];
for (const file of configFiles) {
  const src = path.join(root, file);
  const dest = path.join(subdir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

console.log("Vercel: subdir build bridge completed.");
