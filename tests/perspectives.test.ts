import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'parse5';
import { createPerspectiveProject } from './fixtures/perspectives/project.ts';
import { build } from './fixtures/preview-security/project.ts';

test('native article builds retain one static body/resource set and only available perspective links', async () => {
  const root = await createPerspectiveProject();
  try {
    await build(root);
    const read = (id: string) => readFile(join(root, `dist/articles/${id}/index.html`), 'utf8');
    for (const [id, views] of [['prose-only', []], ['code-only', ['article', 'code']], ['preview-only', ['article', 'preview']], ['mixed-examples', ['article', 'code', 'preview']]] as const) {
      const html = await read(id);
      const links = [...html.matchAll(/data-perspective="([^"]+)"/g)].map(match => match[1]);
      assert.deepEqual(links, views);
      assert.doesNotMatch(html, /role="tab(?:list|panel)?"/);
      assert.match(html, /Complete prose in initial HTML/);
      const document = parse(html);
      const ids: string[] = [];
      function visit(node: typeof document | { attrs?: { name: string; value: string }[]; childNodes?: unknown[] }) {
        if ('attrs' in node) { const id = node.attrs?.find(attr => attr.name === 'id'); if (id) ids.push(id.value); }
        for (const child of node.childNodes ?? []) visit(child as Parameters<typeof visit>[0]);
      }
      visit(document);
      assert.equal(ids.length, new Set(ids).size, `${id} has duplicate IDs`);
    }
    const mixed = await read('mixed-examples');
    assert.equal([...mixed.matchAll(/data-code="fluid-heading"/g)].length, 1);
    assert.equal([...mixed.matchAll(/data-preview="fluid-heading"/g)].length, 1);
    assert.equal([...mixed.matchAll(/id="stable-reading-heading"/g)].length, 1);
    assert.ok(mixed.indexOf('data-example="preview-only"') < mixed.indexOf('data-example="fluid-heading"'));
    assert.ok(mixed.indexOf('data-source-file="markup"') < mixed.indexOf('data-source-file="styles"'));
    assert.match(mixed, /id="source-fluid-heading-styles"/);
    assert.match(mixed, /data-language="css"/);
    assert.match(mixed, /sandbox="allow-scripts"/);
    assert.match(await readFile(join(root, 'dist/previews/scripted/source/index.html'), 'utf8'), /script-src 'self' 'unsafe-inline'/);
    assert.match(await readFile(join(root, 'dist/previews/fluid-heading/source/index.html'), 'utf8'), /script-src 'none'/);
    await assert.rejects(readFile(join(root, 'dist/previews/unpublished/source/index.html')), /ENOENT/);
    await assert.rejects(readFile(join(root, 'dist/previews/security/source/index.html')), /ENOENT/);
  } finally { await rm(root, { recursive: true, force: true }); }
});
