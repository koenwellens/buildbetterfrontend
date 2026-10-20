import { extname } from 'node:path';
import { parse, type DefaultTreeAdapterTypes } from 'parse5';
import type { ResolvedExample } from './examples.ts';
import type { PreviewRegistration } from './schemas.ts';

export interface PreviewResource {
  path: string;
  filePath: string;
  document?: { label: string; sandbox: PreviewRegistration['sandbox'] };
}

export const companionTypes: Readonly<Record<string, string>> = {
  '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.json': 'application/json', '.txt': 'text/plain',
};

/** Only published examples reach this function; source display is unchanged. */
export function previewResources(examples: readonly ResolvedExample[]): PreviewResource[] {
  const resources = new Map<string, PreviewResource>();
  const isolated = examples.filter(example => example.preview?.kind === 'isolated-page');
  function add(resource: PreviewResource): void {
    const previous = resources.get(resource.path);
    if (previous && previous.filePath !== resource.filePath) {
      throw new Error(`Conflicting preview resource: ${resource.path}`);
    }
    if (previous?.document && resource.document &&
        previous.document.sandbox.join(' ') !== resource.document.sandbox.join(' ')) {
      throw new Error(`Conflicting preview permissions: ${resource.path}`);
    }
    if (!previous?.document) resources.set(resource.path, resource);
  }
  // Register every document first, so no companion can overwrite its protection.
  for (const example of isolated) {
    const preview = example.preview!;
    add({ path: preview.path, filePath: preview.filePath,
      document: { label: example.accessibleLabel!, sandbox: preview.sandbox } });
  }
  for (const example of isolated) {
    for (const source of example.sourceFiles) {
      const path = `${example.id}/source/${source.path}`;
      if (resources.get(path)?.document && resources.get(path)!.filePath === source.filePath) continue;
      const extension = extname(source.path);
      if (!companionTypes[extension]) {
        throw new Error(`example "${example.id}": unsupported preview companion "${source.path}"; only registered entries may be HTML documents, SVG companions are not served, and supported companions are ${Object.keys(companionTypes).join(', ')}`);
      }
      add({ path, filePath: source.filePath });
    }
  }
  return [...resources.values()];
}

function child(parent: DefaultTreeAdapterTypes.ParentNode, name: string): DefaultTreeAdapterTypes.Element | undefined {
  return parent.childNodes.find((node): node is DefaultTreeAdapterTypes.Element => 'tagName' in node && node.tagName === name);
}

function validateDocument(source: string): void {
  const errors: string[] = [];
  const document = parse(source, { sourceCodeLocationInfo: true,
    onParseError: error => errors.push(`${error.code} at ${error.startLine}:${error.startCol}`) });
  const html = child(document, 'html');
  const head = html && child(html, 'head');
  const body = html && child(html, 'body');
  for (const element of [html, head, body]) {
    if (!element?.sourceCodeLocation?.startTag || !element.sourceCodeLocation.endTag) {
      errors.push('use an explicit, complete <!doctype html>, <html>, <head>, and <body> document');
      break;
    }
  }
  if (errors.length) throw new Error(`Unsupported preview document: ${errors.join('; ')}`);
}

function attribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

/** Authored bytes only enter an escaped attribute, never the wrapper's head/body.
 * The wrapper CSP is inherited by srcdoc. Its sandbox remains in force even
 * when the wrapper is opened directly, including explicitly scripted previews.
 */
export function renderPreviewDocument(source: string, document: NonNullable<PreviewResource['document']>): string {
  validateDocument(source);
  const scripts = document.sandbox.includes('allow-scripts') ? "'self' 'unsafe-inline'" : "'none'";
  const policy = `default-src 'none'; frame-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; script-src ${scripts}; base-uri 'none'; form-action 'none'`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${policy}"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${attribute(document.label)}</title><style>html,body{margin:0;height:100%;color-scheme:dark}iframe{display:block;width:100%;height:100%;border:0}</style></head><body><iframe title="${attribute(document.label)}" sandbox="${document.sandbox.join(' ')}" referrerpolicy="no-referrer" srcdoc="${attribute(source)}"></iframe></body></html>`;
}
