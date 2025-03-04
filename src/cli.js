import { execa } from "execa";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function execCLI(
  args = process.argv.slice(2),
  options = { stdio: "inherit" },
) {
  const binaryPath = path.join(__dirname, "../bin/tuist");
  return await execa(options)`${binaryPath} ${args}`;
}
