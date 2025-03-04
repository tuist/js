import { execa } from "execa";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function runCLI(args) {
  const binaryPath = path.join(__dirname, "../native/tuist");
  await execa({ stdio: "inherit" })`${binaryPath} ${args}`;
}
