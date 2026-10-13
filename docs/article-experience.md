# Build Better Frontend — Article Experience and Content Model

Version: 0.1 · Documentation baseline · 12 October 2026

## Status and ownership

**Confirmed:** Article / Code / Preview perspectives, multiple examples per article, MDX content, accessibility, and GitHub source access. Playground is optional and **Later**.

**Proposal:** the field schemas, example organization, state behavior, fallback strategy, and validation rules below complete the earlier draft. The principle of one source of truth for an example is carried forward from that draft. Exact field names and URL conventions are not previously approved choices.

**Open:** final preview mechanism, field-schema implementation, repository topology, and final source-file structure.

Read [Product](product.md) for scope, [Design system](design-system.md) for presentation, and [Architecture](architecture.md) for delivery and isolation. Their status labels have the same meaning here.

## Core learning model

**Understand it. Build it. See it.**

| Perspective | Purpose | Availability |
|---|---|---|
| Article | Read the complete explanation | Every published article |
| Code | Inspect the implementation | At least one example has source files |
| Preview | Observe a working result | At least one example has a preview |
| Playground | Edit code and receive feedback | Later; never a v1 requirement |

Article is the primary unit. Examples are individually identified resources referenced by an article. A tip, deep dive, or Codex article may have zero, one, or several examples. Category does not dictate resource availability.

An article must make sense without changing perspectives. Code snippets, diagrams, screenshots, and explanatory text can appear in Article even if a separate Code or Preview perspective is unavailable. A screenshot is an illustration, not a working Preview.

## Proposed reader experience

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

## Proposed article metadata contract

| Field | Type | Required | Meaning |
|---|---|---|---|
| `title` | Nonempty string | Yes | Visible article title |
| `description` | Nonempty string | Yes | Summary for cards, search, and metadata |
| `publishedAt` | ISO date `YYYY-MM-DD` | Yes | Actual publication date |
| `updatedAt` | ISO date | No | Date of a meaningful content revision |
| `category` | `tips` / `deep-dives` / `codex` | Yes | One editorial pillar |
| `tags` | Unique string array | Yes | At least one real topic |
| `authors` | Author ID array | Yes | At least one valid author |
| `draft` | Boolean | Yes | Explicit editorial draft flag |
| `featured` | Boolean | No | Eligible for editorial featuring; default false |
| `coverImage` | Local image reference | No | Optional article image |
| `coverImageAlt` | String | If image exists | Description, or empty only when decorative |
| `repositoryUrl` | HTTPS URL | No | Article-level source repository |
| `examples` | Ordered example ID array | No | References, not embedded duplicate code |

The slug is derived from a stable content ID or filename. Proposed v1 rule: flat lowercase kebab-case article IDs. Avoid changing a published slug; use a redirect if a later correction requires it.

Reading time, canonical URL, category display label, and Code / Preview availability are derived. Do not make authors maintain flags that can drift from resources. Proposed reading-time rule: prose word count at 200 words/minute, round up, minimum one minute, labeled an estimate; omit source code from the word count.

Dates are editorial calendar dates, displayed without accidental timezone shifts. Publication eligibility, draft handling, and future dates use one shared rule in [Architecture](architecture.md).

### Illustrative MDX frontmatter

This is example documentation, not an already published BBF article. The referenced author and examples would need to exist in the implementation.

```yaml
---
title: A clever CSS trick for fluid type scales
description: Create responsive typography with CSS clamp() and inspect two working examples.
publishedAt: 2026-10-12
category: tips
tags:
  - css
  - typography
authors:
  - koen-wellens
draft: true
featured: false
examples:
  - fluid-heading
  - fluid-body
---
```

### Proposed author contract

| Field | Type | Required |
|---|---|---|
| `id` | Stable kebab-case ID | Yes |
| `name` | Nonempty display name | Yes |
| `bio` | Short biography | Yes |
| `avatar` | Local image reference | No |
| `links` | Named HTTPS links | No |

Author credit is always available. Dedicated author pages belong to the proposed supporting scope in Product. Do not fabricate a biography, avatar, affiliation, or social URL from the mock-up.

## Proposed example contract

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

### Source-file reference proposal

Each entry contains `id`, `label`, `language`, and `path`. The ID is unique within the example. The label is a reader-facing filename. The path resolves to a reviewed local source file inside the approved example directory; it must not permit arbitrary filesystem access.

The stored file supplies both displayed source and the demonstration wherever practical. If a framework build transforms source, show the authored source and identify it accurately. Generated bundles do not need to become the default Code view.

### Preview reference proposal

Use a small typed registry rather than storing executable component names or arbitrary HTML strings in article metadata. Proposed fields: `kind` (`trusted-component` or `isolated-page`) and `entry` (reviewed registry key). The registry resolves the component or static demo URL and its explicit permissions.

External demos may be linked as supporting resources. Embedding them is not part of the proposed default; it requires a specific decision about isolation, availability, privacy, and fallback behavior. A GitHub repository link alone does not make Preview available.

## Single-source example organization — proposal

```text
src/
├── content/
│   ├── articles/
│   │   └── fluid-typography.mdx
│   └── authors/
│       └── koen-wellens.json
└── examples/
    ├── registry.ts
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

This is an organizational proposal, not a demand for identical files in every example. Article-level references, inline blocks, Code, Preview, and homepage featuring resolve the same registry. An ordinary prose article requires only MDX metadata and body.

An inline snippet may intentionally show a focused extract from an example. Prefer deriving it from a source range or named region. If manually maintained, label it as an extract and check it against the actual example. Do not maintain three independently edited implementations in prose, Code, and Preview.

For separately hosted GitHub examples, use a stable path and preferably a release tag or commit representing the article. The repository topology remains open; avoid making live GitHub API access necessary for article rendering.

## Preview trust and isolation — proposal

The earlier draft stopped while introducing trusted and isolated examples. The following completes that proposal; it is not a claim that a security design was already approved.

- **Trusted component:** first-party reviewed demonstration integrated into the site. It can access the parent environment, so it needs scoped styles, bounded event handling, and deliberate cleanup. Use only for small examples that do not need isolation.
- **Isolated page:** separately built demonstration in a sandboxed iframe. Start with minimal permissions and add only the capabilities the demo needs. Scope navigation, storage, network use, and any cross-frame messages explicitly.

Do not combine same-origin access and script permissions for a same-origin iframe and assume it remains a reliable isolation boundary. If a demo requires origin-dependent capabilities, evaluate a separate origin or another deliberate delivery method. The iframe permission model is described in [MDN's iframe documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe).

V1 runs authored, reviewed examples only. It does not accept visitor-submitted code or evaluate source text from the Code panel. Sandbox flags and messaging belong to Architecture and remain subject to example-specific verification.

## Publishing workflow proposal

1. Add an MDX file with validated metadata and an explicit draft flag.
2. Write an explanation that stands on its own.
3. Reference existing examples or add reviewed sources/demos for new ones.
4. Add actual repository and reference links where useful.
5. Review reading, Code, Preview, example switching, mobile layout, and keyboard access.
6. Check metadata, dates, image alternatives, source consistency, and publication eligibility.
7. Publish through the repository workflow; regenerate article pages, discovery index, RSS, and sitemap together.

New ordinary articles must not require edits to generic route or layout code. New unusual demos may require a reviewed registry entry and custom example component; that is a content-specific exception, not a new article architecture.

## Validation and acceptance proposal

Fail a build for invalid category/date values, missing author/example references, duplicate IDs, missing source files, malformed preview registrations, and empty examples. An update date cannot precede publication. Draft exclusion is consistent across every public output.

Validate these representative cases before release:

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
| Draft or future publication | Absent from all production outputs |

## Open choices and later capabilities

Open: final schema implementation, preview runtime and permissions, source-range extraction, canonical fragment convention, reading-time tuning, and which repository structure to use.

Later: editable Playground, persisted reader preferences, sophisticated multi-file IDE features, user-created examples, and remote execution. Existing IDs, source references, and preview registrations should support a future extension without making v1 depend on it.

