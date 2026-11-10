import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

const fail = (message) => {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
};
const pass = (message) => console.log(`PASS: ${message}`);

const html = readFileSync('index.html', 'utf8');
const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'));
const sw = readFileSync('sw.js', 'utf8');

if (/<!doctype html>/i.test(html)) pass('HTML document declaration exists');
else fail('index.html is missing its HTML doctype');

for (const id of ['products', 'filters', 'cartOpen', 'cartItems', 'checkoutForm', 'productModal', 'messageModal']) {
  if (new RegExp(`id=["']${id}["']`).test(html)) pass(`Storefront element #${id} exists`);
  else fail(`Storefront element #${id} is missing`);
}

const inlineScripts = [...html.matchAll(/<script>([\\s\\S]*?)<\\/script>/gi)];
if (!inlineScripts.length) fail('No inline application script found');
for (const [index, match] of inlineScripts.entries()) {
  try {
    new vm.Script(match[1], { filename: `index.html:inline-script-${index + 1}` });
    pass(`Inline JavaScript ${index + 1} parses`);
  } catch (error) {
    fail(`Inline JavaScript ${index + 1} has a syntax error: ${error.message}`);
  }
}

if (manifest.name && manifest.short_name && manifest.start_url && manifest.display) pass('PWA manifest has required install metadata');
else fail('PWA manifest is missing required install metadata');

for (const icon of manifest.icons ?? []) {
  const path = icon.src.replace(/^\\.\\//, '');
  if (existsSync(path)) pass(`PWA icon exists: ${path}`);
  else fail(`PWA icon is missing: ${path}`);
}
if (!manifest.icons?.length) fail('PWA manifest does not declare any icons');

if (/serviceWorker\\.register\\(['"]\\.\\/sw\\.js['"]\\)/.test(html)) pass('Storefront registers its service worker');
else fail('Service worker registration was not found');

if (/index\\.html/.test(sw) && /manifest\\.json/.test(sw)) pass('Service worker cache includes the storefront shell and manifest');
else fail('Service worker cache is missing core PWA assets');

if (existsSync('archive.html')) pass('Original mockup archive is preserved');
else fail('archive.html is missing');

if (process.exitCode) process.exit(process.exitCode);
console.log('ENVY storefront checks completed successfully.');
