# BBF-003/03 — Independent Article Perspectives Review

Perform an independent technical review of the
BBF-003/03 Article / Code / Preview implementation.

This is a review task. Do not modify repository files.

## Context

BBF-003/01 established the Astro-native content model.
BBF-003/02 implemented article rendering, highlighted
source code, and secured working previews.

Both steps have been independently reviewed.

BBF-003/03 adds:

- Article / Code / Preview perspectives.
- Accessible manual tab navigation.
- Ordered example and source-file selection.
- Fragment and browser history integration.
- Preview lifecycle management.
- Progressive enhancement.

The new editorial design system v0.2 is documented
but its full visual migration belongs to BBF-004.

Do not assess the implementation against the old
dark design as a final visual requirement.

## Read before reviewing

- AGENTS.md
- docs/product.md
- docs/design-system.md
- docs/article-experience.md
- docs/architecture.md
- prompts/BBF-003/03-article-perspectives.md
- prompts/BBF-003/README.md

Inspect the implementation and relevant tests.

## 1. Perspective behavior

Verify:

- Article is the default perspective.
- Code and Preview availability is derived from
  actual example resources.
- Unavailable perspectives are omitted.
- Articles without examples remain usable.
- Multiple examples retain editorial order.
- Source-file selection works correctly.
- Switching between Code and Preview preserves
  the selected example when eligible.
- Ineligible selections fall back predictably.

Independently test mixed resource combinations.

## 2. Accessibility

Verify the implementation follows the
WAI-ARIA manual tabs pattern.

Check:

- Tablist, tab, and tabpanel relationships.
- aria-selected and tabindex management.
- Arrow-key, Home/End, and Enter/Space behavior.
- Focus management when switching perspectives.
- Inactive panels contain no reachable hidden controls.
- Selected states are visually distinguishable.
- Keyboard access to example and file selectors.
- No keyboard traps.

Test actual browser interactions.

Check meaningful accessible names and relationships,
not only the presence of ARIA attributes.

## 3. Progressive enhancement

Verify:

- Article content is available in initial HTML.
- Source code remains accessible without JavaScript.
- Preview links remain accessible without JavaScript.
- Failed enhancement leaves usable content.
- JavaScript does not duplicate rendered content.
- Article content remains indexable.

Independently exercise JavaScript-disabled behavior
and at least one initialization-failure scenario.

## 4. Fragments and browser history

Verify:

- Existing heading fragments continue working.
- Existing source and preview fragments work.
- Direct navigation activates the correct perspective.
- Browser Back and Forward restore usable state.
- Invalid fragments do not break navigation.
- Repeated switching does not create inconsistent history.
- Keyboard focus remains predictable.

Pay attention to interactions between native anchors
and the enhanced perspective controls.

Do not introduce a new URL convention during review.

## 5. Preview lifecycle and security

Verify:

- Hidden previews do not continue running unnecessarily.
- Switching back restores a functional preview.
- Preview failure does not affect article/source access.
- Existing iframe sandbox permissions remain unchanged.
- Existing CSP restrictions remain effective.
- No duplicate active preview instances are introduced.
- Unregistered preview resources remain inaccessible.

Reuse the existing security regression cases.

Do not reopen the preview architecture without
evidence of a new defect.

## 6. Maintainability and performance

Verify:

- Existing article/source/preview components are reused.
- Interaction state is appropriately scoped.
- No unnecessary dependencies or abstractions exist.
- The enhancement introduces no unnecessary runtime work.
- Event listeners and preview lifecycle behavior are
  correctly managed.
- Component responsibilities remain understandable.

Compare the measured JavaScript contribution with
the documented performance budget.

Do not recommend speculative refactoring.

## 7. Verification

Run:

- Content validation.
- Type checks.
- Automated tests.
- Production build.
- Relevant perspective browser tests.
- Existing preview security browser tests.

Independently reproduce important edge cases rather
than relying exclusively on existing tests.

Inspect at mobile and desktop widths.

Record any browser or accessibility verification
that could not be performed.

## 8. Verdict

Return one overall verdict:

- APPROVED — No blocking defects found.
- CHANGES REQUIRED — Actionable blocking defects remain.

For each finding provide:

- Severity (P1, P2, P3).
- File and line reference.
- Reproduction evidence.
- Recommended correction.

Distinguish actual correctness, accessibility, and
security defects from optional improvements.

Do not reopen previously approved architectural
decisions without concrete evidence.

## Constraints

- Do not modify files.
- Do not implement corrections.
- Do not update documentation.
- Do not create commits.
- Do not begin BBF-004.
- Do not approve on behalf of the repository owner.

Keep the review proportionate to BBF-003/03.

## Expected output

1. Overall verdict.
2. Perspective behavior findings.
3. Accessibility findings.
4. Progressive enhancement findings.
5. Fragment/history findings.
6. Preview lifecycle/security findings.
7. Performance and maintainability observations.
8. Verification results and limitations.