import assert from 'node:assert/strict';
import { test } from 'node:test';
import { cp, mkdir, mkdtemp, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fixtureInput } from './fixtures/content/fixture.ts';
import { articleMetadataSchema, authorSchema, exampleSchema, previewRegistrationSchema } from '../src/lib/content/schemas.ts';
import { resolveExample, getPerspectives } from '../src/lib/content/examples.ts';
import { editorialDate } from '../src/lib/content/publication.ts';

const fixtureRoot = fileURLToPath(new URL('./fixtures/content/', import.meta.url));
const input = fixtureInput();
const { authors: _, examples: __, ...metadata } = input.articles[0]!.data;
const examples = input.examples.map(({ data }) => exampleSchema.parse(data));
const previews = input.previews.map((preview) => previewRegistrationSchema.parse(preview));

test('metadata defaults, leap dates, image alternatives, and named HTTPS author links', () => {
  assert.equal(articleMetadataSchema.parse(metadata).featured, false);
  assert.equal(articleMetadataSchema.parse({ ...metadata, publishedAt: '2024-02-29', coverImage: 'cover.png', coverImageAlt: '' }).publishedAt, '2024-02-29');
  assert.equal(authorSchema.parse({ ...input.authors[0]!.data, links: [{ label: 'Test link', url: 'https://example.com' }] }).links[0]?.label, 'Test link');
});

test('invalid metadata is rejected with strict calendar dates and fields', () => {
  for (const patch of [
    { title: '' }, { description: '  ' }, { publishedAt: '2026-02-30' },
    { publishedAt: '2026-1-12' }, { publishedAt: new Date('2026-10-12') },
    { updatedAt: '2026-10-11' }, { category: 'Frontend Tips' }, { tags: [] },
    { tags: ['css', 'css'] }, { draft: false }, { hasCode: true },
    { coverImage: 'cover.png' }, { coverImage: 'cover.png', coverImageAlt: '  ' },
    { coverImageAlt: 'Orphan alternative' }, { repositoryUrl: 'http://example.com' },
    { repositoryUrl: 'https://user:password@example.com' },
  ]) assert.equal(articleMetadataSchema.safeParse({ ...metadata, ...patch }).success, false, JSON.stringify(patch));
});

test('example resources preserve ordering, source text, and one authoritative implementation', async () => {
  const resolved = await Promise.all(examples.map((example) => resolveExample(fixtureRoot, example, previews)));
  const [code, preview, both] = resolved;
  assert.deepEqual(getPerspectives([]), ['article']);
  assert.deepEqual(getPerspectives([code!]), ['article', 'code']);
  assert.equal(code?.preview, undefined);
  assert.deepEqual(getPerspectives([preview!]), ['article', 'preview']);
  assert.deepEqual(preview?.sourceFiles, []);
  assert.deepEqual(getPerspectives(resolved), ['article', 'code', 'preview']);
  assert.deepEqual(both?.sourceFiles.map(({ label }) => label), ['index.html', 'styles.css']);
  assert.match(both!.sourceFiles[1]!.content, /clamp\(2rem, 5vw, 4rem\)/);
  assert.equal(both?.sourceFiles[0]?.filePath, both?.preview?.filePath);
});

test('empty examples, duplicate files, unknown fields, and missing preview labels fail', () => {
  const both = input.examples[2]!.data;
  for (const patch of [
    { sourceFiles: [], preview: undefined }, { accessibleLabel: undefined },
    { hasPreview: true }, { sourceFiles: [both.sourceFiles![0], both.sourceFiles![0]] },
    { preview: { kind: 'isolated-page', entry: 'fluid-heading' } },
  ]) assert.equal(exampleSchema.safeParse({ ...both, ...patch }).success, false);
  assert.equal(previewRegistrationSchema.safeParse({ ...previews[0], sandbox: ['allow-same-origin'] }).success, false);
  assert.equal(previewRegistrationSchema.safeParse({ ...previews[0], kind: 'trusted-component', sandbox: ['allow-scripts'] }).success, false);
});

test('invalid source paths and languages name the affected example', async () => {
  for (const path of ['missing.css', '../../private.css', '/etc/passwd', 'https://example.com/styles.css', '..\\private.css', '%2e%2e/styles.css', 'styles.css?raw', '.env']) {
    await assert.rejects(resolveExample(fixtureRoot, {
      ...examples[0]!, sourceFiles: [{ id: 'styles', label: 'styles.css', language: 'css', path }],
    }, previews), /example "source-only":/);
  }
  await assert.rejects(resolveExample(fixtureRoot, { ...examples[0]!, sourceFiles: [{ id: 'styles', label: 'styles.css', language: 'html', path: 'styles.css' }] }, previews), /language mismatch/);
});

test('missing preview registrations, files, and screenshots cannot establish availability', async () => {
  await assert.rejects(resolveExample(fixtureRoot, examples[1]!, []), /example "preview-only": missing preview registration/);
  for (const path of ['preview-only/preview/missing.html', 'preview-only/preview/screenshot.png']) {
    await assert.rejects(resolveExample(fixtureRoot, examples[1]!, [{ ...previews[0]!, path }]), /example "preview-only":/);
  }
});

test('source symlink containment, target types, directories, and UTF-8 text are enforced', async () => {
  const root = await mkdtemp(join(tmpdir(), 'bbf-content-paths-'));
  try {
    await cp(join(fixtureRoot, 'src'), join(root, 'src'), { recursive: true });
    const source = join(root, 'src/examples/source-only/source');
    await writeFile(join(root, 'private.css'), 'private fixture');
    await writeFile(join(source, 'unsupported.bin'), 'test');
    await writeFile(join(source, 'different-language.js'), 'test');
    await writeFile(join(source, 'binary.css'), Buffer.from([0, 255, 1]));
    await writeFile(join(source, 'invalid-utf8.css'), Buffer.from([255]));
    await mkdir(join(source, 'directory.css'));
    await symlink(join(root, 'private.css'), join(source, 'escape.css'));
    await symlink('unsupported.bin', join(source, 'unsupported.css'));
    await symlink('different-language.js', join(source, 'wrong-language.css'));
    for (const path of ['escape.css', 'unsupported.css', 'wrong-language.css', 'binary.css', 'invalid-utf8.css', 'directory.css']) {
      await assert.rejects(resolveExample(root, { ...examples[0]!, sourceFiles: [{ id: 'test', label: path, language: 'css', path }] }, previews), /example "source-only":/);
    }
    await symlink('styles.css', join(source, 'alias.css'));
    const valid = await resolveExample(root, { ...examples[0]!, sourceFiles: [{ id: 'test', label: 'alias.css', language: 'css', path: 'alias.css' }] }, previews);
    assert.equal(valid.sourceFiles[0]?.filePath, 'src/examples/source-only/source/styles.css');
    await rm(join(source, 'styles.css'));
    await assert.rejects(resolveExample(root, examples[0]!, previews), /File does not exist/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('preview symlink targets enforce type and containment, while valid aliases work', async () => {
  const root = await mkdtemp(join(tmpdir(), 'bbf-preview-paths-'));
  try {
    const directory = join(root, 'src/examples/preview-only/preview');
    await mkdir(directory, { recursive: true });
    for (const [kind, alias, target] of [
      ['isolated-page', 'alias.html', 'screenshot.png'],
      ['trusted-component', 'alias.astro', 'unsupported.txt'],
    ] as const) {
      await writeFile(join(directory, target), 'test');
      await symlink(target, join(directory, alias));
      await assert.rejects(resolveExample(root, examples[1]!, [{ id: 'fluid-body', kind, path: `preview-only/preview/${alias}`, sandbox: [] }]), /Unsupported resolved file type/);
    }
    await writeFile(join(root, 'private.html'), 'private');
    await symlink(join(root, 'private.html'), join(directory, 'escape.html'));
    await assert.rejects(resolveExample(root, examples[1]!, [{ ...previews[0]!, path: 'preview-only/preview/escape.html' }]), /escapes approved directory/);
    await writeFile(join(directory, 'valid.html'), 'test');
    await symlink('valid.html', join(directory, 'valid-alias.html'));
    const valid = await resolveExample(root, examples[1]!, [{ ...previews[0]!, path: 'preview-only/preview/valid-alias.html' }]);
    assert.equal(valid.preview?.filePath, 'src/examples/preview-only/preview/valid.html');
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('editorial dates use the Brussels calendar across midnight and DST', () => {
  assert.equal(editorialDate(new Date('2026-10-12T22:30:00Z')), '2026-10-13');
  assert.equal(editorialDate(new Date('2026-01-12T22:30:00Z')), '2026-01-12');
  assert.equal(editorialDate(new Date('2026-01-12T23:30:00Z')), '2026-01-13');
  assert.equal(editorialDate(new Date('2026-03-29T22:30:00Z')), '2026-03-30');
});
