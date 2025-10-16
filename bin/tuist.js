#!/usr/bin/env node

import { ensureTuist, getTuistPath } from '../src/installer.js';
import { spawn } from 'child_process';
import { homedir, platform, arch } from 'os';

const TUIST_VERSION = '4.32.1';

async function main() {
  try {
    const homeDir = homedir();
    const env = process.env;
    
    await ensureTuist(TUIST_VERSION, { homeDir, env, log: console.log });
    const tuistPath = getTuistPath({ homeDir, env });
    
    const args = process.argv.slice(2);
    const child = spawn(tuistPath, args, {
      stdio: 'inherit',
      shell: false
    });

    child.on('exit', (code) => {
      process.exit(code || 0);
    });
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
