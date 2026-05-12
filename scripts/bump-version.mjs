import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');

function replaceInFile(p, oldStr, newStr) {
  const content = fs.readFileSync(p, 'utf8');
  const newContent = content.replaceAll(oldStr, newStr);
  fs.writeFileSync(p, newContent);
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node scripts/bump-version.mjs <new-version>');
  process.exit(1);
}

const newVersion = args[0];

// Derive current version from extension.toml
const extToml = fs.readFileSync(path.join(REPO_ROOT, 'extension.toml'), 'utf8');
const match = extToml.match(/^version = "([^"]+)"/m);
if (!match) {
  console.error('Could not find version in extension.toml');
  process.exit(1);
}
const currentVersionFull = match[1];
const currentVersion = currentVersionFull.split('-')[0];

// Update extension.toml version (with -1 suffix)
replaceInFile(
  path.join(REPO_ROOT, 'extension.toml'),
  `version = "${currentVersionFull}"`,
  `version = "${newVersion}-1"`
);

// Update Cargo.toml package version (no suffix)
replaceInFile(
  path.join(REPO_ROOT, 'Cargo.toml'),
  `version = "${currentVersion}"`,
  `version = "${newVersion}"`
);

// Update @coree-ai/coree@VERSION in src/lib.rs
replaceInFile(
  path.join(REPO_ROOT, 'src/lib.rs'),
  `@coree-ai/coree@${currentVersion}`,
  `@coree-ai/coree@${newVersion}`
);

// Update README
replaceInFile(
  path.join(REPO_ROOT, 'README.md'),
  `@coree-ai/coree@${currentVersion}`,
  `@coree-ai/coree@${newVersion}`
);

console.log(`Bumped Zed extension to ${newVersion}-1`);
console.log(`Updated @coree-ai/coree@${newVersion} in src/lib.rs and README.md`);
