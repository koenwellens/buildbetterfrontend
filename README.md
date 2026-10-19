# Build Better Frontend

An independent English-language frontend engineering publication.
**See it. Build it. Understand it.**

BBF-001 established the Astro + TypeScript + MDX foundation; BBF-002 added
the visual foundation. BBF-003 step 1 adds the content model and validation.
The root page remains a small design validation surface; article rendering,
discovery, and the full homepage are not implemented yet.

## Local development

Use a supported even-numbered Node.js release, at least 22.12.0, and npm
9.6.5 or newer. The repository's `.nvmrc` selects Node 24. With nvm installed:

```sh
nvm install
nvm use
npm ci
npm run dev
```

The development server defaults to `http://localhost:4321`.
`package-lock.json` records the reproducible npm dependency tree.

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run check` | Sync Astro content/types and check Astro and TypeScript files |
| `npm run check:content` | Sync native collections/types and validate metadata schemas |
| `npm test` | Run model tests and disposable Astro Content Layer integration checks |
| `npm run build` | Run checks/tests, validate references/resources/dates, and generate `dist/` |
| `npm run preview` | Serve an existing production build locally |

Run `npm run build` before `npm run preview`. Preview is a local verification
server, not production hosting. The GitHub Pages workflow in
`.github/workflows/deploy.yml` uses `npm ci` and `npm run build`. These tasks
verify local output; remote CI and deployment were not run by them.
Astro 7 runs these servers in the background; use `npm run dev -- stop` or
`npm run preview -- stop` to stop them. Replace `stop` with `status` or `logs`
to inspect the corresponding server.

## Project structure

```text
src/
├── assets/fonts/        # Licensed local Latin variable WOFF2 fonts
├── components/articles/ # Header, examples, sources, previews, and MDX wrappers
├── content/
│   ├── articles/        # Publishable MDX articles only
│   ├── authors/         # Validated verified author JSON records
│   └── images/          # Local cover/avatar images, outside public assets
├── content.config.ts   # Native article, author, and example collections
├── drafts/             # Unpublished work; excluded from production tooling
├── examples/            # Reviewed example.json records, sources, preview registry
├── layouts/
│   └── BaseLayout.astro # HTML document, typed metadata, global CSS import
├── lib/content/         # Schemas and focused reference/resource/date checks
├── pages/
│   ├── index.astro      # Minimal design validation route
│   ├── articles/[slug].astro # Native static article reading pages
│   └── previews/[...path].ts # Referenced isolated HTML/source companions only
└── styles/
    ├── global.css      # Reset, typography, controls, media, and focus
    ├── tokens.css      # Central design values and responsive gutters
    └── primitives.css  # Containers, actions, labels, badges, and surfaces
public/                 # Files copied unchanged to the build
└── fonts/              # Original font licenses for static distribution
tests/                  # Node tests and isolated development fixtures
```

Empty directories are retained with `.gitkeep`. No real articles, authors, or
examples have been supplied yet. Native empty-collection warnings are expected.
`src/examples/` keeps reviewed implementations outside automatically published
`public/` assets. Fixtures are never read by production content loaders.

## Content authoring

- Develop unpublished work in `src/drafts/`. Production never loads or compiles
  this directory. Do not import drafts from production modules or put private
  assets in `public/`, which is copied unchanged. No `draft` metadata is accepted.
- Publish by moving a flat kebab-case `.mdx` file into `src/content/articles/`,
  along with any companion assets needed by its imports. Its filename is the
  stable ID. Follow [the metadata contract](docs/article-experience.md). Supply
  quoted ISO calendar dates (`publishedAt: "2026-10-12"`; likewise `updatedAt`),
  at least one tag, and verified author IDs. Future publication dates fail the
  build against the Europe/Brussels date; there is no scheduling mechanism.
- Store real contributors in `src/content/authors/<id>.json` with matching `id`,
  `name`, and actual `bio`. Optional links have `label` and HTTPS `url`. Cover
  and avatar paths are relative to `src/content/images/`.
- Reference examples by ID in reading order. Native Astro references connect
  authors/examples while frontmatter remains ordinary ID arrays. Examples live
  in `src/examples/<id>/example.json`. Ordered `sourceFiles` contain `id`, filename
  `label`, `language`, and `path` relative to that example's `source/`. Source is
  read from the original UTF-8 files, with type and symlink containment checks.
- For a preview, use `preview: { entry: reviewed-preview-id }` and a meaningful
  `accessibleLabel`. Register its kind, path, and permissions once in
  `src/examples/previews.ts`: `trusted-component` uses `.astro`, `isolated-page`
  uses `.html`, with paths relative to `src/examples/`. Permissions default to
  none. Execution and public demo emission are deferred.
- Omit unavailable resources. An example needs source or preview; an article may
  have no examples. Missing declared files/references fail production validation.
  Native `getCollection()` and `getEntries()` supply content for future readers;
  `resolveExample()` and `getPerspectives()` derive resource availability.

`npm run check:content` performs native synchronization/schema validation;
`npm run check` adds type checks. Astro 7.3.8 logs missing references without
failing sync. Prerender middleware in `src/middleware.ts` calls
`validatePublishedContent()` before rendering static pages and endpoints. It
therefore makes missing references, invalid resources, identity mismatches, and
future dates fail static generation, including direct `astro build`, independently
of homepage content. Production routes share one validation promise per build;
development requests recheck content. Run `npm run build` before handoff;
this runs all gates. Published MDX uses normal Astro/Vite import compilation.

Articles render at `/articles/<filename>/` with ordered source/example sections
and no JavaScript requirement for reading. Native Shiki highlighting uses
`github-dark-default`; a small hook in Astro's official Markdown processor
derives estimated reading time from prose, excluding fenced source/imports.

This step delivers `isolated-page` previews only. Use self-contained HTML or
relative links to the example's declared `sourceFiles`. Only registered HTML
entries and supported companions are emitted for published articles with previews.
Companions are limited to `.css`, `.js`, `.mjs`, `.json`, and `.txt`. Arbitrary
HTML companions and SVG companions fail the build. An HTML source can also be
the registered preview entry at its exact declared URL; it receives the same
protection. SVG remains available as displayed source in code-only examples,
and previews can use data images. Binary image companions are not part of this
text-source contract.

Preview entries must be complete HTML documents with a doctype and explicit
opening/closing `html`, `head`, and `body` tags. A standards-based parse5 check
rejects malformed/unsupported documents. A controlled HTML wrapper owns the CSP
and embeds the unchanged authored document in an escaped `srcdoc` attribute.
The inner sandbox remains active in the separate-tab fallback too; no textual
HTML rewriting supplies security policy. Companion paths remain relative to
the registered URL. Conflicting permissions for a shared URL fail the build.

Initial CSS examples require no JavaScript. Explicit `allow-scripts` retains
classic inline and external scripts only within an opaque sandbox; default
previews execute no scripts. ES modules/import graphs are not supported: opaque
frames require CORS for external module imports, and no module loader, CORS
configuration, same-origin permission, or transpilation is supplied. `.mjs` as
a served file does not imply module execution support. Network connections,
forms, plugins, and base URL overrides remain denied by CSP. The article's outer
iframe remains lazy; the wrapper adds one inner frame, not another demo instance.
Review authored behavior before publication. The
`trusted-component` schema kind is retained, but referencing one fails clearly
until its execution boundary is implemented. Article-level perspectives remain
deferred.

### Validate an active draft before publication

`src/drafts/fluid-typography.mdx` is a labeled development article. Its synthetic
author and two authoritative examples live under `tests/fixtures/content/`,
outside production. To inspect it, use the disposable-copy workflow below and
also copy that fixture's author/example records and preview registrations into
the disposable project. The integration test performs this setup with the real
article route/layout and confirms withdrawal removes its article/preview output.

Use a disposable local copy to check the candidate with normal Astro tooling.
This leaves the actual published collection unchanged and requires no draft
compiler or alternate production collection. From the repository root, replace
`my-article.mdx` with the candidate filename:

```sh
bbf_validation_dir="$(mktemp -d)"
tar --exclude=.git --exclude=node_modules --exclude=dist --exclude=.astro -cf - . | tar -xf - -C "$bbf_validation_dir"
ln -s "$PWD/node_modules" "$bbf_validation_dir/node_modules"
cp src/drafts/my-article.mdx "$bbf_validation_dir/src/content/articles/my-article.mdx"
# Copy any companion CSS/JS/components alongside the candidate in this copy.
# Use the imports and paths that the final published article will have.
(cd "$bbf_validation_dir" && npm run build)
rm -rf "$bbf_validation_dir"
```

Inspect the build result before removing the copy. Resolve any broken metadata,
references, syntax, or imports there; carry corrections back to the draft. Repeat
as needed. Once reviewed, move the candidate and its assets into the real
published directory and run `npm run build` again before the normal deployment
workflow. There is no separate draft browser UI. Production
does not diagnose drafts that have not been selected for validation.
See [fixture isolation and build regressions](tests/fixtures/README.md).

For the supplied rendering fixture, replace the candidate `cp` step above with
this setup, run from the repository root before building the disposable copy:

```sh
BBF_REVIEW_DIR="$bbf_validation_dir" node --experimental-strip-types --input-type=module <<'JS'
import { cp, writeFile } from 'node:fs/promises';
import { fixtureInput } from './tests/fixtures/content/fixture.ts';
const target = process.env.BBF_REVIEW_DIR;
const input = fixtureInput();
await cp('src/drafts/fluid-typography.mdx', `${target}/src/content/articles/fluid-typography.mdx`);
await cp('tests/fixtures/content/src/examples', `${target}/src/examples`, { recursive: true });
for (const { id, data } of input.authors) {
  await writeFile(`${target}/src/content/authors/${id}.json`, JSON.stringify(data));
}
for (const { id, data } of input.examples) {
  await writeFile(`${target}/src/examples/${id}/example.json`, JSON.stringify(data));
}
await writeFile(`${target}/src/examples/previews.ts`, `export const previews = ${JSON.stringify(input.previews)};`);
JS
```

In that copy, run `npm run build` and `npm run preview`, then open
`/articles/fluid-typography/`. Stop the preview server before removing the copy.

`astro.config.mjs` configures static output, the official MDX integration,
and `https://buildbetterfrontend.com` as the canonical production origin.
TypeScript extends Astro's strict configuration. The project has no UI
framework, Tailwind, testing framework, or client-side application runtime.

The native Astro Fonts API serves the vendored fonts, generates optimized
fallbacks, and preloads the reading font. See [font provenance and licenses](src/assets/fonts/README.md).
Design values follow [the design specification](docs/design-system.md).

## Specifications and implementation history

- [Product](docs/product.md)
- [Design system](docs/design-system.md)
- [Article experience](docs/article-experience.md)
- [Architecture](docs/architecture.md)
- [Repository instructions](AGENTS.md)
- [BBF-001 implementation record](prompts/BBF-001/README.md)
- [BBF-002 implementation record](prompts/BBF-002/README.md)
- [BBF-003 implementation record](prompts/BBF-003/README.md)
