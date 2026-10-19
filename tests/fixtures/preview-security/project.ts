import { cp, mkdir, mkdtemp, readFile, realpath, symlink, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fixtureInput } from '../content/fixture.ts';

const project = fileURLToPath(new URL('../../../', import.meta.url));
const execute = promisify(execFile);
export const entryIds = ['registered', 'comment', 'scripted'] as const;

export async function build(root: string): Promise<void> {
  await execute(process.execPath, [join(project, 'node_modules/astro/bin/astro.mjs'), 'build', '--root', root], {
    cwd: root, env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' }, timeout: 30_000,
  });
}

export async function createSecurityProject(): Promise<string> {
  const root = await realpath(await mkdtemp(join(tmpdir(), 'bbf-preview-regression-')));
  for (const path of ['src', 'astro.config.mjs', 'package.json', 'tsconfig.json']) {
    await cp(join(project, path), join(root, path), { recursive: true });
  }
  await symlink(join(project, 'node_modules'), join(root, 'node_modules'));
  const config = await readFile(join(root, 'astro.config.mjs'), 'utf8');
  await writeFile(join(root, 'astro.config.mjs'), config.replace("output: 'static',", "output: 'static', cacheDir: './.astro/cache',"));
  const fixture = fixtureInput();
  await writeFile(join(root, 'src/content/authors/fixture-author.json'), JSON.stringify(fixture.authors[0]!.data));
  const registrations = [];
  for (const id of [...entryIds, 'unpublished']) {
    const directory = join(root, `src/examples/${id}/source`);
    await mkdir(directory, { recursive: true });
    const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jG1sAAAAASUVORK5CYII=';
    const html = `<!doctype html>\n${id === 'comment' ? '<!-- <head> and <!doctype html> are only comment text -->\n' : ''}<html lang="en"><head><meta charset="utf-8"><title>Security fixture ${id}</title><link rel="stylesheet" href="styles.css"></head><body><h1>Security fixture ${id}</h1><img src="${image}" alt="One pixel fixture"><script>document.body.dataset.inlineProbe='executed';</script><script src="runtime.js"></script></body></html>`;
    await writeFile(join(directory, 'index.html'), html);
    await writeFile(join(directory, 'styles.css'), 'h1 { color: rgb(10, 120, 30); }');
    await writeFile(join(directory, 'runtime.js'), `document.body.dataset.classicProbe='executed';
addEventListener('load', () => {
  let parentBlocked=false, storageBlocked=false;
  try { void parent.document.body; } catch { parentBlocked=true; }
  try { localStorage.getItem('bbf-security-test'); } catch { storageBlocked=true; }
  top.postMessage({type:'bbf-security', id:'${id}', parentBlocked, storageBlocked,
    inline:document.body.dataset.inlineProbe, color:getComputedStyle(document.querySelector('h1')).color,
    imageLoaded:document.querySelector('img').naturalWidth === 1}, '*');
});`);
    await writeFile(join(directory, 'extra.html'), '<!doctype html><html lang="en"><head><title>Unregistered HTML</title></head><body><h1>Unregistered HTML companion</h1><script>document.body.dataset.securityProbe="executed";</script></body></html>');
    await writeFile(join(directory, 'image.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" onload="document.documentElement.setAttribute(\'data-security-probe\',\'executed\')"><rect width="100" height="100" fill="green"/></svg>');
    await writeFile(join(root, `src/examples/${id}/example.json`), JSON.stringify({
      id, title: `Security fixture ${id}`, accessibleLabel: `Security fixture ${id}`, preview: { entry: id },
      sourceFiles: [
        { id: 'entry', label: 'index.html', path: 'index.html', language: 'html' },
        { id: 'css', label: 'styles.css', path: 'styles.css', language: 'css' },
        { id: 'js', label: 'runtime.js', path: 'runtime.js', language: 'javascript' },
      ],
    }));
    registrations.push({ id, kind: 'isolated-page', path: `${id}/source/index.html`, sandbox: id === 'scripted' ? ['allow-scripts'] : [] });
  }
  await writeFile(join(root, 'src/examples/previews.ts'), `export const previews=${JSON.stringify(registrations)};`);
  await writeFile(join(root, 'src/content/articles/security.mdx'), `---\n${JSON.stringify({ ...fixture.articles[0]!.data, title: 'Security development fixture', examples: entryIds })}\n---\n## Security fixture\nNever production content.`);
  await mkdir(join(root, 'src/drafts/security/source'), { recursive: true });
  await writeFile(join(root, 'src/drafts/security/source/index.html'), '<script>throw new Error("BBF_DRAFT_SECURITY_MARKER")</script>');
  return root;
}

// Manual browser suite: build a disposable project, then serve only its dist/.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = await createSecurityProject();
  await build(root);
  await cp(new URL('./browser.html', import.meta.url), join(root, 'dist/security-tests.html'));
  console.log(root);
}
