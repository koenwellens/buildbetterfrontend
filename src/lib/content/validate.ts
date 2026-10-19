import { getCollection } from 'astro:content';
import { root } from 'astro:config/server';
import { fileURLToPath } from 'node:url';
import { previews } from '../../examples/previews.ts';
import { resolveExample } from './examples.ts';
import { resolveFile } from './files.ts';
import { previewRegistrationSchema } from './schemas.ts';
import { editorialDate } from './publication.ts';

/** Prerender middleware calls this during static generation, including direct astro builds.
 * Astro 7.3.8 logs missing native references without failing sync. Throw here.
 * Metadata parsing, loading, MDX compilation, and caching remain Astro's work.
 */
export async function validatePublishedContent(): Promise<void> {
  const [articles, authors, examples] = await Promise.all([
    getCollection('articles'), getCollection('authors'), getCollection('examples'),
  ]);
  const project = fileURLToPath(root);
  const today = editorialDate();
  const authorIds = new Set(authors.map(({ id }) => id));
  const exampleIds = new Set(examples.map(({ id }) => id));
  const imageTypes = ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg'];

  const registrations = previews.map((preview) => previewRegistrationSchema.parse(preview));
  if (new Set(registrations.map(({ id }) => id)).size !== registrations.length) {
    throw new Error('src/examples/previews.ts: duplicate preview registration ID');
  }
  for (const preview of registrations) {
    try {
      await resolveFile(project, 'src/examples', preview.path, preview.kind === 'trusted-component' ? ['.astro'] : ['.html']);
    } catch (error) { throw new Error(`preview "${preview.id}": ${String(error)}`); }
  }
  for (const { id, data } of authors) {
    if (data.id !== id) throw new Error(`author "${id}": id must match its JSON filename`);
    if (data.avatar) {
      try { await resolveFile(project, 'src/content/images', data.avatar, imageTypes); }
      catch (error) { throw new Error(`author "${id}" avatar: ${String(error)}`); }
    }
  }
  for (const { id, data } of examples) {
    if (data.id !== id) throw new Error(`example "${id}": id must match its directory`);
    await resolveExample(project, data, registrations);
  }
  for (const { id, data } of articles) {
    if (data.publishedAt > today) throw new Error(`article "${id}": publishedAt ${data.publishedAt} is in the future (Europe/Brussels: ${today}); keep unpublished articles in src/drafts/`);
    for (const author of data.authors) {
      if (!authorIds.has(author.id)) throw new Error(`article "${id}": missing author "${author.id}"`);
    }
    for (const example of data.examples) {
      if (!exampleIds.has(example.id)) throw new Error(`article "${id}": missing example "${example.id}"`);
    }
    if (data.coverImage) {
      try { await resolveFile(project, 'src/content/images', data.coverImage, imageTypes); }
      catch (error) { throw new Error(`article "${id}" coverImage: ${String(error)}`); }
    }
  }
}
