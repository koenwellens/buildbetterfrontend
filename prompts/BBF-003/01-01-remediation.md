# BBF-003/01a — Content Model Review Remediation

Remediate the confirmed findings from the independent
review of BBF-003/01.

Read:
- AGENTS.md
- docs/article-experience.md
- docs/architecture.md
- prompts/README.md
- prompts/BBF-003/01-content-model.md

Inspect the current implementation and reproduce the
reported defects before changing code.

## Scope

Address these findings:

### P1 — Draft and future article asset leakage

The reviewer demonstrated that CSS imported exclusively
by an unpublished MDX article can appear in production
output even when its HTML route is excluded.

Investigate Astro's content compilation and asset
emission behavior for the installed version.

Implement a solution that guarantees unpublished
article-specific assets are not emitted.

Requirements:

- Validate all authored content, including drafts.
- Prevent unpublished content from contributing
  article-specific assets to production output.
- Preserve the ability to render eligible MDX articles.
- Apply publication eligibility consistently.
- Avoid filtering only after compilation if that cannot
  prevent asset emission.
- Do not weaken validation or silently ignore invalid
  unpublished content.
- Avoid broad custom build infrastructure unless needed.

Add an integration test that renders an eligible article
and includes draft and future articles importing unique
CSS assets.

Inspect the actual production output and assert that
assets exclusive to unpublished articles are absent.

Do not consider this fixed merely because unpublished
HTML routes are absent.

### P2 — YAML publication dates

The documented frontmatter format:

publishedAt: 2026-10-12

must behave consistently with the selected content
schema and documentation.

Prefer supporting normal YAML date syntax when doing
so preserves strict calendar-date validation.

If an explicit quoted-string contract is substantially
simpler and justified, document that decision clearly.

Add an integration test using a real MDX file with
conventional YAML frontmatter.

Ensure invalid calendar dates remain rejected.

### P2 — Symlink file-type validation

The reviewer demonstrated that a permitted file
extension can resolve through a symlink to an
unsupported target type.

Update source and preview reference validation.

Requirements:

- Validate the declared path.
- Resolve symlinks.
- Validate the resolved target.
- Preserve approved-directory containment.
- Reject unsupported resolved file types.
- Preserve the distinction between working previews
  and static screenshots.

Add regression tests for internal symlinks targeting
unsupported source and preview file types.

### P3 — Review documentation

Correct the contradictory review checkbox in:

prompts/BBF-003/README.md

Keep repository owner approval pending.

Do not invent review acceptance.

## Explicitly deferred

Do not refactor repeated catalog resolution or
parallel author loading in this remediation unless
required to correct one of the confirmed defects.

Record the optional maintainability finding for
future consideration.

Do not implement article rendering, perspective tabs,
or unrelated functionality.

## Verification

Run all existing tests and new regression tests.

Run:
- Content validation/sync
- Type checks
- Production build
- Relevant integration tests

Verify the actual emitted production assets.

Inspect the diff for unrelated changes.

## Documentation

Update the BBF-003 task README with:

- The findings addressed.
- The corrections implemented.
- Regression tests added.
- Actual verification results.
- Remaining limitations.

Add this remediation prompt to the task's prompt history.

Preserve the original implementation prompt unchanged.

Keep human review pending.

## Completion

Report each finding separately as:

- Fixed
- Partially fixed
- Not fixed

Include relevant file references and verification evidence.

Do not begin BBF-003/02.