# BBF-003 — Article Experience Vertical Slice

## Objective

Implement the foundational article experience for Build Better Frontend.

Establish a maintainable, content-driven publishing system that
supports the three core perspectives:

- Article — Understand the subject.
- Code — Explore the implementation.
- Preview — See the working result.

The implementation must support multiple examples per article,
optional resources, and accessible navigation between perspectives.

The article experience should follow the product philosophy:

**See it. Build it. Understand it.**

This story is divided into three implementation steps:

1. Content model and validation.
2. Article rendering and working examples.
3. Perspective navigation and accessibility.

The objective is to validate the complete publishing workflow
before implementing article discovery, category pages, or the
full homepage.

## Scope

### Content model

- Astro Content Collections for articles.
- Structured article metadata.
- Author references.
- Reusable example definitions.
- Optional code and preview resources.
- Multiple examples per article.
- Build-time validation.
- Publication eligibility rules.

### Article rendering

- Responsive article layout.
- MDX content rendering.
- Article metadata and reading time.
- Syntax-highlighted code examples.
- Working previews.
- Optional GitHub repository links.

### Article perspectives

- Article / Code / Preview navigation.
- Multiple example selection.
- Accessible keyboard interaction.
- Appropriate behavior without JavaScript.
- Graceful handling of unavailable resources.

## Out of scope

- Complete homepage implementation.
- Frontend Explorer.
- Article search.
- Category landing pages.
- Author profile pages.
- Playground or editable code execution.
- User accounts or comments.
- CMS integration.
- AI-generated content.
- Support for arbitrary untrusted code execution.
- General-purpose framework preview infrastructure.

## Prompts

- [01 — Content model and validation](./01-00-content-model.md)
- [01 — Independent content model review](./01-00-review.md)
- [01a — Content model review remediation](./01-01-remediation.md)
- [01b — Content model remediation review](./01-01-review.md)
- [Unpublished MDX import validation remediation](./01-02-remediation.md)
- [Final content validation review](./01-02-review.md)
- [Architectural reassessment](./01-03-architectural-review.md)
- [Content architecture simplification](./01-04-architectural-simpliciation.md)
- [Architecture simplification verification](./01-04-architectural-review.md)
- [Decouple content validation](./01-05-decouple-content-validation.md)
- [02 — Article rendering and working examples](./02-00-article-model.md)
- [02a — Preview security remediation](./02-01-security-mediation.md)
- [03 — Article perspectives](./03-00-article-perspectives.md)

Further prompts will be added after reviewing the results
of the preceding implementation step.

Current step: perspective navigation and accessibility (BBF-003/03), ready for review.
BBF-004 remains outside this task.

## Implementation

**Status:** Baseline through BBF-003/02a is accepted as stated in the current
step 3 request. Step 3 is implemented and locally verified; full BBF-003 repository-owner
acceptance remains pending.
The directory-based architecture below supersedes the original step 1 pipeline.
Earlier implementation and remediation records are preserved as history.
Step 2 and preview-security remediation outcomes are recorded below.
Current perspective work is recorded separately below.

### Original step 1 implementation — historical

The following describes the pipeline before the content architecture simplification.
Its publication and validation behavior has been superseded by the current section
below; verification counts in the historical records describe those earlier runs.

Astro Content Layer collections initially validated flat MDX articles and JSON authors.
Shared strict schemas cover metadata, dates, category keys, multiple authors,
ordered examples, optional images/HTTPS links, and registered local previews.
Category labels are centralized without a separate collection or styling data.

Examples live in `src/examples/<id>/example.json`; their source references resolve
inside their own `source/` directories. The resolver preserves filenames/order,
loads UTF-8 source text, and enforces file types and containment after symlink
resolution. Preview references resolve against `src/examples/previews.ts`, with
an accessible label, a matching kind, and an existing `.astro` or `.html` entry.
Screenshots do not provide Preview availability. No preview is imported or run.

All content is validated, including drafts and unused example registrations.
Errors name the affected record/resource; invalid metadata is never treated as
an intentional publication exclusion. The article loader extends Astro's native
`glob()` loader and runs full reference checks even when MDX metadata is cached.

`getPublishedContent()` supplies the shared public set: `draft === false` and a
publication date on or before the build's frozen Europe/Brussels date. It derives
Article / Code / Preview availability and prunes unused authors/examples from
the public catalog. Its deduplicated resource-path list is an input for a future
emitter, not a demo bundler. No article routes or example assets are emitted here.

Five synthetic article cases and three examples cover every resource combination
under `tests/fixtures/`, outside production inputs. The Node test runner also
creates disposable Astro projects to exercise actual sync/build behavior.
There are no real or placeholder articles/authors in production collections.

**Dependencies:** added development-only `@types/node` 24.19.2 for filesystem
and built-in test APIs (with transitive `undici-types`). Runtime dependencies
remain unchanged; no testing framework was added. npm and the lockfile are
preserved, with only the new type dependencies recorded.

Authoring commands and paths are documented in the repository README.
Adopted choices are recorded in Article experience and Architecture without
claiming acceptance of the complete vertical slice.

**Pull request:** Not yet created.

## Verification

### Automated

The following records the initial implementation checks. The remediation
verification below extends those checks to actual MDX rendering and asset output.

- [x] `npm run check:content` — Passed; production collections are empty.
  Native glob-loader warnings are expected until real articles/authors exist.
- [x] `npm test` — Passed. Final `npm run build` also ran the complete updated
  suite: 50 tests passed, zero failed/skipped. Covers valid/invalid metadata,
  references, duplicate IDs, ordered/mixed/absent resources, previews, source
  containment, symlink escapes, binary files, and Brussels date/DST eligibility.
- [x] Astro integration — Disposable project built valid MDX; public output
  excluded draft/future markers and their private-only example. Invalid draft
  authors/examples and invalid categories failed sync/build with actionable
  diagnostics. Removing an HTML source after metadata was cached failed sync.
- [x] `npm run check` — Passed; final check covered 16 files with zero errors,
  warnings, or hints. The earlier missing Node types were resolved by the
  documented development dependency.
- [x] `npm run build` — Passed using Node 24.21.0 / npm 11.19.0. Local font
  processing used the required localhost listener permission. One static route.
- [x] Production output inspection — Existing homepage, one CSS file, two fonts,
  original font licenses, and existing `.gitkeep` only. No fixture markers,
  private examples, article routes, probe endpoints, or client scripts.
- [x] Final diff and documentation review — No whitespace errors; historical
  prompt, homepage/layout/styles, and deployment workflow preserved by hashes.
  All 33 local Markdown links resolve across seven reviewed documents.

No visible page changed, so browser visual checks do not apply to this step.
Remote CI and deployment were not run. No commit or PR was created by this task.

### Remaining limitations

Rendering, reading-time derivation, highlighting, preview execution/emission,
and perspective controls remain pending. A valid preview entry establishes
local resource availability, not runtime correctness or accessibility. Future
emitters must resolve reviewed demo dependencies from eligible registrations.
The current registry represents no sandbox capabilities or `allow-scripts`;
additional permissions require a deliberate demo-specific decision. Run a fresh
content check after editing resources; ordinary dev MDX watching is not a full
reference-validation watcher. Real editorial content and contributor details
must be supplied before publishing articles. Scheduled dates need later builds.

### Review remediation — BBF-003/01a

The independent review reported the following defects. They were reproduced
before code changes; remediation does not imply repository owner acceptance.

- **P1 asset leakage — Fixed.** A rendered eligible article produced one HTML
  route, yet the original build emitted `draft.ChciZTaj.css` and
  `future.BOPsmV0y.css` with their exclusive selectors. Astro 7.3.8 registers
  MDX modules through stored `deferredRender` flags; route filtering is too late.
  The loader now rebuilds metadata, applies eligibility before module registration,
  validates every record/reference/resource/body, and removes excluded records
  from the persisted collection. Syntax validation uses Astro's configured MDX
  processor and discards generated code without loading asset imports. Eligible
  MDX remains natively renderable. No post-build pruning or custom build plugin.
- **P2 YAML dates — Fixed with an explicit quoted-string contract.** Conventional
  unquoted frontmatter was reproduced as a `Date` object and rejected. The
  installed parser also normalizes `2026-02-30` to `2026-03-02`; simple coercion
  would weaken validation. Both date fields must therefore be quoted ISO strings.
  Schemas now explain this requirement, specifications/examples are corrected,
  and a real YAML MDX fixture exercises valid quoted dates plus invalid and
  unquoted variants. This avoids a second frontmatter parser/dependency.
- **P2 symlink types — Fixed.** Internal `.css → .bin` and `.html → .png`
  aliases previously passed. The shared file resolver now checks the resolved
  extension as well as the declared one, containment, and regular-file status.
  Source target types must match their language; preview targets remain `.html`
  or `.astro`, preserving the screenshot distinction. Approved aliases still work.
- **P3 review documentation — Fixed.** The contradictory checked/Pending content
  review is now unchecked with owner acceptance explicitly pending. The malformed
  rendering checkbox was also corrected. The supplied remediation prompt is linked
  in history; both it and the original implementation/review prompts are unchanged.

**Regression coverage:** actual eligible MDX rendering and emitted CSS on cold
and cached builds, publication-status changes in both directions, malformed draft
MDX rejection, real YAML date frontmatter, internal unsupported source/preview
symlink targets, and valid internal aliases. The existing metadata, reference,
eligibility, and fixture-isolation tests remain in place.

**Remediation verification:**

- [x] `npm test` — 57 passed, zero failed/skipped, including the three Astro
  integration tests and all new regressions.
- [x] `npm run check:content` — Passed; expected empty-collection notices only.
- [x] `npm run check` — Final build's check passed across 16 files with zero
  errors, warnings, or hints; content sync also completed successfully.
- [x] `npm run build` — Passed on Node 24.21.0 / npm 11.19.0, rerunning all
  57 tests successfully before generating the unchanged single homepage route.
- [x] Final production asset scan — Seven existing output files: homepage,
  CSS, two fonts, two original licenses, and `.gitkeep`. No unpublished/fixture
  markers, probe routes, or client scripts. Rendered integration output separately
  proved eligible CSS present and excluded CSS absent on three cold/cached builds.
- [x] Diff/documentation review — `git diff --check` passed; all 24 local links
  across five reviewed documents resolve. Original prompts, package files,
  homepage/layout/styles, and deployment workflow remain unchanged by hashes.

**Dependencies:** none added or updated in this remediation.

**Deferred maintainability finding:** repeated catalog resolution and parallel
author loading duplicate work. Consider consolidating these in a later scoped
task; they remain unchanged here. Clearing native article metadata per sync is
intentional so module registration reflects the current publication state/date.

**Remaining boundaries:** quoted dates are required; unquoted YAML dates fail
with a corrective diagnostic. MDX syntax validation does not execute imported
modules or demos. Example execution, rendering UI, perspective controls, remote
CI/deployment, and owner acceptance remain pending. BBF-003/02 was not started.

### Unpublished MDX import validation remediation

**Defect reproduced:** content sync, a cold production build, and a second
cached build all accepted draft/future MDX importing nonexistent local CSS.
The prior correction checked MDX syntax but discarded generated JavaScript
without resolving its static dependencies; excluded modules never reached
Vite's normal import checks.

**Correction:** `src/lib/content/mdx-imports.ts` uses the existing TypeScript
parser to inspect static ES import/re-export declarations in the processor's
JavaScript result. Relative paths are looked up with Node's resolution-only
API, followed by a fresh regular-file check. No imported dependency is compiled,
loaded, or executed. The loader reports the affected article, original specifier,
and reason on failure, before removing excluded records. Existing syntax checks,
publication rules, module-registration isolation, and metadata cache clearing
remain unchanged. No dependencies were added or updated.

**Regressions:** missing draft and future CSS under sync/build, both cold and
after a successful build followed by deletion of only the dependency; valid
unpublished CSS and JS; missing JS imports/re-exports; no dependency execution;
no unpublished asset output; eligible MDX rendering and CSS output; resource
queries; fenced/string false positives; and same-process cached file resolution.

**Verification:**

- [x] `npm test` — 63 passed, zero failed/skipped. Five new integration tests
  reproduced the gap before the fix; they and an additional same-process cache
  test now pass alongside the original regressions. Existing Astro integration
  tests remain unchanged.
- [x] `npm run check:content` — Passed; expected empty-collection notices only.
- [x] `npm run check` — Passed across 18 files with zero errors/warnings/hints;
  repeated successfully as part of the final build.
- [x] `npm run build` — Passed on Node 24.21.0 / npm 11.19.0, including all
  63 tests. Local font processing used its required localhost listener permission.
- [x] Independent disposable-project inspection — Cold and cached builds each
  emitted only `articles/eligible/index.html` and `_astro/eligible.8pahA-qz.css`.
  Eligible CSS was present; unpublished CSS/JS markers were absent. Removing
  only future CSS then failed both sync and build with the article, specifier,
  and file-not-found reason. Temporary projects were removed after verification.
- [x] Production scan — The existing seven homepage/CSS/font/license/`.gitkeep`
  files only; zero unpublished/fixture markers, probe routes, or client scripts.
- [x] Diff/documentation review — `git diff --check` passed; all 26 local links
  across five documents resolve. Historical prompts, package files, publication
  policy/helpers, catalog, homepage/styles, and deployment workflow are unchanged
  by hashes. No commit, PR, remote CI, or deployment was performed.

**Supported scope and limitations:** direct static relative (`./`, `../`)
imports/re-exports, with query/fragment suffixes removed for lookup. Use existing
explicit filenames. Node lookup rules apply; Vite aliases, project-root paths,
TypeScript `.js`-to-`.ts` substitution, package/virtual resolution, dynamic imports,
globs, transitive dependency graphs, named exports, and dependency runtime behavior
are not validated by this hook. Eligible compilation still receives normal
Astro/Vite checks. These boundaries are documented in Article experience.
The optional catalog/author-loading refactor remains deferred. Original prompts
are unchanged, owner review remains pending, and step 2 has not started.

### Content architecture simplification — current implementation

The owner-approved directory workflow supersedes same-collection draft/date
filtering and validation of unpublished MDX during production builds. Native
Astro `glob()` collections now load articles, authors, and example metadata;
article references use native `reference()` fields. `src/drafts/` is not
registered or imported by production content configuration.

The custom loader, independent MDX syntax/import checks, module-registration
interception, manual JSON loading, catalog resolution/selection, and custom
cache clearing have been removed. A small check, initially invoked by the root
route and now by prerender middleware (see the follow-up below),
throws for missing references (Astro 7.3.8 only logs these), future dates,
identity mismatches, and invalid local resources. Metadata and MDX compilation
remain native. Preview kind and permissions live only in the reviewed registry;
example metadata now references `{ entry }` without repeating kind.

**Removed files/abstractions:** `src/lib/content/loader.ts`, `catalog.ts`,
`mdx-imports.ts`, and the old `astro.ts` public-catalog wrapper. `files.ts` no
longer scans content or loads author/example JSON. `publication.ts` now only
computes the editorial calendar date. The obsolete compiler/import-resolution
suite (`tests/mdx-imports.test.ts`) was removed; model and Astro integration
suites were rewritten around product behavior. Content/config code decreased
from 533 to 302 lines (43%); this is measured against the workspace at task start,
including the existing uncommitted BBF-003 implementation.

**Retained functionality:** strict metadata and quoted calendar dates, author
references and credit, ordered zero/one/many examples, ordered original source
text, code-only/preview-only/both/mixed resources, resource-derived perspectives,
image validation, HTTPS links, symlink containment and resolved file types, and
explicit reviewed previews. No real editorial content was invented.

**Verification (Node 24.21.0 / npm 11.19.0):**

- [x] `npm run check:content` — Native sync passed; empty-collection notices are
  expected because no production articles/authors/examples have been supplied.
- [x] `npm run check` — Passed across 15 files, zero errors/warnings/hints.
- [x] `npm test` — 15 tests passed, zero failed/skipped, including six integration
  cases invoking actual Astro builds and their multiple positive/negative phases.
- [x] `npm run build` — Checks, all 15 tests, and production generation passed.
  The initial sandboxed attempt passed checks/tests but font processing failed
  with `listen EPERM`; the authorized retry allowed its existing temporary local
  listener. No font or deployment configuration was changed.
- [x] Publication regression builds — Native MDX rendering, author/example order,
  resource combinations, schema failures, future-date rejection, and missing
  reference/resource failures passed, including deletion after successful builds.
  Native reference diagnostics were confirmed to leave sync successful; the
  actual production root route's explicit gate makes builds fail.
- [x] Draft artifact checks — Cold and cached builds excluded draft metadata,
  routes, CSS, JS, malformed MDX, and throwing imports from production output
  and module registration. Moving the same article/assets into the native
  collection emitted its CSS, imported JS value, and client script; moving it
  back removed them on the repeated build. Test projects use canonical paths
  to avoid macOS path aliases in Astro's virtual script IDs.
- [x] Production inspection — Seven files: the foundation HTML route, one CSS
  asset, two WOFF2 assets, two original font licenses, and `.gitkeep`. No article
  routes, probe endpoints, JSON/JS/MDX, or draft/fixture markers. Canonical URL
  and foundation copy remain correct. No browser payload was added.
- [x] Diff/documentation checks — `git diff --check` passed; 29 local Markdown
  links resolve across five changed documents. Historical prompts, layout/styles,
  CI workflow, package manifest, and lockfile match the task-start snapshot.
  Pre-existing unrelated working-tree changes were preserved.

**Remaining custom responsibilities:** the explicit production date/reference/
identity/resource check, focused file/type/text checks and source loading,
metadata constraints, the reviewed preview registry, and resource-derived
perspectives. Astro owns the content loading/compilation/caching lifecycle.

**Decisions and limitations:** no deviations from the approved directory model.
The example preview reference is now `{ entry }`; kind/path/permissions have a
single home in the registry. Sync/type checks alone do not replace the production
validation boundary. The initial root-route invocation was subsequently moved
to middleware as recorded below. Draft validation is deliberately outside
production and uses the
README's disposable-copy workflow. Do not import drafts from production modules.
Native empty-collection warnings remain until real content exists. Article UI,
perspective navigation, demo execution/emission, reading time, image processing,
remote CI, deployment, and browser/a11y review remain outside this refactor.
No visible UI changed, so browser visual checks were not run. No commit or PR was
created. Implementation acceptance and independent review remain pending.

### Decouple content validation

Moved the invocation of the existing `validatePublishedContent()` from the
homepage to `src/middleware.ts`. Astro 7.3.8's typed `defineMiddleware()` and
`context.isPrerendered` API run the gate before static pages/endpoints render.
A module-scoped promise shares the check across production routes, including
concurrent calls; development requests validate afresh. The validator's behavior,
schemas, publication rules, dependencies, and static-output configuration are
unchanged. The homepage now only composes its existing layout and content.

Integration fixtures copy the production middleware. Missing author/example
reference builds run with only a standalone page containing no content queries;
future-date tests remove the homepage. A wrapper around the real validator
counts invocations across multiple static pages/endpoints and consecutive builds.
Existing native MDX rendering, cached resource deletion, and draft asset-isolation
tests continue to exercise the same production gate.

**Verification (Node 24.21.0 / npm 11.19.0):**

- [x] `npm run check:content` — Passed. Empty-collection notices are expected
  until real production content is supplied.
- [x] `npm run check` (through `npm run build`) — 16 files, zero errors,
  warnings, or hints.
- [x] `npm test` (through `npm run build`) — All 16 tests passed, none failed
  or skipped. Missing author/example references fail from a standalone page
  with no homepage or content queries, cold and after cached record deletion.
  Future dates fail with the homepage removed, cold and after a valid build.
  Multiple static pages/endpoints share one validation call; the next build
  revalidates. Native MDX rendering and draft CSS/JS exclusion remain verified.
- [x] `npm run build` — Passed, including checks/tests; Astro generated one
  static homepage. Existing font processing used its temporary local listener.
- [x] Production inspection — Seven files: homepage, one CSS asset, two fonts,
  two licenses, and `.gitkeep`. Correct canonical URL and foundation copy;
  no fixture/draft markers, article/probe routes, or JS/JSON/MDX output.
- [x] Diff/documentation review — `git diff --check` passed; all 31 local links
  across five updated documents resolve. Historical prompts, package files,
  Astro config, content config/schemas/publication policy, and unrelated work
  match the task-start snapshot. The validator changed only its caller comment.

During verification, a markup-sensitive test assertion was corrected; a targeted
rerun passed. An overlapping sync/test run interfered through the fixtures'
shared dependency cache; sequential verification and the full build passed.

**Boundary:** middleware requires a prerendered route. The current static site
has one; a future fully on-demand site must revisit the build-time gate.
Sync/type checks still do not replace production validation. No article rendering
or perspective implementation was added. No visible UI changed, so browser visual
checks were not run. No commit, PR, remote CI, or deployment was performed.
The request reports independent architecture approval; owner acceptance remains
pending.

### Step 2 — Article rendering and working examples

This records the initial step 2 implementation. Its preview security behavior
and verification counts are superseded by the remediation record below.

**Implementation:** `/articles/[slug]/` uses native `getCollection()`,
`getEntries()`, and `render()`. Filename-derived IDs and the existing validation
middleware/publication boundary are unchanged. `ArticleLayout` composes the
shared document layout, `ArticleHeader`, scoped prose, and `ArticleExamples`.
`SourceFile` and `ExamplePreview` own individual resources; `MdxPre` and `MdxTable`
provide keyboard-focusable scrolling regions. Article text, source, dates,
authors, and ordered optional resources are present in initial HTML. No author
profile links, tabs, editor, copy buttons, or article-level script were added.

The shared `BaseLayout` owns canonical, title/description, and Open Graph output.
Dates use an explicit UTC calendar formatter. A small plugin in Astro's normal
MDX pipeline counts text/inline-code nodes, excluding fenced code/imports, at
200 words/minute with a one-minute minimum. Runtime-generated component text
is not included in the estimate. Both prose fences and source files use Shiki's
`github-dark-default` theme; highlighting runs at build time.

**Preview decision:** the user explicitly selected isolated HTML delivery for
this step. The native `/previews/[...path]` endpoint emits only registered HTML
and declared source companions referenced by published articles. Relative links
work within that emitted directory structure. No directory is copied wholesale,
and code-only or unused examples do not emit preview resources. Iframes use the
registry's sandbox permissions (empty by default), no same-origin permission,
no-referrer, reserved dimensions, lazy loading, and a separate-window fallback
link. A CSP meta policy also applies script denial in the standalone fallback;
explicit script permission enables local/inline authored JavaScript. Assets are
local except data images, and connections, forms, and embedding are denied.
The CSS clamp example has no JavaScript, timers, or listeners.

`trusted-component` remains a validated schema option but execution is deferred;
referencing one currently fails with an actionable diagnostic. An actual local
Astro glob-import probe emitted CSS from an unused `.astro` component, so no
production component glob was introduced. Isolated preview companions must be
explicitly declared source files; there is no dependency resolver, bundler,
automatic asset copying, or TypeScript transpilation for previews. Authored HTML
must be self-contained or reference its emitted companions. Preview execution
and remote-resource correctness remain author review responsibilities.

**Development fixture:** `src/drafts/fluid-typography.mdx` is clearly labeled
non-editorial content. It references the existing synthetic author/example data
under `tests/fixtures/`, which is supplied only inside disposable build projects.
The code-only and code/preview examples preserve article/file order and share
one authoritative HTML/CSS implementation. No production author/example records
or repository URLs were invented. Repository-link rendering is tested using a
known existing repository URL inside the disposable test project only.

**Dependency:** `@astrojs/markdown-satteri` 0.4.3 is now a direct dependency for
configuring Astro 7's official MDX processor hook. The same version was already
installed transitively; no additional installed packages, browser libraries, UI
framework, or test framework were introduced.

**Verification (Node 24.21.0 / npm 11.19.0):**

- [x] `npm run check:content` — Passed; expected empty-collection notices only.
- [x] `npm run check` (through `npm run build`) — Passed across 27 files, zero
  errors, warnings, or hints.
- [x] `npm test` (through `npm run build`) — 17 passed, none failed/skipped.
  The added actual-rendering regression verifies routes, initial MDX HTML,
  author/date/SEO metadata, ordered optional resources, six highlighted languages,
  images, reading time excluding fenced code, registered sandbox/CSP permissions,
  unused HTML/component exclusion, explicit deferred-component diagnostics, and
  removal of article/preview output on rebuild. All earlier validation and draft
  isolation regressions still pass.
- [x] `npm run build` — Passed; one static homepage. Production contains eight
  files: HTML, two site CSS assets, two fonts, two licenses, and `.gitkeep`.
  No development article, preview route/companion, client script, JSON/MDX,
  synthetic author, or draft/unused-demo marker was emitted. The additional CSS
  is shared article presentation; it contains no fixture implementation assets.
- [x] Browser inspection — The actual controlled production build was inspected
  in the in-app browser at 390px, 768px, and 1440px, and compared with the BBF
  design system/reference. The page width equaled the viewport at every size.
  A separate disposable stress article covered a long title, 4140px table,
  3601px code line, and 1200px SVG: overflow stayed inside its regions and the
  image loaded at the available reading width with reserved dimensions.
- [x] Keyboard/preview checks — Skip link focus showed the cyan 2px outline;
  Enter moved focus to the article. Code and preview links showed visible focus.
  The lazy CSS preview loaded with its external declared stylesheet, opaque
  sandbox, no browser diagnostics, and one iframe instance. Heading size changed
  from 32px on mobile to 54.9px on desktop. No parent-page scripts are present.
  The sample source panel's minimum measured token contrast was 6.15:1.
- [x] Payload/artifact inspection — Controlled article HTML is 22,038 bytes
  (4,098 gzip); site-owned runtime JavaScript is zero. Shared local fonts retain
  their native loading/fallback behavior. These are payload measurements, not
  measured Core Web Vitals or a full accessibility-conformance claim.
- [x] Diff/documentation review — `git diff --check` passed; 44 local links
  across seven updated documents resolve. Historical prompts, collection schema,
  reference validator, publication rule, middleware, homepage/global tokens,
  TypeScript config, and CI workflow match the task-start snapshot. The existing
  installed package set is unchanged. Pre-existing user changes were preserved.

Initial integration runs exposed the empty sandbox default and overly strict
assertions about Astro's serialized attributes; both were corrected. A new
permission-phase fixture initially omitted an unused registration; the existing
validation gate correctly rejected it, and the test setup was corrected. The
final type check also caught an endpoint props/index-signature mismatch, which
was fixed before the successful full run. No checks are waived.

Browser access initially failed for `127.0.0.1` and native Chrome was not
approved; a fresh in-app `localhost` tab succeeded. All visual results above
come from that working browser session. The missing prompt image path
`docs/reference/bbf-homepage-mockup.png` was replaced for inspection by the
preserved `docs/reference_image.png`; no image/document was moved or rewritten.

**Remaining scope:** trusted-component execution, article perspective navigation,
copy controls, table of contents, cover/avatar presentation, full social metadata,
RSS/sitemap, discovery, and deployment remain deferred. No screen-reader audit,
physical-device testing, reduced-motion emulation, or Core Web Vitals measurement
was performed. New article/demo styles contain no animation. The controlled
review copy is temporary and never enters production inputs. No commit, PR, or
remote deployment was performed. Step 3 has not started; no owner acceptance of
step 2 is claimed.

### Step 2a — Preview security remediation

**Status:** Implemented and locally verified on 2026-10-16; repository-owner
acceptance remains pending. The review file `02-00-article-rendering-review.md`
is empty in this checkout. The two confirmed P2 findings and P3 clarification
come from the submitted remediation request; no review acceptance is inferred.

**P2-1 — FIXED: executable companion documents.** The static endpoint now uses
an explicit resource allowlist. Only registered HTML entries may be documents;
an exact source alias of a registered entry retains the document's protection.
Other HTML and all SVG companions fail the build. Supported companions are
`.css`, `.js`, `.mjs`, `.json`, and `.txt`; they remain explicitly declared,
local UTF-8 resources. Conflicting targets or sandbox permissions fail rather
than silently selecting an unsafe alias. Code-only SVG source display is
unchanged. Data images still work; binary image companions remain outside the
existing text-source contract. No directory copying or implicit dependency
resolution was introduced.

**P2-2 — FIXED: comment-sensitive CSP placement.** Regex tag injection was
replaced by a controlled HTML wrapper with its policy in the real head before
any authored content. Original HTML enters only an escaped `srcdoc` attribute.
The inner frame inherits the policy and always carries the registered sandbox,
including during direct top-level access. It receives no same-origin permission.
This preserves relative resources while preventing the standalone link from
removing the sandbox boundary. The article's existing lazy outer iframe and MDX
rendering are unchanged; there is one running demo inside the wrapper.

`parse5` 8.0.0 is the only added direct dependency (with its transitive parser
entity dependency). Its HTML parser validates complete, explicitly closed
`<!doctype html>`, `html`, `head`, and `body` documents before emission. Parser
errors or missing explicit structure fail with the preview path and reason.
Comments containing HTML-like tags remain valid. The parser is used for
validation, not sanitization or rewriting. Authored bytes cannot become wrapper
markup. The fixed policy denies scripts by default, connections, forms, objects,
and base overrides; approved local styling, fonts, images, and data images
remain available.

**P3 — FIXED: documented script contract.** Initial CSS examples remain
script-free. The existing explicit `allow-scripts` opt-in retains inline and
external classic JavaScript, verified in the browser. There is no module loader,
transpiler, import-graph validation, or module/CORS support. `.mjs` may be served
as JavaScript source but does not imply support for ES-module execution in the
opaque-origin frame. This is a documented limitation, not removal of classic
script support. Unsupported active HTML/SVG companions and malformed documents
are intentionally newly rejected. README and the architecture/article contract
record these boundaries.

**Browser reproduction and correction evidence:** Disposable actual Astro
production builds were served locally and opened in the in-app Chromium browser.
The initial direct-navigation probes reproduced both findings before code edits:

| Probe | Before | After |
|---|---|---|
| Registered default preview | Script blocked; one effective CSP meta | Script blocked; protected wrapper and opaque sandbox |
| Unregistered `extra.html` companion | Script set `data-security-probe="executed"` | HTTP 404; execution marker absent |
| `image.svg` companion | SVG `onload` set the execution marker | HTTP 404 HTML error document; execution marker absent |
| Registered entry with `<!-- <head> -->` before HTML | Script executed; no effective CSP meta | Real wrapper CSP present; both script probes blocked |

The browser regression page passed **6/6 cases, 0 failures** against the fixed
build. Its test frames are deliberately unsandboxed: the served preview must
enforce its own boundary. A permitted classic-script preview executed both
inline and external probes, applied the relative stylesheet (computed heading
color `rgb(10, 120, 30)`), and loaded a data PNG. Its message came from the
actual opaque child (`origin: null`); parent DOM and same-origin storage access
were denied. Unregistered HTML/SVG and unpublished/draft URLs returned 404.
Actual article previews were also loaded: the default preview applied CSS
without executing either script, while the opted-in preview executed its
classic scripts and loaded the image inside the unchanged article component.

**Regression coverage:** `tests/preview-security.test.ts` adds document and
resource-policy checks plus real cold/cached Astro builds. These reject active
companions and malformed HTML, retain registered aliases, reject permission
collisions, preserve legitimate resources, and remove preview output after
article withdrawal. Existing article-rendering and publication-isolation tests
remain in place. `tests/fixtures/preview-security/` supplies disposable authored
attack probes and a dependency-free browser suite. Reproduction commands are
in the fixture README. The browser suite runs on opening its page; `npm test`
runs Node/build tests and does not automatically launch it.

**Verification (Node 24.21.0 / npm 11.19.0):**

- [x] `npm run check:content` — Passed; expected empty-collection notices only.
- [x] `npm run check` through `npm run build` — 30 files; zero errors, warnings,
  or hints.
- [x] `npm test` through `npm run build` — 20 passed; none failed/skipped.
- [x] `npm run build` — Passed; static generation retained.
- [x] Browser regressions — 6/6 passed, plus direct top-level navigation and
  actual article preview checks described above.
- [x] Independent artifact inspection — Disposable published preview directories
  contain only registered `index.html`, `runtime.js`, and `styles.css`; attack
  companions and unused/draft previews are absent. The real production output
  contains eight files: the homepage, two CSS assets, two fonts, two licenses,
  and `.gitkeep`. No preview route, security harness, attack/draft marker,
  article fixture, or client JavaScript was emitted.
- [x] Diff review — Task-start snapshots confirm article routing/MDX components,
  schemas, publication rules, validation middleware, design tokens, CI, and all
  historical prompts are unchanged. Pre-existing user work is preserved.
  `git diff --check` passed; all 34 local Markdown links across the five
  updated documents resolve.

**Remaining limitations and risks:** This is a reviewed-author demonstration
boundary, not an untrusted-code hosting service. Explicitly permitted classic
scripts still need author review. SVG/binary companions, ES-module execution,
trusted-component previews, and general dependency bundling are unsupported.
Browser evidence covers the in-app Chromium browser; other browser engines and
remote hosting were not tested. Static hosting must preserve the emitted MIME
extensions and 404 behavior. No deployment, commit, or PR was made. Step 3 has
not started; owner acceptance remains pending.

### Step 3 — Article perspectives

**Status:** Implemented and locally verified, 2026-10-20. The step 3 request
accepts the content/rendering/preview baseline. Step 3 and full BBF-003 owner
review remain pending. No BBF-004 implementation, commit, PR, or deployment.

**Composition:** `ArticleLayout` now uses `ArticlePerspectives`, with a small
`ResourceSelection` component. The existing `ArticleExamples`, `SourceFile`,
and `ExamplePreview` supply one static body/source/frame set; data hooks let
`src/scripts/articles/perspectives.ts` move original resources into the chosen
panel and return them to their article positions. Source paths, display labels,
languages, original highlighted text, example/file order, and real repository
links remain available. No second source loader, content pipeline, client
framework, global store, authored flags, or dependency was added.

**Interaction:** `getPerspectives()` derives available controls; prose-only
articles omit the strip. Baseline controls are ordinary links. Successful
initialization applies associated tab/panel roles, selection, roving focus,
Left/Right wrapping, Home/End, and manual Enter/Space activation. Tab activation
keeps focus on its control. Native, explicitly labeled example/file selectors
show eligible resources in editorial order. Code/Preview preserve the selected
example if eligible, otherwise visibly select the first eligible example. File
selection is remembered per example during the visit. Hidden panels/files expose
no focus targets. Initialization or later interaction failure restores the
complete static content and ordinary links.

**Fragments/history:** existing heading IDs, `#article`, `#example-<id>`,
`#code-<id>`, `#preview-<id>`, and `#source-<example-id>-<file-id>` are preserved.
Actual DOM targets/resource membership resolve the view; no string-splitting ID
parser or new public fragment convention was adopted. Explicit view/example/file
changes push the existing fragment only when changed. Direct links and native
Back/Forward reveal/focus the target without entering a preview. Invalid or
removed targets retain Article with an explanation, including prose-only pages.
There is no cross-visit persistence beyond an explicit resource/file fragment.

**Preview lifecycle:** `preview-lifecycle.ts` manages the same existing iframe.
Hidden previews lose their `src`, stopping the demo; reactivation restarts it
near the viewport, retaining native lazy loading and reserved dimensions. Timers
clear on hiding/reload/load/error/rollback, event handlers use an abort signal,
and rollback disconnects observers. Local loading/delay/error feedback and a
reload button retain the standalone link. A frame load cannot prove HTTP/runtime
success through an opaque sandbox; feedback says so rather than claiming a
successful demo. A real 404 case preserves reading and source access. The
registry, static endpoint, parse5/CSP wrapper, permissions, supported companion
types, and publication checks are byte-for-byte unchanged from the task start.

**Presentation:** compact labels, a blue underline and stronger active weight,
visible focus, and native selectors use current contrast-safe tokens. The light
palette, font replacement, rail, outline, chapter numbering/progress, homepage,
copy controls, and Playground remain outside this step. The requested reference
path is absent; the original `docs/Build Better Frontend_ Into the Bin.png` was
inspected. No reference image or historical prompt was rewritten.

**Verification:**

- [x] `npm run check:content` — Passed; expected empty-collection notices only.
- [x] `npm run check` via `npm run build` — 36 files, zero errors/warnings/hints.
- [x] `npm test` via `npm run build` — 21 passed, none failed/skipped. The new
  native-build regression covers available perspectives/static fallback, unique
  IDs, one resource/body set, editorial/file order, existing anchors, highlighting,
  unchanged sandbox/CSP, and unpublished/draft exclusion. Prior regressions pass.
- [x] `npm run build` — Passed after the final prose-only fragment correction;
  static generation and canonical article routes retained.
- [x] Real browser regressions — 14/14 perspective cases and 6/6 retained preview
  security cases passed against disposable production builds. Coverage includes
  all resource combinations, keyboard activation, selection/node identity,
  direct fragments/history, hidden-frame lifecycle, invalid/prose-only targets,
  script-disabled fallback, initialization/interaction rollback, and an actual
  preview HTTP 404. Browser suites run when opened, separately from `npm test`;
  the script-disabled case uses an iframe without script permission.
- [x] Manual browser inspection — Article, Code, and Preview each checked at
  390px, 768px, and 1440px. Page widths equal viewport widths in all nine cases;
  exactly one enhanced panel is visible and focus never remains hidden. Long
  example names/filenames wrap; source scrolls locally (348px viewport / 569px
  content in the mobile stress case). The loaded CSS preview retained its title,
  empty sandbox, and external styling. Real Arrow/Enter/Space/Tab interactions
  retain manual activation and lead into the labeled selector, with a visible
  2px focus outline. Top-level Back/Forward restore Code/Preview/file selection
  and focus existing resource targets.
- [x] Contrast/payload inspection — Computed active/inactive text contrast against
  the existing canvas is 17.37:1 / 10.13:1; underline 5.66:1 and focus 10.31:1.
  The single site enhancement is 6,951 bytes (2,470 gzip), with no client package
  dependencies. Representative fluid-typography HTML is 25,716 bytes (4,781 gzip);
  mixed stress HTML is 40,695 bytes (4,774 gzip). Shared styles total 3,791 gzip
  bytes across two assets; two existing WOFF2 files total 63,624 bytes. These are
  file/payload measurements, not network timings or Web Vitals results. Frame
  dimensions remain reserved; no new animation or smooth scrolling is added.
- [x] Production artifact review — Nine files: homepage, the expected article JS
  asset, two CSS assets, two fonts, two licenses, and `.gitkeep`. The homepage
  references no scripts. No article/demo fixture, preview route, draft marker,
  unused preview resource, or browser test page appears in production output.
- [x] Diff review — No changes to package/lockfile, schemas/resolvers, article or
  preview routes, validation middleware, publication rules, global design tokens,
  font infrastructure, CI, or historical prompts. Pre-existing user changes are
  preserved. `git diff --check` passes; no new broken local documentation links.

The initial manual selector check exposed labels that included option text;
explicit `for`/`id` labels corrected that. Final review found missing unavailable-
fragment feedback on prose-only pages; the browser regression now covers it.
The font listener required permitted local execution. One approval attempt used
stale task scope and was retried after reading the current request; a subsequent
usage-limit interruption was resolved before the final checks completed.

**Remaining limitations:** verification used the in-app browser, not a cross-
engine or screen-reader audit. Full zoom/text-spacing/forced-color/reduced-motion
emulation, print review, and Core Web Vitals measurements were not performed;
the new controls add no motion and retain existing accessibility defaults.
Unloading a preview resets its internal demo state. Opaque-frame runtime success
cannot be verified by its load event. Copy UI and the editorial migration remain
separate work. Five pre-existing broken reference/snapshot links in the edited
specifications remain, including the missing canonical mock-up path; no new
broken links were introduced. Owner has accepted.

### Human review

- [x] Content model reviewed — 2026-10-16
- [x] Content architecture reviewed — 2026-10-16
- [x] Article rendering visual review — 2026-10-19
- [x] Article perspectives reviewed — 2026-10-20
- [x] Desktop appearance reviewed — 2026-10-20
- [x] Mobile appearance reviewed — 2026-10-20
- [x] Repository owner review — 2026-10-20

The baseline is accepted as stated in the step 3 request. Step 3, visual
acceptance, and full-story repository-owner review are accepted by the owner.

## Lessons learned

Schema checks alone cannot detect a deleted local source when article metadata
is cached. The original pipeline rechecked these during sync; the simplified
architecture rechecks them at the explicit production-build boundary. Real
Astro builds and artifact inspection protect the publication guarantee better
than route filtering alone. Directory isolation removes the need to compile and
validate unpublished MDX in the production pipeline.
