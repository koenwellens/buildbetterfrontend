# BBF-003 — Unpublished MDX Import Validation Remediation

Remediate the single blocking finding from the latest
independent review of BBF-003 step 1.

Read:
- AGENTS.md
- docs/article-experience.md
- docs/architecture.md
- The original BBF-003 content model prompt
- The previous remediation prompt
- The latest review findings

## Confirmed defect

Unpublished MDX articles are excluded from module registration
to prevent production asset leakage.

However, the replacement validation checks MDX syntax
without resolving statically declared local imports.

Consequently, draft and future articles can reference
nonexistent local CSS files without failing content
validation or production builds.

This violates the requirement to validate all authored
content, including unpublished articles.

## Objective

Restore validation of local imports in unpublished MDX
without compiling or executing those modules and without
emitting their assets.

Preserve all previously verified corrections.

## Requirements

1. Validate statically declared local imports in draft
   and future MDX articles.

2. Reject imports referencing nonexistent local resources.

3. Produce actionable diagnostics identifying:
  - The affected article.
  - The unresolved import.
  - The reason validation failed.

4. Do not execute imported modules during validation.

5. Do not introduce unpublished article assets into
   production output.

6. Preserve existing MDX syntax validation.

7. Preserve publication eligibility and caching behavior.

8. Follow the installed Astro and MDX versions.
   Do not assume undocumented compiler behavior.

Prefer existing tooling and narrowly scoped validation.
Avoid introducing a custom module resolver unless
necessary.

Clearly document the supported import semantics and
any remaining validation limitations.

## Regression tests

Add tests covering:

- Draft article importing nonexistent local CSS.
- Future article importing nonexistent local CSS.
- Valid local imports in unpublished articles.
- Missing imports detected during content sync.
- Missing imports detected during production builds.
- Cold and cached builds.
- No asset emission from unpublished articles.
- Successful rendering of eligible articles.

Where applicable, include another supported local
module type to avoid a CSS-only solution.

Tests must verify observable behavior rather than
implementation details.

## Constraints

Do not:
- Reintroduce asset leakage.
- Disable validation for unpublished articles.
- Change the publication eligibility policy.
- Implement article rendering or perspective navigation.
- Refactor unrelated content infrastructure.
- Add dependencies without concrete justification.

## Verification

Run the relevant tests, content sync, type checks,
and production build.

Independently inspect generated assets.

Verify both properties simultaneously:

1. Invalid unpublished imports fail validation.
2. Valid unpublished imports do not emit assets.

Inspect cold and cached build behavior.

## Documentation

Update the BBF-003 task README with:

- The defect.
- The implemented correction.
- Regression tests and results.
- Any remaining limitations.

Keep owner review pending.

Preserve historical prompt files unchanged.

## Completion

Report:

- Root cause.
- Correction implemented.
- Tests added.
- Verification results.
- Remaining limitations.

Do not begin BBF-003 step 2.