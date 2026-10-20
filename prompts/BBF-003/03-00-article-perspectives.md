# BBF-003/03 — Article Perspectives

Implement the final step of BBF-003:
Article / Code / Preview navigation.

This task completes the functional article experience.

The content model, article rendering, syntax highlighting,
and isolated preview delivery have already been implemented,
reviewed, and accepted.

A new visual direction has also been selected:

**Engineering Editorial × Interactive Learning**

The new design is described in `docs/design-system.md` v0.2.

This task must respect that direction without implementing
the complete visual redesign.

## 1. Read before implementation

Read:

- `AGENTS.md`
- `docs/product.md`
- `docs/design-system.md`
- `docs/article-experience.md`
- `docs/architecture.md`
- `prompts/README.md`
- `prompts/BBF-003/README.md`

Inspect the existing implementation of:

- Article routing and layouts.
- Article rendering.
- Example resolution.
- Code and source panels.
- Preview components.
- Preview registry and sandboxing.
- Existing article fragment identifiers.
- Shared styles and design tokens.

Inspect the new editorial article mock-up:

`docs/reference/bbf-editorial-article-mockup.png`

Use the new reference rather than the historical
dark homepage mock-up.

If companion specifications or AGENTS.md still contain
older visual guidance, follow the precedence rules
in the new design system.

Do not silently rewrite unrelated specifications.

## 2. Objective

Implement the three article perspectives:

1. Article
2. Code
3. Preview

Visitors should be able to switch between reading an
article, examining its implementation, and viewing
working examples.

The experience must support:

- Articles without examples.
- Articles with code-only examples.
- Articles with preview-only examples.
- Articles with both resources.
- Articles containing multiple ordered examples.

Use the existing content and example model.

Do not introduce a new content-loading architecture.

## 3. Preserve progressive enhancement

This is a fundamental requirement.

Without JavaScript:

- The complete article remains readable.
- Available source code remains accessible.
- Available previews remain accessible through existing
  sections or ordinary links.
- Existing fragment links continue working.

Do not render working tab semantics before the
corresponding interaction behavior is initialized.

The enhanced interface may hide inactive sections only
after successful initialization.

If initialization fails, the static content must
remain available.

Do not duplicate the article body merely to support
different perspectives.

Reuse existing rendered content and components.

## 4. Perspective availability

Derive available perspectives from the existing
validated example resources.

Rules:

- Article is always available.
- Code is available when at least one example has
  source code.
- Preview is available when at least one example has
  a working preview.

Do not introduce author-maintained booleans such as:

- hasCode
- hasPreview
- hasPlayground

When an article has no additional perspectives,
do not display a redundant tab bar.

When only one additional perspective is available,
display only that perspective alongside Article.

Do not render disabled placeholder tabs.

Preserve the perspective order:

Article → Code → Preview

## 5. Perspective navigation

Implement accessible navigation following the
WAI-ARIA Tabs Pattern.

Requirements:

- Correct tablist, tab, and tabpanel relationships.
- Stable, unique control and panel IDs.
- Accurate aria-selected states.
- Correct keyboard focus management.
- Visible focus indicators.
- Arrow-key navigation.
- Home and End keyboard support.
- Enter/Space activation where appropriate.

Use manual activation when switching perspectives
would activate or load a preview.

Switching perspectives must not automatically move
keyboard focus into an embedded preview.

Do not implement a general-purpose tab framework
unless existing reusable functionality justifies it.

Prefer a small, focused interaction module.

## 6. Article perspective

The Article perspective is the default.

It contains:

- The complete MDX reading experience.
- Existing inline code examples.
- Existing example references and relevant resources.
- The normal article heading structure.

Preserve the current article reading experience.

Do not move article content into JavaScript-generated markup.

Do not rebuild the article layout in this task.

The existing article content must remain accessible
when JavaScript is unavailable.

## 7. Code perspective

The Code perspective displays the source resources
associated with the article.

Requirements:

- Preserve example ordering.
- Preserve source-file ordering.
- Display actual source filenames.
- Display language information.
- Reuse existing server-rendered syntax highlighting.
- Preserve original source text.
- Reuse existing source components where practical.
- Include real repository links when available.
- Handle multiple examples.

Do not duplicate source definitions or create a second
source-loading mechanism.

### Multiple examples

Provide a simple way to select the relevant example.

When an example contains multiple files, provide
file navigation only when necessary.

Use descriptive names rather than generic labels
such as "Example 1" when meaningful names exist.

Avoid creating an IDE-like interface.

Do not implement editable code.

## 8. Preview perspective

The Preview perspective displays registered working
previews associated with the article.

Requirements:

- Use the existing approved preview registry.
- Preserve the current sandbox and CSP behavior.
- Preserve iframe titles and accessible labels.
- Preserve fallback links.
- Preserve preview resource permissions.
- Handle multiple previews.
- Handle preview loading and failure gracefully.

Do not modify the preview security architecture.

Do not enable unsupported preview capabilities.

In particular, do not introduce:

- Arbitrary code execution.
- New iframe permissions.
- Same-origin execution.
- ES-module execution support.
- A preview bundler.
- A Playground editor.

### Preview lifecycle

Avoid loading or running unnecessary duplicate
preview instances.

Reuse the existing preview components.

When a preview is not selected or visible, avoid
unnecessary runtime activity where practical.

Do not destroy the source or article experience
when a preview fails.

## 9. Example selection

Support multiple examples within Code and Preview.

Requirements:

- Preserve the article's editorial example order.
- Clearly identify the selected example.
- Use accessible controls.
- Keep example and file selection distinct.
- Handle optional resources correctly.

When switching between Code and Preview:

- Preserve the selected example if it supports both
  perspectives.
- Otherwise select the first eligible example in
  editorial order.
- Make that selection visible to the visitor.

Do not introduce complex global state management.

Keep state local to the article experience.

## 10. Fragment navigation and browser history

Preserve existing working fragment identifiers.

Inspect the current article-experience specification
before choosing URL behavior.

The proposed fragment convention is not automatically
an approved public API.

Implement the smallest coherent navigation behavior
that supports the existing contract.

Requirements:

- Existing heading links remain functional.
- Existing source and preview links remain functional.
- Direct navigation to valid resource fragments works.
- Browser Back and Forward behave predictably.
- Invalid or unavailable targets leave the visitor
  in a usable state.
- Do not introduce conflicting fragment identifiers.

If a new URL convention is genuinely required,
document the proposed contract and its compatibility
implications before adopting it.

Do not silently rename existing anchors.

## 11. Visual presentation

Follow the new design system v0.2.

The intended visual treatment is:

- Editorial and understated.
- Compact perspective labels.
- Electric-blue underline for the active perspective.
- Clear selected and focus states.
- Minimal decorative chrome.
- Dark code panels within the reading experience.

Avoid:

- Large gradient tab backgrounds.
- Three competing rounded pill buttons.
- Decorative browser controls.
- Neon effects.
- Generic dashboard styling.

Important:

The complete migration from the existing dark website
to the new light editorial identity is NOT part of
this task.

Implement perspective-specific styling using the
new design direction where practical.

Do not force the new light palette onto existing dark
layouts if this would create unreadable combinations.

Maintain accessible contrast in the current rendered
environment.

The wider visual migration will be completed in BBF-004.

Do not implement the left navigation rail, contextual
table of contents, chapter numbering, or vertical
reading progress in this task.

## 12. Responsive behavior

Ensure the perspective interface works at:

- Mobile widths.
- Tablet widths.
- Desktop widths.

Requirements:

- Tabs remain readable and operable.
- Long labels do not overflow the page.
- Example selectors remain usable.
- Code panels scroll locally where necessary.
- Preview frames fit within their available width.
- Focus remains visible.
- No page-level horizontal overflow.

Do not introduce breakpoints solely to preserve
a decorative layout.

## 13. Accessibility

Meet the accessibility requirements from the
new design specification.

Verify:

- Keyboard-only navigation.
- Correct tab semantics.
- Appropriate focus behavior.
- Screen reader labels and relationships.
- Selected states beyond color alone.
- Reduced-motion behavior.
- No keyboard traps.
- No hidden focusable content in inactive panels.
- Working fallback when JavaScript is disabled.
- Working fallback when enhancement fails.

Do not rely exclusively on automated accessibility tests.

## 14. Architecture and maintainability

Preserve the approved Astro-native architecture.

Requirements:

- Keep components focused.
- Use explicit TypeScript types.
- Reuse existing content and example resources.
- Avoid duplicate rendering implementations.
- Avoid new client-side frameworks.
- Keep client-side JavaScript small.
- Avoid unnecessary dependencies.
- Do not introduce global state management.

Prefer composition and native browser functionality.

Do not recreate infrastructure removed during
BBF-003/01.

## 15. Tests

Add meaningful tests for:

- Article-only content.
- Code-only resources.
- Preview-only resources.
- Mixed resources.
- Multiple ordered examples.
- Example selection.
- File selection where applicable.
- Perspective availability.
- Perspective switching.
- Keyboard navigation.
- Browser history and direct fragments.
- No-JavaScript fallback.
- Preview failure behavior.

Use real browser tests where behavior cannot
reliably be verified through isolated unit tests.

Avoid tests that merely repeat static labels
or implementation constants.

## 16. Verification

Run the repository's relevant checks:

- Content validation.
- Type checks.
- Automated tests.
- Production build.

Inspect a representative development article
containing multiple examples.

Use the existing disposable development-fixture
workflow.

Do not publish test content.

### Browser verification

Inspect at minimum:

- 390px mobile.
- 768px tablet.
- 1440px desktop.

Verify:

- Default Article perspective.
- Switching to Code.
- Switching to Preview.
- Selecting different examples.
- Keyboard interactions.
- Focus management.
- Direct fragment navigation.
- Browser Back and Forward.
- Behavior without JavaScript.
- Horizontal overflow.

Verify the preview sandbox still works.

Do not claim browser verification if it
was not performed.

### Production verification

Confirm:

- Draft articles remain excluded.
- Draft-only assets remain excluded.
- Unused preview resources remain excluded.
- No unexpected client-side dependencies appear.
- Existing article routes remain valid.

## 17. Documentation

Update:

`prompts/BBF-003/README.md`

Document:

- Components introduced or modified.
- Perspective interaction behavior.
- Example selection behavior.
- Fragment and history decisions.
- Client-side JavaScript added.
- Tests and verification results.
- Remaining limitations.

Record any newly adopted implementation decisions
in the appropriate specification.

Do not rewrite historical prompts.

Do not mark owner review as accepted.

Keep the full BBF-003 story pending final owner review.

## 18. Scope restrictions

Do not implement:

- The full editorial redesign.
- The new site navigation rail.
- Automatic chapter numbering.
- Contextual table of contents.
- Vertical reading progress.
- Homepage redesign.
- Frontend Explorer.
- Article discovery.
- Playground functionality.
- Editable code.
- New preview execution capabilities.

Do not start BBF-004.

## Completion criteria

This task is complete when:

1. Article / Code / Preview navigation works.
2. Available perspectives are derived from real resources.
3. Multiple examples are supported.
4. Code and Preview reuse existing implementations.
5. Keyboard navigation is accessible.
6. Browser history and existing links remain functional.
7. Content remains useful without JavaScript.
8. Preview security remains unchanged.
9. Automated checks and production build pass.
10. The implementation remains small and maintainable.

Leave the result ready for independent technical
and repository-owner review.

Do not begin the next story.

## Final report

Summarize:

1. Implemented functionality.
2. Components and files changed.
3. Interaction and fragment behavior.
4. Tests and verification results.
5. Browser verification.
6. Remaining limitations.
7. Any decisions requiring owner confirmation.

Do not mark the implementation as owner-approved.