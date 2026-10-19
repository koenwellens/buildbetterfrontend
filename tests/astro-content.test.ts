import assert from 'node:assert/strict';
import { test } from 'node:test';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { cp, mkdir, mkdtemp, readFile, readdir, realpath, rename, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fixtureInput } from './fixtures/content/fixture.ts';

const execute = promisify(execFile);
const project = fileURLToPath(new URL('../', import.meta.url));
const fixtureRoot = fileURLToPath(new URL('./fixtures/content/', import.meta.url));
const input = fixtureInput();
const base = input.articles[0]!.data;

async function astro(root: string, command: 'sync' | 'build') {
  return execute(process.execPath, [join(project, 'node_modules/astro/bin/astro.mjs'), command, '--root', root], {
    cwd: root, env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' }, timeout: 30_000,
  });
}

async function expectFailure(root: string, pattern: RegExp, command: 'sync' | 'build' = 'build') {
  await assert.rejects(astro(root, command), (error: unknown) => {
    const result = error as { stdout: string; stderr: string };
    assert.match(result.stdout + result.stderr, pattern);
    return true;
  });
}

async function writeArticle(root: string, id: string, patch: Record<string, unknown> = {}, body = '# Development fixture body') {
  await writeFile(join(root, `src/content/articles/${id}.mdx`), `---\n${JSON.stringify({ ...base, ...patch })}\n---\n${body}\n`);
}

async function setup(): Promise<string> {
  // Avoid macOS /var → /private/var aliases in Astro's virtual script IDs.
  const root = await realpath(await mkdtemp(join(tmpdir(), 'bbf-native-content-')));
  await symlink(join(project, 'node_modules'), join(root, 'node_modules'));
  await cp(join(project, 'src/lib/content'), join(root, 'src/lib/content'), { recursive: true });
  await cp(join(project, 'src/content.config.ts'), join(root, 'src/content.config.ts'));
  await cp(join(project, 'src/middleware.ts'), join(root, 'src/middleware.ts'));
  await cp(join(fixtureRoot, 'src/examples'), join(root, 'src/examples'), { recursive: true });
  for (const directory of ['src/content/articles', 'src/content/authors', 'src/drafts', 'src/pages/articles', 'src/layouts']) {
    await mkdir(join(root, directory), { recursive: true });
  }
  await writeFile(join(root, 'package.json'), '{"type":"module"}');
  await writeFile(join(root, 'astro.config.mjs'), `import mdx from '@astrojs/mdx';
export default { integrations: [mdx()], build: { inlineStylesheets: 'never' } };`);
  await writeFile(join(root, 'src/examples/previews.ts'), `export const previews = ${JSON.stringify(input.previews)};`);
  for (const author of input.authors) await writeFile(join(root, `src/content/authors/${author.id}.json`), JSON.stringify(author.data));
  for (const example of input.examples) await writeFile(join(root, `src/examples/${example.id}/example.json`), JSON.stringify(example.data));
  for (const article of input.articles) await writeArticle(root, article.id, article.data);
  // Exercise production middleware. A minimal fixture layout avoids font
  // processing in these isolated content tests. Article routes/probe are test-only.
  await cp(join(project, 'src/pages/index.astro'), join(root, 'src/pages/index.astro'));
  await writeFile(join(root, 'src/layouts/BaseLayout.astro'), '<html lang="en"><head><title>Development fixture</title></head><body><slot /></body></html>');
  await writeFile(join(root, 'src/pages/articles/[id].astro'), `---
import { getCollection, render } from 'astro:content';
export async function getStaticPaths() {
  return (await getCollection('articles')).map(entry => ({ params: { id: entry.id }, props: { entry } }));
}
const { Content } = await render(Astro.props.entry);
---
<html lang="en"><head><title>Development article fixture</title></head><body><Content /></body></html>`);
  await writeFile(join(root, 'src/pages/content-probe.json.ts'), `import { getCollection, getEntries } from 'astro:content';
import { root } from 'astro:config/server';
import { fileURLToPath } from 'node:url';
import { previews } from '../examples/previews.ts';
import { resolveExample, getPerspectives } from '../lib/content/examples.ts';
export async function GET() {
  const articles = await Promise.all((await getCollection('articles')).map(async ({ id, data }) => {
    const authors = await getEntries(data.authors);
    const entries = await getEntries(data.examples);
    const examples = await Promise.all(entries.map(({ data }) => resolveExample(fileURLToPath(root), data, previews)));
    return { id, authors: authors.map(({ id }) => id), examples: examples.map(({ id }) => id), perspectives: getPerspectives(examples) };
  }));
  return new Response(JSON.stringify(articles));
}`);
  return root;
}

async function files(directory: string): Promise<string[]> {
  const paths: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) paths.push(...await files(path));
    else paths.push(path);
  }
  return paths;
}

async function output(root: string): Promise<string> {
  return (await Promise.all((await files(join(root, 'dist'))).map(async (path) => path + '\n' + await readFile(path, 'utf8')))).join('\n');
}

test('native collections render MDX and preserve author/example order and optional resources', async () => {
  const root = await setup();
  try {
    await writeFile(join(root, 'src/content/authors/second-author.json'), JSON.stringify({ ...input.authors[0]!.data, id: 'second-author' }));
    await writeArticle(root, 'mixed-examples', { examples: ['preview-only', 'fluid-heading', 'source-only'], authors: ['second-author', 'fixture-author'] });
    await astro(root, 'sync');
    await astro(root, 'build');
    const articles = JSON.parse(await readFile(join(root, 'dist/content-probe.json'), 'utf8')) as { id: string; authors: string[]; examples: string[]; perspectives: string[] }[];
    assert.equal(articles.length, 5);
    const article = (id: string) => articles.find((article) => article.id === id)!;
    assert.deepEqual(article('prose-only').perspectives, ['article']);
    assert.deepEqual(article('code-only').perspectives, ['article', 'code']);
    assert.deepEqual(article('preview-only').perspectives, ['article', 'preview']);
    assert.deepEqual(article('both-resources').perspectives, ['article', 'code', 'preview']);
    assert.deepEqual(article('mixed-examples').examples, ['preview-only', 'fluid-heading', 'source-only']);
    assert.deepEqual(article('mixed-examples').authors, ['second-author', 'fixture-author']);
    assert.match(await readFile(join(root, 'dist/articles/prose-only/index.html'), 'utf8'), /Development fixture body/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('missing native references log during sync but fail production, cold and after record deletion', async () => {
  const root = await setup();
  try {
    // No homepage or content-consuming route: middleware must enforce the gate.
    await rm(join(root, 'src/pages'), { recursive: true });
    await mkdir(join(root, 'src/pages'));
    await writeFile(join(root, 'src/pages/standalone.astro'), '<html lang="en"><head><title>Standalone fixture</title></head><body>Independent page</body></html>');
    for (const [field, missing, pattern, filename, data] of [
      ['authors', 'missing-author', /article "prose-only": missing author "missing-author"/, 'src/content/authors/fixture-author.json', input.authors[0]!.data],
      ['examples', 'missing-example', /article "prose-only": missing example "missing-example"/, 'src/examples/source-only/example.json', input.examples[0]!.data],
    ] as const) {
      await writeArticle(root, 'prose-only', { [field]: [missing] });
      const synced = await astro(root, 'sync');
      assert.match(synced.stdout + synced.stderr, /Invalid content reference/);
      await expectFailure(root, pattern);
      await writeArticle(root, 'prose-only');
      await astro(root, 'build');
      await rm(join(root, filename));
      await expectFailure(root, /article "[^"]+": missing (author|example)/);
      await writeFile(join(root, filename), JSON.stringify(data));
    }
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('invalid metadata and references fail actual production builds', async () => {
  const root = await setup();
  try {
    for (const patch of [
      { category: 'invalid' }, { publishedAt: '2026-02-30' }, { draft: true },
      { authors: [] }, { authors: ['fixture-author', 'fixture-author'] },
      { authors: ['Invalid_ID'] }, { examples: ['source-only', 'source-only'] },
      { examples: ['Invalid_ID'] },
    ]) {
      await writeArticle(root, 'prose-only', patch);
      await expectFailure(root, /does not match collection schema|invalid|Duplicate|Unrecognized/i);
    }
    await cp(join(fixtureRoot, 'yaml-article.mdx'), join(root, 'src/content/articles/prose-only.mdx'));
    await astro(root, 'build');
    const yaml = await readFile(join(fixtureRoot, 'yaml-article.mdx'), 'utf8');
    await writeFile(join(root, 'src/content/articles/prose-only.mdx'), yaml.replace('"2026-10-12"', '2026-10-12'));
    await expectFailure(root, /quote the date/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('future dates fail on cold and repeated builds; published imports use normal Astro compilation', async () => {
  const root = await setup();
  try {
    await rm(join(root, 'src/pages/index.astro'));
    await writeArticle(root, 'prose-only', { publishedAt: '9999-12-31' });
    await expectFailure(root, /article "prose-only": publishedAt .* is in the future/);
    await writeArticle(root, 'prose-only');
    await astro(root, 'build');
    await writeArticle(root, 'prose-only', { publishedAt: '9999-12-31' });
    await expectFailure(root, /is in the future/);
    await writeArticle(root, 'prose-only', {}, `import './missing.css';\n\nPublished import fixture`);
    await expectFailure(root, /missing\.css/);
    await writeArticle(root, 'prose-only', {}, '<Unclosed');
    await expectFailure(root, /prose-only\.mdx/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('prerender validation is shared across routes and reruns on the next build', async () => {
  const root = await setup();
  try {
    // Count calls at the validator boundary without replacing its real checks.
    const validator = join(root, 'src/lib/content/validate.ts');
    await rename(validator, join(root, 'src/lib/content/validate-implementation.ts'));
    await writeFile(validator, `import { appendFile } from 'node:fs/promises';
import { validatePublishedContent as validate } from './validate-implementation.ts';
export async function validatePublishedContent(): Promise<void> {
  await appendFile(${JSON.stringify(join(root, 'validation-calls.txt'))}, 'called\\n');
  await validate();
}`);
    for (const expectedCalls of [1, 2]) {
      await astro(root, 'build');
      assert.equal(await readFile(join(root, 'validation-calls.txt'), 'utf8'), 'called\n'.repeat(expectedCalls));
      assert.match(await readFile(join(root, 'dist/index.html'), 'utf8'), /See it\. Build it\. Understand it\./);
      assert.match(await readFile(join(root, 'dist/articles/prose-only/index.html'), 'utf8'), /Development fixture body/);
      assert.ok((await readFile(join(root, 'dist/content-probe.json'), 'utf8')).length > 0);
    }
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('resource checks catch cached deletions, identity mismatches, and invalid preview registrations', async () => {
  const root = await setup();
  try {
    await rm(join(root, 'src/pages/content-probe.json.ts'));
    await astro(root, 'build');
    const source = join(root, 'src/examples/source-only/source/styles.css');
    const original = await readFile(source);
    await rm(source);
    await expectFailure(root, /example "source-only": File does not exist/);
    await writeFile(source, original);
    await writeFile(join(root, 'src/content/authors/fixture-author.json'), JSON.stringify({ ...input.authors[0]!.data, id: 'wrong-id' }));
    await expectFailure(root, /author "fixture-author": id must match/);
    await writeFile(join(root, 'src/content/authors/fixture-author.json'), JSON.stringify(input.authors[0]!.data));
    await writeFile(join(root, 'src/examples/source-only/example.json'), JSON.stringify({ ...input.examples[0]!.data, id: 'wrong-id' }));
    await expectFailure(root, /example "source-only": id must match/);
    await writeFile(join(root, 'src/examples/source-only/example.json'), JSON.stringify(input.examples[0]!.data));
    await writeFile(join(root, 'src/examples/previews.ts'), 'export const previews = [];');
    await expectFailure(root, /example "[^"]+": missing preview registration/);
    await writeFile(join(root, 'src/examples/previews.ts'), `export const previews = ${JSON.stringify([...input.previews, input.previews[0]])};`);
    await expectFailure(root, /duplicate preview registration ID/);
    await writeFile(join(root, 'src/examples/previews.ts'), `export const previews = ${JSON.stringify(input.previews)};`);
    await writeArticle(root, 'prose-only', { coverImage: 'missing.png', coverImageAlt: 'Test image' });
    await expectFailure(root, /article "prose-only" coverImage:.*File does not exist/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('draft MDX and CSS/JS imports stay outside collections, compilation, registration, and dist until moved', async () => {
  const root = await setup();
  try {
    const draft = join(root, 'src/drafts');
    const published = join(root, 'src/content/articles');
    const names = ['draft-imports.mdx', 'draft-only.css', 'draft-only.js', 'DraftDemo.astro'];
    await writeFile(join(draft, names[0]!), `---\n${JSON.stringify({ ...base, title: 'BBF_DRAFT_ARTICLE_MARKER' })}\n---
import './draft-only.css';
import { marker } from './draft-only.js';
import DraftDemo from './DraftDemo.astro';

<p>{marker}</p>
<DraftDemo />
`);
    await writeFile(join(draft, names[1]!), '.bbf-draft-css-marker { color: blue; }');
    await writeFile(join(draft, names[2]!), `export const marker = 'BBF_DRAFT_JS_IMPORT_MARKER';`);
    await writeFile(join(draft, names[3]!), `<p>Development draft demo</p><script>document.documentElement.dataset.bbfDraft = 'BBF_DRAFT_CLIENT_MARKER';</script>`);
    await writeFile(join(draft, 'invalid.mdx'), `---\nnot: valid published metadata\n---\nimport './nonexistent.css';\n\n<Unclosed`);
    await writeFile(join(draft, 'explosive.mdx'), `---\n${JSON.stringify(base)}\n---\nimport './explode.js';`);
    await writeFile(join(draft, 'explode.js'), `throw new Error('BBF_DRAFT_MODULE_EXECUTED');`);

    async function assertDraftAbsent(phase: string) {
      assert.doesNotMatch(await output(root), /bbf-draft-css-marker|BBF_DRAFT_|draft-imports/, phase);
      assert.doesNotMatch(await readFile(join(root, '.astro/content-modules.mjs'), 'utf8'), /src\/drafts|draft-imports|explode|invalid\.mdx/);
      const probe = JSON.parse(await readFile(join(root, 'dist/content-probe.json'), 'utf8')) as { id: string }[];
      assert.equal(probe.length, 5);
    }
    for (const phase of ['cold', 'cached']) {
      await astro(root, 'build');
      await assertDraftAbsent(phase);
    }
    // The same MDX and imports enter the ordinary native collection; no flags.
    for (const name of names) await rename(join(draft, name), join(published, name));
    await astro(root, 'build');
    const emitted = await output(root);
    assert.match(emitted, /bbf-draft-css-marker/);
    assert.match(emitted, /BBF_DRAFT_JS_IMPORT_MARKER/);
    assert.match(emitted, /BBF_DRAFT_CLIENT_MARKER/);
    assert.match(await readFile(join(root, '.astro/content-modules.mjs'), 'utf8'), /draft-imports\.mdx/);
    // Removing the publication on a cached build removes its modules and assets.
    for (const name of names) await rename(join(published, name), join(draft, name));
    await astro(root, 'build');
    await assertDraftAbsent('unpublished again');
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('production article components render metadata, prose, ordered sources, and isolated working previews', async () => {
  const root = await setup();
  try {
    await rm(join(root, 'src/pages/articles'), { recursive: true });
    for (const directory of ['layouts', 'components', 'styles', 'assets', 'pages/articles', 'pages/previews']) {
      await cp(join(project, `src/${directory}`), join(root, `src/${directory}`), { recursive: true });
    }
    await cp(join(project, 'astro.config.mjs'), join(root, 'astro.config.mjs'));
    await cp(join(project, 'src/drafts/fluid-typography.mdx'), join(root, 'src/content/articles/fluid-typography.mdx'));
    const original = await readFile(join(root, 'src/content/articles/fluid-typography.mdx'), 'utf8');
    await writeFile(join(root, 'src/content/articles/fluid-typography.mdx'), original.replace('category: tips', 'repositoryUrl: https://github.com/withastro/astro\ncategory: tips'));
    for (const article of input.articles) await writeArticle(root, article.id, article.data, '## Development fixture body\n\nComplete prose in initial HTML.');
    const languages = ['html', 'css', 'javascript', 'typescript', 'json', 'bash'];
    const samples = ['<p>Sample</p>', '.sample { color: red; }', 'const sample = true;', 'const sample: boolean = true;', '{ "sample": true }', 'echo "Sample"'];
    const fences = languages.map((language, index) => '```' + language + '\n' + samples[index] + '\n```').join('\n\n');
    await writeFile(join(root, 'src/content/articles/measure.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40"><rect width="120" height="40" fill="navy"/></svg>');
    await writeArticle(root, 'language-samples', { examples: [] }, 'word '.repeat(201) + '\n\n' + fences + '\n\n```text\n' + 'source '.repeat(800) + '\n```\n\n![A measurement illustration](./measure.svg)');
    // A declared but unused preview must not become public merely by registration.
    await mkdir(join(root, 'src/examples/unused/source'), { recursive: true });
    await writeFile(join(root, 'src/examples/unused/source/index.html'), '<p>BBF_UNUSED_PREVIEW_MARKER</p>');
    await writeFile(join(root, 'src/examples/unused/source/Unused.astro'), '<p>BBF_UNUSED_COMPONENT_MARKER</p><style>p { --bbf-unused-component: red; }</style><script>throw new Error("BBF_UNUSED_COMPONENT_SCRIPT");</script>');
    await writeFile(join(root, 'src/examples/unused/example.json'), JSON.stringify({ id: 'unused', title: 'Unused development example', preview: { entry: 'unused' }, accessibleLabel: 'Unused fixture' }));
    await writeFile(join(root, 'src/examples/previews.ts'), `export const previews = ${JSON.stringify([...input.previews, { id: 'unused', kind: 'isolated-page', path: 'unused/source/index.html', sandbox: [] }])};`);
    await astro(root, 'build');
    const html = await readFile(join(root, 'dist/articles/fluid-typography/index.html'), 'utf8');
    assert.match(html, /<title>Fluid typography with CSS clamp\(\) \| Build Better Frontend<\/title>/);
    assert.match(html, /rel="canonical" href="https:\/\/buildbetterfrontend.com\/articles\/fluid-typography\/?"/);
    assert.match(html, /property="og:type" content="article"/);
    assert.match(html, /property="og:description" content="Give type room to grow/);
    assert.match(html, /By Development fixture author/);
    assert.doesNotMatch(html, /href="\/authors\//);
    assert.match(html, /datetime="2026-10-12"[^>]*>12 October 2026/);
    assert.match(html, /Updated[\s\S]*?datetime="2026-10-13"[^>]*>13 October 2026/);
    assert.match(html, /\d+ min read.*\(estimate\)/);
    assert.match(html, /href="https:\/\/github.com\/withastro\/astro"/);
    assert.match(html, /<h2 id="three-values-one-fluid-scale"/);
    assert.match(html, /<blockquote/);
    assert.match(html, /<table/);
    assert.match(html, /role="region" aria-label="Article table"/);
    assert.match(html, /class="astro-code[^"]*"/);
    assert.match(html, /style="color:/);
    const languageHTML = await readFile(join(root, 'dist/articles/language-samples/index.html'), 'utf8');
    for (const language of languages) assert.match(languageHTML, new RegExp(`data-language="${language}"`));
    assert.match(languageHTML, /2 min read/); // 201 prose words; fenced source excluded.
    assert.match(languageHTML, /<img[^>]*alt="A measurement illustration"/);
    assert.ok(html.indexOf('id="example-source-only"') < html.indexOf('id="example-fluid-heading"'));
    const codeOnly = await readFile(join(root, 'dist/articles/code-only/index.html'), 'utf8');
    assert.match(codeOnly, /styles.css/);
    assert.doesNotMatch(codeOnly, /<iframe/);
    const previewOnly = await readFile(join(root, 'dist/articles/preview-only/index.html'), 'utf8');
    assert.match(previewOnly, /<iframe/);
    assert.doesNotMatch(previewOnly, /class="source-file"/);
    const proseOnly = await readFile(join(root, 'dist/articles/prose-only/index.html'), 'utf8');
    assert.match(proseOnly, /Complete prose in initial HTML/);
    assert.doesNotMatch(proseOnly, /examples-title|<iframe|class="source-file"|Updated|Article source repository/);
    assert.doesNotMatch(html, /role="tab|<script/);
    assert.match(html, /title="Development fixture: fluid heading typography" sandbox(?:="")? loading="lazy"/);
    const preview = await readFile(join(root, 'dist/previews/fluid-heading/source/index.html'), 'utf8');
    assert.match(preview, /href=&quot;styles.css&quot;/);
    assert.match(preview, /Type that finds/);
    assert.match(preview, /Content-Security-Policy[^>]+script-src 'none'/);
    assert.equal(await readFile(join(root, 'dist/previews/fluid-heading/source/styles.css'), 'utf8'), await readFile(join(root, 'src/examples/fluid-heading/source/styles.css'), 'utf8'));
    assert.doesNotMatch(await output(root), /BBF_UNUSED_PREVIEW_MARKER|BBF_UNUSED_COMPONENT|bbf-unused-component/);

    // Only the registry's explicit script capability is reflected by the iframe.
    await writeFile(join(root, 'src/examples/previews.ts'), `export const previews = ${JSON.stringify([...input.previews.map(preview => ({ ...preview, sandbox: preview.id === 'fluid-heading' ? ['allow-scripts'] : [] })), { id: 'unused', kind: 'trusted-component', path: 'unused/source/Unused.astro', sandbox: [] }])};`);
    await astro(root, 'build');
    assert.match(await readFile(join(root, 'dist/articles/fluid-typography/index.html'), 'utf8'), /sandbox="allow-scripts"/);
    assert.match(await readFile(join(root, 'dist/previews/fluid-heading/source/index.html'), 'utf8'), /script-src 'self' 'unsafe-inline'/);
    assert.doesNotMatch(await output(root), /BBF_UNUSED_COMPONENT|bbf-unused-component/);
    await writeArticle(root, 'prose-only', { examples: ['unused'] });
    await expectFailure(root, /trusted-component delivery is not implemented/);

    // A native rebuild after withdrawing the only referencing articles removes
    // their previews and companions, while drafts remain outside all emission.
    for (const article of await readdir(join(root, 'src/content/articles'))) await rm(join(root, 'src/content/articles', article));
    await cp(join(project, 'src/drafts/fluid-typography.mdx'), join(root, 'src/drafts/fluid-typography.mdx'));
    await astro(root, 'build');
    assert.doesNotMatch(await output(root), /Type that finds|Fluid typography with CSS|Development fixture author|BBF_UNUSED_PREVIEW_MARKER/);
    assert.equal((await files(join(root, 'dist'))).some(path => path.includes('/previews/') || path.includes('/articles/')), false);
  } finally { await rm(root, { recursive: true, force: true }); }
});
