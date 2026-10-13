# BBF-002 — Design System Foundation

## Objective

Establish the visual foundation of Build Better Frontend
using the approved design direction.

Implement the core design tokens, typography, global styles,
and reusable layout primitives needed to support a consistent,
responsive, and accessible interface.

The visual identity should reflect the dark Modern Engineering
and Developer Playground aesthetic defined in
`docs/design-system.md` and the homepage reference mock-up.

This task establishes the design foundation only.
The complete homepage, Frontend Explorer, and article
experience are outside its scope.

## Prompts

- [01 — Initial implementation](./01-initial.md)

## Implementation

**Status:** Implemented; repository owner review pending

Implemented centralized tokens, global defaults, CSS layout and visual
primitives, native local font configuration, and a minimal validation page.
Updated the approved tagline in current copy and specifications. Existing
Article / Code / Preview labels and historical prompts remain unchanged.

No dependencies added. The two licensed Latin variable WOFF2 font assets
are vendored from Fontsource 5.3.0 with their original license text in
`public/fonts/`, included in the static output. Astro's native local Fonts API
generates fingerprinted URLs and metric-adjusted fallbacks. The reading font
is preloaded; both fonts use swap. Package manifest and lockfile are unchanged.

The documented token proposals are adopted as initial defaults, with
40rem / 60rem gutter breakpoints and a 760px reading width. Shared patterns
are CSS rather than wrapper components. The homepage demonstrates the gradient,
tagline, typography, surface, and functional fragment links. It contains no
client scripts or full homepage/product features.

**Pull request:** /

## Verification

### Automated

- [x] `npm run check` — Passed; 0 errors, 0 warnings, 0 hints across 5 files.
- [x] `npm run build` — Passed; one static page, two fingerprinted fonts,
  and original font licenses. The initial sandboxed build failed because the
  native font bundler requires a temporary local HTTP listener; the retry
  with local network permission passed. Final build used Node 24.21.0 and
  npm 11.19.0, matching the established foundation.
- [x] Contrast calculations — Text/links on base, surface, and raised surface
  passed 4.5:1; category text on surface passed 4.5:1; control borders and
  focus indicators passed 3:1; light actions passed 4.5:1. Secondary text on
  base/surface measured 10.13:1 / 9.31:1. Gradient stops on navy exceed 5.3:1.
- [x] Production output inspected — HTML 3,187 bytes (1,158 gzip); CSS
  8,401 bytes (2,281 gzip); fonts 27,348 + 36,276 bytes. Zero production
  scripts; correct canonical URL and updated description.
- [x] Preserved-file hashes — Package manifest, lockfile, historical BBF-002
  prompt, and pre-existing BBF-001 README edits remained unchanged.
- [x] Documentation links — All 37 local Markdown link targets across nine
  current documents exist.
- [x] Final diff review and `git diff --check` — Passed; unrelated task prompt,
  BBF-001 documentation edits, and GitHub Pages workflow preserved.

### Agent browser inspection

- Production page inspected at 1440×1000, 768×1024, 375×812, and 320×800.
  No horizontal overflow; gutters measured 48px / 32px / 20px. Action targets
  measured about 52px high, wrapping to 77px at 320px.
- Tab focus showed a 2px cyan outline with 4px offset. Enter activated both
  fragment links and focus moved to the foundation target predictably.
- Reference comparison confirmed navy surfaces, restrained accents, gradient
  headline, and the approved font families. Full homepage composition deferred.
- Temporary localhost lab delayed font responses by one second. An initial
  375px CLS of 0.01745 exposed introduction wrapping; reserving three mobile
  lines reduced it to 0.000042. The 1440px result was 0.000058. Both fonts
  finished loading, and recorded resource requests were local. These are
  single-run lab observations, not field Core Web Vitals results.
- Reduced-motion stylesheet branch exercised in a temporary served copy:
  action and link transitions became 0s. The browser tool cannot emulate the
  OS preference; the actual system preference and forced-colors mode were
  not changed. No instrumentation or test routes exist in production.

### Limitations and scope

Font coverage is Latin normal style; additional scripts and true italics await
real content needs. This focused visual/keyboard/contrast review is not a full
WCAG conformance audit or cross-browser certification. The separately added
GitHub Pages workflow was inspected for commands and preserved; remote CI,
hosting, and publishing were not executed. No commit or PR was created by
this task, and BBF-003 was not started.

### Human review

- [x] Design system implementation reviewed — Pending
- [x] Desktop appearance reviewed — Pending
- [x] Mobile appearance reviewed — Pending
- [x] Repository owner review — Pending

## Lessons learned

Metric-adjusted fallback fonts reduce shifts but do not guarantee identical
line wrapping. Delaying font responses exposed a small movement that ordinary
cached screenshots did not reveal; reserving the short mobile introduction's
reading space addressed it without fixing or truncating longer copy.
