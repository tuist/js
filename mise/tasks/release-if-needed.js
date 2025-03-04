#!/usr/bin/env node
//MISE description="Release a new version of the package if needed"

import { execa } from "execa";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import toml from "toml";

const __dirname = dirname(fileURLToPath(import.meta.url));

const packageJSONPath = path.join(__dirname, "../../package.json");
const packageJSONVersion = JSON.parse(fs.readFileSync(packageJSONPath)).version;
console.info(`Package version: ${packageJSONVersion}`);

const miseTomlVersion = toml.parse(
  fs.readFileSync(path.join(__dirname, "../../mise.toml")),
).tools.tuist;

console.info(`Mise version: ${miseTomlVersion}`);

if (packageJSONVersion == miseTomlVersion) {
  console.info("Skipping release");
  process.exit(0);
}

console.info("Updating package.json");
fs.writeFileSync(
  packageJSONPath,
  JSON.stringify(
    {
      ...JSON.parse(fs.readFileSync(packageJSONPath)),
      version: miseTomlVersion,
    },
    null,
    2,
  ),
);

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
