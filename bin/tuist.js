#!/usr/bin/env node

import { runCLI } from "../src/cli.js";

await runCLI(process.argv.slice(2));
