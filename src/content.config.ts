import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { articleMetadataSchema, authorSchema, exampleSchema, idSchema, uniqueIds } from './lib/content/schemas.ts';

const articles = defineCollection({
  loader: glob({
    pattern: '*.mdx', base: './src/content/articles',
    generateId: ({ entry }) => idSchema.parse(entry.replace(/\.mdx$/, '')),
  }),
  schema: articleMetadataSchema.safeExtend({
    authors: uniqueIds.min(1).pipe(z.array(reference('authors'))),
    examples: uniqueIds.default([]).pipe(z.array(reference('examples'))),
  }),
});
const authors = defineCollection({
  loader: glob({
    pattern: '*.json', base: './src/content/authors',
    generateId: ({ entry }) => idSchema.parse(entry.replace(/\.json$/, '')),
  }),
  schema: authorSchema,
});

const examples = defineCollection({
  loader: glob({
    pattern: '*/example.json', base: './src/examples',
    generateId: ({ entry }) => idSchema.parse(entry.split('/')[0]),
  }),
  schema: exampleSchema,
});

export const collections = { articles, authors, examples };
