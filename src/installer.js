import { existsSync } from 'fs';
import { mkdir, chmod } from 'fs/promises';
import { dirname } from 'path';
import { getTuistBinPath, getTuistDirectory } from './paths.js';
import { get } from 'https';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

export function getTuistDownloadURL(version) {
  return `https://github.com/tuist/tuist/releases/download/${version}/tuist.zip`;
}

async function downloadFile(url, destPath) {
  await mkdir(dirname(destPath), { recursive: true });
  
  return new Promise((resolve, reject) => {
    get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      const fileStream = createWriteStream(destPath);
      pipeline(response, fileStream)
        .then(resolve)
        .catch(reject);
    }).on('error', reject);
  });
}

async function extractZip(zipPath, destDir) {
  const { default: AdmZip } = await import('adm-zip');
  const zip = new AdmZip(zipPath);
  await mkdir(destDir, { recursive: true });
  zip.extractAllTo(destDir, true);
}

export async function ensureTuist(version, { homeDir, env, log = () => {} }) {
  const binPath = getTuistBinPath({ homeDir, env });
  
  if (existsSync(binPath)) {
    return;
  }
  
  log(`Downloading Tuist ${version}...`);
  
  const tuistDir = getTuistDirectory({ homeDir, env });
  const zipPath = `${tuistDir}/tuist.zip`;
  const downloadURL = getTuistDownloadURL(version);
  
  await downloadFile(downloadURL, zipPath);
  await extractZip(zipPath, `${tuistDir}/bin`);
  await chmod(binPath, 0o755);
  
  log('Tuist installed successfully!');
}

export function getTuistPath({ homeDir, env }) {
  return getTuistBinPath({ homeDir, env });
}
