import { readFile, realpath, stat } from 'node:fs/promises';
import { extname, join, relative, resolve, sep } from 'node:path';
import { localPathSchema } from './schemas.ts';

function within(directory: string, file: string): boolean {
  const path = relative(directory, file);
  return path !== '' && path !== '..' && !path.startsWith(`..${sep}`) && !path.startsWith(sep);
}

/** Resolve a regular local file, enforcing containment after symlink resolution. */
export async function resolveFile(root: string, directory: string, path: string, extensions: readonly string[]): Promise<string> {
  localPathSchema.parse(path);
  const project = await realpath(root);
  const allowed = resolve(project, directory);
  if (!within(project, allowed)) throw new Error('Resource directory must be inside the project');
  const requested = join(allowed, path);
  if (!extensions.includes(extname(requested))) throw new Error(`Unsupported file type; expected ${extensions.join(', ')}`);
  let actual: string;
  try { actual = await realpath(requested); }
  catch { throw new Error(`File does not exist: ${directory}/${path}`); }
  if (!within(allowed, actual)) throw new Error(`File escapes approved directory: ${directory}/${path}`);
  if (!extensions.includes(extname(actual))) {
    throw new Error(`Unsupported resolved file type for ${directory}/${path}: ${extname(actual) || '(no extension)'}; expected ${extensions.join(', ')}`);
  }
  if (!(await stat(actual)).isFile()) throw new Error(`Not a regular file: ${directory}/${path}`);
  return relative(project, actual).split(sep).join('/');
}

export async function readSource(root: string, filePath: string): Promise<string> {
  const bytes = await readFile(join(root, filePath));
  const content = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  if (content.includes('\0')) throw new Error('Source must be UTF-8 text without NUL bytes');
  return content;
}

