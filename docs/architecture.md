# Build Better Frontend — Architecture

Version: **0.2** · Editorial architecture alignment · **19 October 2026**

## Status and ownership

**Confirmed:** Astro + strict TypeScript + official MDX integration; static output and canonical origin selected in BBF-001; existing-content discovery without an AI backend; Article / Code / Preview with multiple examples; GitHub repositories; accessibility, SEO, and performance; Playground later.

**Adopted implementation:** native collections and strict schemas, directory-based publication, validation middleware, shared CSS tokens/primitives and local fonts, build-time highlighting, static article/source rendering, and the protected isolated HTML preview path, as recorded in the BBF-001–BBF-003/02a sections below. These records are retained from the supplied architecture; they are not a fresh repository audit.

**Proposal:** build-generated search, pending perspective/inline/copy interfaces, derived heading/outline enhancement, CI/hosting workflow, quality targets, and remaining project structure. The selected visual direction is confirmed; exact layout, font replacement, thresholds, and new payload budgets remain proposals in Design system v0.2.

**Open:** deployment host, domain setup, repository URLs/topology, licenses, and future capabilities beyond the existing preview-permission contract. Foundation dependency versions and npm were selected during BBF-001. **Later:** site dark theme and Playground/editor/remote execution. Trusted-component execution remains deferred pending a separate implementation decision; this visual revision neither enables it nor makes a new release-scope commitment.

This document owns implementation boundaries. [Product](product.md) owns release scope and the proposed route map; [Design system](design-system.md) owns tokens and presentation; [Article experience](article-experience.md) owns metadata and resource contracts. Adopted routes/schemas retain their recorded status; remaining route and UI proposals do not become implemented through documentation. Current v0.2 documents govern over archived v0.1 snapshots. No implementation prompts, dependency upgrades, or website code changes are included. Historical version/verification statements below describe those earlier tasks, not current package recommendations or checks performed in this workspace.

## BBF-001 foundation decisions

**Confirmed by the BBF-001 request:** strict TypeScript, the official MDX
integration, static output, and the canonical origin
`https://buildbetterfrontend.com`. Hosting and domain setup remain open.

**Adopted implementation choices:** npm with a repository lockfile; Astro
7.3.8, `@astrojs/mdx` 8.0.3, `@astrojs/check` 0.9.10, and TypeScript 6.0.3.
Versions were verified against npm's stable releases and peer requirements.
TypeScript 6 is used because the checker does not support TypeScript 7 yet.
Node 24 is selected in `.nvmrc`; Astro requires Node 22.12.0 or newer.

The minimal structure reserves components, article/author content, examples,
layouts, pages, styles, and static assets. `src/content.config.ts` starts with
no registered collections; schemas and publication rules remain deferred.
A typed document layout imports minimal global CSS and renders metadata.
The root route only verifies the foundation. No brand design, article UI,
search, example runtime, testing framework, CI, or hosting is implemented.
`npm run check` runs Astro's checker and content/type synchronization;
`npm run build` requires that check before generating static output.

These choices record this implementation, not prior approval of other proposals.

## BBF-002 visual foundation decisions

**Adopted implementation choices:** centralized CSS custom properties,
document defaults, and a small shared stylesheet for visual/layout patterns.
The root page is now a minimal design validation surface. See
[Design system](design-system.md) for the selected values and current tagline.
BBF-001's scope statements above describe that earlier task's outcome.

Fonts are vendored local Latin WOFF2 assets with their original OFL licenses.
Astro's native local Fonts API handles fingerprinting, preloading the reading
font, and metric-adjusted fallbacks. This preserves a build from local files
and avoids visitor requests to external font services. No package dependencies,
browser scripts, or UI framework were added. Astro's font processing uses a
temporary local HTTP server during the build; restricted execution environments
must permit that local listener. This task does not execute or verify remote CI,
hosting, domain setup, or production publishing.

## BBF-003 content architecture — directory publication

**Confirmed by the content architecture simplification request:** published
articles live in `src/content/articles/`; unpublished work lives in
`src/drafts/`. The directory determines publication. There is no `draft` flag,
scheduled publication, or branch-based publication infrastructure.
`publishedAt` remains editorial metadata; a future date fails the build using
the current Europe/Brussels calendar date.

This supersedes the original BBF-003 step 1 same-collection filtering strategy
and its remediation pipeline. Validating unpublished bodies/imports in production,
custom MDX compilation, module-registration interception, cache clearing, and
custom catalog/publication selection have been removed. Historical prompt and
review records remain under `prompts/BBF-003/`.

**Adopted implementation choices:** native Astro 7.3.8 `glob()` Content Layer
collections load article MDX, author JSON, and `src/examples/*/example.json`.
Strict Zod schemas validate metadata; native `reference()` fields connect
articles to authors and ordered examples. Authored references remain plain IDs.
Astro owns parsing, MDX compilation, import processing, storage, caching, and
normal static generation. No article pages are implemented in this step.
See [Content collections](https://docs.astro.build/en/guides/content-collections/)
and [Content Loader API](https://docs.astro.build/en/reference/content-loader-reference/).

Astro 7.3.8 logs missing reference diagnostics without failing `astro sync`.
`validatePublishedContent()` in `src/lib/content/validate.ts` is therefore called
by project-wide `src/middleware.ts` before prerendering static pages and endpoints,
independently of homepage content. It throws for missing
author/example references, future dates, mismatched record IDs, invalid images,
and invalid example resources. Direct `astro build` runs this gate as well as
`npm run build`. The middleware uses Astro's typed `defineMiddleware()` and
`context.isPrerendered` APIs; see [Astro middleware](https://docs.astro.build/en/guides/middleware/).
Production routes share one pending validation promise per build to avoid
repeated filesystem work. Development requests validate afresh so edits are
not masked. The gate requires at least one prerendered route; a future move to
fully on-demand rendering would require revisiting this build-time boundary.
It uses the native collections, not a second author loader or catalog. The date
and filesystem checks run on every build, including cached builds. Content sync
and `astro check` validate schemas/types; they do not replace this production gate.

Remaining custom work is limited to editorial constraints, ID/uniqueness rules,
local file containment/type/UTF-8 checks, reviewed preview registration, and
resource-derived perspective availability. Sources and previews remain outside
`public/`. Declared source paths and resolved symlink targets must stay inside
the approved directories with matching types. Preview kind and permissions are
stored only in `src/examples/previews.ts`; examples reference its `entry` key.
No previews are imported, executed, bundled, or emitted in this step.

Production configuration never registers or imports `src/drafts/`; TypeScript
checks also exclude that directory. Drafts can be incomplete and have broken
MDX/imports without affecting production. Validate active drafts in a disposable
local copy using normal Astro checks/builds, with the candidate and its companion
assets copied into the published collection there. The repository README provides
commands. Only move reviewed content into the actual published collection when
ready, then run the normal validation/deployment workflow. No draft compiler,
import validator, development collection, or production-content mutation is
needed for validation.

Tests use Node's built-in runner and disposable Astro projects. They verify
native rendering, schema/reference failures, resource combinations/order, future
date rejection, and draft module/asset exclusion on cold and repeated builds.
The same draft is moved into the collection to prove native CSS and JavaScript
processing, then moved back to verify cached-build removal. Fixtures never enter
production inputs. Existing npm dependencies and lockfile are unchanged by this
simplification. `npm run build` runs type/content checks, tests, and the production
build; remote CI and deployment remain separate.

## BBF-003/02 article rendering decisions

Static `/articles/[slug]/` routes use the existing native published collection
and `render()` API. Page components resolve native author/example references;
focused presentation components receive typed data and validated resources.
The prerender validation middleware remains mandatory. Article reading and
highlighted source are initial HTML, with no site-owned runtime JavaScript.
Shared document metadata now includes Open Graph title/description/type/URL.

**Adopted:** Astro's official Sätteri processor is configured through a direct
`@astrojs/markdown-satteri` 0.4.3 dependency, the version already used by Astro.
A small native mdast visitor derives prose reading time during normal MDX
compilation; it does not load or compile content separately. Astro/Shiki renders
fences and source files with `github-dark-default` at build time. Source text
continues to come from the existing file resolver.

**Confirmed during implementation:** this step supports `isolated-page`
previews only; trusted Astro component execution is deferred. An actual native
glob-import probe emitted unused component CSS, so no component glob or custom
module-registration infrastructure was added. A referenced `trusted-component`
currently fails with a corrective build diagnostic, rather than silently losing
its preview.

The static `/previews/[...path]` endpoint emits registered HTML and supported
declared source companions only for examples referenced by published articles.
Code-only examples and unused registrations do not publish files. Declared URL
paths are preserved while the existing resolver checks real targets/containment.
There is no automatic dependency traversal, module loader, or transpilation.

**BBF-003/02a security correction:** HTML is emitted only for registered entries.
Companions are restricted to `.css`, `.js`, `.mjs`, `.json`, and `.txt`; arbitrary
HTML, SVG, and other companion types fail the build. The registered entry may
also be displayed as an HTML source at its exact protected URL. Source display
and the metadata schema are unchanged. Binary image companions are outside this
text-source contract; data images remain supported. Unsupported SVG companions
are rejected rather than served as active documents. Shared URLs cannot have
conflicting targets or sandbox permissions.

parse5 8.0.0 validates full HTML using browser-compatible parsing and reports
malformed/unsupported documents. Entries require a doctype and explicit complete
`html`, `head`, and `body` elements. It is not a sanitizer or alternate content
compiler. A controlled wrapper places CSP before all authored bytes, then embeds
the unchanged document solely in an escaped `srcdoc` attribute. No security-
critical HTML regex rewriting remains. Comments containing HTML-like text cannot
affect the wrapper head. The wrapper's CSP is inherited by the nested document;
its sandbox remains effective on direct/standalone access, including scripted
previews. The outer article iframe remains lazy with reserved height and a
separate-tab fallback. One inner frame contains the one running demo instance.

The initial CSS previews remain script-free. The existing explicit
`allow-scripts` capability still permits classic inline/local external JavaScript
inside the opaque sandbox, with parent DOM and same-origin storage denied.
External ES modules/import graphs are unsupported because of opaque-origin CORS
requirements; no CORS or same-origin capability is added. File extension `.mjs`
does not provide a module loader. CSP permits local styles/fonts and local/data
images, denies connections, forms, plugins and base overrides, and permits the
wrapper's local frame. These controls work through static HTML, without relying
on endpoint headers that a static host might discard. Reviewed authored demos
remain required; this is not an arbitrary-code execution service.

Development content stays in `src/drafts/` and `tests/fixtures/`. Controlled
builds copy it into a disposable project using the documented draft workflow;
normal production builds contain no fixture article or preview assets.
Article-level perspective navigation remains BBF-003/03 work.

## Proposed architecture

Build a static publication with server-generated article HTML and small, focused client interactions. Keep content, example source, and configuration in version control. A database, application server, authentication service, AI service, and custom CMS are unnecessary for the proposed v1 scope.

```text
Reviewed MDX + author data + example sources
                   |
         Build-time validation
                   |
       Native published article collection
                   |
     +-------------+---------------+
     |             |               |
 Static HTML   Search index    RSS / sitemap
     |
Shared examples -> highlighted source + reviewed demos
                   |
       Static hosting and CDN
                   |
Browser enhancements: Explorer, perspective controls, demo loading
```

### Stack — adopted choices and remaining proposals

| Concern | Choice | Status / boundary |
|---|---|---|
| Site framework | Astro | Confirmed technology; static output confirmed in BBF-001 |
| Language | TypeScript, strict configuration | Confirmed language; strictness confirmed in BBF-001 |
| Articles | MDX through Astro's MDX integration | Confirmed content format |
| Content validation | Native Astro collections, strict schemas, explicit production gate | Adopted in BBF-003; preserve directory publication and validation middleware |
| Styling | Scoped CSS, tokens/global/primitives, local font pipeline | Adopted in BBF-002; light editorial migration pending; no required utility framework |
| Highlighting | Build-time Astro/Shiki, `github-dark-default` | Adopted in BBF-003/02; preserve syntax/source pairing |
| Site interactivity | Small TypeScript modules / Astro scripts | Proposal; no site-wide UI framework required |
| Preview delivery | Protected isolated HTML pages and declared text companions | Adopted BBF-003/02a path; trusted components deferred, no new bundler/module loader |
| Hosting | Static host supporting domain, HTTPS, and cache controls | Provider open |
| CI | GitHub Actions or an equivalent host-integrated workflow | Proposal |

BBF uses native Astro build-time collections, schema validation, and typed references rather than a custom content engine. See [Astro content collections](https://docs.astro.build/en/guides/content-collections/). MDX uses the official [Astro MDX integration](https://docs.astro.build/en/guides/integrations-guide/mdx/). Astro documents its highlighting support in [Syntax highlighting](https://docs.astro.build/en/guides/syntax-highlighting/).

Preserve the repository manifest, npm lockfile, and selected runtime during the visual migration. The foundation section records existing versions; do not silently upgrade them while styling. For a separately authorized upgrade, check the installed version's official APIs and peer requirements and record the resulting manifest/lockfile changes. Do not copy obsolete content-loader examples or invent a latest version.

## Proposed project structure

```text
buildbetterfrontend/
├── docs/
│   ├── product.md
│   ├── design-system.md
│   ├── article-experience.md
│   ├── architecture.md
│   └── reference/bbf-editorial-article-mockup.png
├── src/
│   ├── content.config.ts
│   ├── content/
│   │   ├── articles/*.mdx   # publishable articles only
│   │   ├── authors/*.json
│   │   └── images/
│   ├── drafts/            # never registered in production
│   ├── examples/
│   │   ├── previews.ts
│   │   └── [example-id]/
│   ├── components/
│   │   ├── site/
│   │   ├── discovery/
│   │   └── articles/
│   ├── layouts/
│   ├── lib/
│   │   ├── content/
│   │   └── search/
│   ├── pages/
│   └── styles/
├── public/
└── package.json
```

Content/draft/example locations, current rendering layout, article routes, and preview endpoint reflect the recorded implementation. Remaining discovery/supporting-page organization describes proposed later work. The editorial reference supersedes the old homepage reference for visual work. Keep ordinary article content distinct from reusable components. Do not turn a small publication into a general plugin platform.

### Responsibilities

- **Content layer:** native collections/schema validation plus the explicit production reference/resource/date check. All article entries are publishable.
- **Layouts:** site chrome, article reading structure, SEO metadata, and responsive composition.
- **Examples collection:** metadata and ordered source references; the explicit preview registry identifies reviewed demo entries.
- **Discovery module:** search/filter/rank only the generated public metadata index.
- **Browser enhancement modules:** enhance controls without taking ownership of article rendering.

Use focused components for meaningful responsibilities such as navigation, article metadata, outline, selectors, and source panels. Shared repeated patterns should have one implementation, but a substantial cohesive section may deserve a component before repetition. Do not prebuild a design-system package or microfrontend architecture.

## Content and publication boundary — confirmed workflow

`src/content/articles/*.mdx` is the entire published article collection. All
future public surfaces (routes, cards, archives, search, author contributions,
RSS, sitemap, and example emitters) query that native collection. There is no
additional eligibility filter. Future dates are invalid, rather than scheduled
or silently omitted. Failed production validation stops the build.

`src/drafts/` is outside every production loader and import glob. Do not import
drafts from published articles, components, or scripts, or place private assets
in `public/`, whose files Astro copies unchanged. Draft-only dependencies remain
under the draft directory or otherwise outside production imports; ordinary
module imports are dependencies regardless of editorial intent. Only reviewed
examples referenced by published articles should be used by future emitters;
loading example JSON is not permission to eagerly import every demo.

Publication consists of moving reviewed MDX and any companion assets into the
published directory, checking quoted calendar dates/references, and running the
normal checks and deployment workflow. Draft validation uses a disposable copy
as described above. No `noindex` rule, post-build asset pruning, scheduling,
custom content store, or alternative compiler implements this boundary.

BBF-003/02 already derives reading time, renders static article routes/source, and emits registered isolated previews with the BBF-003/02a protections. Cover/avatar presentation and its rendering optimization remain pending. Resource availability comes from validated files and registered previews; no manual availability flags are authored.

## Frontend Explorer — proposed implementation

### Build-generated index

Emit a compact, versioned JSON asset from the public article set. Each item contains article ID, URL, title, description, category key/display name, tags, date, computed reading time, and derived `hasCode` / `hasPreview` values. Author display names may be included for cards, but author search is not required.

Do not index draft metadata, article source code, entire MDX documents, or arbitrary repository files. Full-text body search is a later option if metadata search proves insufficient.

### Browser behavior

Lazy-load the index when the Explorer is used, or preload after primary content if measurement justifies it. Keep the form usable with explicit submission; live matching is an optional enhancement. Handle fetch errors and provide the normal article archive as fallback.

Proposed deterministic matching:

1. Trim, collapse whitespace, and normalize text case.
2. Treat query terms as literal text, never executable regular expressions or HTML.
3. Require all terms to match across the indexed searchable fields.
4. Rank exact title matches ahead of title-term matches, then tag/category, then description matches.
5. Break ties by newest publication date and stable article ID.

An empty query shows recent eligible content. Topic chips apply exact tag filters. The code checkbox requires at least one real source file. Avoid a third-party search service or library until content volume and measured relevance justify it.

Random discovery uses the same public content set. As proposed in Product, it respects topic/code filters and ignores free-text terms. Select uniformly from eligible IDs, handle zero/one results, and navigate to the canonical article. Do not fabricate content or use tracking-based recommendations.

No requests go to an LLM or search backend. Keep status text, focus behavior, and result links accessible. Render metadata as text rather than injecting it as HTML. URL query-state persistence is an optional proposal, not needed for initial Explorer functionality. Its exact homepage placement remains a visual proposal, not a technical requirement.

## Article rendering and browser enhancement

Static reading HTML, article metadata, source sections, canonical/Open Graph output, and protected isolated previews are already recorded as implemented. Keep native MDX rendering and the existing resource resolvers. Perspective controls, copy actions, inline insertion, discovery, and editorial outline/progress remain pending; adding a stylesheet does not implement those interfaces.

Each enhancement initializes independently and must fail back to useful HTML. Only apply tab semantics/hide inactive panels after successful perspective initialization. The fragment scheme in Article experience remains a proposal; preserve existing IDs, valid direct links, browser history, and the canonical article URL. Framework-specific teaching examples do not require Angular, React, or another site-wide runtime.

Keep highlighting at build time and copy source from the same raw text rendered in the panel. Do not send every example's framework runtime to every article or start duplicate inline/dedicated demos. A failing example or outline script must not remove reading content.

## Editorial layout and heading enhancement — v0.2 impact

**Confirmed presentation direction:** Engineering Editorial × Interactive Learning, one light site, desktop left rail, central reading, conditional right outline for long articles, automatic subtle chapter numbers, and one integrated vertical chapter-position treatment. No horizontal duplicate progress or site dark toggle. [Design system v0.2](design-system.md) owns exact tokens, font proposals, breakpoints, motion, and visual acceptance; [Article experience](article-experience.md) owns reader behavior. The design does not require a new content architecture.

**Proposal implementation responsibilities:**

| Responsibility | Owner / boundary |
|---|---|
| Light palette, code chrome, responsive columns, sticky regions | Existing shared CSS tokens/global/primitives and focused layouts; use CSS Grid, no layout runtime |
| Static chapter model | Normal MDX/render heading data; one ordered model reusing existing IDs, no independent slugger/compiler/catalog |
| Automatic H2 decoration and outline HTML | Article presentation; derive from the same model, no new required frontmatter or author-maintained list |
| Current chapter tracking | One focused optional browser module; bounded observer/position work, no cross-frame integration |
| Perspective coordination | Suspend reading tracking/outline when its body is hidden; restore predictable state without rewriting the fragment API |
| Font replacement | Existing licensed local WOFF2/Fonts API pipeline; no third-party visitor font requests or second loader |

Generate readable outline links and decorative numbers in initial HTML. The proposed eligibility threshold is at least three H2s and five estimated reading minutes, owned jointly by the reading/design specifications and still subject to real-content tuning. Keep short articles and non-article pages free of empty context columns. The same outline belongs after the introduction before the body in DOM order; wide CSS places it in the context track, compact CSS/disclosure keeps it in flow. Do not duplicate focusable desktop/mobile trees or overpaint an outline with a wide example.

The tracking module derives active chapter from the reading body's existing headings using the Design system's 25%-viewport reference line and first/last fallbacks. Passive updates affect only current-location styling; no URL/history mutation, focus movement, live announcements, or percentage widget. Recompute after layout changes and disconnect listeners/observers when no longer applicable. Use coalesced, passive work if position measurement is needed, and avoid full-document scans per scroll event.

Tracking failure keeps anchors and prose useful. A native jump retains the existing target and browser semantics; enhanced focus placement and reduced-motion behavior follow Article experience. Outline/chrome work must not inspect iframe DOM, expand preview permissions, or load all demos. A chapter number is presentation, not a new article field.

Keep dark source surfaces separate from the now-light general surface tokens and preserve the adopted Shiki theme. Preserve current source identity, preview registration, middleware validation, date rules, author records, asset paths, SEO, and canonical origin. Inventory the actual repository before implementing migration; the documentation workspace contains no website implementation to build or benchmark.

## Preview delivery and security — adopted boundary, future extensions separate

The BBF-003/02 and BBF-003/02a sections above define current delivery. Only isolated HTML execution is supported. The registry may describe trusted components, but referenced trusted execution fails clearly until a separate implementation task enables it. Do not reinterpret the older two-kind proposal as permission to run both.

Retain full-document parse5 validation; controlled CSP wrapper; unchanged authored HTML embedded only through escaped `srcdoc`; sandbox protection for direct and embedded access; registered-entry-only HTML emission; supported declared text companions; resource containment; URL/permission conflict rejection; meaningful frame titles; lazy frames; reserved space; and fallback links. No regex rewriting, automatic dependency traversal, arbitrary HTML/SVG companions, binary companion expansion, same-origin permission, module loader, transpiler, or visitor code evaluation is introduced by the redesign.

Default entries remain script-free. Only explicit `allow-scripts` permits the documented classic inline/local script behavior inside an opaque frame. Keep the current CSP restrictions, including denied connections/forms/plugins/base overrides, and supported local styles/fonts and local/data images. The parent site's light styling or new fonts do not justify relaxing this policy. A local dark-theme demonstration is not a site appearance preference.

**Proposal for separately authorized extensions:** if a real example needs additional capabilities, make a specific architecture/security decision and verify both direct and embedded access. Optional resizing/messages must validate message shape, source window, bounds, and meaningful target origins. Do not trust an opaque frame merely because its origin string is `null`. Never accept arbitrary HTML or code from query parameters or source panels.

Host-supported CSP/other headers may add defense in depth when hosting is selected; they do not replace the current static wrapper or make its CSP an unresolved blank slate. Keep reviewed-demo behavior and loading failures local so the article remains readable.

## GitHub and repositories

The website and examples should have real GitHub destinations. Proposed default: one public website repository, with example sources colocated unless an example requires a separate project. Repository topology and license selection remain open.

Expose article-level repository links and more specific example/file links when available. Prefer a commit/tag permalink for the demonstrated version, with an optional default-branch link for current development. Avoid runtime dependence on the GitHub API; builds should consume local reviewed sources or deliberately pinned imports.

Decide code and editorial-content licenses separately. Public visibility alone does not define reuse rights. Never invent a repository URL or ship placeholder GitHub links.

## SEO and syndication baseline — proposal

- English page language, semantic landmarks, a clear primary heading, descriptive URLs, and indexable reading content.
- Unique page title and description; canonical URL derived from one configured production origin.
- Preserve implemented canonical and Open Graph title/description/type/URL output; add actual social images and remaining metadata when implemented.
- Appropriate Article structured data with real authors, dates, and publication identity; no fabricated ratings.
- Sitemap containing public canonical pages and RSS containing native published-collection articles with absolute links; these surfaces remain pending.
- Useful 404 behavior and redirects for changed published slugs.
- Descriptive source links and image alternatives; robots settings appropriate to production and preview environments.

Perspective fragments share the article canonical URL. Search results are discovery UI, not automatically a new family of indexable pages. Hosting must allow draft/preview deployments to be excluded from indexing where applicable; this complements, and never replaces, production draft exclusion.

## Performance baseline — proposal

Keep the initial homepage and reading experience mostly HTML/CSS. Lazy-load preview runtimes, avoid hydrating decorative layers, and fetch only the required search/source resources. Optimize responsive images with dimensions to prevent shifts. Self-host appropriately licensed fonts when practical, load only needed weights, and use a swap strategy. Use cacheable versioned assets.

Proposed user-experience targets are “good” Core Web Vitals: **LCP ≤ 2.5 seconds, INP ≤ 200ms, CLS ≤ 0.1**, assessed at the 75th percentile once sufficient field data exists. These definitions come from [Web Vitals](https://web.dev/articles/vitals). Prelaunch lab checks are useful diagnostics, not proof of achieved field performance.

Proposed initial budget: at most 75KB gzip of site-owned JavaScript on a normal article or homepage before an optional preview loads. Record preview-specific cost separately. Revise this budget only using a measured need. A marketing animation or hidden demo should not consume the reading budget.

Design system v0.2 additionally proposes a 10KB gzip combined shell/outline enhancement budget inside the 75KB total, 150KB initial compressed font transfer, 30KB gzip shared editorial CSS, and a 200KB mobile cover-resource aim. Treat these as proposed measured budgets, not additional per-feature allowances or achieved results. Keep that document as the source for exact scope/exceptions.

Measure representative mobile page loads, font/image/frame shifts, typing/search responsiveness, chapter tracking, and demo activation. Preserve the static initial experience and existing local font fallback infrastructure. No production payload or performance result was measured in this documentation task.

## Accessibility baseline — proposal

Use the design system's proposed WCAG 2.2 AA target. Combine automated checks with keyboard, focus, zoom/reflow, and screen-reader spot checks. Check menus, search feedback, filters, perspective tabs, example/file selectors, copy feedback, and iframes in addition to prose.

Reader journeys must remain coherent when JavaScript fails, a preview fails, or an article lacks optional resources. Use the shared fallback and tab behavior specified in Article experience rather than inventing separate patterns for inline and featured examples.

## Quality checks and delivery — proposal

| Check | Purpose |
|---|---|
| Type and content validation | Invalid metadata, dates, IDs, and references stop the build |
| Static production build | Routes and assets are reproducible |
| Discovery tests | Literal matching, ranking, filters, empty/error states, random eligibility |
| Publication checks | Draft compilation/asset exclusion, future-date rejection, and referenced example emission |
| Article behavior checks | Mixed resources, multiple examples, fragments, Back/Forward, fallback |
| Accessibility review | Automated findings plus real keyboard and reading journeys |
| Visual review | New editorial article reference/shared light identity; mobile, long titles, short articles, wide examples, empty/resource-missing states; homepage composition separately reviewed |
| Heading enhancement | Shared stable IDs/automatic numbering, compact/static fallback, deterministic current chapter, no passive history/focus/live updates |
| Preview security regression | Current wrapper/CSP and sandbox on direct/embedded access, only supported published assets, no permissions widened by styling |
| SEO/link checks | Canonicals, metadata, feed/sitemap validity, working resource links |
| Performance checks | Initial payload, mobile load, layout shifts, demo cost |

Tests should protect meaningful behavior; avoid testing every visual constant or generating brittle snapshots of ordinary prose. Validate new representative content early, especially one article with multiple examples, before expanding homepage polish.

Proposed repository workflow: prepare reviewable content/code changes, run the repository's existing local checks, optionally commit when requested, run remote CI/preview work when configured and authorized, inspect representative pages, and publish a tested build only with deployment authorization. Support HTTPS, the actual domain, cache headers, 404/redirect behavior, and rollback to a previous build. Preview deployments are optional; the hosting provider and branch strategy remain open.

## Boundaries and unresolved choices

| Choice | Current position |
|---|---|
| Static hosting provider and domain setup | Open; production origin configured in BBF-001 |
| Package manager, runtime, dependency versions | Adopted in BBF-001; see foundation decisions above |
| Content/publication configuration | Native collections and directory publication; see BBF-003 decisions above |
| Preview origins and permissions | Preserve adopted opaque sandbox and current representable permissions; extensions require a deliberate decision and regression checks |
| Repository topology, URLs, licenses | Open; proposed one website repository first |
| Search library | Start with simple local metadata matching |
| Analytics / newsletter | Outside proposed v1 baseline unless separately selected |
| Trusted-component execution | Deferred; needs a separate implementation decision, not enabled by the visual migration |
| Site dark theme / Playground / AI services | Later; no toggle, editor, execution engine, or API integration implied |
| Editorial migration and heading module | Proposal implementation pending; selected direction confirmed, exact visual defaults owned by Design system v0.2 |

The architecture should allow additional example capabilities later through stable references and clearly defined boundaries. It should not implement those capabilities before the publication can reliably ship articles.


## Revision record

- **0.2 · 19 October 2026:** aligned delivery responsibilities with the light editorial direction and pending heading enhancement; retained the supplied foundation/content/rendering/security records, corrected obsolete proposal/deferred statements, and preserved dependency/runtime and publication boundaries. This is a documentation alignment, not a package upgrade, implementation verification, CI run, or deployment.
