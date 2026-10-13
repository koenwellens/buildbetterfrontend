# Build Better Frontend — Product Specification

Version: 0.1 · Documentation baseline · 12 October 2026

## Document status and ownership

This document defines the publication, audience, editorial direction, and release scope. Read it alongside [Design system](design-system.md), [Article experience](article-experience.md), and [Architecture](architecture.md).

Status labels used throughout these documents:

- **Confirmed:** explicitly selected in the continuation request or clearly established in the preceding discussion.
- **Proposal:** a concrete specification carried forward from the earlier draft or added to complete it; it is not a previously approved decision.
- **Open:** a choice that remains unresolved.
- **Later:** outside v1; inclusion in a mock-up does not bring it into scope.

Confirmed decisions take precedence over proposals. Product owns scope, Design owns visual rules, Article experience owns the content contract, and Architecture owns implementation boundaries. The attached mock-up establishes visual direction; functional scope comes from these documents. These are specifications, not implementation prompts.

## Confirmed decisions

| Area | Decision |
|---|---|
| Identity | Build Better Frontend (BBF), an independent frontend developer brand |
| Technology | Astro + TypeScript + MDX |
| Editorial cadence | Three articles per month: one tip, one deep dive, one Building with Codex article |
| Visual direction | Modern technical design with dark navy surfaces, based on the latest mock-up |
| Typography | Plus Jakarta Sans and Fira Code |
| Discovery | Homepage Frontend Explorer searches and discovers existing articles without an AI backend |
| Random discovery | Offer a randomly selected published article; final label remains open |
| Learning experience | Article / Code / Preview perspectives; multiple examples per article |
| Quality | Accessibility, SEO, and performance are core concerns |
| Source access | GitHub repositories support practical learning and reusable examples |
| Future interaction | Playground is optional and later |
| Current phase | BBF-001 project foundation; homepage and publication features deferred |

## Product identity

**Name:** Build Better Frontend  
**Abbreviation:** BBF  
**Working domain from the earlier blueprint:** buildbetterfrontend.com  
**Tagline carried forward and shown in the mock-up:** Understand it. Build it. See it.

The working domain is not a claim that hosting or domain configuration has been completed. The English website and English specification language are carried forward from the earlier blueprint.

### Mission

Help frontend developers improve their craft through practical knowledge, real code, and working examples.

### Positioning

BBF is an independent frontend engineering publication. The publication is the primary identity; authors receive clear credit without turning the homepage into a personal portfolio.

Its subject is frontend engineering across frameworks: HTML, CSS, JavaScript, architecture, accessibility, performance, and practical framework techniques, including Angular. AI-assisted development is one editorial pillar rather than the identity of the entire site.

### Audience

Frontend developers across experience levels who want to understand a technique, inspect its implementation, and see its result. Articles should explain prerequisites and tradeoffs so readers can judge whether an approach fits their own work.

### Principles carried forward

1. **Design is a feature.** The publication itself should demonstrate thoughtful frontend craft.
2. **Content comes first.** Publishing an ordinary article should not require new routing or layout development.
3. **Progressive enhancement.** Reading and navigation remain useful when optional interactions are unavailable.

## Editorial model

| Public category | Purpose | Target cadence | Proposed internal key |
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

- Responsive homepage following the supplied visual direction.
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

### Proposed route map

| Route | Purpose |
|---|---|
| `/` | Homepage and Frontend Explorer |
| `/articles/` | Published article archive |
| `/articles/[slug]/` | Canonical article page |
| `/tips/` | Frontend Tips archive |
| `/deep-dives/` | Deep Dives archive |
| `/codex/` | Building with Codex archive |
| `/about/` | Publication mission and people |
| `/authors/[slug]/` | Author biography and articles |
| `/topics/` | Optional topic directory within the proposed baseline |

If topic detail pages are added, their exact routes remain open. All references to the route map in the other documents are conditional on this proposal.

## Homepage experience

The [supplied mock-up](reference_image.png) shows this composition:

1. Compact header: `// BBF`, Blog, Tips, Deep Dives, Codex, About, and secondary links.
2. Two-column hero: brand introduction on the left, Frontend Explorer on the right.
3. Three small feature highlights beneath the introduction: Practical articles, Real code, Live previews.
4. Latest articles, with one compact card for each category in the illustrated state.
5. Wide featured-article section demonstrating Article / Code / Preview.

The Explorer belongs inside the hero rather than replacing the publication's identity. On mobile, the reading order is brand introduction, highlights, Explorer, latest articles, featured article.

The earlier blueprint proposed three separate category cards. These are an **optional proposal**, not part of the supplied mock-up's visible composition and not a required additional homepage section. Category navigation and badges already expose the three pillars.

Proposed functional mapping:

- “Explore the latest” links to the latest-articles section.
- “Browse by topic” links to the Explorer's topic controls.
- Header search links to the Explorer, including from inner pages.
- “View all articles” leads to the archive.
- Article cards lead to their canonical article pages.
- The featured experience uses a real published article; omit the section if none is suitable.

## Frontend Explorer

### Confirmed purpose

Search and discover articles already published by BBF. V1 provides no generated answers, AI backend, chat history, or arbitrary code generation.

### Proposed interaction contract

- Search title, description, category, and topic tags.
- Use a clear label such as “Search published frontend articles.” The mock-up's question can remain introductory copy only when the search purpose is explicit.
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
| Footer | Proposed functional addition; not shown in the cropped mock-up |

Other proposed v1 exclusions carried forward: accounts, comments, user-generated content, a custom CMS, general-purpose live execution, analytics dashboards, and newsletter infrastructure. These should require a separate scope decision before being added.

## Release acceptance proposal

V1 is ready when readers can discover and read real content on mobile and desktop, use available code and previews, follow working source links, and navigate with a keyboard. A new ordinary article can be added without changing shared layouts or routes. Search excludes unpublished material. No mock-up-only control appears as a nonfunctional promise.

Visual review should compare the actual homepage to the supplied reference. Accessibility, SEO, performance, and deployment checks are detailed in [Architecture](architecture.md).

## Open choices

| Choice | Current proposal / boundary |
|---|---|
| Random-discovery label | “Discover an article”; final wording open |
| Explorer question and code-filter copy | Clear search wording; final copy open |
| Supporting pages and exact routes | Proposed map above |
| Initial articles, author bio, social URLs | Supply real editorial content before publication |
| Hosting, domain setup, and licenses | Unselected; see Architecture |
| Light theme, subscriptions, AI, Playground | Later, only after a separate decision |

