# BBF-003 — Content Architecture Simplification Review

Perform an independent architectural review of the
BBF-003/01 content model implementation.

This is an architectural reassessment, not a code review
or another remediation task.

Do not modify any files.

## Context

Build Better Frontend is a small, content-first developer
publication built with Astro, TypeScript, and MDX.

Its primary purpose is to publish approximately three
technical articles per month.

Articles may include:
- Regular MDX content.
- Syntax-highlighted code examples.
- Working frontend previews.
- Multiple examples per article.
- Optional links to public GitHub repositories.

The website must support Article / Code / Preview
perspectives, with Playground as a possible future feature.

The project currently has extensive custom infrastructure
for content loading, reference resolution, publication
eligibility, asset isolation, and import validation.

Several independent reviews have uncovered defects in
this infrastructure despite passing automated tests.

We need to determine whether the architecture is
proportionate to the actual product requirements.

## Read before reviewing

Read:

- AGENTS.md
- docs/product.md
- docs/architecture.md
- docs/article-experience.md
- prompts/README.md
- All existing BBF-003 implementation and remediation prompts
- BBF-003 implementation documentation

Inspect the actual implementation and relevant tests.

Check the official documentation for the installed Astro
version when assessing native framework capabilities.

Do not assume that custom infrastructure is necessary
simply because it already exists.

## 1. Identify the actual requirements

Separate the current architecture's responsibilities into:

A. Essential for BBF v1.
B. Useful but optional.
C. Unnecessary for the current product.
D. Better handled by Astro or existing tooling.

Pay particular attention to:

- Content Collections.
- MDX compilation.
- Article metadata validation.
- Author references.
- Example references.
- Source file resolution.
- Preview registration.
- Draft handling.
- Future publication dates.
- Publication eligibility.
- Asset isolation.
- Import validation.
- Caching.
- Build-time validation.

Distinguish confirmed product requirements from
implementation decisions adopted during BBF-003.

Do not treat existing complexity as a requirement.

## 2. Evaluate the current architecture

Assess:

- Number of custom abstractions.
- Responsibility boundaries.
- Integration with Astro.
- Duplication of framework functionality.
- Build-time behavior.
- Validation complexity.
- Caching and state management.
- Maintainability.
- Authoring experience.
- Test complexity.

Identify components that exist primarily to support
other custom infrastructure rather than actual
product functionality.

Explain which parts provide meaningful value and
which parts introduce avoidable complexity.

Use concrete file references.

## 3. Investigate a simpler Astro-native architecture

Design an alternative that relies as much as reasonably
possible on Astro's supported capabilities.

Consider:

- Native Content Collections.
- Standard MDX integration.
- Astro's schema validation.
- Conventional static routes.
- Simple article/example references.
- Build-time rendering.
- Explicit preview components.
- Git-based publication workflows.

Avoid introducing custom loaders, resolvers, validators,
or build plugins unless they solve a demonstrated need.

Investigate whether the content model can be simplified
without compromising the Article / Code / Preview concept.

Prioritize straightforward authoring and maintenance.

## 4. Reassess publication requirements

The current implementation attempts to validate all
authored MDX, including unpublished articles, while also
preventing unpublished content from contributing any
assets to production builds.

Evaluate whether this combination is necessary for BBF.

Compare practical approaches, including:

A. Filtering unpublished content from public routes.

B. Excluding unpublished content from production
compilation through an explicit publication workflow.

C. Keeping the existing strict validation and
asset-isolation architecture.

For each approach, explain:

- What is guaranteed.
- What is not guaranteed.
- How drafts are validated.
- Whether unpublished assets may be emitted.
- What happens with scheduled publication dates.
- How much custom infrastructure is necessary.
- What risks remain.

Do not silently weaken existing guarantees.

If simplifying the architecture requires changing a
confirmed requirement, explicitly identify that change
and request a product decision.

Do not assume that excluding routes also excludes assets.

## 5. Compare two architectural options

Evaluate:

### Option A — Retain and repair

Keep the current architecture and fix the remaining
validation defects.

### Option B — Simplify

Replace unnecessary custom infrastructure with a
more conventional Astro-native implementation.

Compare both options on:

- Correctness.
- Complexity.
- Maintainability.
- Authoring experience.
- Performance.
- Testability.
- Future extensibility.
- Migration effort.
- Risk of new regressions.

Provide concrete evidence rather than generic claims.

Do not favor either option merely because it requires
less immediate work or preserves more existing code.

## 6. Recommend a minimal architecture

Recommend the simplest architecture that satisfies
BBF's actual requirements.

Include:

- Proposed content organization.
- Article metadata model.
- Example representation.
- Preview strategy.
- Draft/publication workflow.
- Validation boundaries.
- Responsibilities delegated to Astro.
- Responsibilities requiring custom code.

Explain which existing files or abstractions could:

- Remain unchanged.
- Be simplified.
- Be removed.
- Be replaced by native functionality.

Do not propose a general-purpose content framework.

## 7. Migration considerations

If simplification is recommended, describe a safe,
incremental migration strategy.

Identify:

- Changes to existing specifications.
- Existing tests that remain valuable.
- Tests that should be replaced.
- New tests needed.
- Potential compatibility concerns.
- How to verify that the simplified implementation works.

Prioritize replacing complexity rather than layering
new abstractions on top of the old architecture.

Do not perform the migration.

## 8. Expected report

Provide the review using this structure:

### Executive summary

Briefly explain whether the current architecture is
appropriate for BBF's size and requirements.

### Requirement assessment

Classify the major existing responsibilities as
essential, optional, unnecessary, or framework-owned.

### Current architecture findings

Identify concrete sources of unnecessary complexity,
if any, with file references.

### Alternative architecture

Describe the proposed simpler solution.

### Comparison

Compare Option A and Option B.

### Recommendation

Give one clear recommendation with justification.

### Decisions required

List only material decisions that need repository-owner
approval before implementation.

### Migration plan

Provide a concise sequence of implementation steps.

### Risks and trade-offs

Explain what would be gained and what guarantees,
if any, would change.

## Constraints

- Do not modify code.
- Do not modify specifications.
- Do not create commits.
- Do not implement remediations.
- Do not start BBF-003/02.
- Do not introduce speculative future requirements.
- Do not recommend complexity solely for theoretical
  edge cases without assessing their practical relevance.

This review is intended to guide an explicit architectural
decision by the repository owner.

Do not mark BBF-003/01 as approved.