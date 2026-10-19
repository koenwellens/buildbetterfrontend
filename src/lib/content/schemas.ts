import { z } from 'astro/zod';
import { categoryIds } from './categories.ts';

export const idSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase kebab-case ID');
const text = z.string().trim().min(1, 'Must not be empty');
// Astro's YAML parser coerces unquoted dates to Date and can normalize invalid
// days. Require strings rather than accepting a lossy calendar-date coercion.
export const calendarDateSchema = z.iso.date({ error: 'Use a real YYYY-MM-DD calendar date string; quote the date in YAML frontmatter' });
const httpsUrl = z.url({ protocol: /^https$/ }).refine(
  (value) => { const url = new URL(value); return !url.username && !url.password; },
  'HTTPS URLs must not contain credentials',
);

// Paths are relative POSIX paths; resource-specific roots are enforced on disk.
export const localPathSchema = z.string().refine(
  (value) => value.split('/').every((part) => /^[\w.-]+$/.test(part) && part !== '.' && part !== '..'),
  'Use relative POSIX paths with letter/digit/underscore/dot/hyphen segments; no traversal',
);

function uniqueArray<T extends z.ZodType<string>>(item: T) {
  return z.array(item).superRefine((values, context) => {
    const seen = new Set<string>();
    values.forEach((value, index) => {
      if (seen.has(value)) context.addIssue({ code: 'custom', path: [index], message: `Duplicate value "${value}"` });
      seen.add(value);
    });
  });
}

export const uniqueIds = uniqueArray(idSchema);

// Native collection references are added in content.config.ts.
export const articleMetadataSchema = z.strictObject({
  title: text,
  description: text,
  publishedAt: calendarDateSchema,
  updatedAt: calendarDateSchema.optional(),
  category: z.enum(categoryIds),
  tags: uniqueArray(text).min(1),
  featured: z.boolean().default(false),
  coverImage: localPathSchema.optional(),
  coverImageAlt: z.string().refine((value) => value === '' || value.trim().length > 0, 'Use descriptive text or an explicitly empty decorative alternative').optional(),
  repositoryUrl: httpsUrl.optional(),
}).superRefine((article, context) => {
  if (article.updatedAt && article.updatedAt < article.publishedAt) {
    context.addIssue({ code: 'custom', path: ['updatedAt'], message: 'Must be on or after publishedAt' });
  }
  if (article.coverImage !== undefined && article.coverImageAlt === undefined) {
    context.addIssue({ code: 'custom', path: ['coverImageAlt'], message: 'Required with coverImage (empty only for a decorative image)' });
  }
  if (article.coverImage === undefined && article.coverImageAlt !== undefined) {
    context.addIssue({ code: 'custom', path: ['coverImageAlt'], message: 'Requires coverImage' });
  }
});

export const authorSchema = z.strictObject({
  id: idSchema,
  name: text,
  bio: text,
  avatar: localPathSchema.optional(),
  links: z.array(z.strictObject({ label: text, url: httpsUrl })).default([]),
});

export const sourceLanguages = {
  '.html': 'html', '.css': 'css', '.js': 'javascript', '.mjs': 'javascript',
  '.ts': 'typescript', '.jsx': 'jsx', '.tsx': 'tsx', '.json': 'json',
  '.astro': 'astro', '.md': 'markdown', '.mdx': 'mdx', '.svg': 'xml',
  '.yaml': 'yaml', '.yml': 'yaml', '.txt': 'text',
} as const;

export const sourceFileSchema = z.strictObject({
  id: idSchema,
  label: text,
  language: z.enum([...new Set(Object.values(sourceLanguages))]),
  path: localPathSchema,
});

export const previewKindSchema = z.enum(['trusted-component', 'isolated-page']);
export const previewRegistrationSchema = z.strictObject({
  id: idSchema,
  kind: previewKindSchema,
  path: localPathSchema,
  // No capabilities by default. More permissions require a later demo-specific decision.
  sandbox: uniqueArray(z.enum(['allow-scripts'])).default([]),
}).superRefine((preview, context) => {
  if (preview.kind === 'trusted-component' && preview.sandbox.length) {
    context.addIssue({ code: 'custom', path: ['sandbox'], message: 'Sandbox permissions apply only to isolated pages' });
  }
});

export const exampleSchema = z.strictObject({
  id: idSchema,
  title: text,
  description: text.optional(),
  sourceFiles: z.array(sourceFileSchema).default([]),
  preview: z.strictObject({ entry: idSchema }).optional(),
  repositoryUrl: httpsUrl.optional(),
  accessibleLabel: text.optional(),
}).superRefine((example, context) => {
  if (!example.sourceFiles.length && !example.preview) {
    context.addIssue({ code: 'custom', message: 'An example needs at least one source file or a registered preview' });
  }
  if (example.preview && !example.accessibleLabel) {
    context.addIssue({ code: 'custom', path: ['accessibleLabel'], message: 'Required with a preview' });
  }
  for (const field of ['id', 'path'] as const) {
    const seen = new Set<string>();
    example.sourceFiles.forEach((file, index) => {
      if (seen.has(file[field])) context.addIssue({ code: 'custom', path: ['sourceFiles', index, field], message: `Duplicate source ${field} "${file[field]}"` });
      seen.add(file[field]);
    });
  }
});

export type Author = z.output<typeof authorSchema>;
export type Example = z.output<typeof exampleSchema>;
export type SourceFile = z.output<typeof sourceFileSchema>;
export type PreviewRegistration = z.output<typeof previewRegistrationSchema>;
