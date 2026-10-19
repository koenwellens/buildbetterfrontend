import { extname } from 'node:path';
import { readSource, resolveFile } from './files.ts';
import { sourceLanguages, type Example, type PreviewRegistration, type SourceFile } from './schemas.ts';

export interface ResolvedSource extends SourceFile { filePath: string; content: string }
export interface ResolvedPreview extends PreviewRegistration { filePath: string }
export interface ResolvedExample extends Omit<Example, 'sourceFiles' | 'preview'> {
  sourceFiles: ResolvedSource[];
  preview?: ResolvedPreview;
}

/** Read reviewed resources only; never import or execute a preview. */
export async function resolveExample(root: string, example: Example, previews: readonly PreviewRegistration[]): Promise<ResolvedExample> {
  try {
    const sourceFiles: ResolvedSource[] = [];
    for (const source of example.sourceFiles) {
      const extension = extname(source.path) as keyof typeof sourceLanguages;
      if (sourceLanguages[extension] !== source.language) {
        throw new Error(`source "${source.id}": unsupported file type or language mismatch for ${source.path}`);
      }
      const extensions = Object.entries(sourceLanguages).filter(([, language]) => language === source.language).map(([extension]) => extension);
      const filePath = await resolveFile(root, `src/examples/${example.id}/source`, source.path, extensions);
      sourceFiles.push({ ...source, filePath, content: await readSource(root, filePath) });
    }
    let preview: ResolvedPreview | undefined;
    if (example.preview) {
      const registration = previews.find(({ id }) => id === example.preview!.entry);
      if (!registration) throw new Error(`missing preview registration "${example.preview.entry}"`);
      const filePath = await resolveFile(root, 'src/examples', registration.path,
        registration.kind === 'trusted-component' ? ['.astro'] : ['.html']);
      preview = { ...registration, sandbox: registration.sandbox ?? [], filePath };
    }
    return { ...example, sourceFiles, preview };
  } catch (error) {
    throw new Error(`example "${example.id}": ${error instanceof Error ? error.message : String(error)}`);
  }
}

export function getPerspectives(examples: readonly ResolvedExample[]): ('article' | 'code' | 'preview')[] {
  const perspectives: ('article' | 'code' | 'preview')[] = ['article'];
  if (examples.some(({ sourceFiles }) => sourceFiles.length > 0)) perspectives.push('code');
  if (examples.some(({ preview }) => preview)) perspectives.push('preview');
  return perspectives;
}
