import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getTuistDownloadURL, ensureTuist, getTuistPath } from '../src/installer.js';
import { mkdtemp, rm } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

describe('installer', () => {
  describe('getTuistDownloadURL', () => {
    it('generates correct URL for version 4.32.1', () => {
      const url = getTuistDownloadURL('4.32.1');
      assert.strictEqual(
        url,
        'https://github.com/tuist/tuist/releases/download/4.32.1/tuist.zip'
      );
    });

    it('generates correct URL for version 5.0.0', () => {
      const url = getTuistDownloadURL('5.0.0');
      assert.strictEqual(
        url,
        'https://github.com/tuist/tuist/releases/download/5.0.0/tuist.zip'
      );
    });

    it('generates correct URL for any version', () => {
      const url = getTuistDownloadURL('1.2.3');
      assert.strictEqual(
        url,
        'https://github.com/tuist/tuist/releases/download/1.2.3/tuist.zip'
      );
    });
  });

  describe('ensureTuist', () => {
    it('installs tuist and verifies version', async () => {
      const testDir = await mkdtemp(join(tmpdir(), 'tuist-test-'));
      
      try {
        const version = '4.32.1';
        const options = {
          homeDir: testDir,
          env: { XDG_DATA_HOME: join(testDir, '.local', 'share') },
          log: () => {}
        };
        
        await ensureTuist(version, options);
        const tuistPath = getTuistPath(options);
        
        const { stdout } = await execFileAsync(tuistPath, ['version']);
        const installedVersion = stdout.trim();
        
        assert.strictEqual(installedVersion, version);
      } finally {
        await rm(testDir, { recursive: true, force: true });
      }
    });
  });
});
