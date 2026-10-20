# Build Better Frontend — Product Specification

Version: **0.2** · Editorial direction alignment · **19 October 2026**

## Document status and ownership

This document defines the publication, audience, editorial direction, and release scope. Read it alongside [Design system](design-system.md), [Article experience](article-experience.md), and [Architecture](architecture.md).

Status labels used throughout these documents:

- **Confirmed:** explicitly selected by the owner or an existing contract recorded in the supplied implementation history.
- **Proposal:** a concrete specification carried forward from the earlier draft or added to complete it; it is not a previously approved decision.
- **Open:** a choice that remains unresolved.
- **Later:** outside v1; inclusion in a mock-up does not bring it into scope.

Confirmed decisions take precedence over proposals. Product owns scope, Design owns visual rules, Article experience owns the content contract, and Architecture owns implementation boundaries. The attached mock-up establishes visual direction; functional scope comes from these documents. These are specifications, not implementation prompts. Adopted implementation choices are recorded separately from owner acceptance. The v0.2 documents are the current specification set; v0.1 snapshots and earlier mock-ups are historical references, not active overrides. Implementation status is carried forward from the supplied BBF documents and has not been independently verified in the website repository during this documentation task.

## Confirmed decisions

| Area | Decision |
|---|---|
| Identity | Build Better Frontend (BBF), an independent frontend developer brand |
| Technology | Astro + TypeScript + MDX |
| Editorial cadence | Three articles per month: one tip, one deep dive, one Building with Codex article |
| Visual direction | Engineering Editorial × Interactive Learning; one consistent light editorial identity across the site, based on the new article reference |
| Typography governance | Design system v0.2 owns the proposed font revision; Fira Code is retained. Plus Jakarta Sans is the existing implementation, and Space Grotesk is a replacement proposal pending reading/performance review. |
| Tagline | See it. Build it. Understand it. — selected in BBF-002 |
| Discovery | Homepage Frontend Explorer searches and discovers existing articles without an AI backend |
| Random discovery | Offer a randomly selected published article; final label remains open |
| Learning experience | Article / Code / Preview perspectives; multiple examples per article |
| Quality | Accessibility, SEO, and performance are core concerns |
| Source access | GitHub repositories support practical learning and reusable examples |
| Future interaction | Playground is optional and later |
| Current phase | Supplied baseline through BBF-003/02a: static reading, source display, and protected isolated HTML previews. Editorial migration, perspective navigation, copy actions, discovery, and full homepage remain pending. |
| Reading orientation | Desktop left rail, central reading, optional right TOC for long articles; automatic subtle chapter numbers and vertical chapter progress; compact layouts have no permanent sidebars |
| Theme scope | Light site in v1; dark source panels are local technical surfaces. No horizontal duplicate progress or site dark toggle. |

## Product identity

**Name:** Build Better Frontend  
**Abbreviation:** BBF  
**Configured canonical origin (BBF-001):** https://buildbetterfrontend.com  
**Confirmed tagline (BBF-002):** See it. Build it. Understand it.

Earlier references may retain obsolete copy. The BBF-002 tagline remains authoritative; Article / Code / Preview labels and order are unchanged.

The configured canonical origin is not a claim that hosting or domain configuration has been completed. The English website and English specification language are carried forward from the earlier blueprint.

### Mission

Help frontend developers improve their craft through practical knowledge, real code, and working examples.

### Positioning

BBF is an independent frontend engineering publication. The publication is the primary identity; authors receive clear credit without turning the homepage into a personal portfolio.

Its subject is frontend engineering across frameworks: HTML, CSS, JavaScript, architecture, accessibility, performance, and practical framework techniques, including Angular. AI-assisted development is one editorial pillar rather than the identity of the entire site.

### Audience

Frontend developers across experience levels who want to understand a technique, inspect its implementation, and see its result. Articles should explain prerequisites and tradeoffs so readers can judge whether an approach fits their own work.

### Principles carried forward

1. **Design is a feature.** The interface contributes to the publication's credibility through accessible interactions, responsive layout, considered typography, progressive enhancement, and measurable performance.
2. **Content comes first.** Publishing an ordinary article should not require new routing or layout development.
3. **Progressive enhancement.** Reading and navigation remain useful when optional interactions are unavailable.

## Editorial model

| Public category | Purpose | Target cadence | Adopted internal key |
|---|---|---|---|
| Frontend Tips | Short, actionable techniques | One per month | `tips` |
| Deep Dives | Detailed technical explanations and tradeoffs | One per month | `deep-dives` |
| Building with Codex | Hands-on experiments, workflows, and their results | One per month | `codex` |

Three articles per month is an editorial target, not a release prerequisite or a promise displayed as a publishing countdown. Cards and discovery should show real published content, even when fewer articles exist.

Proposed editorial rules:

- Explain both how a technique works and why it matters.
- Use concrete examples and state important limitations.
- Separate experience, opinion, and measured results from general claims.
- Link to relevant primary references and GitHub source where available.
- Evaluate Codex workflows independently, including failures and limitations; avoid promotional conclusions presented as objective evidence.
- Show publication dates and meaningful updates accurately.
- Use accessible text alternatives and readable code examples.

## V1 scope

### Confirmed core

- Responsive homepage following the shared light editorial direction. Its detailed composition remains Proposal pending a dedicated homepage mockup.
- Frontend Explorer for existing content, including random article discovery.
- MDX articles with an Article perspective and conditional Code / Preview perspectives.
- Support for multiple examples, including code-only or preview-only examples.
- Three editorial categories and visible GitHub links where resources exist.
- Accessible navigation and reading, indexable content, and a lightweight delivery model.

### Proposed supporting baseline carried forward

- All-articles listing and category archives.
- About page focused on the publication's mission and people.
- Author pages containing a bio, actual links, and published contributions.
- Topic discovery using real article tags.
- Sitemap, RSS, social metadata, and a useful 404 page.
- Public website repository and a reproducible static deployment workflow.

These supporting pages and delivery details remain proposals rather than new confirmed commitments. Dedicated topic archives can wait; clickable topic filters satisfy initial discovery.

### Route map — adopted article route, remaining proposals

| Route | Purpose |
|---|---|
| `/` | Homepage and Frontend Explorer |
| `/articles/` | Published article archive |
| `/articles/[slug]/` | Canonical article page; adopted in BBF-003/02, with slug derived from the article filename |
| `/tips/` | Frontend Tips archive |
| `/deep-dives/` | Deep Dives archive |
| `/codex/` | Building with Codex archive |
| `/about/` | Publication mission and people |
| `/authors/[slug]/` | Author biography and articles |
| `/topics/` | Optional topic directory within the proposed baseline |

If topic detail pages are added, their exact routes remain open. `/` exists as a minimal validation page and `/articles/[slug]/` is documented as implemented; their full product experiences are not all delivered. Remaining route entries are proposals. Preserve actual existing URLs when implementing the redesign.

## Visual identity and homepage experience

**Confirmed:** Engineering Editorial × Interactive Learning is the identity of the entire site, including discovery and utility states. The [primary editorial article reference](reference/bbf-editorial-article-mockup.png) establishes visual language and article composition. It does not establish an approved homepage layout. [Design system v0.2](design-system.md) owns concrete visual proposals and acceptance criteria.

Use warm off-white, near-black type, functional electric blue, restrained orange illustration accents, fine rules, expressive headings, and focused code panels. The desktop rail, reading column, and optional contextual TOC adapt to content and available space. Short articles and non-article pages reserve no empty outline column. Automatic numbering and progress add no required author metadata. No horizontal reading-progress bar, percentage tracker, or site theme toggle in v1.

**Proposal, pending a separate homepage mockup:**

1. Publication introduction with the confirmed tagline and concise mission.
2. Prominent Frontend Explorer with search, real topic/code filters, and random discovery.
3. Latest published articles with category access and resource indicators.
4. An optional featured learning experience drawn from a real article and the same example sources.

This is the provisional reading order; an editorial featured treatment may alter visual prominence while keeping a meaningful DOM order. The previous mandatory split hero, gradient headline, translucent technology layers, and right-hand Explorer placement are superseded visual treatments. Explorer functionality remains confirmed and discoverable; changing composition does not authorize hiding or removing it. Separate category cards remain optional.

Proposed functional mapping:

- A latest-content action links to the actual latest-articles section.
- Topic discovery links to real Explorer topic controls.
- A search action from another page links to the real Explorer location once available.
- Archive and article links use actual implemented destinations.
- The featured experience is omitted if no suitable published article exists.

Do not add placeholder controls for pending functionality. The old [navy homepage reference](reference/bbf-homepage-mockup.png) is historical, not the current visual acceptance target.

## Frontend Explorer

### Confirmed purpose

Search and discover articles already published by BBF. V1 provides no generated answers, AI backend, chat history, or arbitrary code generation.

### Proposed interaction contract

- Search title, description, category, and topic tags.
- Use a clear label such as “Search published frontend articles.” Any introductory question must make the published-content search purpose explicit.
- Show article results with title, category, description, and resource availability.
- Popular-topic chips apply a real topic filter. Their contents come from published content or editorial curation.
- Interpret “Include code examples” as a filter for articles with at least one source file. Proposed clearer label: “Only articles with code examples.”
- Provide idle, loading, results, no-results, and load-error states; never present generated-response styling.
- Keep results and filter changes keyboard accessible and announce concise status changes.
- Provide ordinary archive links when the interactive search is unavailable.

Random discovery chooses from eligible published articles. Proposed behavior: respect active topic and code filters, ignore free-text search, and say so near the action. If there are no eligible articles, explain the empty state. With one eligible article, selecting it remains valid. The final CTA wording is open; “Discover an article” is a working proposal, not a settled label.

## Scope boundaries and mock-up reconciliation

| Element | V1 treatment |
|---|---|
| “Subscribe” button | Omit until an actual subscription mechanism is separately selected |
| “Beta” Explorer badge | Optional editorial label; not required and not evidence of AI functionality |
| “Open in playground” | Omit in v1; reserve for a later working Playground |
| Sample article dates, bios, and links | Illustration only; replace with verified published content |
| Preview sliders and viewport controls | Include only when implemented for that particular example |
| Social icons | Show only when actual destination URLs exist |
| Footer | Quiet functional addition using actual links; rail footnote does not replace necessary page information |
| Moon icon / horizontal progress | Omit from the site in v1; use the vertical chapter outline as the sole dedicated progress treatment |
| Example steps in the new reference | Local example controls only; do not change article perspectives or require a global wizard |
| “Frontend Architecture” topic | A topic label, not a fourth editorial pillar |

Other proposed v1 exclusions carried forward: accounts, comments, user-generated content, a custom CMS, general-purpose live execution, analytics dashboards, and newsletter infrastructure. These should require a separate scope decision before being added.

## Release acceptance proposal

V1 is ready when readers can discover and read real content on mobile and desktop, use available code and previews, follow working source links, and navigate with a keyboard. A new ordinary article can be added without changing shared layouts or routes. Search excludes unpublished material. No mock-up-only control appears as a nonfunctional promise.

Visual review should compare the article composition and shared identity to the new editorial reference. Homepage composition needs its own review; an article screenshot is not evidence of an approved homepage layout. Use [Design system v0.2](design-system.md) for responsive, visual, and accessibility acceptance, and [Architecture](architecture.md) for technical/SEO/performance checks. A documentation update does not mean the visual migration or pending features have been implemented.

## Open choices

| Choice | Current proposal / boundary |
|---|---|
| Random-discovery label | “Discover an article”; final wording open |
| Explorer question and code-filter copy | Clear search wording; final copy open |
| Supporting pages and exact routes | Proposed map above |
| Initial articles, author bio, social URLs | Supply real editorial content before publication |
| Hosting, domain setup, and licenses | Unselected; see Architecture |
| Sans replacement, final wordmark, homepage composition | Proposal/Open in Design system v0.2; no new font or layout acceptance implied |
| Dark site theme, subscriptions, AI, Playground | Later, only after a separate decision; the light site is the confirmed v1 direction |

## Revision record

- **0.2 · 19 October 2026:** aligned the product with the confirmed light editorial direction and current companion documents. Preserved mission, cadence, categories, tagline, discovery, learning model, and feature scope. Recorded existing implementation separately from pending work; no product feature is declared complete by this revision.
