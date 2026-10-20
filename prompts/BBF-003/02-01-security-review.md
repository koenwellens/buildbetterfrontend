# BBF-003/02b — Preview Security Remediation Re-review

Perform an independent, targeted re-review of the
BBF-003/02 preview security remediation.

This is a verification task, not an implementation task.

## Context

The original independent review of BBF-003/02 identified
two blocking P2 security defects:

1. Unregistered HTML and SVG companion resources could
   execute scripts when accessed directly.
2. CSP insertion could target an HTML comment instead
   of the actual document head.

The remediation reports both defects as fixed.

It also documents the supported preview script contract:
classic scripts are supported through explicit opt-in,
while ES-module execution is currently unsupported.

The implementation uses `parse5` for HTML document
validation and a controlled wrapper for CSP application.

## Read before reviewing

Read:

- `AGENTS.md`
- `docs/architecture.md`
- `docs/article-experience.md`
- `prompts/BBF-003/02-article-rendering.md`
- The original BBF-003/02 review findings.
- The preview security remediation prompt.
- `prompts/BBF-003/README.md`

Inspect the actual implementation, changes, and tests.

## 1. Verify P2-1 — Executable companion resources

Independently verify that:

- Unregistered HTML companions cannot execute scripts.
- Unregistered SVG companions cannot execute scripts.
- Direct navigation cannot bypass preview restrictions.
- Registered preview entries remain functional.
- Legitimate CSS, classic JavaScript, and supported
  image resources continue working.
- Unsupported companion types are rejected.

Verify actual HTTP responses and browser behavior.

Do not rely exclusively on existing automated tests.

## 2. Verify P2-2 — CSP enforcement

Independently verify that:

- CSP is applied to the actual preview document.
- HTML comments containing `<head>` cannot bypass CSP.
- CSP takes effect before executable content.
- Malformed or unsupported HTML cannot bypass validation.
- Direct navigation retains the intended restrictions.
- Iframe sandboxing continues to work as intended.

Inspect actual browser enforcement, not just the
presence of CSP text in generated HTML.

Pay attention to interactions between:

- The controlled HTML wrapper.
- The CSP policy.
- The iframe sandbox.
- Direct navigation to preview URLs.

## 3. Verify the supported script contract

Verify that the documented behavior matches reality:

- Classic scripts work only when explicitly permitted.
- Scripts are blocked when permissions do not allow them.
- ES-module execution is documented as unsupported.
- The implementation does not silently permit
  unsupported executable document types.

Do not require ES-module support.

Do not expand the supported preview capabilities.

## 4. Regression verification

Verify that the remediation has not broken:

- Published article rendering.
- Working HTML/CSS previews.
- Source-code presentation.
- Preview resource registration.
- Draft resource exclusion.
- Unused preview resource exclusion.

Pay particular attention to resource emission in
production builds.

## 5. Verification

Run the relevant repository checks:

- Content validation.
- Type checks.
- Automated tests.
- Production build.

Execute or independently reproduce the browser
regressions for the two original P2 findings.

Use Chromium as the minimum browser target.

If additional browsers are available, report their
results separately.

Do not claim cross-browser verification based solely
on Chromium.

## 6. Verdict

Provide one overall verdict:

- APPROVED — Both P2 defects are resolved and no new
  actionable blocking defects were introduced.
- CHANGES REQUIRED — A blocking defect remains.

For each original finding, report:

- FIXED
- PARTIALLY FIXED
- NOT FIXED

Report any new actionable findings with:

- Severity (P1, P2, P3).
- File and line reference.
- Reproduction evidence.
- Recommended correction.

Distinguish actual security defects from optional
maintainability improvements.

Do not reopen unrelated architectural decisions or
previously approved functionality without concrete
evidence of a new regression.

## Constraints

- Do not modify files.
- Do not implement corrections.
- Do not create commits.
- Do not update task documentation.
- Do not start BBF-003/03.
- Do not approve on behalf of the repository owner.

Keep the review focused on the remediation.

## Expected output

Provide:

1. Overall verdict.
2. P2-1 verification result.
3. P2-2 verification result.
4. Script contract verification.
5. Regression verification results.
6. New actionable findings, if any.
7. Remaining limitations.

Keep the response concise and evidence-based.