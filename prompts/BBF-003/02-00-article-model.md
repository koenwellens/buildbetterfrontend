# BBF-003/02 — Article Rendering & Working Examples

We are implementing the second step of BBF-003:
Article Experience Vertical Slice.

The content architecture established in BBF-003/01 has been
simplified, reviewed, and accepted.

This task focuses on presenting existing content through
a beautiful, accessible, and maintainable article experience.

Do not redesign the content architecture.

## 1. Read before making changes

Read:

- `AGENTS.md`
- `docs/product.md`
- `docs/design-system.md`
- `docs/article-experience.md`
- `docs/architecture.md`
- `prompts/README.md`
- `prompts/BBF-003/README.md`

Inspect the existing Astro content collections, example model,
preview registry, design tokens, and shared styles.

Also inspect:

- `docs/reference/bbf-homepage-mockup.png`

Use the mock-up as a visual direction, not as an exact
article-page specification.

Follow the existing architecture and repository conventions.

## 2. Objective

Implement the article reading experience for BBF.

A visitor must be able to:

1. Open an article using its slug.
2. Read the complete article.
3. Understand its metadata and authorship.
4. Read syntax-highlighted code.
5. View working examples.
6. Navigate to associated source repositories when available.

The implementation must support articles containing
multiple examples and optional resources.

This step does not implement article-level
Article / Code / Preview perspective navigation.

That belongs to BBF-003/03.

## 3. Article routing

Implement the article route:

`/articles/[slug]`

Use Astro's native static routing and content rendering.

Requirements:

- Generate routes from the published article collection.
- Use the existing validated content model.
- Render MDX using Astro's supported APIs.
- Preserve filename-derived article identifiers.
- Do not introduce a second content loading mechanism.
- Do not include drafts.
- Do not bypass existing production validation.

An ordinary new article must not require changes to
the article routing implementation.

Keep route components focused on page composition.

Extract substantial independent sections into components.

## 4. Article layout

Create a dedicated article layout following the
approved BBF design system.

The design should feel like the same website as the
existing homepage, but with a quieter reading experience.

### Visual direction

Use:

- Deep navy backgrounds.
- Plus Jakarta Sans for prose and headings.
- Fira Code for code and technical labels.
- Subtle borders and surface separation.
- Restrained blue and violet accents.
- Comfortable spacing.
- Clear typography hierarchy.

Avoid:

- Excessive gradients.
- Large decorative animations.
- Unnecessary card nesting.
- Dashboard-like layouts.
- Distracting visual effects behind article text.

### Reading experience

Requirements:

- Comfortable reading width.
- Appropriate line lengths.
- Readable line heights.
- Responsive typography.
- Clear headings.
- Well-spaced paragraphs.
- Readable lists and blockquotes.
- Distinguishable inline code.
- Consistent link styling.
- Appropriate styling for tables and images.

Use the widths, spacing, typography, and colors
defined in `docs/design-system.md`.

Do not create a separate visual language for articles.

## 5. Article header

Implement a reusable article header.

Display available metadata:

- Category.
- Title.
- Description.
- Publication date.
- Updated date, when available.
- Author name or names.
- Estimated reading time.

Requirements:

- Use the existing article and author models.
- Do not duplicate author data in article components.
- Derive reading time from article content.
- Format dates consistently.
- Use semantic HTML.
- Handle optional metadata gracefully.
- Avoid empty placeholders.

Author names may link to future author profile routes
only when those destinations actually exist.

Do not create author profile pages in this task.

Do not create broken navigation links.

## 6. MDX article rendering

Render the complete article body using Astro's
official MDX integration.

Support normal technical writing elements:

- Headings.
- Paragraphs.
- Lists.
- Links.
- Blockquotes.
- Tables.
- Images.
- Inline code.
- Fenced code blocks.

Ensure article styles apply consistently to MDX output.

Avoid applying overly broad global selectors that
unintentionally affect unrelated components.

Prefer a scoped article content container.

The article must remain readable in the initial HTML.

JavaScript must not be required to read the article.

## 7. Syntax-highlighted code

Implement readable, syntax-highlighted code blocks.

Use Astro's existing or officially supported
syntax-highlighting capabilities where possible.

Requirements:

- Fira Code typography.
- Appropriate code font size and line height.
- Syntax highlighting consistent with the dark theme.
- Support common frontend languages:
  - HTML
  - CSS
  - JavaScript
  - TypeScript
  - JSON
  - Bash
- Preserve indentation and whitespace.
- Handle long lines without page-level horizontal overflow.
- Provide accessible contrast.
- Display language labels where practical.

Use an established syntax-highlighting mechanism.

Do not create a custom syntax parser.

Avoid unnecessary client-side highlighting libraries.

### Code examples

Render source files from the existing example model.

Preserve:

- Source filenames.
- Source ordering.
- Language information.
- Original source content.

Use the existing authoritative source references.

Do not duplicate implementation code in presentation
components.

A code-only example must render correctly without
requiring a preview.

A preview-only example must not display an empty
code panel.

### Copy functionality

A small copy-code action is allowed when it can be
implemented without introducing substantial complexity.

If implemented:

- Use accessible button semantics.
- Provide visible success or failure feedback.
- Preserve the non-JavaScript reading experience.
- Avoid unnecessary dependencies.

Do not implement a code editor.

## 8. Working previews

Implement the smallest working preview delivery
mechanism required for the approved example model.

Follow the existing preview registry and architecture
specification.

Requirements:

- Only explicitly registered previews may render.
- Use actual working examples, not screenshots.
- Respect the preview registry's permissions.
- Provide accessible titles or labels.
- Avoid unnecessary runtime permissions.
- Isolate preview execution appropriately.
- Avoid unwanted interaction with the parent page.
- Prevent layout overflow.
- Handle missing optional previews gracefully.

Prefer native browser and Astro capabilities.

Do not introduce a general-purpose preview framework.

Do not implement arbitrary code execution.

Do not introduce React, Vue, Angular, or other frameworks
solely to render the first example.

### Preview lifecycle

Where previews contain JavaScript:

- Avoid leaking timers or event listeners.
- Defer optional runtime work when appropriate.
- Respect reduced-motion preferences.
- Avoid running duplicate preview instances unnecessarily.

Keep implementation complexity proportional to
the actual demo.

## 9. Development example

Create one representative development-only article
to validate the complete rendering experience.

Suggested subject:

**Fluid Typography with CSS clamp()**

The example should demonstrate:

- MDX article rendering.
- Article metadata.
- Syntax-highlighted code.
- At least two example references.
- A code-only example.
- An example with code and a working preview.

The preview should visibly demonstrate responsive
typography using CSS clamp().

### Important constraints

This is a development fixture, not a published BBF article.

Do not invent author biographies or social links.

Do not present the example as real editorial content.

Do not permanently publish the fixture.

Use the existing draft workflow and publication boundary.

If a temporary published article is required for visual
verification, use a disposable working copy or another
controlled test setup.

Ensure development fixtures do not appear in the final
production output.

Do not create a new draft validation infrastructure.

## 10. Multiple examples

Validate that one article can contain multiple examples.

Requirements:

- Preserve the order defined by the article.
- Render examples consistently.
- Give each example a clear title.
- Support optional descriptions.
- Support code-only examples.
- Support preview-only examples.
- Support examples containing both.
- Avoid empty or disabled panels for missing resources.

For this step, examples may be displayed as ordinary
sections within the article.

Do not implement article-level perspective tabs yet.

Avoid duplicating example rendering logic.

The same example references must be usable by the
future Code and Preview perspectives.

## 11. GitHub repository links

Render optional repository links when present
in the existing content model.

Requirements:

- Use the actual configured repository URL.
- Do not fabricate URLs.
- Use accessible link text.
- Follow appropriate external-link conventions.
- Do not require runtime GitHub API calls.
- Omit the link when no repository is available.

Do not implement repository browsing or GitHub API
integration.

## 12. Responsive behavior

The article experience must work across:

- Mobile.
- Tablet.
- Desktop.

Pay particular attention to:

- Long article titles.
- Long code lines.
- Code block scrolling.
- Wide tables.
- Images.
- Preview dimensions.
- Multiple examples.
- Article metadata wrapping.

Do not allow page-level horizontal scrolling.

Use the established responsive design system.

Avoid introducing unnecessary breakpoints.

## 13. Accessibility

Follow the accessibility target defined in
`docs/design-system.md`.

Requirements:

- Semantic article structure.
- Correct heading hierarchy.
- Keyboard-operable controls.
- Visible focus indicators.
- Accessible code actions.
- Meaningful preview labels.
- Appropriate contrast.
- Reduced-motion support.
- Readable content without JavaScript.

Do not use ARIA tab semantics until actual tab
navigation is implemented in BBF-003/03.

Native HTML structure should remain the default.

## 14. SEO foundations

Use the existing site configuration and layout conventions.

Implement relevant article metadata:

- Document title.
- Meta description.
- Canonical URL.
- Appropriate Open Graph title and description.

Avoid duplicating SEO metadata generation logic.

Do not implement:

- RSS.
- Sitemap infrastructure.
- Automated social image generation.
- Structured-data frameworks.

Those belong to later publication and SEO work.

## 15. Architecture and maintainability

Preserve the simplified BBF-003/01 architecture.

Requirements:

- Use native Astro rendering.
- Reuse the existing content collections.
- Reuse validated example resources.
- Keep presentation separate from content resolution.
- Prefer focused Astro components.
- Use typed props.
- Keep styles consistent with the design system.
- Avoid unnecessary runtime JavaScript.
- Avoid introducing new dependencies without justification.

Do not recreate:

- Custom MDX loading.
- Custom content catalogs.
- Custom import validation.
- Separate MDX compilation pipelines.
- Custom publication filtering.
- General-purpose preview infrastructure.

The goal is to render content, not redesign how
content is managed.

## 16. Verification

Run the repository's relevant checks.

At minimum:

- Content validation.
- Type checks.
- Automated tests.
- Production build.

Add meaningful tests for:

- Published article route generation.
- MDX rendering.
- Article metadata.
- Multiple ordered examples.
- Code-only examples.
- Working previews.
- Missing optional resources.
- Production exclusion of development fixtures.

Use actual Astro rendering where relevant.

### Visual verification

Inspect the rendered article at:

- Mobile width.
- Tablet width.
- Desktop width.

Verify:

- Typography and spacing.
- Code readability.
- Preview rendering.
- Responsive behavior.
- Focus visibility.
- No horizontal page overflow.

Compare the appearance with the approved BBF
design system and visual reference.

The article should feel like part of the same brand.

If browser inspection is unavailable, report that
limitation explicitly.

Do not claim visual verification without performing it.

### Production artifact verification

Inspect the generated production output.

Confirm:

- No development articles were published.
- No draft-only assets were emitted.
- No unexpected scripts or dependencies were added.
- Published articles render correctly in controlled
  production-build tests.

## 17. Documentation

Update:

`prompts/BBF-003/README.md`

Follow the documentation requirements in
`prompts/README.md`.

Document:

- The article rendering implementation.
- Components introduced.
- Code highlighting approach.
- Preview delivery approach.
- Tests and verification results.
- Dependencies added, if any.
- Material implementation decisions.
- Remaining limitations.

Update the relevant specifications only when an
implementation decision needs to be recorded.

Do not silently change confirmed product decisions.

Preserve historical prompts.

Keep human review pending.

Do not invent commits, pull requests, or approvals.

## Deliverables

1. Static article routes.
2. Responsive article layout.
3. Article metadata presentation.
4. MDX content rendering.
5. Syntax-highlighted code blocks.
6. Source-file rendering.
7. Working preview support.
8. Multiple example rendering.
9. Optional repository links.
10. Representative development fixture.
11. Automated tests.
12. Updated task documentation.

## Completion criteria

This task is complete when:

- Published MDX articles generate valid static routes.
- Articles are readable without JavaScript.
- The article layout follows the BBF design system.
- Code examples are readable and syntax-highlighted.
- Working previews render correctly.
- Multiple examples work in their defined order.
- Optional resources are handled gracefully.
- Draft content remains excluded from production.
- Relevant automated checks pass.
- Desktop and mobile layouts have been inspected,
  or verification limitations are explicitly reported.
- The task README reflects the actual implementation.

Do not implement article-level Article / Code / Preview
navigation in this task.

Do not start BBF-003/03.

Leave the result ready for repository-owner review.

## Final report

Provide a concise summary of:

1. What was implemented.
2. Components and routes created.
3. How source code and previews are rendered.
4. Tests and checks performed.
5. Visual verification results.
6. Remaining limitations.
7. Any material architectural decisions.

Do not mark the implementation as owner-approved.