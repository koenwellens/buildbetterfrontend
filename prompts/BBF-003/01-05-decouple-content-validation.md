# BBF-003 — Decouple Content Validation

The independent architecture review approved the
simplified content architecture.

One optional maintainability improvement remains:
mandatory content validation currently depends on
the homepage rendering.

## Objective

Move the existing production content validation
invocation from `src/pages/index.astro` to a
project-wide Astro prerender middleware.

## Requirements

- Reuse the existing validation implementation.
- Follow the installed Astro version's middleware API.
- Ensure invalid published content fails production builds.
- Ensure validation remains independent of homepage content.
- Preserve static generation.
- Avoid redundant validation executions where practical.
- Do not introduce a new validation framework.
- Do not change content schemas or publication rules.

## Verification

- Confirm valid production builds succeed.
- Confirm missing references fail builds.
- Confirm future-dated articles fail builds.
- Confirm validation still runs when the homepage no
  longer invokes it.
- Run existing tests, checks, and production build.

Update the BBF-003 implementation record.

Keep owner acceptance pending until explicitly confirmed.

Do not start article rendering.