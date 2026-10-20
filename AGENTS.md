# Build Better Frontend

Repository instructions · **v0.2** · **19 October 2026**

Place this file at the root of the BBF website repository, alongside `docs/`. All paths below are relative to that repository root.

BBF is an independent, English-language frontend engineering publication. Its learning model is **See it. Build it. Understand it.** Build a maintainable publication that makes practical articles, real source code, and working examples easy to read and publish.

## Read the relevant specifications

Before making changes, read `docs/product.md` for scope and the documents relevant to the task:

| Task | Specification |
|---|---|
| Visuals, layout, styling, responsive behavior | `docs/design-system.md` |
| Articles, metadata, examples, perspective controls | `docs/article-experience.md` |
| Content loading, search, previews, SEO, delivery | `docs/architecture.md` |

For visual work, inspect `docs/reference/bbf-editorial-article-mockup.png` alongside `docs/design-system.md` v0.2. The older navy homepage image and v0.1 snapshots under `docs/reference/` are historical references, not active visual instructions. The article reference is not a complete homepage or responsive specification.

Preserve the documents' distinction between **Confirmed**, **Proposal**, **Open**, and **Later**. Creating this file does not approve every proposal. Use applicable proposals as provisional defaults for reversible choices within the requested task, and report material choices. Record an adopted implementation choice in the relevant specification without claiming prior user approval. Ask for clarification only when a material conflict or unresolved choice prevents correct progress; continue independent work.

The current user request defines the task. Confirmed decisions take precedence over proposals. Product owns scope, Design owns presentation, Article experience owns the content contract, and Architecture owns delivery. The mock-up is a visual reference, not permission to add every pictured feature. Keep documentation consistent when authorized decisions change. Current v0.2 documents supersede conflicting older direction/proposal passages. Preserve documented adopted BBF-001–BBF-003/02a contracts and distinguish recorded implementation from independently verified outcomes. Do not infer owner acceptance from an existing implementation or a documentation version bump.

## Keep work scoped

- Use Astro + TypeScript + MDX. Keep website copy and repository documentation in English.
- Implement the requested task and the work needed to complete it. A documentation task authorizes documentation work.
- Keep Frontend Explorer focused on existing published articles, with no AI backend or generated answers.
- Support Article / Code / Preview and multiple examples. Playground remains outside v1.
- Do not add accounts, comments, a CMS, subscriptions, analytics infrastructure, or other proposed later features unless the task includes them.
- Omit Subscribe and Open in playground until separately selected and functional. Do not invent articles, author information, repository URLs, or social destinations from the mock-up.

## Component size and composition

Prefer small, focused HTML/Astro components. Split substantial templates into components with clear responsibilities to improve readability and maintainability. Do not wait for duplication before extracting a meaningful section from an oversized page.

- Pages and layouts compose the experience; child components own specific sections or UI units.
- Prefer a `BlogPage` that uses an `ArticleList`, which uses an `ArticleCard`, over a blog component containing hundreds of lines of list markup, card styling, and unrelated interactions.
- Keep reusable units such as article metadata, badges, example selectors, and source panels in shared components when their behavior and presentation repeat.
- Give components explicit, typed props. Pass content as data instead of repeating markup or coupling every child to page-level state.
- Keep each component's template, styling, and interaction responsibilities coherent. Extract an independent section, repeated unit, or substantial behavior when it makes the parent easier to understand.
- Avoid sprawling templates, deeply nested markup, and large conditional blocks spanning unrelated features. A component approaching 500 lines deserves review for responsibility-based splits.
- Do not enforce an arbitrary line-count limit or extract every wrapper into a component. A useful responsibility or reuse opportunity should justify the boundary.

Prefer composition to configurable components with many boolean switches. Keep shared components simple; avoid building a generic framework for hypothetical reuse.

## Implementation defaults

- Follow established repository conventions and adopted architecture contracts. Use remaining proposals as reversible defaults within the requested task. Preserve static content delivery and use focused browser enhancements only where needed.
- Use strict, explicit TypeScript at content and interaction boundaries. Validate authored data and references at build time.
- Use shared design tokens and scoped styles; avoid scattering unexplained colors and spacing across components.
- Keep dependencies minimal. Add one only when it solves a concrete need within scope, and explain the choice. Preserve the repository's package manager and lockfile.
- Check official documentation for the installed framework version when an API is uncertain. Do not guess version-specific configuration.
- Keep changes focused and preserve unrelated user work. Follow the requested Git workflow and leave a reviewable result.

## Content and examples

- Adding an ordinary article must not require changes to shared routing or layouts.
- Resolve inline examples, Code, Preview, and featured experiences from the same example references. Keep one authoritative source for each implementation.
- Derive resource availability from actual files and previews; omit unavailable perspectives. An article without examples still has a complete reading experience.
- Keep Article readable in initial HTML. Provide useful source sections and ordinary links when JavaScript is unavailable or enhancement fails.
- Preserve directory publication: only publishable MDX lives in `src/content/articles/`; `src/drafts/` stays outside production loading/imports/compilation and type checks. No `draft` flag or scheduling. Future publication dates fail the production build against Europe/Brussels. All public surfaces use the native published collection, without a second catalog/filtering pipeline.
- Preserve strict metadata/native-reference validation, ID and uniqueness checks, source/image containment including symlinks, original UTF-8 source text, and the prerender validation middleware. Keep quoted ISO dates and source/example ordering. Validate draft candidates in a disposable local project as the repository README describes; do not mutate production content merely to validate drafts.
- Keep `resolveExample()` and `getPerspectives()` as the recorded source of validated resources/availability. Source entries retain their existing fields; preview `{ entry }` references resolve through the sole `src/examples/previews.ts` registry. Add no author-maintained resource, chapter, or progress flags.
- Run reviewed authored demos only. Current execution is isolated HTML; trusted Astro execution remains deferred and fails clearly when referenced. Preserve the BBF-003/02a parse5 validation, controlled CSP wrapper, unchanged authored document in escaped `srcdoc`, and direct/embedded sandbox protection. Only the current explicit `allow-scripts` classic-script capability is representable; no same-origin access or module loader is implied.
- Keep registered-entry-only HTML emission and supported declared text companions (`.css`, `.js`, `.mjs`, `.json`, `.txt`) limited to examples referenced by published articles. Preserve containment and shared-URL permission/target checks; reject arbitrary HTML/SVG companions. Do not weaken CSP, add dependency traversal, or expand preview capabilities for a visual change. Avoid duplicate running instances and clean up timers/listeners/observers.
- Keep explanatory screenshots distinct from working previews. Link to real GitHub resources without requiring runtime GitHub API access for reading.

## Design and accessibility

Follow **Engineering Editorial × Interactive Learning** across the whole site: warm off-white, near-black type, functional electric blue, restrained illustrative orange, fine rules, and intentional editorial hierarchy. Use the responsive left navigation rail, central reading column, and conditional right outline for long articles. Compact layouts have no permanent sidebars; short articles reserve no empty outline column. Dark source panels remain local technical surfaces.

No horizontal duplicate reading progress, percentage tracker, site dark toggle, or automatic site dark theme in v1. Generate subtle H2 chapter numbers and outline links from one heading model using existing stable IDs; no author-maintained numbering or second slugger. Use one integrated vertical chapter-position treatment. Passive tracking changes no URL/history/focus and makes no live announcements. Static anchors and the reading body remain useful without JavaScript; suspend reading context when enhanced Code/Preview hides Article.

Consult Design system v0.2 for exact tokens, typography, thresholds, layout variants, and acceptance checks. Fira Code remains; Space Grotesk is a proposed sans replacement pending reading/font-budget review, while Plus Jakarta Sans is the existing implementation/fallback migration option. Do not load both sans families for decoration or treat a proposal as approved. Preserve local font delivery, licensing, metric fallbacks, and the adopted `github-dark-default` source theme.

Homepage composition needs a separate review. Preserve Frontend Explorer and random discovery, but do not enforce the superseded split hero, gradient word, technology layers, or right-hand Explorer placement. The new article image is the identity reference, not approval of every pictured control or a mandate to recreate its illustration.

Keep reading pages quieter than the hero. Check mobile layout, long content, and missing optional resources. Use semantic HTML, accessible names, visible focus, appropriate contrast, keyboard-operable controls, and reduced-motion support. Apply enhanced tab semantics only when the controls actually behave as tabs. The detailed accessibility target remains identified in the design specification.

Every visible action must work or be clearly unavailable with a useful explanation. Decorative elements must not intercept input or carry essential meaning.

## Verification and handoff

Inspect the package manifest, lockfile, and CI configuration to find actual check commands. Run relevant type/content checks, tests, and production build for code changes. Do not invent commands or claim checks passed when they were not run. During bootstrap, establish and document suitable scripts; for documentation-only work, check consistency and referenced paths.

Add tests for meaningful behavior such as search/filter eligibility, publication exclusion, reference validation, mixed example resources, and navigation state. Avoid tests that merely repeat constants or low-impact markup.

For visible UI changes, inspect rendered pages at mobile and desktop widths, check keyboard operation, and compare screenshots with the reference where applicable. A successful build does not establish visual or accessibility quality. If a browser or check is unavailable, state the limitation clearly.

For affected pages, verify metadata and source links, inspect initial payload and layout shifts, and defer optional demo runtimes. Use the architecture/design system's proposed performance budgets when applicable; keep shell/outline cost inside the initial site-JS total, lazy-load optional previews, and distinguish measured results from targets. Check the Design system's acceptance criteria for the editorial migration, including compact/no-JavaScript outlines, short content, long source, zoom/reflow, forced colors, and reduced motion.

Before finishing, inspect the diff for unrelated changes and unfinished controls. Report what changed, the checks and their results, material assumptions, and remaining limitations. Complete reviewable work before requesting any authorization needed for production publishing or domain changes. Do not publish merely because local checks passed.

## Prompt history

Implementation prompts are maintained in `prompts/`.

Treat these files as historical records.

- Do not modify previously submitted prompts.
- Do not fabricate implementation outcomes or lessons learned.
- Only add follow-up prompts when explicitly requested.
- Keep task documentation consistent with verified outcomes.
- Do not automatically create commits unless requested.

## Development task documentation

Implementation tasks are documented under `prompts/`.

Before starting a numbered BBF task, read
`prompts/README.md` and follow its task documentation
template and rules.

Codex is responsible for maintaining the corresponding
`prompts/BBF-XXX/README.md` throughout implementation.

Document actual implementation outcomes, verification
results, and material decisions.

Leave human review pending until the repository owner
explicitly confirms acceptance.

Do not modify previously submitted prompts or fabricate
reviews, results, commit references, or lessons learned.

Keep documentation proportional to the task.
