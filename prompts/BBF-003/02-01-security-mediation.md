# BBF-003/02a — Preview Security Remediation

Remediate the two confirmed P2 security findings
from the independent BBF-003/02 review.

This is a narrowly scoped security correction.

Read:
- AGENTS.md
- docs/architecture.md
- docs/article-experience.md
- The BBF-003/02 implementation prompt
- The independent review findings

## Objective

Ensure that preview resources cannot bypass their
security restrictions when opened directly.

Preserve the existing Astro-native article architecture.

## P2-1 — Executable companion documents

HTML and SVG companions currently bypass the
registered preview security restrictions.

Implement an explicit resource policy.

Requirements:

- Only registered preview entries may be served
  as executable HTML documents.
- Reject arbitrary HTML companions.
- Do not serve SVG companions as active documents
  without equivalent protection.
- Preserve legitimate CSS, JavaScript, and image
  companions according to the supported preview contract.
- Ensure standalone access cannot bypass the
  intended security restrictions.
- Do not rely on iframe sandboxing alone.

Prefer restricting supported resource types over
introducing a generic security framework.

## P2-2 — CSP injection

Current CSP injection relies on matching textual
HTML tags and can accidentally match comments.

Replace this behavior with a reliable mechanism.

Requirements:

- Apply the security policy to the actual document.
- Ensure the policy takes effect before executable content.
- Handle comments containing HTML-like text.
- Reject unsupported or malformed preview documents
  rather than silently serving them without protection.
- Preserve the existing supported preview behavior.

Do not use regex-based HTML rewriting for security
critical document structure.

If a controlled HTML template is the simplest
reliable solution, prefer it over generic HTML rewriting.

## P3 — ES-module limitations

Document the currently supported preview script
contract.

Do not introduce module-loader infrastructure.

If JavaScript execution is not yet required for the
approved initial examples, prefer a clearly defined
non-script preview contract for v1.

Do not silently remove previously confirmed
functionality without identifying the change.

## Verification

Add browser-level regression tests proving:

1. Registered previews retain effective restrictions.
2. Direct navigation cannot execute scripts through
   unregistered HTML companions.
3. Direct navigation cannot execute scripts through
   SVG companions.
4. HTML comments cannot bypass CSP placement.
5. Legitimate preview resources remain functional.
6. Published preview assets remain correctly isolated.
7. Draft-only resources remain excluded.

Inspect actual browser behavior, not only generated
HTML or CSP strings.

Run:
- Content checks.
- Type checks.
- Automated tests.
- Production build.

## Constraints

- Do not change article routing or MDX rendering.
- Do not redesign the example model.
- Do not introduce unnecessary dependencies.
- Do not build a general-purpose preview engine.
- Do not implement Article / Code / Preview tabs.
- Preserve the existing design system.

## Documentation

Update the BBF-003 implementation record with:

- Security corrections.
- Supported preview resource types.
- Script execution limitations.
- Verification results.
- Remaining risks.

Keep owner acceptance pending.

Do not modify historical prompts.

## Completion

Report each finding as:

- FIXED
- PARTIALLY FIXED
- NOT FIXED

Include browser reproduction evidence.

Do not begin BBF-003/03.