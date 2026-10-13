# BBF-001 — Project Foundation

## Objective

Establish the technical foundation for Build Better Frontend
using Astro, TypeScript, and MDX.

The focus is on creating a maintainable project structure
without prematurely implementing product features.

## Prompts

1. [Initial implementation](./01-initial.md)

## Implementation

**Status:** Implemented; repository owner review pending

Created a minimal static Astro scaffold with strict TypeScript, the official
MDX integration, a typed document layout, global CSS, and the canonical site
origin. Reserved directories for future components, content, examples, and
assets without adding articles or implementing the homepage design.

Selected npm with exact direct dependency versions and a lockfile. Updated
the repository's reference-image paths to the user-supplied
`docs/reference_image.png` and inspected the image without implementing it.

Dependencies: Astro 7.3.8, official MDX integration 8.0.3, Astro checker
0.9.10, and TypeScript 6.0.3. TypeScript 6 satisfies the checker's peer
requirement; the latest TypeScript 7 does not. `.nvmrc` selects Node 24.
Verification used installed Node 24.21.0 and npm 11.19.0 because the shell's
default Node 12 cannot run this Astro release.

`npm run build` checks types before generating static output. Content
collections are intentionally unregistered until their schemas and reference
validation are implemented. No UI framework, testing framework, CI, hosting,
article content, or example runtime was added. No commit or PR was created.

**Pull request:** /

## Verification

### Automated

- [x] `npm ci --cache /private/tmp/bbf-001-npm-cache --no-audit --no-fund`
  — Clean lockfile install passed. An earlier offline attempt failed because
  some packages were not cached; the online retry resolved this.
- [x] `npm run check` (executed by `npm run build`) — 0 errors, 0 warnings,
  0 hints across 5 files; content synchronization completed.
- [x] `npm run build` after clean installation — Passed; one static page.
- [x] Temporary MDX route built and generated HTML inspected — Markdown,
  exported expressions, Astro component imports, typed layout props, and
  metadata rendered correctly. Removed the route and rebuilt; no test content
  remains in source or production output.
- [x] `npm ls --depth=0` — Expected direct dependency versions; no invalid peers.
- [x] `npm run dev -- --host 127.0.0.1` and
  `npm run preview -- --host 127.0.0.1` — Started successfully with local
  network permission; development and production root pages loaded.
- [x] Generated-type, build, dependency, editor, and environment paths checked
  against `.gitignore`; `.env.example` remains allowed.
- [x] Local Markdown documentation links — All referenced files exist.
- [x] Scoped `git diff --check` for `.gitignore`, root README, AGENTS, and
  task README — Passed. The full check reports pre-existing document EOF
  blank lines and Markdown hard-break whitespace; left those unchanged.

npm reported an unapproved install script for optional `fsevents`; no approval
was added. Installation, Astro checks, builds, and server startup succeeded.
The initial sandboxed development-server attempt could not start; the retry
with local network permission succeeded.

### Agent inspection

- Production page inspected in the browser at 1280×800 and 375×812; no
  horizontal overflow. English document, heading, title, description, and
  canonical `https://buildbetterfrontend.com/` verified.
- Initial production HTML is 692 bytes (412 bytes gzip), includes all visible
  content, and has no scripts. This is a build-artifact measurement.
  There are no interactive controls; Tab inspection found no focus trap.
- Supplied reference image inspected; brand layout and fonts deferred.
- Full accessibility and Core Web Vitals measurement deferred until real UI
  exists. This foundation check does not establish publication performance.
- Diff inspected for scope and temporary verification files. Existing staged
  documentation and historical prompts preserved; human acceptance pending.

### Human review

- [x] Repository owner review — Pending
