import { join } from 'path';

export function getXDGDataHome({ homeDir, env }) {
  return env.XDG_DATA_HOME || join(homeDir, '.local', 'share');
}

export function getTuistDirectory({ homeDir, env }) {
  return join(getXDGDataHome({ homeDir, env }), 'tuist');
}

export function getTuistBinPath({ homeDir, env }) {
  return join(getTuistDirectory({ homeDir, env }), 'bin', 'tuist');
}
