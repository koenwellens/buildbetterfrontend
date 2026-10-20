import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { fixtureInput } from '../content/fixture.ts';
import { createSecurityProject, build, entryIds } from '../preview-security/project.ts';

const project = fileURLToPath(new URL('../../../', import.meta.url));
export async function createPerspectiveProject(): Promise<string> {
  const root = await createSecurityProject();
  const fixture = fixtureInput();
  await cp(join(project, 'tests/fixtures/content/src/examples'), join(root, 'src/examples'), { recursive: true });
  for (const example of fixture.examples) await writeFile(join(root, `src/examples/${example.id}/example.json`), JSON.stringify(example.data));
  const longPath = 'nested/a-descriptive-source-file-name-for-the-fluid-body-typography-example-with-a-long-real-filename.css';
  await mkdir(join(root, 'src/examples/source-only/source/nested'), { recursive: true });
  await cp(join(root, 'src/examples/source-only/source/styles.css'), join(root, 'src/examples/source-only/source', longPath));
  const sourceOnly = fixture.examples.find(example => example.id === 'source-only')!.data;
  await writeFile(join(root, 'src/examples/source-only/example.json'), JSON.stringify({ ...sourceOnly,
    title: 'Development fixture: fluid body typography with a descriptive example title for compact selectors',
    sourceFiles: sourceOnly.sourceFiles!.map(source => ({ ...source, path: longPath })),
  }));
  const registrations = [...fixture.previews, ...[...entryIds, 'unpublished'].map(id => ({
    id, kind: 'isolated-page', path: `${id}/source/index.html`, sandbox: id === 'scripted' ? ['allow-scripts'] : [],
  }))];
  await writeFile(join(root, 'src/examples/previews.ts'), `export const previews=${JSON.stringify(registrations)};`);
  for (const article of fixture.articles) {
    const data = article.id === 'mixed-examples' ? { ...article.data, examples: [...article.data.examples, 'scripted'] } : article.data;
    const body = `## Stable reading heading

Complete prose in initial HTML. This development article is never published.

[Read the heading](#stable-reading-heading). [Inspect heading code](#code-fluid-heading).
[Inspect the stylesheet](#source-fluid-heading-styles). [View the heading preview](#preview-fluid-heading).
[Visit an example](#example-fluid-heading).

## Long content and source

${'Reading remains useful without enhancement. '.repeat(80)}

\`\`\`css
${'.a-very-long-selector'.repeat(100)} { color: blue; }
\`\`\`
`;
    await writeFile(join(root, `src/content/articles/${article.id}.mdx`), `---\n${JSON.stringify(data)}\n---\n${body}`);
  }
  // Existing synthetic draft exercises the real article/MDX path in this copy only.
  await cp(join(project, 'src/drafts/fluid-typography.mdx'), join(root, 'src/content/articles/fluid-typography.mdx'));
  const mixed = await readFile(join(root, 'src/content/articles/mixed-examples.mdx'), 'utf8');
  await writeFile(join(root, 'src/content/articles/enhancement-failure.mdx'), mixed + '\n<div id="article">Deliberate duplicate-ID fixture for safe initialization failure.</div>');
  // A registered, validated document is removed only from disposable output later.
  await mkdir(join(root, 'src/examples/broken/preview'), { recursive: true });
  await writeFile(join(root, 'src/examples/broken/preview/index.html'), '<!doctype html><html lang="en"><head><title>Broken fixture</title></head><body>Removed from disposable output after building.</body></html>');
  await writeFile(join(root, 'src/examples/broken/example.json'), JSON.stringify({ id: 'broken', title: 'Unavailable demo fixture', preview: { entry: 'broken' }, accessibleLabel: 'Unavailable demo fixture' }));
  await writeFile(join(root, 'src/examples/previews.ts'), `export const previews=${JSON.stringify([...registrations, { id: 'broken', kind: 'isolated-page', path: 'broken/preview/index.html', sandbox: [] }])};`);
  await writeFile(join(root, 'src/content/articles/broken-preview.mdx'), `---\n${JSON.stringify({ ...fixture.articles[0]!.data, examples: ['source-only', 'broken'] })}\n---\n## Reading survives\nThis article is available even when the demo fails.`);
  return root;
}

export async function prepareBrowserProject(root: string): Promise<void> {
  await build(root);
  await rm(join(root, 'dist/previews/broken/preview/index.html'));
  await cp(new URL('./browser.html', import.meta.url), join(root, 'dist/perspective-tests.html'));
  await cp(new URL('../preview-security/browser.html', import.meta.url), join(root, 'dist/security-tests.html'));
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = await createPerspectiveProject();
  await prepareBrowserProject(root);
  console.log(root);
}
