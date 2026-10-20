import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, getEntries } from 'astro:content';
import { root } from 'astro:config/server';
import { fileURLToPath } from 'node:url';
import { previews } from '../../examples/previews.ts';
import { resolveExample } from '../../lib/content/examples.ts';
import { readSource } from '../../lib/content/files.ts';
import { companionTypes, previewResources, renderPreviewDocument, type PreviewResource } from '../../lib/content/preview.ts';

type Props = PreviewResource;

export const getStaticPaths = (async () => {
  const ids = new Set((await getCollection('articles')).flatMap(({ data }) => data.examples.map(({ id }) => id)));
  const entries = await getEntries([...ids].map(id => ({ collection: 'examples' as const, id })));
  const examples = await Promise.all(entries.map(({ data }) => resolveExample(fileURLToPath(root), data, previews)));
  return previewResources(examples).map(resource => ({ params: { path: resource.path }, props: { ...resource } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<Props> = async ({ props }) => {
  const content = await readSource(fileURLToPath(root), props.filePath);
  const type = props.document ? 'text/html' : companionTypes[props.path.slice(props.path.lastIndexOf('.'))];
  if (!type) throw new Error(`Unsupported preview resource: ${props.path}`);
  let body = content;
  if (props.document) {
    try { body = renderPreviewDocument(content, props.document); }
    catch (error) { throw new Error(`preview "${props.path}": ${String(error)}`); }
  }
  return new Response(body, {
    headers: { 'Content-Type': `${type}; charset=utf-8` },
  });
};
