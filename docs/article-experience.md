# Build Better Frontend — Article Experience and Content Model

Version: **0.2** · Editorial reading alignment · **19 October 2026**

## Status and ownership

**Confirmed:** Article / Code / Preview perspectives, multiple examples, MDX, source consistency, accessibility, and GitHub access. The selected light editorial direction adds automatic chapter numbering, contextual heading navigation, and one vertical chapter-progress treatment; no horizontal duplicate indicator or site dark toggle in v1.

**Adopted implementation:** BBF-003 content/schema/directory rules, BBF-003/02 static reading and source rendering, and BBF-003/02a protected isolated HTML previews, as recorded below. These are documented implementation facts, not a fresh repository audit or owner acceptance of every visual choice.

**Proposal:** pending perspective/copy/inline UI, fragment convention, chapter eligibility/tracking details, and responsive presentation defaults. Field contracts already recorded as adopted must not be reopened merely because an older heading called them proposals.

**Open:** final fragment convention, source-range extraction, repository topology, visual tuning, and future preview capability changes. Isolated HTML delivery is already selected; trusted Astro execution remains deferred. **Later:** editable Playground and the other capabilities listed at the end.

Read [Product](product.md) for scope, [Design system v0.2](design-system.md) for visual tokens and precise layout/outline rules, and [Architecture](architecture.md) for delivery and isolation. Confirmed decisions override proposals. Current v0.2 documents govern; archived v0.1 sources remain historical references. This revision adds no required author fields and does not mark pending interfaces implemented.

## Core learning model

**See it. Build it. Understand it.** — confirmed tagline in BBF-002.

The publication tagline does not change the Article / Code / Preview
perspective labels or their order below.

| Perspective | Purpose | Availability |
|---|---|---|
| Article | Read the complete explanation | Every published article |
| Code | Inspect the implementation | At least one example has source files |
| Preview | Observe a working result | At least one example has a preview |
| Playground | Edit code and receive feedback | Later; never a v1 requirement |

Article is the primary unit. Examples are individually identified resources referenced by an article. A tip, deep dive, or Codex article may have zero, one, or several examples. Category does not dictate resource availability.

An article must make sense without changing perspectives. Code snippets, diagrams, screenshots, and explanatory text can appear in Article even if a separate Code or Preview perspective is unavailable. A screenshot is an illustration, not a working Preview.

## Reader experience — retained model and proposed pending UI

### Article perspective

Render the title, description, category, authors, publication date, meaningful update date, estimated reading time, and complete MDX body as accessible HTML. Include introductory context, prerequisites where needed, clear headings, explanations, examples, references, and a conclusion when appropriate.

Default to Article when opening the canonical URL without a resource fragment. Keep the explanatory body in the initial document rather than requiring client-side rendering. Provide ordinary links to examples and repositories.

For long articles, a table of contents should use heading anchors. A short tip should not receive an empty or unnecessary table of contents. Code within prose can be an intentional excerpt; name omissions and link to full source rather than presenting a conflicting implementation.

### Code perspective

Show available examples in the author's declared order, followed by the selected example's source files. Each file has a human-readable filename, language, highlighted source, and copy control. Single-file examples need no elaborate file browser.

Copy the original source, not rendered HTML or line numbers. Provide accessible success/failure feedback; selectable code remains useful when clipboard permission or JavaScript is unavailable. GitHub links are optional per example and article and point to actual resources.

Code explains the implementation through concise file/example descriptions. It does not replicate the entire article. Keep formatting and syntax highlighting server-generated where practical.

### Preview perspective

Show a real working demonstration with an example title, description, and accessible frame or region label. Preview may include interactions inherent to the example, such as responsive-width controls or a theme switch being demonstrated. It provides no general-purpose editor.

Load heavyweight examples on demand. Distinguish loading, loaded, failed, and unavailable states. Offer a retry or real standalone demonstration link where appropriate, alongside explanatory text and source access. A static screenshot can be a clearly labeled fallback illustration, but it must not masquerade as the working Preview.

Pause hidden demos and avoid running duplicate instances in inline and dedicated views. Examples must not autoplay audio, steal focus, or trap keyboard users. Demo-specific instructions should describe how to interact without relying only on mouse gestures.

### Availability and selection

- Omit unavailable perspectives instead of displaying empty or misleading tabs.
- Keep Article available even when an example fails at runtime.
- Code lists only examples with nonempty source files; Preview lists only examples with valid preview references.
- Preserve the selected example between Code and Preview if it supports both. Otherwise select the first eligible example and make the change visible.
- Preserve file selection for an example during a visit when practical.
- On an invalid or removed fragment, show the article and a clear resource-unavailable explanation rather than a broken panel.
- An article with no examples presents a normal reading experience with no redundant tab strip.

### Multiple examples and inline usage

The author's example order is the reader's navigation order. Example selectors display descriptive titles such as “Fluid heading” and “Fluid body text,” not unexplained IDs. A compact list or native select is sufficient in v1.

Within Article, an example may expose Code and Preview at the exact point where it is discussed. These inline views resolve the same example ID and source references as the article-level perspectives. They do not introduce another independent Article view.

```text
Article
├── Metadata and introductory context
├── Explanation
├── Example: fluid-heading
│   ├── Source files
│   └── Working preview
├── Further explanation
├── Example: fluid-body
│   ├── Source files
│   └── Working preview
└── Conclusion and references
```

## Editorial reading experience

### Confirmed presentation direction

The entire site uses the same light editorial identity. Articles have a central reading column, a left navigation rail on desktop, and a right contextual outline for eligible long articles when space permits. Compact layouts remove permanent sidebars. Dark source panels remain local technical surfaces. The sole dedicated progress treatment is vertical chapter orientation integrated into the outline; no top progress bar, percentage widget, or v1 site dark-mode control.

Maintain three distinct navigation scopes:

| Scope | Controls | Purpose |
|---|---|---|
| Whole article | Article / Code / Preview | Change learning perspective; retain existing labels and order |
| Reading body | Heading anchors and contextual outline | Navigate explanation chapters |
| Specific example | Example/file selector or authored local steps | Inspect resources or interact with one demonstration |

The reference's Identify / Isolate / Refactor / Prevent sequence belongs only to the last scope. It does not replace perspectives or require every article to have a step sequence. Avoid three competing tab strips.

### Introduction, figures, and reading rhythm — Proposal

Present archive/back navigation, real category/topic and dates, H1, summary, author/reading-time information, optional cover, and eligible perspective controls. One semantic H1 remains the article title. A summary is not a quotation. Covers are optional; no missing-image placeholder or mandatory decorative hero is introduced. Use existing image metadata and alternatives, reserve dimensions, and apply the Design system's image-loading and font rules.

Callouts and chapter separators support the explanation without creating new content types or schema requirements. Prefer meaningful engineering diagrams or examples. A complex figure needs an adjacent explanation; decorative collage fragments have empty alternatives. Ordinary MDX stays readable without bespoke layout code.

### Shared heading model and automatic chapters — Proposal implementation

Derive one ordered heading model from the normal article render/MDX heading data. Reuse the existing stable heading IDs; do not run a second independent slugger or change published anchors. Both outline links and decorative chapter markers consume that model.

Number body H2 chapters automatically as `01`, `02`, …, including 10+ chapters. Optional H3 outline entries remain unnumbered. Ignore navigation labels, source filenames, generated source-section headings, and iframe content. Decorative heading numbers are hidden from assistive technology so headings are not read twice. At narrow widths, numbers stay in the content flow rather than outside the viewport.

**Eligibility proposal:** at least three body H2s and an existing estimated reading time of at least five minutes. The threshold remains Open to real-content review; it is not an extra frontmatter rule. Ineligible short articles receive no empty outline column. Long articles with unusual heading structure still work without automatic outline UI.

### Outline and vertical chapter position — Proposal implementation

Render a labeled native heading-link list in initial HTML. At the Design system's wide-context breakpoint it occupies the right column; below that breakpoint the same outline becomes an in-flow native disclosure after the introduction/available perspective controls and before the body. Left rail and context-column breakpoints, widths, and gutters are owned by [Design system v0.2](design-system.md), rather than duplicated as a separate layout contract here.

Use exactly one active chapter link with `aria-current="location"` after successful tracking initialization. A filled node, stronger label, and vertical track through the current chapter show position without relying solely on color. This represents chapter position, not exact percentage read or comprehension. Do not expose a redundant progressbar widget or add a second mobile indicator.

Use the Design system's deterministic active-chapter rule: the last H2 to pass a reference line 25% down the viewport, first-chapter fallback before that point, and last-chapter selection at the reading body's bottom. Recompute after relevant layout changes. The tracked range is the reading body, excluding footer/source appendices. Passive tracking never changes the fragment, history, focus, or a live announcement.

Native heading links preserve direct links and Back/Forward. If the jump is enhanced, focus the target heading after navigation without a second scroll; retain useful native fallback behavior and reduced-motion support. Without JavaScript or when tracking fails, keep the heading list/anchors useful, the progress track neutral, and current-position claims absent. A collapsed compact summary may show quiet chapter-position text only when the enhancement is active.

When an enhanced Code/Preview perspective hides Article, suspend/hide its reading outline. Restore predictable reading state on return. Keep this coordinated through article UI state, not cross-frame messages or a rewritten URL API. Wide panels must not overlap a sticky outline; use the Design system's in-flow-outline variant when a genuinely wide example needs both tracks.

### Authoring contract — unchanged

No author-maintained chapter numbers, outline list, progress percentages, `hasCode`/`hasPreview` flags, layout selectors, or mandatory cover are added. Retain published MDX metadata, native example references, original source, and reviewed preview registration as the existing authoring model. Chapter navigation and progress are derived presentation. Frontend Tips, Deep Dives, and Building with Codex remain the only editorial categories; an architecture label may be a topic.

## Proposed progressive enhancement and links

The baseline document contains the reading body, source sections, and descriptive links to demos. Without JavaScript, visitors can read, navigate examples, inspect code, and follow source/demonstration links. Scripted demo behavior itself may require JavaScript; the explanation never does.

With JavaScript, this structure may become a tabbed perspective interface and inline example panels. Apply enhanced tab semantics and hide inactive panels only after successful initialization. An enhancement failure must leave the baseline content usable.

Proposed shareable fragment convention on the canonical article URL:

| Fragment | Intended target |
|---|---|
| `#article` | Reading view |
| `#example-fluid-heading` | Inline example in Article |
| `#code-fluid-heading` | That example's source section / enhanced Code view |
| `#preview-fluid-heading` | That example's demo link/section / enhanced Preview view |

Render targets for these fragments in the initial HTML. Enhanced navigation updates the fragment and respects Back/Forward. Initialize the appropriate perspective from a valid fragment. Normal section-heading fragments continue to work. Keep one canonical article URL; fragments do not create competing indexable pages.

This convention is a proposal, not a locked URL API. If a different approach is selected, preserve stable links, the unenhanced fallback, and consistent browser history.

### Keyboard and assistive technology

For tabs, use associated tab/panel IDs, accurate selection state, and roving focus. Arrow keys move among tabs, Home/End move to the first/last tab, and Enter/Space activates when manual activation is used. Proposed default: manual activation for preview tabs because activation may load a demo. Keep focus in a predictable position rather than moving it automatically into the iframe. Follow the [WAI-ARIA tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

Use native selectors and buttons for example/file controls where possible. Each preview has a meaningful title. Loading and copy feedback should be concise status messages. Give users a clear way to navigate past an embedded demonstration. The proposed compliance target is described in [Design system](design-system.md).

## Article metadata contract — adopted baseline

### BBF-003 adopted content contract

**Confirmed publication decision:** only publishable MDX belongs in
`src/content/articles/`; unpublished work belongs in `src/drafts/`, outside
production loading/compilation. This supersedes the original draft-flag and
future-date filtering strategy. Production does not validate drafts. Validate a
candidate with normal Astro tooling in a disposable local copy before moving it
into the actual published collection; see the repository README.

- Articles are flat kebab-case `.mdx` files. Filenames determine IDs; no second
  slug is accepted. Authors are flat JSON in `src/content/authors/`, with `id`
  matching the filename. Contributor names/bios must be real. Category keys stay
  `tips`, `deep-dives`, and `codex`, with labels in `src/lib/content/categories.ts`.
- Native Astro `glob()` collections load articles, authors, and example metadata.
  Shared strict Zod schemas reject unknown fields and invalid dates. Native
  `reference()` fields connect authors/examples while authors still write plain
  ID arrays. Duplicate author IDs, example IDs, and tags fail. `featured` defaults
  to false; omitted examples/source files default to empty arrays. No `draft`
  property is accepted. Future `publishedAt` dates fail the production build;
  updated dates cannot precede publication.
- YAML dates must be quoted ISO strings, e.g. `publishedAt: "2026-10-12"`.
  Astro's YAML parser converts unquoted dates to `Date` and can normalize invalid
  days; strings preserve strict calendar validation. Covers require an explicit
  alternative (empty only when decorative). HTTPS links cannot use credentials.
- Examples live at `src/examples/<id>/example.json` with matching IDs. Ordered
  source entries contain `id`, `label`, `language`, and `path`, relative to the
  example's `source/` directory. Build-time checks read UTF-8 text and preserve
  source order. Both declared paths and resolved symlink targets must have an
  approved extension matching the language and stay within the approved directory.
- Example previews use `{ entry }` and `accessibleLabel`. The sole kind/path/
  permission definition is `src/examples/previews.ts`, an explicit registry of
  `{ id, kind, path, sandbox }`. Trusted components use `.astro`; isolated pages
  use `.html`; paths are relative to `src/examples/`. Permissions default to none,
  with only `allow-scripts` currently representable. No screenshot, repository
  URL, or missing registration/file supplies Preview availability.
- Covers/avatars reference `src/content/images/`, outside `public/`. The
  production boundary checks existence/type/containment; emission/optimization
  belongs to rendering. Preview files are checked without executing/importing
  them. The same HTML can supply source and preview, avoiding duplicate code.
- `validatePublishedContent()` runs from project-wide prerender middleware during
  static generation, independently of the homepage, once per production build.
  It explicitly fails missing references (Astro 7.3.8 only logs these during
  sync), future dates, identity mismatches, and invalid local resources, including
  on repeated builds. Native schemas own metadata validation; no duplicate
  catalog, author loading, compiler, or custom content cache exists.
- `resolveExample()` reads original sources and resolves reviewed preview entries;
  `getPerspectives()` derives Article / Code / Preview from those real resources.
  Readers query native entries with `getCollection()`/`getEntries()`;
  native reference arrays preserve editorial order. There are no maintained
  resource flags or custom public catalog to keep in sync.
- Published MDX and imports use normal Astro/Vite compilation. There is no separate
  static-import validator, module resolver, or syntax pass. Drafts are never
  registered as production modules; their syntax/imports are checked only during
  active development or pre-publication validation.

BBF-003/02 now renders native static article routes, metadata/authors, MDX prose,
highlighted sources, and ordered examples as ordinary sections. Reading time is
an estimate derived from native MDX text nodes (including inline code, excluding
fences/imports), at 200 words/minute and at least one minute. Runtime-generated
component prose is not counted. Dates use consistent English calendar formatting.
The shared document layout owns canonical and Open Graph metadata.

The user selected isolated HTML previews for this step; trusted Astro component
execution remains deferred and fails clearly if referenced. Isolated entries use
lazy sandboxed iframes with reserved space, meaningful titles, and separate-tab
fallback links. Only published articles' registered HTML and supported declared
companions (`.css`, `.js`, `.mjs`, `.json`, `.txt`) are emitted. Arbitrary HTML
and SVG companions fail the build; source display remains unchanged, and data
images are supported. An HTML source may also be the registered preview entry
at its exact URL, receiving the same protection. Binary image companions are
outside the existing text-source contract.

Following BBF-003/02a, full HTML entries must have a doctype and explicit complete
`html`, `head`, and `body` elements. parse5 rejects malformed documents. A
controlled wrapper owns CSP before any authored content and embeds the unchanged
document through an escaped `srcdoc` attribute. Both direct and embedded access
retain sandbox isolation; HTML-like comments cannot affect policy placement.
There is no regex rewriting of authored document structure. Relative companion
URLs keep working, and conflicting permissions for one URL are rejected.

The initial previews need no JavaScript. Default entries execute none; explicit
`allow-scripts` still supports classic inline/local external scripts within an
opaque frame, without parent DOM or same-origin storage access. ES-module/import
graphs are not supported, and serving `.mjs` does not imply a loader or CORS
support. No dependency resolver, bundler, transpiler, or same-origin permission
is introduced. CSP denies connections, forms, plugins, and base URL overrides;
local/data images and local styles remain supported. Working runtime behavior
still requires author review.
See [Architecture](architecture.md) for the delivery boundary.

Article-level perspective navigation, inline example insertion, copy actions,
and cover/avatar presentation remain pending. No tab semantics are applied.

| Field | Type | Required | Meaning |
|---|---|---|---|
| `title` | Nonempty string | Yes | Visible article title |
| `description` | Nonempty string | Yes | Summary for cards, search, and metadata |
| `publishedAt` | ISO date string `YYYY-MM-DD`, quoted in YAML | Yes | Actual publication date |
| `updatedAt` | ISO date string, quoted in YAML | No | Date of a meaningful content revision |
| `category` | `tips` / `deep-dives` / `codex` | Yes | One editorial pillar |
| `tags` | Unique string array | Yes | At least one real topic |
| `authors` | Author ID array | Yes | At least one valid author |
| `featured` | Boolean | No | Eligible for editorial featuring; default false |
| `coverImage` | Local image reference | No | Optional article image |
| `coverImageAlt` | String | If image exists | Description, or empty only when decorative |
| `repositoryUrl` | HTTPS URL | No | Article-level source repository |
| `examples` | Ordered example ID array | No | References, not embedded duplicate code |

The adopted article ID/slug is derived from its flat lowercase kebab-case filename; no separate slug field is accepted. Avoid changing a published slug; use a redirect if a later correction requires it.

Reading time, canonical URL, category display label, and Code / Preview availability are derived. Do not make authors maintain flags that can drift from resources. Adopted reading time uses native MDX text at 200 words/minute, rounded up with a one-minute minimum; it includes inline code and excludes fences/imports. Label it an estimate; runtime-generated component prose is not counted.

Dates are editorial calendar dates, displayed without accidental timezone shifts. Published articles must not have future publication dates. The directory publication workflow and validation boundary are defined in [Architecture](architecture.md).

### Illustrative MDX frontmatter

This is example documentation, not an already published BBF article. The referenced author and examples would need to exist in the implementation.

```yaml
---
title: A clever CSS trick for fluid type scales
description: Create responsive typography with CSS clamp() and inspect two working examples.
publishedAt: "2026-10-12"
category: tips
tags:
  - css
  - typography
authors:
  - koen-wellens
featured: false
examples:
  - fluid-heading
  - fluid-body
---
```

### Author contract summary — retained baseline

| Field | Type | Required |
|---|---|---|
| `id` | Stable kebab-case ID | Yes |
| `name` | Nonempty display name | Yes |
| `bio` | Short biography | Yes |
| `avatar` | Local image reference | No |
| `links` | Named HTTPS links | No |

Author credit is always available. Dedicated author pages belong to the proposed supporting scope in Product. Do not fabricate a biography, avatar, affiliation, or social URL from the mock-up.

## Example contract summary — retained baseline

| Field | Type | Required | Meaning |
|---|---|---|---|
| `id` | Stable unique kebab-case ID | Yes | Shared identity across all views |
| `title` | Nonempty string | Yes | Visible selector/heading label |
| `description` | String | No | Short example context |
| `sourceFiles` | Ordered file-reference array | No | Files available in Code |
| `preview` | Registered preview reference | No | Working demonstration |
| `repositoryUrl` | HTTPS URL | No | Specific source location |
| `accessibleLabel` | Nonempty string | When preview exists | Meaningful demo/frame title |

Each registered example has at least one source file or a preview. Empty entries should fail validation rather than produce empty UI. Examples can be reused by more than one article without duplicating their implementation.

### Source-file reference — adopted local boundary

Each entry contains `id`, `label`, `language`, and `path`. The ID is unique within the example. The label is a reader-facing filename. The path resolves to a reviewed local source file inside the approved example directory; it must not permit arbitrary filesystem access.

The stored file supplies both displayed source and the demonstration wherever practical. If a framework build transforms source, show the authored source and identify it accurately. Generated bundles do not need to become the default Code view.

### Preview reference — adopted registration

Keep the adopted typed registry rather than executable component names or arbitrary HTML in metadata. Examples store `{ entry }` and the required `accessibleLabel`; `src/examples/previews.ts` owns `{ id, kind, path, sandbox }`. The schema recognizes `trusted-component` and `isolated-page`, but only isolated HTML runtime delivery is currently supported. Referencing trusted execution fails clearly. The editorial revision does not add permissions or activate deferred runtime capabilities.

External demos may be linked as supporting resources. Embedding them is not part of the proposed default; it requires a specific decision about isolation, availability, privacy, and fallback behavior. A GitHub repository link alone does not make Preview available.

## Single-source example organization — adopted roots, illustrative contents

```text
src/
├── content/
│   ├── articles/
│   │   └── fluid-typography.mdx
│   └── authors/
│       └── koen-wellens.json
├── drafts/                 # unpublished MDX and draft-only assets
└── examples/
    ├── previews.ts
    ├── fluid-heading/
    │   ├── example.json
    │   ├── source/
    │   │   ├── index.html
    │   │   └── styles.css
    │   └── preview/
    └── fluid-body/
        ├── example.json
        ├── source/
        └── preview/
```

The article/draft/author/example roots and registry reflect adopted locations. The two example names and their internal files are illustrative, not a demand for identical files in every example. A source HTML file may also supply its registered preview at the same protected URL. Article-level references, inline blocks, Code, Preview, and homepage featuring resolve the same example collection and reviewed preview registry. An ordinary prose article requires only MDX metadata and body.

An inline snippet may intentionally show a focused extract from an example. Prefer deriving it from a source range or named region. If manually maintained, label it as an extract and check it against the actual example. Do not maintain three independently edited implementations in prose, Code, and Preview.

For separately hosted GitHub examples, use a stable path and preferably a release tag or commit representing the article. The repository topology remains open; avoid making live GitHub API access necessary for article rendering.

## Preview trust and isolation — retained contract

Current delivery is the isolated HTML path recorded under BBF-003/02 and BBF-003/02a above and detailed in [Architecture](architecture.md). Retain parse5 document validation, the controlled CSP wrapper, escaped `srcdoc`, direct/embedded sandbox protection, lazy loading, reserved frame space, and actual separate-tab fallbacks. Only explicit `allow-scripts` can enable the documented classic-script capability; no same-origin permission or ES-module/import-graph support is introduced.

The registered HTML entry and the supported declared text companions are the only published preview assets. Reject unsupported HTML/SVG companions and conflicting URL targets/permissions. Keep resource containment, original source text, and published-article-only emission unchanged. A screenshot or repository URL does not make Preview available.

Trusted components remain deferred even though the registry can describe the kind. Any future capability needs a specific delivery/security decision and tests; a design change cannot enable it. A demo-specific dark surface remains inside its isolated boundary and does not create a site dark theme.

Only authored, reviewed demonstrations run. Do not accept visitor-submitted code or evaluate source-panel text. Avoid duplicate running instances, stop hidden demos as enhancements are added, and preserve explanation/source access when runtime loading fails. Optional future resizing/messaging must follow Architecture rather than weakening the existing boundary.

## Publishing workflow — confirmed directory boundary

1. Develop unpublished MDX and draft-only assets in `src/drafts/`.
2. Write an explanation that stands on its own.
3. Reference existing examples or add reviewed sources/demos for new ones.
4. Add actual repository and reference links where useful.
5. Validate the candidate in a disposable local copy using normal Astro checks/builds, without changing production content.
6. Review metadata, dates, image alternatives, and source consistency. Review current rendered reading/source/isolated-preview behavior, mobile layout, and keyboard access; test pending enhanced views when they are implemented.
7. Move reviewed MDX and companion assets into `src/content/articles/`, with a publication date no later than today in Europe/Brussels. Run the full production build before deployment.
8. Article pages and preview-file emission consume the native published collection. Future discovery, RSS, and sitemap must use that same collection; those surfaces remain deferred.

New ordinary articles must not require edits to generic route or layout code. New unusual demos may require a reviewed registry entry and custom example component; that is a content-specific exception, not a new article architecture.

## Validation and acceptance

**Retained adopted validation:** fail a build for invalid category/date values, missing author/example references, duplicate IDs, missing source files, malformed preview registrations, and empty examples. An update date cannot precede publication. Future publication dates fail the build; drafts remain outside production loading and compilation.

**Proposal acceptance for pending UI:** validate these representative cases before release; the list does not claim these enhancements already exist:

| Case | Expected behavior |
|---|---|
| Prose-only article | Article is readable; no Code or Preview navigation |
| Code-only example | Code available; no empty Preview panel |
| Preview-only example | Preview available; no empty Code panel |
| Several mixed examples | Eligible lists, stable ordering, sensible selection |
| Shared example | Inline, dedicated, and featured views use the same source |
| JavaScript disabled or failed | Reading, source sections, and ordinary links remain useful |
| Valid direct fragment and Back/Forward | Correct view/example and predictable navigation |
| Broken preview | Article remains usable; clear failure and fallback |
| Draft in `src/drafts/` | Absent from production collection, module registration, routes, and assets |
| Future date in published collection | Build fails; no scheduled publication |
| Eligible long article | Shared heading model; subtle automatic H2 numbers; right outline only when space permits |
| Short article / insufficient headings | No empty context column or useless tab strip |
| Compact layout / 320px reflow | In-flow outline, readable markers, no permanent sidebars or page overflow |
| Passive chapter tracking | One current location; no URL/history/focus mutation or live announcements |
| 10+ chapters / duplicate headings | Correct automatic numbering and stable unique existing anchors |
| Font/image load, resize, perspective return | Recomputed chapter position; predictable reading state |
| Reduced motion / script failure | Immediate accessible navigation or native anchors and neutral static outline |

## Open choices and later capabilities

**Open:** canonical fragment convention, source-range extraction, repository topology, final outline eligibility/tuning, and additional preview capability decisions, including any separately selected trusted-component execution task. The initial isolated runtime, schema/local reference structure, publication boundary, syntax theme, and current reading-time method are adopted; changing them requires a deliberate task, not a visual reskin.

**Later:** editable Playground, persisted reader preferences/site dark theme, sophisticated multi-file IDE features, user-created examples, and remote execution. Existing IDs and registrations must not imply those capabilities are enabled today.

## Revision record

- **0.2 · 19 October 2026:** added the selected editorial reading direction and derived chapter/outline behavior; separated presentation proposals from adopted content/preview contracts, corrected obsolete deferred-runtime/schema wording, and preserved the authoring model and existing source/URL boundaries. No pending interface is declared implemented by this documentation revision.
