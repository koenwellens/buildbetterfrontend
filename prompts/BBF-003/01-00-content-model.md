# BBF-003 — Content Model and Validation

We are implementing the first step of BBF-003:
Article Experience Vertical Slice.

Before making changes, read:

- `AGENTS.md`
- `docs/product.md`
- `docs/design-system.md`
- `docs/article-experience.md`
- `docs/architecture.md`
- `prompts/README.md`
- `prompts/BBF-003/README.md`

Inspect the existing Astro project and follow its conventions.

Pay particular attention to the distinction between
confirmed decisions, proposals, open questions, and
future capabilities in the specifications.

## Objective

Implement the content model for Build Better Frontend.

Establish a maintainable, type-safe publishing foundation
using Astro Content Collections and MDX.

The content model must support:

- Articles.
- Authors.
- Multiple examples per article.
- Source code associated with examples.
- Working preview references.
- Optional resources.
- Publication eligibility.
- Build-time validation.

This task is strictly about content modeling, reference
resolution, and validation.

Do not implement article pages or interactive components yet.

## 1. Article collection

Implement an Astro Content Collection for articles.

Use Astro's supported Content Layer APIs for the installed
version, following the architecture specification.

The article model must support the metadata defined in
`docs/article-experience.md`.

At minimum, consider:

- Title.
- Description.
- Publication date.
- Optional updated date.
- Category.
- Tags.
- Author references.
- Draft status.
- Featured status.
- Optional cover image.
- Optional repository URL.
- Ordered example references.

Use appropriate schema validation.

Prefer Astro's native content collection capabilities.

Do not introduce a separate content management system.

Do not add fields without a concrete publishing need.

## 2. Article categories

Support the three editorial categories:

- Frontend Tips.
- Deep Dives.
- Building with Codex.

Use stable internal identifiers rather than storing
display labels repeatedly throughout the content.

Category metadata should be defined centrally.

Avoid creating a separate content collection solely for
three static categories unless the architecture
demonstrates a concrete reason.

Category-specific colors and visual styling belong to
the design system, not the article content model.

## 3. Author model

Implement structured author metadata and references.

Support multiple authors per article.

Use the author-related requirements in the specifications
to determine the actual schema.

Author references must resolve to existing author records.

Do not invent author biographies, profile images,
social profiles, or personal information.

Do not build author profile pages in this task.

Keep author metadata independent from article content.

## 4. Example model

This is a critical part of the implementation.

Articles must support zero, one, or multiple examples.

Each example should have a stable identifier and
structured metadata.

Examples may provide:

- Source code.
- A working preview.
- Both source code and preview.
- Optional repository references.
- Descriptive metadata.

The same example must be reusable by:

- Inline article examples.
- The article-level Code perspective.
- The article-level Preview perspective.
- Future featured article experiences.

There must be one authoritative source for each example.

Do not create separate copies of the same implementation
for different presentation contexts.

Choose a simple, explicit representation that works
naturally with Astro and TypeScript.

Avoid building a general-purpose plugin system.

## 5. Source code references

Define how examples reference their source files.

Requirements:

- Support relevant source file types.
- Preserve meaningful filenames.
- Support multiple files per example.
- Keep source file ordering deterministic.
- Make source content available for future Code rendering.
- Validate references to local source files.
- Prevent invalid or unintended file references.

Prefer build-time source resolution.

Do not require runtime GitHub API requests to display code.

Do not implement syntax-highlighted UI components yet.

Use the architecture specification for the intended
source loading and validation approach.

## 6. Preview references

Define how an example references a working preview.

Requirements:

- Preview resources are optional.
- Preview availability must reflect actual resources.
- Invalid preview references must be detected.
- Preview metadata must support future accessible rendering.
- The model must distinguish a working preview from a
  static image or explanatory screenshot.

Support the preview strategy described in
`docs/architecture.md`.

Do not implement preview components or runtime execution
infrastructure in this task.

Do not add support for arbitrary user-provided code.

Avoid premature abstractions for future frameworks.

## 7. Resource availability

Resource availability must be derived from validated
content and references.

Do not rely on manually maintained flags such as:

- `hasCode`
- `hasPreview`
- `hasPlayground`

when the actual resources can establish availability.

The model must support these cases:

1. Article without examples.
2. Article with a code-only example.
3. Article with a preview-only example.
4. Article with both code and preview.
5. Article with multiple mixed examples.

A missing optional resource must not cause the article
itself to become invalid.

An explicitly declared reference to a nonexistent
resource must be reported as invalid.

The future UI must be able to determine which
perspectives are available from this model.

Do not implement the perspective UI yet.

## 8. Publication eligibility

Implement the publication eligibility rules defined
in the architecture specification.

Ensure the same eligibility logic can later be reused
by:

- Article routes.
- Article listings.
- Category pages.
- Search.
- RSS.
- Sitemap generation.
- Publicly emitted example resources.

Draft or otherwise ineligible content must not
accidentally become publicly discoverable.

Distinguish between:

- Content that is intentionally excluded.
- Content that is invalid.

Invalid authored content must not silently disappear
without an actionable diagnostic.

Use the specification's selected behavior rather than
inventing a different publication policy.

## 9. Validation

Validate authored content at build time.

Include validation for:

- Required metadata.
- Category identifiers.
- Author references.
- Example references.
- Duplicate identifiers.
- Source file references.
- Preview references.
- Relevant publication constraints.

Errors should identify the affected article or example
and explain the problem clearly.

Avoid unnecessary runtime validation when equivalent
checks can be performed during the build.

Do not introduce an elaborate validation framework.

## 10. Development fixtures

Create the smallest representative set of development
fixtures needed to verify the content model.

Use the planned fluid typography example as inspiration
where useful.

Fixtures must cover the important resource combinations,
including multiple examples and missing optional resources.

Requirements:

- Clearly identify fixtures as development/test content.
- Do not present them as published BBF articles.
- Do not invent real author information.
- Do not expose fixtures through production article routes,
  feeds, search, or other public discovery mechanisms.
- Follow the architecture's selected publication eligibility
  and fixture isolation strategy.

Prefer test fixtures outside production content collections
when that is the simplest way to guarantee isolation.

Do not write a full editorial article in this task.

## 11. Testing

Add meaningful automated tests for the content model.

Focus on behavior rather than implementation details.

Test at least:

- Valid article metadata.
- Invalid article metadata.
- Valid author references.
- Missing author references.
- Valid example references.
- Missing example references.
- Duplicate identifiers.
- Code-only examples.
- Preview-only examples.
- Examples with both resources.
- Articles with multiple examples.
- Articles without examples.
- Publication eligibility.

Use the existing testing infrastructure if available.

If none exists, choose a minimal testing approach
appropriate for the project's TypeScript and Astro setup.

Explain any new dependency.

Do not introduce complex testing infrastructure.

## 12. Architecture and maintainability

Keep the implementation small and explicit.

Requirements:

- Use strict TypeScript.
- Define meaningful types at content boundaries.
- Avoid duplicated schema definitions.
- Avoid unnecessary runtime state.
- Avoid circular dependencies.
- Prefer straightforward reference resolution.
- Keep content loading independent of presentation components.
- Keep the model extensible without implementing future features.

Do not introduce:

- A database.
- An API server.
- A CMS.
- A generic content plugin architecture.
- A playground engine.
- A client-side content store.

Adding a normal article should not require modifying
shared routing, layouts, or application logic.

## 13. Verification

Run the relevant repository checks.

At minimum:

- Content/schema validation.
- Automated tests introduced by this task.
- Type checks.
- Production build.

Verify that:

- Valid content resolves correctly.
- Invalid content produces actionable errors.
- Optional resources are handled correctly.
- Multiple example references work.
- Development fixtures are excluded from public output.
- The production build does not expose draft content
  or development-only examples.

Inspect the generated production output where relevant.

Do not claim that checks passed unless executed.

Resolve errors introduced by this task.

## 14. Documentation

Update:

`prompts/BBF-003/README.md`

Follow the documentation rules in `prompts/README.md`.

Document:

- The implemented content model.
- How articles reference authors and examples.
- How source and preview availability is determined.
- How publication eligibility works.
- Validation and test results.
- Material architectural decisions.
- Dependencies added.
- Remaining limitations.

Update the relevant architecture or article-experience
specification when an implementation choice is adopted.

Do not silently change previously confirmed decisions.

Keep the human review status pending.

Do not modify this historical prompt.

Do not invent reviews, commits, or pull request references.

## Deliverables

1. Article Content Collection.
2. Structured author model.
3. Reusable example model.
4. Source and preview reference definitions.
5. Content reference resolution.
6. Build-time validation.
7. Publication eligibility logic.
8. Minimal development fixtures.
9. Meaningful automated tests.
10. Updated task documentation.

## Completion criteria

This implementation step is complete when:

- The article content model is operational.
- Article metadata is validated.
- Author and example references are validated.
- Multiple examples per article are supported.
- Optional code and preview resources are handled correctly.
- Publication eligibility follows the specifications.
- Development fixtures do not leak into production output.
- Automated tests and relevant checks pass.
- The implementation remains simple and maintainable.
- The task README records actual results.

Do not implement the article rendering layer yet.

Do not implement Article / Code / Preview navigation yet.

Do not start the next implementation step.

Leave the result ready for repository owner review.