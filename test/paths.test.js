import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getXDGDataHome, getTuistDirectory, getTuistBinPath } from '../src/paths.js';

describe('paths', () => {
  describe('getXDGDataHome', () => {
    it('returns XDG_DATA_HOME when set', () => {
      const result = getXDGDataHome({ homeDir: '/home/user', env: { XDG_DATA_HOME: '/custom/data' } });
      assert.strictEqual(result, '/custom/data');
    });

    it('returns default XDG path when not set', () => {
      const result = getXDGDataHome({ homeDir: '/home/user', env: {} });
      assert.strictEqual(result, '/home/user/.local/share');
    });

    it('works on darwin', () => {
      const result = getXDGDataHome({ homeDir: '/Users/user', env: {} });
      assert.strictEqual(result, '/Users/user/.local/share');
    });
  });

  describe('getTuistDirectory', () => {
    it('appends tuist to XDG data home', () => {
      const result = getTuistDirectory({ homeDir: '/home/user', env: {} });
      assert.strictEqual(result, '/home/user/.local/share/tuist');
    });

    it('respects custom XDG_DATA_HOME', () => {
      const result = getTuistDirectory({ homeDir: '/home/user', env: { XDG_DATA_HOME: '/custom' } });
      assert.strictEqual(result, '/custom/tuist');
    });
  });

  describe('getTuistBinPath', () => {
    it('returns binary path on linux', () => {
      const result = getTuistBinPath({ homeDir: '/home/user', env: {} });
      assert.strictEqual(result, '/home/user/.local/share/tuist/bin/tuist');
    });

    it('returns binary path on darwin', () => {
      const result = getTuistBinPath({ homeDir: '/Users/user', env: {} });
      assert.strictEqual(result, '/Users/user/.local/share/tuist/bin/tuist');
    });

    it('respects custom XDG_DATA_HOME', () => {
      const result = getTuistBinPath({ homeDir: '/home/user', env: { XDG_DATA_HOME: '/opt/data' } });
      assert.strictEqual(result, '/opt/data/tuist/bin/tuist');
    });
  });
});
