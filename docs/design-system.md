# Build Better Frontend — Design System

Version: **0.2** · Visual direction revision · **19 October 2026**  
Direction: **Engineering Editorial × Interactive Learning**  
Website and specification language: English

## 1. Status, scope, and authority

This revision replaces v0.1's dark-navy visual direction with one consistent light editorial identity across the publication. It specifies presentation and its verification; it does not rebuild the content platform or declare pending features implemented.

### Decision labels

| Status | Meaning in this document |
|---|---|
| **Confirmed** | Explicitly selected by the owner, or an existing product/technical contract recorded in the supplied documents. |
| **Proposal** | A concrete, reviewable implementation default. Use it for reversible design work within an authorized task; it is not prior owner approval. |
| **Open** | A choice still requiring evidence or a decision. Where possible, a provisional default is stated. |
| **Later** | Outside v1. A pictured control does not bring a feature into scope. |

Unless a subsection explicitly says otherwise, **all numerical tokens, font replacements, breakpoints, component treatments, and new interaction algorithms in sections 4–12 are Proposal**. Acceptance checks in section 14 are proposed release gates for implementing the confirmed direction. Adoption in code must be recorded separately from owner visual acceptance.

### Confirmed direction

- One light identity for the homepage, articles, archives, discovery, author/About pages, and utility states that exist within product scope.
- Warm off-white canvas, near-black text, functional electric-blue accents, and restrained orange illustration accents.
- Desktop navigation rail on the left; central reading column; contextual TOC on the right for long articles when space permits.
- Subtle, automatically generated chapter numbers and vertical chapter progress integrated into the outline.
- No second horizontal reading-progress indicator and no site dark-mode toggle in v1.
- Dark code panels remain useful technical surfaces within the light site.
- Smaller screens use a single reading flow without permanent sidebars.
- Content, accessibility, progressive enhancement, source consistency, SEO, and performance remain product requirements.

### Ownership and conflict resolution

Product owns scope, Article experience owns content/resource behavior, Architecture owns delivery and isolation, and this document owns visual presentation. The latest explicit owner decision takes precedence over older specification text. A visual proposal cannot silently change a schema, URL contract, sandbox capability, or product feature.

The three attachments supplied in the preceding discussion include BBF-002 and BBF-003 updates absent from the older local copies. Their content is preserved here, with only the outer paste fences removed:

- [Design system v0.1, including BBF-002 and BBF-003/02 notes](reference/baseline-2026-10-19/design-system-v0.1.md).
- [Article experience v0.1, including BBF-003/02a contracts](reference/baseline-2026-10-19/article-experience-v0.1.md).
- [Product v0.1, including the current tagline and phase](reference/baseline-2026-10-19/product-v0.1.md).

These are the baseline for the retained contracts below. The local [Product](product.md), [Article experience](article-experience.md), and [Architecture](architecture.md) remain companion documents, but their older conflicting passages need a separate reconciliation; they are not evidence that the newer decisions were reversed. Section 13 identifies the follow-up edits. This task changes the design specification only.

Implementation facts here mean **documented in the supplied baseline**, not independently verified in the website repository. No website source or production build was available in this documentation workspace.

## 2. Visual reference and interpretation

![Primary editorial article reference: left navigation, central reading, right outline, numbered sections, collage illustration, and dark code](reference/bbf-editorial-article-mockup.png)

Primary reference: the owner-supplied **Build Better Frontend_ Into the Bin.png**, preserved as `docs/reference/bbf-editorial-article-mockup.png`. It shows an article composition, not the complete homepage or a responsive implementation. The older [navy homepage reference](reference/bbf-homepage-mockup.png) remains historical material and is no longer the visual acceptance target.

### Preserve from the reference — Confirmed

The recognizable composition comes from typography, asymmetric columns, fine technical rules, blue navigation markers, generous reading space, and purposeful technical imagery. Keep the compact publication identity in the left rail; use small monospace metadata and chapter numbers to give structure. Code provides a deliberate dark contrast. A meaningful diagram or modest collage may support an article, but a large illustration is never mandatory.

### Deliberate departures — Confirmed

| Reference element | v0.2 treatment |
|---|---|
| Horizontal progress bar and percentage at the top | Omit. The vertical outline is the only dedicated reading-progress treatment. |
| Moon icon | Omit. No automatic site dark theme or theme preference control in v1. |
| Persistent left and right columns | Keep only when content fits; collapse responsively. |
| Large rubbish-bin illustration | Article-specific inspiration, not a reusable hero or required illustration. |
| Example steps: Identify / Isolate / Refactor / Prevent | Local demo controls when justified; never replace Article / Code / Preview. |
| “Frontend Architecture” label | A topic label, not a fourth editorial category or schema change. |
| Static sample title, dates, reading time, quote, social links | Use actual content and destinations. |

**Proposal:** preserve the stacked wordmark and single blue slash as the provisional text-based lockup. The final artwork is Open. Avoid tracing the screenshot into background images or using its embedded text as production UI.

## 3. Product and technical invariants

### Product — retained Confirmed contracts

| Contract | Required preservation |
|---|---|
| Identity and mission | Build Better Frontend; help frontend developers improve through practical knowledge, real code, and working examples. |
| Tagline | **See it. Build it. Understand it.** Selected in BBF-002; do not restore the earlier tagline. |
| Editorial pillars | Frontend Tips, Deep Dives, Building with Codex; keys `tips`, `deep-dives`, `codex`. Three articles per month remains an editorial target. |
| Learning perspectives | **Article / Code / Preview**, in that order. Article is always available; Code and Preview depend on actual resources. |
| Discovery | Frontend Explorer searches existing published content and offers random discovery. No AI backend or generated answers. |
| Publishing | An ordinary article needs metadata and MDX, without custom layouts, manual TOCs, or manually maintained chapter numbers. |
| Source access | Real GitHub article/example/file links where available; never invented destinations or runtime API dependence for reading. |
| v1 boundaries | No Playground editor, accounts, comments, CMS, newsletter infrastructure, or user-submitted execution added by this redesign. |

### Content and rendering — retained adopted contracts

1. **Astro + TypeScript + MDX stays.** Keep native collections, strict schemas, native references, example order, and the existing build/rendering responsibilities. Do not introduce a second content catalog, compiler, or design-driven metadata schema.
2. Published articles are flat kebab-case `.mdx` files under `src/content/articles/`; filenames determine IDs and no second slug is accepted. Authors remain JSON under `src/content/authors/` with matching IDs. Category labels remain owned by `src/lib/content/categories.ts`.
3. Unpublished work stays in **`src/drafts/`**, outside production loading and compilation. No `draft` field is accepted. Future publication dates fail the production build; there is no automatic scheduled publication. Calendar dates are quoted ISO strings and compared in Europe/Brussels. Validate candidates in a disposable local copy before moving them into the published collection.
4. Strict Zod schemas, duplicate checks, image/source path containment, symlink containment, reference checks, HTTPS-link checks, and `validatePublishedContent()` remain in force. Production validation runs independently of the homepage. Styling must not bypass validation or import drafts.
5. Examples remain `src/examples/<id>/example.json`. Source entries retain `id`, `label`, `language`, and `path` relative to the approved `source/` directory. `resolveExample()` reads original source; `getPerspectives()` derives availability. Do not add author-maintained `hasCode` or `hasPreview` flags.
6. Preview metadata retains `{ entry }` and `accessibleLabel`. `src/examples/previews.ts` exclusively owns registered `{ id, kind, path, sandbox }` definitions. Preserve IDs and all existing valid anchors; this specification selects no new fragment API.
7. Covers/avatars remain under `src/content/images/`, outside `public/`, with the existing containment/type/alternative requirements. Optimizing their presentation must not widen the publication boundary.
8. Reading time remains the documented MDX-text estimate: 200 words/minute, round up, minimum one minute; include inline code and exclude fences/imports. Runtime-generated component prose is not counted. Keep English calendar formatting, author credit, canonical URLs, and Open Graph responsibilities in the shared document layout.
9. Article HTML and highlighted source remain statically rendered and usable as ordinary sections. Chapter decoration and optional enhancements must not move the explanatory body behind JavaScript.

### Preview delivery — retained BBF-003/02a boundary

- The implemented step uses **isolated HTML previews**. Trusted Astro execution remains deferred and must fail clearly if referenced; this redesign does not enable it.
- Keep lazy, meaningfully titled, sandboxed iframes with reserved space and real separate-tab fallback links. Default previews execute no scripts; only explicit `allow-scripts` is currently representable. No same-origin permission is introduced.
- Full HTML entries retain complete doctype/html/head/body requirements and parse5 validation. The controlled wrapper places CSP before authored content and embeds the unchanged document through escaped `srcdoc`. Direct and embedded access retain the same protection. No regex rewriting or relocation of policy into decorative components.
- Only published articles' registered HTML and supported declared `.css`, `.js`, `.mjs`, `.json`, `.txt` companions are emitted. Preserve conflicting-permission rejection, exact-URL protection for HTML also used as source, and the rejection of arbitrary HTML/SVG companions. Binary image companions remain outside the text-source contract; supported data images stay supported.
- Explicit script permission supports the documented classic inline/local scripts in an opaque frame. It does not provide ES-module/import-graph execution, a bundler, dependency resolution, same-origin storage, or parent DOM access.
- Keep CSP restrictions on connections, forms, plugins, and base URL overrides. Styling and fonts in the surrounding page must not require relaxing preview policy. Local styles and local/data images retain their existing support.
- A demo may demonstrate a dark theme inside its isolated boundary without creating a second site theme. Preview failure must never remove the article or source access.

### Recorded implementation versus pending work

| Documented as present in BBF-002 / BBF-003 | Pending or proposed; not implied by this revision |
|---|---|
| Shared tokens/global/primitives; local font delivery and fallback infrastructure | Editorial token migration, replacement font validation, responsive rail |
| Minimal root visual validation page | Full homepage, Explorer UI, cards, featured article composition |
| Native static article routes, metadata/authors, prose, sources, ordered example sections | Article perspective navigation, inline example insertion, copy actions, cover/avatar presentation |
| `github-dark-default` Shiki highlighting and isolated working HTML previews | Contextual TOC enhancement, automatic chapter decoration, vertical active tracking |

The initial syntax theme is already adopted; it is not an unresolved starting choice. WCAG conformance and owner visual acceptance were not established by those implementation steps.

## 4. Design principles — Proposal application of the confirmed direction

1. **Make the publication recognizable through structure.** Use a restrained rail, expressive titles, numbered major sections, and editorial rhythm. Avoid a generic gradient hero, repeated rounded promotional cards, ambient glows, and floating decorative code windows.
2. **Let reading lead.** Body text has stable contrast and a comfortable measure. Decoration, code panels, and optional illustrations support explanations.
3. **Blue means interaction or orientation.** It marks links, focus, selected navigation, and chapter position. Orange belongs chiefly to illustrations; it is not a competing primary action color.
4. **Expose real resources.** Filenames, example labels, controls, and source links identify actual material. A missing optional resource causes a simpler composition.
5. **Treat the interface as evidence of craft.** Responsive behavior, semantics, restrained motion, measurable performance, and graceful failure are part of the publication's credibility.

## 5. Color and surface tokens — Proposal

Use semantic CSS custom properties in `src/styles/tokens.css`. Keep values centralized; component styles consume roles. The light page is explicit (`color-scheme: light`) and does not switch palette with `prefers-color-scheme`. Forced-colors support remains a separate accessibility requirement.

### Foundation and interaction

| Token | Value | Use |
|---|---|---|
| `--color-background` | `#FAF9F6` | Warm page canvas, including the rail |
| `--color-surface` | `#FFFFFF` | Inputs, neutral panels, preview frame surround |
| `--color-surface-raised` | `#F2F1ED` | Subtle inset or secondary grouping; no implied shadow |
| `--color-surface-hover` | `#ECEBE7` | Neutral hover treatment |
| `--color-border` | `#DEDDD7` | Decorative rules only |
| `--color-control-border` | `#777D89` | Essential input/control boundaries |
| `--color-text` | `#151923` | Body, titles, strong labels |
| `--color-text-secondary` | `#505666` | Descriptions and supporting text |
| `--color-text-muted` | `#626774` | Dates and secondary metadata; never lowered with opacity |
| `--color-primary` | `#3657FF` | Links, primary buttons, chapter markers |
| `--color-primary-hover` | `#2442D8` | Hovered actions and links |
| `--color-primary-active` | `#1E36B6` | Pressed actions |
| `--color-primary-subtle` | `#ECEEFF` | Selected rail items, quiet blue callouts |
| `--color-on-accent` | `#FFFFFF` | Text/icons on primary solid controls |
| `--color-on-light` | `#151923` | Compatibility role for text/icons on light surfaces |
| `--color-focus` | `#2442D8` | Focus outline on light surfaces |
| `--color-highlight` | `#FFF0AB` | Occasional inline editorial emphasis with dark text |
| `--color-accent-orange` | `#FF9254` | Illustration shapes; no small white text or essential boundary |

A primary solid control uses `primary` plus `on-accent`. A neutral control uses `surface`, `text`, and `control-border`. A selected rail item uses `primary-subtle`, primary text, and an additional marker/weight cue. Blue links remain underlined in prose; visiting a link need not introduce a new accent family.

### Semantic feedback

| Role | Foreground | Background | Usage |
|---|---|---|---|
| `--color-success` / `--color-success-subtle` | `#176443` | `#EAF5EE` | Copied/saved success, with explicit text |
| `--color-warning` / `--color-warning-subtle` | `#784508` | `#FFF3D6` | Cautions, with title/icon |
| `--color-danger` / `--color-danger-subtle` | `#A32632` | `#FCEDEE` | Errors and failed loading, with recovery text |

Status colors communicate status only. They do not replace category labels or the primary interaction blue. Use native disabled semantics plus explanatory context where needed; do not style an active link as disabled merely to mute it.

### Code is a separate local surface

| Token | Value | Use |
|---|---|---|
| `--color-code-background` | `#0D1117` | Adopted `github-dark-default` base |
| `--color-code-text` | `#E6EDF3` | Plain code fallback |
| `--color-code-muted` | `#8B949E` | Filenames/comments where contrast is verified |
| `--color-code-border` | `#6E7681` | Essential controls within the dark panel |
| `--color-code-focus` | `#A5B4FC` | Focus indicator inside the dark surface |
| `--color-code-selected` | `#263650` | Selected source row/file treatment |

Retain Shiki's adopted `github-dark-default` syntax colors. Use the dedicated code tokens for chrome and fallback text; preserve token/background pairing rather than overriding only the Shiki background. The page's muted gray or primary blue must not be reused as small text on a dark code surface without a contrast check. Inline code uses dark text on `surface-raised`, not an entire dark slab.

### Contrast verification contract

Verify every intended text pair at **4.5:1** for normal text and **3:1** for large text; essential control boundaries and state indicators require **3:1** where applicable. Decorative rules can be subtler because they are not the sole way to identify controls. Color must never be the only cue. These are requirements drawn from [WCAG 2.2](https://www.w3.org/TR/WCAG22/); proposed colors are not a claim of rendered compliance.

Record computed contrast for opaque token pairs before adoption, then inspect actual states, syntax highlighting, transparent overlays, icons, images with labels, and focus adjacency in the rendered UI. Orange and highlight backgrounds always carry dark text when they contain text. Do not use gradients, blend modes, or lowered opacity on essential text.

Documentation check, 19 October 2026: WCAG relative-luminance calculations for the proposed opaque pairs give body/canvas **16.69:1**, muted/canvas **5.37:1**, primary/canvas **5.03:1**, primary/selected-subtle **4.60:1**, white/primary **5.30:1**, control-border/canvas **3.93:1**, code-muted/code-background **6.15:1**, and code-focus/code-background **9.49:1**. These pairs meet their relevant text or boundary threshold. This calculation does not test rendered syntax tokens, all control states, or a complete page.

## 6. Typography and editorial rhythm — Proposal

### Font roles

| Role | Proposed family | Weight and treatment |
|---|---|---|
| Display, headings, prose, UI | **Space Grotesk** | 400 body, 500 UI, 600–700 headings |
| Source, short metadata, chapter numbers | **Fira Code** | 400–500; avoid monospace paragraphs |

Use two families in the final state. Space Grotesk is a proposed replacement for Plus Jakarta Sans, not a confirmed font identification from the screenshot. It must pass a long-article reading review before adoption. If it fails or its delivery cannot meet the budget, keep the existing Plus Jakarta Sans for the whole sans role temporarily and record the outcome; do not load both sans families for decorative variety. System fallbacks must remain useful.

```css
:root {
  --font-sans: "Space Grotesk", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: "Fira Code", ui-monospace, SFMono-Regular, Consolas, monospace;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.375rem;
  --text-2xl: 1.75rem;
  --text-3xl: 2.25rem;
  --text-display: clamp(2.25rem, 1.25rem + 3vw, 4rem);
  --leading-body: 1.7;
  --leading-heading: 1.15;
  --leading-display: 1.08;
  --leading-code: 1.6;
  --tracking-heading: -0.025em;
  --tracking-label: 0.04em;
}
```

The rem scale assumes a normal 16px browser default but must preserve the user's root text sizing. Do not reduce the root size to make the layout fit.

| Element | Size / leading | Additional rule |
|---|---|---|
| Article/page H1 | `--text-display` / 1.08 | Weight 700; natural wrapping; no fixed height |
| Main article H2 | `clamp(1.5rem, 1.2rem + 1vw, 2rem)` / 1.2 | Weight 600–700; align with chapter marker |
| H3 | `--text-xl` / 1.3 | Unnumbered; no skipped heading levels |
| Prose | `--text-lg` / 1.7 | Target 65–75 characters per line; maximum reading container still 760px |
| Introduction/deck | `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)` / 1.5 | Secondary text; summary, not a blockquote |
| UI and TOC | `--text-sm` to `--text-base` / 1.45–1.5 | Never shrink navigation to preserve a column |
| Metadata and section numbers | `--text-sm` / 1.5 | Monospace; 12px reserved for nonessential short labels |
| Code | `--text-sm` / 1.6 | Preserve whitespace and original characters |

Paragraph spacing: 1.25em after a paragraph. H2 spacing: `--space-12` before, `--space-6` after; H3: `--space-8` before and `--space-4` after. Keep heading and following content visually associated. Lists retain native semantics and hanging indentation; blue decorative arrows may supplement but never replace list structure.

Titles may use a small blue-tinted emphasis behind a short phrase, inspired by the reference. It is optional, generated from explicit editorial markup rather than arbitrary word detection, with no schema requirement. Never apply it to every title, reduce contrast, or use an image of text.

### Font delivery

Preserve BBF-002's local WOFF2 delivery, fingerprinted URLs, metric-adjusted fallbacks, `font-display: swap`, and license/provenance records. Use the installed Astro font infrastructure rather than introducing a second font loader. Preload only the body sans face actually used above the fold; do not preload the retired face or every code weight. The current Latin variable assets are not automatically evidence that a replacement font has been added or licensed.

Disable synthetic bold/italic where it damages fidelity; supply true italic only when content requires it or use an upright alternative without changing meaning. Preserve readable fallback text during load/failure. Code ligatures may remain when they do not confuse the lesson; copy always preserves source characters.

## 7. Spacing, geometry, and layering — Proposal

| Token | Value |
|---|---|
| `--space-1`, `--space-2`, `--space-3`, `--space-4` | `0.25rem`, `0.5rem`, `0.75rem`, `1rem` |
| `--space-5`, `--space-6`, `--space-8` | `1.25rem`, `1.5rem`, `2rem` |
| `--space-12`, `--space-16`, `--space-24` | `3rem`, `4rem`, `6rem` |
| `--width-site` | `90rem` / 1440px outer cap including gutters |
| `--width-content` | `75rem` / 1200px for general inner content, subordinate to shell space |
| `--width-reading` | `47.5rem` / 760px maximum reading container |
| `--width-prose` | `70ch`, capped by its reading container |
| `--width-example` | `68.75rem` / 1100px maximum, only where layout provides space |
| `--width-rail` | `11.25rem` / 180px |
| `--width-context` | `12.5rem` / 200px |
| `--layout-gap` | `2rem` / 32px |
| `--radius-sm`, `--radius-md`, `--radius-pill` | `0.25rem`, `0.5rem`, `999px` |
| `--border-width` | `1px` |
| `--focus-width`, `--focus-offset` | `2px`, `4px` |
| `--shadow-popover` | `0 0.5rem 1.5rem rgb(21 25 35 / 0.10)` |
| `--z-base`, `--z-sticky`, `--z-popover`, `--z-skip-link` | `0`, `10`, `20`, `100` |

`--page-gutter`: 1.25rem below 40rem; 2rem from 40rem; 3rem from 80rem. Keep `box-sizing: border-box` globally. These are a shell's gutters, not padding to add again to every nested container. Existing reading/example primitives must be adapted so their old additive gutters do not double the inset.

Buttons/inputs use the small radius; code, preview, and callout panels use the medium radius. Cards are primarily ruled editorial rows, not a wall of elevated rounded tiles. Pills are limited to short topic filters/badges. Shadows belong to floating UI only. No ambient glow, permanent paper texture overlay, noise filter, or large image used as a page background.

## 8. Responsive shell and content layout — Proposal

### Content-first breakpoints

| Viewport width | Site navigation | Article layout | TOC / progress |
|---|---|---|---|
| Below 40rem | Compact normal-flow header with labeled menu disclosure | Single column, 20px shell gutters | In-flow collapsible outline when eligible; no permanent rail |
| 40rem–63.99rem | Compact header | Single column, 32px gutters; reading width capped | In-flow outline; no permanent rail |
| 64rem–79.99rem | Left navigation rail, 180px | Rail + flexible main; reading column capped at 760px | In-flow outline; no squeezed right column |
| 80rem and above | Left navigation rail, 180px | Rail + reading column + 200px context column when eligible | Sticky right outline with integrated vertical chapter progress |

Treat thresholds as starting defaults. Collapse earlier if actual font metrics, zoom, or text cause collisions. Never reduce prose size, hide labels, or force horizontal page scrolling to preserve a sidebar.

### Wide article composition

The complete shell is capped at 1440px, including its outer gutters. At 1280px with 48px gutters, the available inner width is 1184px: `180 + 32 + 740 + 32 + 200`. At 1440px, all columns can reach their intended maximum; any remaining space becomes outer breathing room. The reading column is flexible, not a forced 760px minimum.

```text
[ outer gutter | navigation rail | gap | reading column | gap | outline | outer gutter ]
                                         title
                                         metadata
                                         perspectives (when implemented)
                                         prose and inline examples
```

**Layout constraints:** use grid tracks with `minmax(0, …)` and `min-inline-size: 0` on content children. Constrain the prose inside the reading track rather than allowing line length to grow to fill unused space. Center the overall composition; do not absolutely position text beside a fixed sidebar.

A short article has **no empty context column**. Use rail + main, and center the capped reading column within the main region. Non-article pages also use rail + main and do not reserve a TOC gutter. On wide screens, lists/Explorer may use a larger content width than prose.

### Navigation and sticky behavior

- The rail is a grid item with a sticky inner region, not an overlay on article content. Its top inset is 24px and maximum height is the available dynamic viewport height minus vertical insets; permit local vertical scrolling if needed. Never pin social links over navigation at short viewport heights.
- The context outline is sticky at 24px with a bounded, scrollable region. A long outline remains reachable without trapping page scroll or clipping focus. Do not automatically scroll it on every document scroll event.
- The compact header is normal flow in v1. Set `--anchor-offset: 1.5rem` and use logical scroll margins on heading/fragment targets. If a sticky compact header is later adopted, its measured occupied height must be included in this offset.
- DOM order is skip link, global navigation, main (introduction, eligible outline, reading body/resources), then footer. The outline can occupy the right grid track while remaining before the body in source order; in compact layouts it naturally follows the introduction. One shared navigation structure should adapt rather than duplicate focusable desktop/mobile copies.

### Wide examples, tables, and small viewports

Reading content and the outline normally share a two-track article region at wide widths. A genuinely wide example may span those two tracks only in a dedicated layout variant that moves the entire outline into flow for that article. The layout derives this from an existing rendered example need or a presentation-level component choice; it adds no required article field. Otherwise examples stay within the reading track. No negative margins or z-index tricks may paint a panel over the sticky outline.

The 1100px example token is a maximum, not a promise at every viewport. Retain local horizontal scrolling for long source and data tables, with a visible scrollbar and a keyboard-reachable, named region when needed. Prose, titles, URLs, and metadata wrap. At 320 CSS pixels, the page has no horizontal overflow; only content inherently requiring two dimensions may scroll locally.

## 9. Reading, chapter outline, and progress — Proposal

### Article introduction

Order: archive/back link; category/topic and dates; H1; description; authors and estimated reading time; optional cover; perspective navigation when available. Metadata may share a row on large screens but wraps in reading order. Use one H1. Render actual dates with `time` elements. A meaningful update date is distinct from publication.

The cover is optional and does not create a blank placeholder. Reserve its aspect ratio/dimensions, use responsive assets, and provide the authored alternative. A likely above-the-fold LCP image is not lazily loaded; below-the-fold figures are. Captions explain a technical figure and credit it when needed. The article description remains a summary, not a fabricated quotation.

### Shared heading model

Build a single ordered heading model from the rendered article/MDX heading data, using the existing stable heading-ID mechanism. That model feeds the outline and chapter markers; it must not create an independent slugger or rename existing anchors.

- Major chapters are the article body's H2 headings. Automatically number them `01`, `02`, `03`, … in document order; do not stop at `09` or require author-entered numbers.
- H3 entries are optional outline children and remain unnumbered. Do not include navigation headings, example filenames, iframe content, or generated source-section labels as chapters.
- Use decorative number spans hidden from assistive technology; the real heading text and semantic level remain intact. In the outline, position can be conveyed through ordered-list semantics without a second spoken number.
- With too little margin, place the number beside or above the heading in normal flow; never push it outside the viewport. A fine blue rule may mark the heading group as static structure. It does not become a second scroll-progress visualization.

**Long-article eligibility proposal:** show an outline when the body has at least three H2 chapters **and** the existing reading-time estimate is at least five minutes. With two H2s, one very long section, or a short tip, default to no automatic outline. This threshold is Open to content review; short content remains complete without it. No new frontmatter flag is required.

### Outline anatomy and vertical progress

Use a labeled `nav` (“On this page”), an ordered list of native heading links, and a thin vertical track with chapter nodes. Links have comfortable target height, readable text, and clear indentation. Keep the title and a quiet divider; omit the reference's motivational side-card by default.

With successful enhancement:

1. Track only the article reading body, not header, footer, source appendices, or page length. The active chapter is the last H2 whose top has passed a reference line 25% down the viewport. Before the first H2 passes it, select the first chapter. At the reading body's bottom within the viewport, select the last chapter. Use document-order positions to resolve ties and recompute after relevant layout changes.
2. Mark exactly one outline link `aria-current="location"`. Add primary text, a filled node, and stronger weight/shape; color alone does not identify it. Fill the single vertical track through the active chapter node. This is chapter position, not a claim about comprehension or an exact percentage read.
3. Passive scrolling changes only current-location styling. It does not move keyboard focus, update the URL, add history entries, or announce a live region. Use one observer-driven tracking module with bounded work; any scroll calculation is passive and coalesced once per animation frame. Do not scan the entire document on every scroll tick.
4. Selecting a heading link uses its existing native fragment and history behavior. For an enhanced same-page jump, focus the destination heading after navigation without a second scroll; a temporary `tabindex="-1"` can provide a focus target. Preserve Back/Forward, direct links, and fallback anchor behavior. Smooth scrolling is optional and disabled for reduced motion.
5. On switching away from Article, hide or suspend the reading outline/progress if the enhanced interface hides the reading body. Code/Preview selectors take over their own context. Restore Article with predictable reading position and state; do not show a stale chapter indicator over a source panel.

Do not give this decorative progress track `role="progressbar"`: the labeled heading navigation with current-location state already conveys its meaning. Do not add a percentage, timer, horizontal bar, or second persistent progress widget.

### Compact and failure behavior

Below the context-column breakpoint, put the same eligible outline in a native `details`/`summary` block after the introduction and perspective controls, before the reading body. Label it “On this page.” When collapsed and enhancement is active, the summary may append “Chapter 2 of 5” as quiet text. No sticky mobile progress strip is added. Reuse the same chapter model and avoid duplicate simultaneously exposed navigation.

Without JavaScript, render the heading list and anchors in HTML, leave the progress track neutral, and omit current-position claims. A tracking error must not prevent native link navigation. Print expands an in-flow outline if useful and removes interactive progress decoration.

## 10. Component contracts — Proposal presentation, retained behavior

Component names describe responsibilities, not mandatory new files or a standalone component library. Prefer small, focused Astro/HTML components with explicit data and scoped styles. Shared site styles must not bleed into isolated previews.

### SiteNavigation, Wordmark, Footer

Desktop rail: stacked publication lockup, primary links, optional secondary links/short mission, real social/source destinations. Proposed visible primary labels: Home, Articles, About, with category links when useful; the exact hierarchy is Open. Preserve existing destinations and Product's route status; “Posts” in the reference does not authorize renaming `/articles/` or published slugs. Do not ship links to supporting pages before those pages exist.

Use `aria-current="page"` only for the actual current page; an article may mark the archive section visually without falsely declaring that link the current page. The wordmark links home with the full accessible publication name. Use text or an accessible vector asset; the blue slash is decorative.

Compact navigation is a disclosure with an ordinary labeled button, `aria-expanded`, and `aria-controls`. Reveal normal-flow links; Escape closes an open disclosure and returns focus to its button. A simple disclosure is not a modal, menu widget, or focus trap. Keep the underlying links available without JavaScript, for example through native disclosure behavior.

Search is a labeled link to the actual Explorer location once implemented, not an inert magnifying glass. Omit the icon until its destination works. Footer links remain quieter than content; show RSS/social/GitHub only for real endpoints. A rail footnote does not replace a footer containing necessary page information.

### Buttons, links, forms, and filters

| State | Treatment |
|---|---|
| Default | Solid primary with white text, or outlined neutral with essential border; links underlined in prose |
| Hover | Darker primary or neutral surface; retain text contrast; no reliance on hover for access |
| Focus-visible | 2px outline, 4px offset; use code-focus inside dark panels; never clipped |
| Pressed / selected | Darker fill or subtle blue surface plus text/icon/border cue; accurate pressed/selection semantics |
| Disabled | Native disabled where applicable, distinguishable text and explanation when the cause matters; no clickable fake-disabled links |
| Loading | Keep the label or replace it with specific action text; reserve space; mark the relevant region busy |
| Error | Plain-language cause, recovery action, and associated field/error reference; preserve entered values |

Actions, menu buttons, copy controls, and disclosure summaries target at least 44px in height. Inline links remain inline and meet applicable target-spacing rules. Inputs have persistent labels, visible outlines before focus, and text at least 16px in the compact layout. Placeholder text is not a label. Selected filter chips expose selection through native controls or accurate pressed state and retain a visible reset action.

### FrontendExplorer and homepage composition

The Explorer stays part of v1's product intent and remains deferred implementation in the supplied baseline. Restyle it in the light vocabulary without changing discovery behavior: published-content search; topic chips; code-only filter derived from real sources; random discovery; ordinary archive fallback.

Search states: idle, loading, results with count, no results, and load error with retry/archive route. Announce concise submitted result counts and failures, not every keystroke. Preserve keyboard focus and the user's query/filter choices. Random discovery retains Product's proposal to respect topic/code filters and ignore free text, with explanatory copy; final wording remains Open.

**Homepage composition is Proposal, pending a separate homepage mockup.** Provisional reading order: publication introduction with current tagline; Explorer; latest article list and category links; optional featured learning experience using a real published article. A featured article may lead visually while the DOM preserves meaningful reading order. The earlier large split hero, gradient “Frontend.” word, translucent technology layers, and right-hand Explorer placement are superseded visual treatments, not product contracts. Keep the Explorer prominent and discoverable; do not replace it with a decorative search icon or remove random discovery.

### ArticleList, ArticleCard, CategoryBadge

Use ruled editorial rows by default: category/date, prominent title, description, author/reading time, and resource indicators. An optional thumbnail sits alongside the text where space allows and stacks or disappears decoratively on narrow screens. No fixed-height title truncation, fake author portrait, or empty image slot.

Use one clear title link or a semantically sound single card link; never nest interactive controls inside it. Show category names as text. Default badge treatment is the same blue/neutral family across all three pillars; remove the old mandatory amber/violet/mint identity mapping. Topic labels are separate metadata, not new categories. Resource indicators reflect `getPerspectives()` data and never promise absent code or previews.

### ArticlePerspectives

Preserve Article / Code / Preview labels, order, and derived availability. A prose-only article has no redundant tab strip. When controls are built, use understated labels and a blue underline for the active perspective; never three large competing pill rows.

Baseline: article body, source sections, and demo links in static HTML. Only after successful initialization may the same structure acquire tab semantics and hide inactive panels. Enhanced tabs use associated IDs, accurate selection, roving focus, arrows/Home/End, and manual activation with Enter/Space where activation loads a preview, following the [WAI-ARIA tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/). Do not steal focus into a demo.

Keep existing fragments working and preserve Back/Forward. The `#article`, `#code-…`, `#preview-…` convention in Article experience remains a proposal; this design does not adopt it as an API or rename live IDs. Invalid resource targets return to a usable article with an explanation. Retain selected example across Code/Preview if eligible; otherwise visibly select the first eligible example in editorial order.

**BBF-003/03 scoped adoption:** compact labels, a blue active underline, stronger
selected weight, manual keyboard activation, and native example/file selectors
are implemented within the existing layout. Current dark-layout tokens are
retained for readable contrast; no light palette/font/shell migration is implied.
The existing Plus Jakarta Sans/Fira Code delivery and syntax theme stay intact.
See the [implementation record](../prompts/BBF-003/README.md) for measured checks;
owner visual acceptance remains pending.

### ExampleSelector, FileSelector, CodeExample

Use descriptive example names and native selects or compact lists when multiple resources exist. A single source file does not need a simulated IDE. Distinguish article perspectives, file selection, and example-specific step controls by labels, placement, and scope.

Code panel anatomy: example context; real filename/language; optional real source link; original highlighted text; copy action when implemented. Chrome is compact, the panel has an 8px radius and reserved local scrolling, and line numbers are optional decoration excluded from copy/reading when redundant. No fake window lights or ornamental terminal header is required.

Copy actions remain pending in the baseline. When implemented, copy raw source, including whitespace, never HTML or line numbers. Keep the source selectable and show “Copied” or “Could not copy; select the code” in a concise polite status region. Disabled or failed clipboard access must not remove source access. Inline code wraps when practical; fenced code preserves indentation and scrolls locally.

### PreviewFrame and FeaturedExperience

The light preview surround identifies the example and contains a reserved-size frame, loading/failure status, and real fallback/source links. Never recolor the authored preview through global CSS or make decorative browser chrome look like a working control. Render viewport/step controls only when they operate that particular example. A screenshot fallback is explicitly labeled as a screenshot.

Keep lazy loading and the existing wrapper/CSP/sandbox path. Load expensive preview runtimes only when needed, stop hidden demos, and avoid duplicate active instances for inline, dedicated, and homepage views. Error recovery is local; reading remains available.

The featured experience uses one real article and the same example sources/registry. It is omitted when no suitable content exists. Its proposed initial visual perspective may be Preview only when available; the canonical article still defaults to Article. No “Open in playground” action in v1.

### EditorialCallout, Blockquote, figures, and local steps

Callouts: a fine leading rule, restrained neutral or blue-tinted background, short heading such as “Key idea” or “Caution,” and concise text. Important safety/error meaning uses the semantic status palette plus text. Callouts sit in the reading flow on small screens. Do not populate a right sidebar with generic motivational copy.

Real quotations use `blockquote` and attribution; ordinary summaries do not. Figures use captions and text alternatives proportionate to the information; complex diagrams need an adjacent explanation. Prefer engineering diagrams, purposeful collage fragments, and authored examples over decorative stock-device imagery. Orange/blue illustration shapes may be expressive without becoming interactive affordances.

The reference's Identify / Isolate / Refactor / Prevent sequence is a local example pattern. Implement as a labeled ordered sequence or correctly scoped controls only when it changes content meaningfully. It does not introduce a fourth article perspective, mandatory author workflow, or global wizard.

## 11. Accessibility and resilient behavior — Proposal verification target

Target **WCAG 2.2 AA**, carried forward from v0.1. This is a target for the complete rendered pages and interactions, not a compliance certificate for the token table. Use semantic landmarks, logical headings, a visible-on-focus skip link, native labels, text alternatives, and correct language metadata. See the [WCAG 2.2 recommendation](https://www.w3.org/TR/WCAG22/) for the complete requirements; the checks below are BBF-specific priorities.

- All navigation, search/filter controls, perspectives, selectors, source scrolling, copy actions, and demo fallbacks work with a keyboard. Provide a way to move past embedded examples. No keyboard traps or hover-only content.
- Maintain visible focus throughout rail/outline scrolling. Sticky content, clipping, popovers, and iframe edges must not obscure the focused item. Provide 44px action targets as a design goal; meet applicable WCAG minimum target-size or spacing provisions, including for denser outline links.
- Support 200% text resizing and reflow at 320 CSS pixels, including desktop 400% zoom equivalents. Text-spacing overrides must not clip headings or controls. Long titles, file paths, author lists, and translated future labels must fit without hidden content.
- Selected/active states use shape, weight, underline, or explicit text alongside color. Honor forced colors with native/system foregrounds, outlines, and borders; remove decorative highlights that lose meaning. Do not suppress system contrast adjustments for the entire interface.
- Static article HTML, headings, source sections, and fallback links remain useful without JavaScript and when enhancement fails. Apply ARIA widget roles only when the required behavior is active.
- Announce meaningful search, copy, and load outcomes concisely. Passive chapter tracking is silent. Do not move focus on scrolling, font loading, result rendering, or preview activation without a deliberate user action requiring it.
- Use meaningful frame titles from the existing accessible labels. No autoplay audio, flashing decoration, or motion that competes with reading. A failing or unavailable demo leaves explanation and source links intact.

### Print

Print on white with dark text. Remove global navigation chrome, interactive controls, shadows, and progress decoration. Expand readable article/source sections even if an enhanced view had hidden them. Replace live previews with a labeled fallback link and explanatory caption; preserve useful source URLs. Use a light print treatment for source, retain readable whitespace, and avoid clipping long lines. Do not force whole long code blocks onto one unbreakable page.

## 12. Motion and performance — Proposal

### Motion tokens and rules

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | `120ms` | Color/border feedback |
| `--duration-normal` | `180ms` | Small disclosure or panel-state feedback |
| `--duration-slow` | `240ms` | Optional modest transition; not a page reveal |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Shared timing curve |

No scroll-jacking, parallax, continuous decoration, bouncing arrows, typewriter copy, or entrance effects that delay text. Do not animate paragraph layout, dynamic panel heights, or the vertical progress fill on every scroll update. Chapter changes should feel immediate. Only add motion when it clarifies a user action; loading states retain plain text.

For `prefers-reduced-motion: reduce`, set shared durations to zero, remove nonessential animation, and use immediate anchor navigation (`scroll-behavior: auto`). Preserve clear state changes. Avoid global rules that break authored demonstration behavior without considering its own accessibility requirements; document an example's essential motion separately.

### Delivery and budgets

Retain static article HTML, build-time syntax highlighting, scoped CSS, existing font infrastructure, and small focused browser modules. A rail, chapter marker, or collage does not justify a site-wide UI runtime or animation package.

| Budget / target | Proposed acceptance |
|---|---|
| Initial site-owned JavaScript | At most **75KB gzip** on the homepage or ordinary article before optional previews; retained architecture budget, not a new allowance per component |
| New shell + outline/progress enhancement | At most **10KB gzip combined**, included within the 75KB total |
| Initial font transfer | At most **150KB compressed total** across actually requested sans/mono assets on a representative article; no duplicate sans preload |
| Editorial stylesheet contribution | At most **30KB gzip** for shared site styling; syntax CSS and example-specific assets recorded separately |
| Ordinary editorial cover | Aim at **200KB or less** for the selected mobile image resource; optimize format/dimensions and document content-driven exceptions |
| Layout reservation | Dimensions/aspect ratios for covers, avatars, preview frames, and featured panels; no zero-height loading slots |
| Field experience | LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, evaluated at the 75th percentile when sufficient field data exists |

The field targets follow [Web Vitals](https://web.dev/articles/vitals). Lab runs diagnose regressions; they do not prove field percentiles. New budgets other than the carried-forward 75KB limit are provisional and must be measured against the existing build before adoption, with exceptions recorded explicitly.

Fetch the search index when needed, not because a decorative search icon is present. Load only eligible published example assets. Reserve frame space and retain lazy iframe behavior; changing frame presentation must not eagerly activate hidden previews. Record preview runtime/network cost separately, including third-party code, without hiding it from total user experience reporting. Avoid runtime GitHub requests, remote font dependencies, huge texture assets, and DOM-heavy line-by-line animation.

Measure at least a prose-only article, a long article with source and preview, and the homepage once implemented. Inspect font swap, hero/cover LCP, scroll responsiveness, and preview activation under representative mobile conditions. Do not add analytics infrastructure solely to claim performance measurement.

## 13. Migration from v0.1 — Proposal execution plan

The new visual direction is Confirmed. Migration order and exact replacement values below are Proposal. Work in reviewable increments and preserve an archived baseline; do not globally replace hexadecimal colors without classifying their role.

### Token migration map

| v0.1 role / value | v0.2 replacement | Migration rule |
|---|---|---|
| `--color-background` `#0B1320` | `#FAF9F6` | Page and rail only; not demo internals |
| `--color-surface` `#111C2D` | `#FFFFFF` | General panels; split code consumers first |
| `--color-surface-raised` `#19263A` | `#F2F1ED` | Quiet inset; remove glow/shadow assumptions |
| `--color-surface-hover` `#213149` | `#ECEBE7` | Neutral hover; recheck foregrounds |
| `--color-border` `#2B3A52` | `#DEDDD7` | Decorative lines; never essential controls |
| `--color-control-border` `#61738F` | `#777D89` | Essential boundaries on light surfaces |
| `--color-text` `#F5F7FC` | `#151923` | Main text; code uses its dedicated role |
| Secondary `#B3C0D6`; muted `#8393AE` | `#505666`; `#626774` | Metadata/descriptions; remove inherited opacity |
| `--color-primary` `#5988FF` | `#3657FF` | Functional blue across site |
| `--color-on-accent` `#0B1320` | `#FFFFFF` | Audit every solid accent control together with its background |
| `--color-on-light` `#0B1320` | `#151923` | Retain compatibility role; light editorial CTA becomes neutral/primary as appropriate |
| `--color-focus` `#55CFF5` | `#2442D8` | Light surfaces; dark code gets `--color-code-focus` |
| `--color-secondary`, `--color-cyan` | Retire from site chrome | Audit consumers; map functional roles to primary, illustration roles deliberately |
| `--color-amber`, `--color-violet`, `--color-mint` | Retire mandatory category mapping | All category badges use readable labels and the shared neutral/blue treatment |
| `--gradient-brand` | Retire | Replace gradient headline with solid text; no replacement site gradient |
| General navy code-panel surface | Dedicated code tokens + adopted Shiki theme | Keep dark syntax surface intact while lightening the surrounding UI |
| Plus Jakarta Sans | Proposed Space Grotesk | Validate reading/font budget before replacing; Fira Code retained |
| 10/12/14/16px rounded-surface hierarchy | 4px controls / 8px panels / editorial rules | Update primitives, not scattered overrides |
| 40rem / 60rem gutter assumptions | 40rem / 80rem gutters; 64rem rail; 80rem outline | Distinguish spacing breakpoints from composition breakpoints |
| 1440 / 1200 / 760 / 1100px width roles | Retained caps, constrained by actual grid space | Remove nested additive gutters; no forced wide panel under TOC |
| 150/200ms shared timings | 120/180/240ms roles | Centralize aliases during migration, retain reduced-motion zeroing |

Do not alias all retired accents to blue indefinitely: the same old token may have served text, fill, and decoration. Inspect and replace each consumer with the correct semantic role. Keep temporary aliases only when their foreground/background assumptions are verified; remove them before migration acceptance.

### Staged implementation

1. **Inventory and baseline.** Inspect the actual website repository, manifests, fonts, tokens, global/primitives, shared layout, article renderer, and existing checks. Capture representative current screenshots and payload/contrast measurements. Record that BBF-002 defaults are implemented choices rather than owner acceptance. Preserve unrelated work.
2. **Separate code from global surfaces.** Introduce dedicated code chrome/focus roles and verify `github-dark-default` remains legible. No preview wrapper, sandbox, source, or validation changes.
3. **Migrate the shared light foundation.** Update `tokens.css`, document defaults in `global.css`, and shared patterns in `primitives.css`. Audit hard-coded colors, gradient text, focus rings, active badges, native controls, inline code, source controls, and legacy dark selectors. Ensure every existing route uses the same palette before introducing new promotional layouts.
4. **Migrate the shell.** Implement rail/compact navigation, flexible main/reading columns, optional context space, and footer. Preserve destinations, canonical metadata, DOM reading order, and native links. Check short viewport heights, zoom, and long titles immediately.
5. **Migrate reading and outline.** Restyle metadata/prose/examples, derive chapter decoration from existing headings, add eligible TOC and then optional tracking. Keep static sections useful throughout. Do not accidentally ship pending tabs or copy UI as nonfunctional decoration.
6. **Validate typography and assets.** Review a long article with the proposed sans replacement; use local licensed assets and measured fallbacks. Adopt or retain the existing sans role with the reason recorded. Add optional covers/illustrations only through the existing content boundary.
7. **Apply the same identity to discovery and supporting pages as they are implemented.** Keep homepage composition as a separate review item; a reskin does not mark Explorer, archives, author pages, or perspective navigation complete.
8. **Verify and retire compatibility.** Run repository checks appropriate to changed code and content, build, inspect representative pages, verify preview isolation and draft exclusion, measure budgets, remove obsolete tokens/styles, and record remaining proposals/open issues. Do not claim implementation checks from a documentation-only change.

### Companion-document reconciliation — required follow-up, not performed here

| Document | Targeted update |
|---|---|
| `product.md` | Replace dark-navy direction and old typography; remove light theme from Later; preserve mission, cadence, categories, current tagline, discovery, and scope. Mark homepage composition for separate review. |
| `article-experience.md` | Retain the supplied adopted content/publication/preview contracts; add shared heading model, optional outline, chapter markers, responsive behavior, and vertical progress without new author fields. Keep perspective/URL proposals distinct from implementation. |
| `architecture.md` | Reconcile older draft-flag/future-filter advice with the adopted directory boundary and build failures; retain current preview wrapper/CSP rules and native validation. Add only the actual layout/enhancement and measured-budget impact. |
| Repository guidance / `AGENTS.md` | When authorized for that repository, remove obsolete navy/gradient/homepage-reference and earlier-tagline instructions; reference this v0.2 and the editorial image. Do not apply the historical handoff guidance as a visual override. |

Until reconciled, use the source precedence in section 1 and the retained contracts in section 3. Do not regenerate the website from an older local draft simply because it has a shorter filename.

## 14. Acceptance criteria — Proposal release gates

These criteria describe the later website implementation. The Markdown artifact can be complete while the website migration remains unimplemented. Keep design acceptance, functional checks, accessibility review, and measured performance results distinct.

### Direction and visual identity

- [ ] Every existing site route uses the same warm light canvas, near-black text, functional blue, and shared typography. Dark source panels and isolated example content are deliberate local exceptions.
- [ ] Wide articles visibly reflect the reference's rail / reading / contextual-outline composition, restrained rules, editorial hierarchy, and technical details. No inherited navy marketing hero, gradient headline, glow, or excessive card nesting remains.
- [ ] No horizontal reading-progress bar, percentage tracker, site moon button, dark-mode toggle, or automatic site dark theme appears.
- [ ] Current tagline is “See it. Build it. Understand it.” and article perspectives retain Article / Code / Preview order.
- [ ] Final font choice, actual source assets, licensing, and any visual deviations from the reference are recorded. Owner visual review is recorded separately from build success.

### Responsive and reading behavior

- [ ] Review at 320, 375, 768, 1024, 1280, and 1440 CSS pixels, plus just below/above the 64rem and 80rem transitions and a short 600px-height desktop viewport. No cropped content, sidebar collision, obscured focus, or horizontal page overflow.
- [ ] Reading container never exceeds 760px; prose measure is approximately 65–75 characters at the selected font. Smaller widths shrink/wrap naturally without reduced root size or fixed-height titles.
- [ ] Short/prose-only articles reserve no empty context column or image slot. Eligible long articles use the right outline only when space exists; compact layouts use the in-flow outline.
- [ ] Chapters number automatically, including 10+ chapters, from the same heading model as the TOC. Duplicate heading text still receives stable unique existing IDs; H3s remain unnumbered. No MDX author must maintain numbering/TOC fields.
- [ ] Active chapter behavior is deterministic before the first heading, at the last chapter, after resize/font load, and when returning from another perspective. Passive scrolling changes no URL/history/focus and produces no spoken live updates.
- [ ] Native chapter links, direct heading fragments, resource fragments that already exist, Back/Forward, and no-JavaScript reading/source navigation remain useful. Tracking failure leaves a valid static outline.

### Resources and protected contracts

- [ ] Exercise prose-only, code-only, preview-only, and mixed multi-example articles. Only real eligible perspectives/resources appear; editorial ordering and source consistency remain intact.
- [ ] Inspect a long filename/source line, an optional/missing cover, multiple authors, a long title, a broken preview, and a resource-unavailable fragment. None makes the article unreadable.
- [ ] Copy, tabs, selectors, search, and demo controls are either implemented and verified or omitted. No inert moon/search/window/Playground controls are introduced to imitate the screenshot.
- [ ] Confirm draft exclusion, future-date build failure, metadata/reference/path validation, source text preservation, canonical/SEO output, and publication-only asset emission with the actual repository's meaningful existing checks.
- [ ] Confirm both direct and embedded preview access retain the controlled CSP wrapper and sandbox. No same-origin capability, arbitrary companion emission, runtime source evaluation, or new module execution is enabled by restyling.
- [ ] Confirm hidden/inline/featured demos do not create duplicate running instances; preview failures keep reading/source/fallback routes available.

### Accessibility and resilience

- [ ] Record contrast results for normal, hover, selected, focus, code chrome/syntax, and semantic-status states in their actual backgrounds. Check links and selected nodes beyond color alone.
- [ ] Complete keyboard journeys through navigation, outline, available perspectives/files/examples, source scrolling, preview fallback, and Explorer when present. No trapped, clipped, lost, or hidden focus.
- [ ] Check 200% text resizing, 400% zoom/reflow, text-spacing overrides, forced colors, reduced motion, failed fonts, and JavaScript disabled/failed. Relevant content and navigation remain available.
- [ ] Spot-check a screen reader for landmarks, headings, ordered outline/current location, image alternatives, frame titles, and concise user-triggered status feedback. No decorative chapter-number duplication or continuous progress announcements.
- [ ] Print preview includes readable prose/source and useful fallback URLs without navigation/progress chrome or clipped code.
- [ ] Combine automated accessibility checks with manual review; record remaining issues rather than declaring compliance from a score.

### Performance and completion evidence

- [ ] Record production initial JS, font transfer, CSS contribution, selected image sizes, and optional preview costs against section 12. Any exception has a measured reason.
- [ ] Inspect representative mobile loading, font/image/frame shifts, scroll responsiveness, and preview activation. Identify lab measurements as lab data; claim field targets only with sufficient field evidence.
- [ ] Run the actual repository's applicable type/content checks, tests, and production build for implementation changes. No invented commands or fabricated pass results.
- [ ] Remove retired token consumers, stale gradient/dark selectors, temporary aliases, duplicate font requests, and conflicting visual references from the implemented scope.
- [ ] Record what is implemented, which Proposal defaults were adopted, remaining Open/Later work, and owner acceptance separately. Publishing/deployment is a separate authorized action.

## 15. Open decisions and Later scope

| Status | Item | Current working position |
|---|---|---|
| **Open** | Sans replacement and exact typographic tuning | Space Grotesk + Fira Code proposed; retain Plus Jakarta Sans temporarily if reading/budget checks fail. |
| **Open** | Final logo asset and navigation hierarchy | Stacked text lockup + blue slash; Home / Articles / About and category access proposed. Preserve real destinations. |
| **Open** | Homepage editorial composition | Apply shared light identity; review a dedicated homepage mockup before locking placement. Explorer and random discovery remain in scope. |
| **Open** | Outline eligibility and numerical tuning | At least three H2s and five estimated minutes; test real content, especially unusually long short-structure articles. |
| **Open** | Final illustration/cover assets | Optional, purposeful, properly licensed, responsive, and within the existing image contract. |
| **Open** | Perspective fragment convention and remaining feature delivery | Existing working links preserved; canonical fragment API not decided by the visual revision. |
| **Open** | Exact budgets and breakpoint fit | Concrete defaults above; validate against production measurements and actual content. |
| **Open** | Source-range extraction, repository topology, remaining interface copy | Keep existing contracts and known destinations; no new assumptions in the UI. |
| **Later** | Site dark theme / persisted appearance preferences | Separate design, contrast, asset, and performance review; no v1 toggle or automatic theme switch. |
| **Later** | Editable Playground, user-created examples, remote execution, richer IDE features | Separate product/security scope; never implied by Code or Preview. |
| **Later** | Newsletter/subscriptions, accounts, comments, AI services | Require a separate product decision and real implementation. |

## 16. Revision record

| Version | Date | Change |
|---|---|---|
| 0.1 | 12 October 2026; subsequent implementation notes in supplied attachments | Dark-navy baseline, BBF-002 token/font infrastructure and tagline, BBF-003 reading/example work. Historical details retained in the source snapshots. |
| **0.2** | **19 October 2026** | Replaces the visual direction with Engineering Editorial × Interactive Learning, one light identity, responsive rail/reading/outline composition, chapter orientation, semantic tokens, migration rules, and acceptance gates. Preserves product/content/preview contracts and distinguishes confirmed decisions from proposals and implementation status. |
