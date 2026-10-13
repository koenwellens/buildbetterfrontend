# Build Better Frontend

Repository instructions · v0.1 · 13 October 2026

Place this file at the root of the BBF website repository, alongside `docs/`. All paths below are relative to that repository root.

BBF is an independent, English-language frontend engineering publication. Its learning model is **Understand it. Build it. See it.** Build a maintainable publication that makes practical articles, real source code, and working examples easy to read and publish.

## Read the relevant specifications

Before making changes, read `docs/product.md` for scope and the documents relevant to the task:

| Task | Specification |
|---|---|
| Visuals, layout, styling, responsive behavior | `docs/design-system.md` |
| Articles, metadata, examples, perspective controls | `docs/article-experience.md` |
| Content loading, search, previews, SEO, delivery | `docs/architecture.md` |

For visual work, also inspect `docs/reference_image.png`.

Preserve the documents' distinction between **Confirmed**, **Proposal**, **Open**, and **Later**. Creating this file does not approve every proposal. Use applicable proposals as provisional defaults for reversible choices within the requested task, and report material choices. Record an adopted implementation choice in the relevant specification without claiming prior user approval. Ask for clarification only when a material conflict or unresolved choice prevents correct progress; continue independent work.

The current user request defines the task. Confirmed decisions take precedence over proposals. Product owns scope, Design owns presentation, Article experience owns the content contract, and Architecture owns delivery. The mock-up is a visual reference, not permission to add every pictured feature. Keep documentation consistent when authorized decisions change.

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

- Follow established repository conventions and the relevant architecture proposal. Prefer static content delivery and focused browser enhancements.
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
- Apply the selected publication-eligibility rule consistently to pages, cards, archives, search, RSS, sitemap, and publicly emitted example assets.
- Run reviewed authored demos only. Isolate previews according to their needs, use minimal permissions, and avoid duplicate running instances or leaking timers and listeners.
- Keep explanatory screenshots distinct from working previews. Link to real GitHub resources without requiring runtime GitHub API access for reading.

## Design and accessibility

Preserve the mock-up's dark navy identity, gradient hero headline, Explorer placement, compact article cards, and featured example composition. Use Plus Jakarta Sans for prose/interface text and Fira Code for code/technical labels. Consult the design system rather than reinterpreting the image for each page.

Keep reading pages quieter than the hero. Check mobile layout, long content, and missing optional resources. Use semantic HTML, accessible names, visible focus, appropriate contrast, keyboard-operable controls, and reduced-motion support. Apply enhanced tab semantics only when the controls actually behave as tabs. The detailed accessibility target remains identified in the design specification.

Every visible action must work or be clearly unavailable with a useful explanation. Decorative elements must not intercept input or carry essential meaning.

## Verification and handoff

Inspect the package manifest, lockfile, and CI configuration to find actual check commands. Run relevant type/content checks, tests, and production build for code changes. Do not invent commands or claim checks passed when they were not run. During bootstrap, establish and document suitable scripts; for documentation-only work, check consistency and referenced paths.

Add tests for meaningful behavior such as search/filter eligibility, publication exclusion, reference validation, mixed example resources, and navigation state. Avoid tests that merely repeat constants or low-impact markup.

For visible UI changes, inspect rendered pages at mobile and desktop widths, check keyboard operation, and compare screenshots with the reference where applicable. A successful build does not establish visual or accessibility quality. If a browser or check is unavailable, state the limitation clearly.

For affected pages, verify metadata and source links, inspect initial payload and layout shifts, and defer optional demo runtimes. Use the architecture's proposed performance budgets when applicable; distinguish measured results from targets.

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
