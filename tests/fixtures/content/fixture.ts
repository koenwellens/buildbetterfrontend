// Entirely synthetic test content. Never imported by production collections.
export function fixtureInput() {
  const common = {
    description: 'Development fixture, not a published BBF article.',
    publishedAt: '2026-10-12', category: 'tips', tags: ['css', 'typography'],
    authors: ['fixture-author'],
  };
  const article = (id: string, examples: string[]) => ({
    id, location: `test fixture ${id}`, data: { ...common, title: `Development fixture: ${id}`, examples },
  });
  return {
    articles: [
      article('prose-only', []), article('code-only', ['source-only']),
      article('preview-only', ['preview-only']), article('both-resources', ['fluid-heading']),
      article('mixed-examples', ['preview-only', 'fluid-heading', 'source-only']),
    ],
    authors: [{ id: 'fixture-author', location: 'test fixture author', data: {
      id: 'fixture-author', name: 'Development fixture author',
      bio: 'Synthetic record for automated tests; not a BBF contributor.',
    } }],
    examples: [
      { id: 'source-only', location: 'test fixture source-only', data: {
        id: 'source-only', title: 'Development fixture: fluid body scale',
        sourceFiles: [{ id: 'styles', label: 'styles.css', language: 'css', path: 'styles.css' }],
      } },
      { id: 'preview-only', location: 'test fixture preview-only', data: {
        id: 'preview-only', title: 'Development fixture: preview only',
        preview: { entry: 'fluid-body' }, accessibleLabel: 'Development fixture: fluid body typography',
      } },
      { id: 'fluid-heading', location: 'test fixture fluid-heading', data: {
        id: 'fluid-heading', title: 'Development fixture: fluid heading',
        sourceFiles: [
          { id: 'markup', label: 'index.html', language: 'html', path: 'index.html' },
          { id: 'styles', label: 'styles.css', language: 'css', path: 'styles.css' },
        ],
        preview: { entry: 'fluid-heading' }, accessibleLabel: 'Development fixture: fluid heading typography',
      } },
    ],
    previews: [
      { id: 'fluid-body', kind: 'isolated-page', path: 'preview-only/preview/index.html' },
      { id: 'fluid-heading', kind: 'isolated-page', path: 'fluid-heading/source/index.html' },
    ],
  };
}
