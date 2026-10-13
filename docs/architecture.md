# Build Better Frontend — Architecture

Version: 0.1 · Documentation baseline · 12 October 2026

## Status and ownership

**Confirmed:** Astro + strict TypeScript + official MDX integration; static output and canonical origin selected in BBF-001; existing-content discovery without an AI backend; Article / Code / Preview with multiple examples; GitHub repositories; accessibility, SEO, and performance; Playground later.

**Proposal:** content collections, CSS custom properties, Shiki, build-generated search, example registration, CI, hosting workflow, quality targets, and the expanded project structure. These complete the earlier architectural suggestions. A full architecture document was not available in the retrieved prior draft.

**Open:** deployment host, domain setup, repository URLs and topology, licenses, and preview-specific permissions. Foundation dependency versions and npm were selected during BBF-001 implementation.

This document owns implementation boundaries. [Product](product.md) owns release scope and the proposed route map; [Design system](design-system.md) owns tokens and presentation; [Article experience](article-experience.md) owns metadata and resource contracts. All route and schema references below inherit their proposal status. No implementation prompts are included.

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

## Proposed architecture

Build a static publication with server-generated article HTML and small, focused client interactions. Keep content, example source, and configuration in version control. A database, application server, authentication service, AI service, and custom CMS are unnecessary for the proposed v1 scope.

```text
Reviewed MDX + author data + example sources
                   |
         Build-time validation
                   |
       Eligible published content set
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

### Stack proposal

| Concern | Proposed choice | Boundary |
|---|---|---|
| Site framework | Astro | Confirmed technology; static output confirmed in BBF-001 |
| Language | TypeScript, strict configuration | Confirmed language; strictness confirmed in BBF-001 |
| Articles | MDX through Astro's MDX integration | Confirmed content format |
| Content validation | Build-time Astro content collections and schemas | Proposal |
| Styling | Scoped CSS and shared custom properties | Proposal; no required utility framework |
| Highlighting | Astro's Shiki-based build-time highlighting | Proposal; no client highlighter by default |
| Site interactivity | Small TypeScript modules / Astro scripts | Proposal; no site-wide UI framework required |
| Complex examples | Isolated builds or selectively hydrated components | Per-example proposal |
| Hosting | Static host supporting domain, HTTPS, and cache controls | Provider open |
| CI | GitHub Actions or an equivalent host-integrated workflow | Proposal |

Astro provides build-time collections for structured local content, with schema validation and typed access; BBF proposes using those facilities rather than implementing its own content engine. See [Astro content collections](https://docs.astro.build/en/guides/content-collections/). MDX uses the official [Astro MDX integration](https://docs.astro.build/en/guides/integrations-guide/mdx/). Astro documents its highlighting support in [Syntax highlighting](https://docs.astro.build/en/guides/syntax-highlighting/).

Select compatible stable versions during implementation and record them in the package manifest and lockfile. This specification does not prescribe a guessed latest version or executable configuration. Use the selected version's documented content-loader APIs; do not blindly copy older content-collection examples.

## Proposed project structure

```text
buildbetterfrontend/
├── docs/
│   ├── product.md
│   ├── design-system.md
│   ├── article-experience.md
│   ├── architecture.md
│   └── reference_image.png
├── src/
│   ├── content.config.ts
│   ├── content/
│   │   ├── articles/*.mdx
│   │   └── authors/*.json
│   ├── examples/
│   │   ├── registry.ts
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

Directory names are proposals. The tree describes the later website repository, not files created during this documentation task. Keep ordinary article content distinct from reusable components. Do not turn a small publication into a general plugin platform.

### Responsibilities

- **Content layer:** validate metadata/references and derive a consistent public article set.
- **Layouts:** site chrome, article reading structure, SEO metadata, and responsive composition.
- **Example registry:** resolve reviewed sources and demos by stable IDs.
- **Discovery module:** search/filter/rank only the generated public metadata index.
- **Browser enhancement modules:** enhance controls without taking ownership of article rendering.

Use shared components for repeated structures such as article cards, metadata, example selection, and source panels. Choose abstractions after repeated use; do not prebuild a design-system package or microfrontend architecture.

## Content and publication pipeline — proposal

Validate article, author, and example contracts from Article experience during the build. Resolve local image/source references and derive slugs, reading time, and resource availability once. Feed every public surface from the same eligible article set.

Proposed eligibility rule: `draft === false` and `publishedAt` is on or before the build's editorial date in **Europe/Brussels**. Compare calendar dates consistently rather than converting date-only strings into display timestamps. Future-dated articles remain excluded until a build on or after their publication date. A static site does not publish them automatically at midnight; scheduled rebuilds would require a later deliberate workflow choice.

Exclude ineligible articles from HTML routes, homepage cards, archives, search, related content, author contributions, RSS, and sitemap. Do not rely on `noindex` to protect a generated draft page. Draft examples should not be emitted as publicly reachable assets unless shared with an eligible article; prune unused registry entries and resources from production artifacts.

Local editorial preview may include drafts behind a deliberate development setting. Production eligibility does not inherit that setting. Failed validation stops publication rather than partially publishing stale metadata.

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

No requests go to an LLM or search backend. Keep status text, focus behavior, and result links accessible. Render metadata as text rather than injecting it as HTML. URL query-state persistence is an optional proposal, not needed for the initial hero interaction.

## Article rendering and browser enhancement

Build the MDX body, metadata, headings, and source sections into static HTML. Resolve example references through the registry. The proposed fragment scheme maps Code / Preview links to initial HTML targets and lets client controls select views without creating competing canonical pages.

Initialize each enhancement independently. Failure in the Explorer or one demo must not blank the article. Prefer native links, buttons, checkboxes, and selectors. Hydrate a UI-framework component only where a particular example warrants it; framework-specific article content does not make Angular or React a mandatory site runtime.

Keep highlighting at build time. Copy controls read the same raw source rendered in the panel. Avoid sending every example's framework runtime to every article. Shared inline/dedicated views must not start duplicate active demos.

## Preview delivery and security — proposal

Use two registered kinds defined in Article experience:

| Kind | Suitable use | Required review |
|---|---|---|
| Trusted component | Small first-party example needing parent integration | Scoped styles, lifecycle cleanup, bounded effects |
| Isolated page | Examples with broader CSS, scripts, or dependencies | Sandbox, origin, network, messaging, navigation, loading |

For isolated pages, start with a sandbox that denies capabilities and add only those required by the reviewed example. Prefer no same-origin permission for simple executable demos; author the demo to work within those limits. If a demo genuinely requires origin-dependent APIs, decide its origin and permissions explicitly. Same-origin script access can undermine sandbox isolation, as documented in [MDN's iframe reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe).

Cross-frame resizing or controls are optional. If used, validate message shape, frame identity, and bounds; pin target origins when meaningful. An opaque sandbox origin needs deliberate source-window validation rather than trusting messages because they report `null` origin. Never accept arbitrary code or HTML payloads from a query parameter or visitor input.

Give frames descriptive titles, bounded dimensions, local loading states, and working fallbacks. Use `loading` behavior or explicit activation to defer expensive frames. Stop observers, timers, and listeners when demos are hidden or removed. Avoid embedding sensitive tokens or private repository content in assets.

Review a host-supported Content Security Policy and related headers based on actual demo needs. Exact directives remain open until sources, origins, and runtime behavior are known. V1 is not a generic execution platform, and an iframe is not a guarantee against every possible effect.

## GitHub and repositories

The website and examples should have real GitHub destinations. Proposed default: one public website repository, with example sources colocated unless an example requires a separate project. Repository topology and license selection remain open.

Expose article-level repository links and more specific example/file links when available. Prefer a commit/tag permalink for the demonstrated version, with an optional default-branch link for current development. Avoid runtime dependence on the GitHub API; builds should consume local reviewed sources or deliberately pinned imports.

Decide code and editorial-content licenses separately. Public visibility alone does not define reuse rights. Never invent a repository URL or ship placeholder GitHub links.

## SEO and syndication baseline — proposal

- English page language, semantic landmarks, a clear primary heading, descriptive URLs, and indexable reading content.
- Unique page title and description; canonical URL derived from one configured production origin.
- Open Graph and social-card metadata with actual images and accurate article information.
- Appropriate Article structured data with real authors, dates, and publication identity; no fabricated ratings.
- Sitemap containing public canonical pages and RSS containing eligible published articles with absolute links.
- Useful 404 behavior and redirects for changed published slugs.
- Descriptive source links and image alternatives; robots settings appropriate to production and preview environments.

Perspective fragments share the article canonical URL. Search results are discovery UI, not automatically a new family of indexable pages. Hosting must allow draft/preview deployments to be excluded from indexing where applicable; this complements, and never replaces, production draft exclusion.

## Performance baseline — proposal

Keep the initial homepage and reading experience mostly HTML/CSS. Lazy-load preview runtimes, avoid hydrating decorative layers, and fetch only the required search/source resources. Optimize responsive images with dimensions to prevent shifts. Self-host appropriately licensed fonts when practical, load only needed weights, and use a swap strategy. Use cacheable versioned assets.

Proposed user-experience targets are “good” Core Web Vitals: **LCP ≤ 2.5 seconds, INP ≤ 200ms, CLS ≤ 0.1**, assessed at the 75th percentile once sufficient field data exists. These definitions come from [Web Vitals](https://web.dev/articles/vitals). Prelaunch lab checks are useful diagnostics, not proof of achieved field performance.

Proposed initial budget: at most 75KB gzip of site-owned JavaScript on a normal article or homepage before an optional preview loads. Record preview-specific cost separately. Revise this budget only using a measured need. A marketing animation or hidden demo should not consume the reading budget.

Measure representative mobile page loads, font/image shifts, typing/search responsiveness, and demo activation. Establish budgets during implementation; no performance score has been measured for these documentation files.

## Accessibility baseline — proposal

Use the design system's proposed WCAG 2.2 AA target. Combine automated checks with keyboard, focus, zoom/reflow, and screen-reader spot checks. Check menus, search feedback, filters, perspective tabs, example/file selectors, copy feedback, and iframes in addition to prose.

Reader journeys must remain coherent when JavaScript fails, a preview fails, or an article lacks optional resources. Use the shared fallback and tab behavior specified in Article experience rather than inventing separate patterns for inline and featured examples.

## Quality checks and delivery — proposal

| Check | Purpose |
|---|---|
| Type and content validation | Invalid metadata, dates, IDs, and references stop the build |
| Static production build | Routes and assets are reproducible |
| Discovery tests | Literal matching, ranking, filters, empty/error states, random eligibility |
| Publication checks | Draft/future exclusions across all outputs and unused assets |
| Article behavior checks | Mixed resources, multiple examples, fragments, Back/Forward, fallback |
| Accessibility review | Automated findings plus real keyboard and reading journeys |
| Visual review | Reference comparison, mobile, long titles, empty/resource-missing states |
| SEO/link checks | Canonicals, metadata, feed/sitemap validity, working resource links |
| Performance checks | Initial payload, mobile load, layout shifts, demo cost |

Tests should protect meaningful behavior; avoid testing every visual constant or generating brittle snapshots of ordinary prose. Validate new representative content early, especially one article with multiple examples, before expanding homepage polish.

Proposed repository workflow: commit content and code, run checks in CI, build a preview artifact, inspect representative pages, and publish a tested build to the selected static host. Support HTTPS, the actual domain, cache headers, 404/redirect behavior, and rollback to a previous build. Preview deployments are optional; the hosting provider and branch strategy remain open.

## Boundaries and unresolved choices

| Choice | Current position |
|---|---|
| Static hosting provider and domain setup | Open; production origin configured in BBF-001 |
| Package manager, runtime, dependency versions | Adopted in BBF-001; see foundation decisions above |
| Exact schema and content-loader configuration | Proposal; use selected Astro version's APIs |
| Preview origins and permissions | Decide per registered example |
| Repository topology, URLs, licenses | Open; proposed one website repository first |
| Search library | Start with simple local metadata matching |
| Analytics / newsletter | Outside proposed v1 baseline unless separately selected |
| Playground / AI services | Later; no premature editor, execution engine, or API integration |

The architecture should allow additional example capabilities later through stable references and clearly defined boundaries. It should not implement those capabilities before the publication can reliably ship articles.

