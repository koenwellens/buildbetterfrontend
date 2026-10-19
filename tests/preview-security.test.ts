import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { previewResources, renderPreviewDocument } from '../src/lib/content/preview.ts';
import { createSecurityProject, build } from './fixtures/preview-security/project.ts';

const label = { label: 'Security fixture', sandbox: [] };
const valid = '<!doctype html><html lang="en"><head><title>Fixture</title></head><body><p>Fixture</p></body></html>';

test('controlled preview document accepts comments and escapes every authored byte into srcdoc', () => {
  const html = renderPreviewDocument(valid.replace('<html', '<!-- <head> -->\n<html'), label);
  assert.ok(html.indexOf('Content-Security-Policy') < html.indexOf('srcdoc='));
  assert.match(html, /sandbox=""/);
  assert.match(html, /srcdoc="&lt;!doctype html&gt;/);
  assert.match(html, /&lt;!-- &lt;head&gt; --&gt;/);
  assert.match(renderPreviewDocument(valid.replace('Fixture</p>', '&quot; </iframe><script>throw 1</script></p>'), label), /&lt;\/iframe&gt;&lt;script&gt;/);
  for (const source of [
    '<p>Fragment without a full document</p>', valid.replace('</head>', ''),
    valid.replace('</body>', ''), valid.replace('<p>', '<p id="one" id="two">'),
    '<!doctype html><!-- unterminated',
  ]) assert.throws(() => renderPreviewDocument(source, label), /Unsupported preview document/);
});

test('resource policy rejects active companions, protects entry aliases, and preserves supported companions', () => {
  const example = { id: 'fixture', title: 'Fixture', sourceFiles: [], accessibleLabel: 'Fixture',
    preview: { id: 'fixture', kind: 'isolated-page' as const, path: 'fixture/source/index.html', filePath: 'src/examples/fixture/source/index.html', sandbox: [] } };
  for (const [path, language] of [['extra.html', 'html'], ['image.svg', 'xml'], ['code.ts', 'typescript']] as const) {
    assert.throws(() => previewResources([{ ...example, sourceFiles: [{ id: 'file', label: path, path, language, filePath: `src/examples/fixture/source/${path}`, content: '' }] }]), /unsupported preview companion/);
  }
  const files = [['index.html', 'html'], ['styles.css', 'css'], ['runtime.js', 'javascript']] as const;
  const resources = previewResources([{ ...example, sourceFiles: files.map(([path, language]) => ({ id: path, path, label: path, language, filePath: `src/examples/fixture/source/${path}`, content: '' })) }]);
  assert.equal(resources.length, 3);
  assert.ok(resources[0]?.document);
  assert.equal(resources.filter(resource => resource.document).length, 1);
  assert.throws(() => previewResources([example, { ...example, preview: { ...example.preview, sandbox: ['allow-scripts'] } }]), /Conflicting preview permissions/);
});

test('actual static preview builds reject HTML/SVG companions and malformed documents, including cached edits', async () => {
  const root = await createSecurityProject();
  const metadataPath = join(root, 'src/examples/registered/example.json');
  const metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
  async function failure(pattern: RegExp) {
    await assert.rejects(build(root), (error: unknown) => {
      const result = error as { stdout: string; stderr: string };
      assert.match(result.stdout + result.stderr, pattern);
      return true;
    });
  }
  try {
    await build(root);
    for (const [path, language] of [['extra.html', 'html'], ['image.svg', 'xml']] as const) {
      await writeFile(metadataPath, JSON.stringify({ ...metadata, sourceFiles: [...metadata.sourceFiles, { id: 'active', label: path, path, language }] }));
      await failure(/example "registered": unsupported preview companion/);
    }
    await writeFile(metadataPath, JSON.stringify(metadata));
    const documentPath = join(root, 'src/examples/registered/source/index.html');
    const source = await readFile(documentPath, 'utf8');
    await writeFile(documentPath, source.replace('</head>', ''));
    await failure(/preview "registered\/source\/index.html":.*Unsupported preview document/);
    await writeFile(documentPath, source);
    await build(root);
    const files = await readdir(join(root, 'dist/previews/registered/source'));
    assert.deepEqual(files.sort(), ['index.html', 'runtime.js', 'styles.css']);
    assert.match(await readFile(join(root, 'dist/previews/comment/source/index.html'), 'utf8'), /srcdoc="&lt;!doctype/);
    assert.equal(await readFile(join(root, 'dist/previews/registered/source/styles.css'), 'utf8'), 'h1 { color: rgb(10, 120, 30); }');
    await rm(join(root, 'src/content/articles/security.mdx'));
    await build(root);
    await assert.rejects(readFile(join(root, 'dist/previews/registered/source/index.html')), /ENOENT/);
  } finally { await rm(root, { recursive: true, force: true }); }
});
