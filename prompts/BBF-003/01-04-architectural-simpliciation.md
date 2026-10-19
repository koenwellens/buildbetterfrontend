# BBF-003 — Content Architecture Simplification

We are simplifying the content architecture of Build Better Frontend.

This task follows an independent architectural review that
concluded that the content model is appropriate, but the custom
publication pipeline is disproportionate to BBF's needs.

The repository owner has explicitly approved replacing the
current publication infrastructure with a simpler Astro-native
architecture and a directory-based draft workflow.

This is a refactoring task, not a feature implementation.

## 1. Read before making changes

Read:

- `AGENTS.md`
- `docs/product.md`
- `docs/architecture.md`
- `docs/article-experience.md`
- `prompts/README.md`
- `prompts/BBF-003/README.md`

Review the existing BBF-003 implementation, remediation
history, architectural review, and relevant tests.

Inspect the installed Astro version and its official
documentation before selecting framework APIs.

Do not assume existing custom infrastructure must be preserved.

## 2. Objective

Replace unnecessary custom content infrastructure with
Astro's native capabilities.

Preserve the actual product requirements:

- Articles written in MDX.
- Structured article metadata.
- Author references.
- Ordered example references.
- Multiple examples per article.
- Optional source code and previews.
- One authoritative source for example implementations.
- Article / Code / Preview availability.
- Safe and predictable publication.
- Build-time validation of published content.

The result must be simpler to understand, maintain,
and extend than the current implementation.

Do not introduce replacement abstractions that recreate
the complexity being removed.

## 3. Publication model

The repository owner has approved a directory-based
publication workflow.

Use the following conceptual structure:

src/
content/
articles/
authors/
drafts/
examples/

Adjust existing locations only where necessary.

### Published articles

`src/content/articles/` contains publishable articles.

These articles are processed through Astro Content
Collections and normal MDX compilation.

All articles in this collection are intended for
publication.

Do not use a draft flag to control publication.

Do not implement scheduled publication.

Retain `publishedAt` as editorial metadata.

Reject articles with publication dates in the future.

### Draft articles

`src/drafts/` contains unpublished articles.

Drafts must not:

- Become public article routes.
- Appear in article collections or discovery results.
- Contribute assets to production output.
- Be compiled during production builds.
- Be registered as production MDX modules.

Do not import or register the drafts directory in the
production content configuration.

Publication consists of moving an article into the
published article collection and performing the normal
validation and deployment workflow.

Do not create branch-based publication infrastructure.

### Draft validation

Production builds are not responsible for validating drafts.

Drafts are validated when actively developed or before
publication, using normal Astro-compatible tooling.

Do not build a separate MDX compiler or import validator
for drafts.

Document a practical workflow for validating an article
before publication.

Keep that workflow simple and avoid mutating production
content as a side effect of validation.

## 4. Native Astro collections

Use Astro's supported Content Layer APIs.

Implement native collections for:

- Articles.
- Authors.
- Example metadata, where appropriate.

Prefer:

- Native collection loaders.
- Astro schema validation.
- Native collection references.
- Normal MDX rendering.
- Standard static generation.

Preserve existing useful metadata and identifiers.

Avoid unnecessary schema changes.

Do not create custom collection loading infrastructure
unless a concrete requirement cannot be satisfied by Astro.

### Reference validation

Missing author or example references must cause
a production validation failure.

Do not assume native reference diagnostics automatically
fail the build.

Verify the installed Astro version's behavior.

Add a small explicit fail-fast validation boundary if
native reference validation is insufficient.

Avoid rebuilding the previous catalog validation system.

## 5. Example model

Preserve the existing example capabilities.

An article may contain:

- No examples.
- One example.
- Multiple ordered examples.

An example may contain:

- Source code only.
- Preview only.
- Both source code and preview.

Resource availability must be derived from real
validated resources.

Do not introduce manually maintained availability flags.

Preserve one authoritative source for each implementation.

Keep example references intuitive for article authors.

Prefer a simple metadata representation over a generic
resource registry.

### Source files

Retain focused validation for author-declared source files.

At minimum:

- Referenced files must exist.
- Paths must stay within approved locations.
- Unsupported file types must be rejected.
- Source text must be readable.
- Errors must identify the affected example.

Preserve meaningful symlink containment protection.

Do not recreate a general-purpose module resolver.

### Previews

Preserve the explicit registry of reviewed previews.

Do not implement preview rendering in this task.

Avoid duplicating preview metadata across unrelated
configuration files.

Keep the model ready for the next BBF-003 step.

## 6. Remove unnecessary infrastructure

Evaluate and simplify or remove the existing custom
content modules.

In particular, investigate:

- Custom article loaders.
- Separate MDX compilation.
- Custom MDX import validation.
- Module-registration interception.
- Duplicate author loading.
- Redundant catalog resolution.
- Custom cache management.
- Duplicate schema validation.

Use native Astro behavior instead wherever practical.

Remove obsolete tests and code associated exclusively
with removed infrastructure.

Do not retain unused compatibility layers.

Do not introduce new abstractions merely to preserve
the previous file organization.

The expected outcome is a smaller and clearer system.

## 7. Publication safety

Implement focused checks for the new publication model.

Verify that:

1. Published articles compile normally.
2. Missing references fail production validation.
3. Invalid metadata fails validation.
4. Future publication dates fail validation.
5. Drafts are excluded from published collections.
6. Draft-only assets are absent from production output.
7. Unpublished MDX is not compiled during production builds.

Use actual Astro builds for the relevant integration tests.

Include a draft that imports a uniquely identifiable CSS
asset and verify that this asset is absent from `dist/`.

Also verify that publishing the same article through the
normal collection causes Astro to process its imports.

Do not rely exclusively on checking generated HTML routes.

## 8. Testing strategy

Preserve meaningful product-level tests.

Tests should cover:

- Article metadata validation.
- Author references.
- Example references.
- Example ordering.
- Code-only examples.
- Preview-only examples.
- Mixed example resources.
- Articles without examples.
- Invalid source paths.
- Publication date validation.
- Draft isolation.
- Production artifact exclusion.

Remove tests that exist only to verify removed implementation
details such as custom import resolution or cache clearing.

Prefer a smaller suite of meaningful tests over a larger
suite tied to unnecessary infrastructure.

Do not remove coverage of a product requirement simply
to reduce the number of tests.

## 9. Update specifications

The approved publication architecture supersedes the
previous same-collection draft filtering strategy.

Update the relevant sections of:

- `docs/architecture.md`
- `docs/article-experience.md`

Document:

- The published article directory.
- The draft directory.
- The publication workflow.
- The validation boundary.
- The use of native Astro functionality.
- The remaining custom responsibilities.

Remove or explicitly supersede obsolete architectural
decisions.

Preserve unrelated confirmed requirements.

Keep the specifications consistent with the actual
implementation.

Do not rewrite the project's historical prompt files.

## 10. Scope restrictions

Do not implement:

- Article pages.
- Article / Code / Preview navigation.
- Code rendering components.
- Preview execution.
- Frontend Explorer.
- Homepage redesign.
- Category pages.
- Author profile pages.
- Playground functionality.
- CMS integration.
- AI functionality.
- Additional deployment features.

Do not introduce unnecessary dependencies.

Preserve the existing design system and unrelated work.

## 11. Verification

Run all relevant repository checks.

At minimum:

- Content synchronization.
- Type/content checks.
- Automated tests.
- Production build.
- Production artifact inspection.

Verify the new publication boundary using actual
Astro builds.

Pay particular attention to:

- Invalid published references.
- Future-dated published articles.
- Draft-only CSS assets.
- Draft-only JavaScript imports.
- Cold builds.
- Repeated builds after content changes.

Verify that removed infrastructure is no longer
referenced by production code.

Inspect the diff for unrelated changes.

Report any checks that could not be performed.

Do not claim success without verification.

## 12. Task documentation

Update:

`prompts/BBF-003/README.md`

Follow the documentation rules in `prompts/README.md`.

Document:

- The architectural decision.
- The changes made.
- Removed infrastructure.
- Retained functionality.
- Tests added, changed, or removed.
- Verification results.
- Remaining limitations.

Keep repository-owner approval pending.

Preserve historical prompts and review records.

Do not fabricate commits, pull requests, or review outcomes.

## 13. Completion criteria

This task is complete when:

- Native Astro collections handle content loading.
- The custom publication pipeline has been removed.
- Drafts are isolated from production compilation.
- Published content is validated appropriately.
- Author and example references remain reliable.
- Multiple examples and optional resources remain supported.
- The production build excludes draft-only assets.
- Existing useful content contracts are preserved.
- Relevant tests and checks pass.
- Documentation reflects the new architecture.
- The overall implementation is demonstrably simpler.

Do not start article rendering or perspective navigation.

Leave the implementation ready for an independent
architecture and correctness review.

## Final report

Provide:

1. Summary of the simplification.
2. Files and abstractions removed.
3. Remaining custom responsibilities.
4. Verification commands and results.
5. Any deviations from the approved architecture.
6. Remaining risks or limitations.
7. Updated task documentation location.

Do not mark the task as approved.