import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const output = new URL('public/', root);
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const path of ['index.html', 'assets', 'blog', 'game', 'resume', 'services']) {
  cpSync(fileURLToPath(new URL(path, root)), fileURLToPath(new URL(path, output)), { recursive: true });
}
