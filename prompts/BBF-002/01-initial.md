# BBF-002 — Design System Foundation

We are implementing the visual foundation of Build Better Frontend.

Before making changes, read:

- `AGENTS.md`
- `docs/product.md`
- `docs/design-system.md`
- `docs/article-experience.md`
- `docs/architecture.md`
- `prompts/README.md`

Also inspect the visual reference:

- `docs/reference/bbf-homepage-mockup.png`

Follow the documented design decisions and implementation guidelines.

The reference image establishes the intended visual direction,
not the scope of this task.

## Objective

Implement the foundational design system for Build Better Frontend.

Establish a consistent, responsive, accessible visual language
that can be reused throughout the website.

The design should reflect the approved direction:

**Modern Engineering × Developer Playground**

It should feel modern, technical, creative, and professional
without becoming overly decorative.

This task focuses on the design foundation.

Do not implement the complete homepage or article experience yet.

## 1. Design tokens

Implement the design tokens defined in `docs/design-system.md`.

Include:

- Background and surface colors.
- Primary and secondary text colors.
- Brand accent colors.
- Category accent colors.
- Brand gradients.
- Spacing scale.
- Typography scale.
- Border colors.
- Border radii.
- Layout container widths.
- Relevant interaction tokens.

Use CSS custom properties as the primary mechanism.

Keep tokens centralized and consistently named.

Do not scatter hardcoded design values across components.

Use the documented colors as the source of truth rather than
attempting to extract new values from the reference image.

## 2. Typography

Implement the approved typography:

- Plus Jakarta Sans for headings, prose, and interface text.
- Fira Code for code, technical labels, and metadata where appropriate.

Requirements:

- Establish consistent heading styles.
- Define comfortable body typography.
- Apply appropriate line heights.
- Support responsive font sizing.
- Use Fira Code selectively.
- Enable programming ligatures in code contexts.
- Avoid layout shifts caused by font loading.

Choose an appropriate font-loading strategy for a statically
generated Astro website.

Prefer locally served, optimized fonts when practical.

Avoid unnecessary runtime dependencies or external font requests.

## 3. Global styles

Establish a small, maintainable global stylesheet.

Include:

- A minimal CSS reset.
- Consistent box sizing.
- Document background and default text color.
- Base typography.
- Sensible defaults for links, buttons, and form controls.
- Responsive media defaults.
- Accessible focus indicators.
- Reduced-motion support.

Use modern CSS features where browser support is appropriate.

Avoid creating a large utility framework.

Prefer semantic HTML and predictable styling.

Do not introduce Tailwind or another CSS framework.

## 4. Layout foundations

Implement the reusable layout foundations needed by future pages.

Include:

- A centered page container.
- Consistent horizontal page gutters.
- Standard content widths.
- A comfortable article reading width.
- Responsive spacing behavior.

Use the documented container widths and spacing scale.

Prefer simple CSS Grid and Flexbox layouts.

Avoid unnecessary layout abstractions.

Create Astro components only when they provide a meaningful
responsibility beyond a trivial HTML wrapper.

## 5. Shared visual primitives

Establish a minimal foundation for commonly used interface elements.

Consider:

- Buttons and action links.
- Technical section labels.
- Category badges.
- Card surfaces.
- Consistent interactive states.

Use the design specification to determine their appearance.

Prefer shared CSS styles for simple visual patterns.

Create reusable Astro components only where they add meaningful
structure, semantics, or behavior.

Avoid building a complete component library.

Do not introduce components solely for hypothetical future use.

## 6. Responsive behavior

The design system must support:

- Mobile.
- Tablet.
- Desktop.

Requirements:

- No horizontal overflow at narrow viewport widths.
- Responsive typography.
- Consistent page gutters.
- Flexible containers.
- Readable text at all supported sizes.
- Comfortable interactive targets.

Avoid creating complex breakpoint systems without a demonstrated need.

Use content-driven breakpoints where appropriate.

## 7. Accessibility

Accessibility is a core requirement.

Implement:

- Visible keyboard focus indicators.
- Appropriate text and interactive contrast.
- Semantic HTML foundations.
- Reduced-motion support.
- Accessible link and button states.
- Appropriate control sizing.

Use the accessibility target documented in the design specification.

Do not rely exclusively on color to communicate meaning.

Ensure decorative effects never interfere with content readability
or interaction.

## 8. Minimal visual validation page

Use the existing Astro starter homepage as a small visual
validation surface for the new design system.

It should demonstrate:

- The dark background.
- Primary typography.
- The brand gradient.
- The approved tagline.
- Basic spacing.
- At least one representative interactive element, if useful.

The approved tagline is:

**See it. Build it. Understand it.**

This replaces the previous tagline:

"Understand it. Build it. See it."

Update existing website copy and relevant specifications
to reflect this approved decision.

Do not change the planned Article / Code / Preview
perspective labels or their order.

Keep the validation page intentionally minimal.

Do not implement:

- The full homepage hero composition.
- The Frontend Explorer.
- Article cards or article listings.
- Category sections.
- Featured article experiences.
- Code or Preview panels.
- Playground functionality.

The goal is to validate the visual foundation, not to
implement future features prematurely.

## 9. Visual direction

Use the homepage mock-up as the visual reference.

Preserve these characteristics:

- Deep navy backgrounds rather than pure black.
- Subtle differences between surface layers.
- Bright, readable typography.
- Restrained blue and violet accents.
- Carefully applied gradients.
- Fine borders.
- Modern, technical detailing.
- Generous but controlled whitespace.

Avoid:

- Excessive glowing effects.
- Heavy shadows.
- Large decorative animations.
- Generic dashboard styling.
- Terminal-like interfaces.
- Unnecessary gradients on ordinary content.

The website should feel distinctive without compromising
readability or performance.

## 10. Architecture and maintainability

Follow Astro conventions and the existing project architecture.

Requirements:

- Keep CSS responsibilities clear.
- Keep the number of files proportional to the task.
- Use centralized design tokens.
- Prefer composition over abstraction.
- Preserve the existing package manager and lockfile.
- Do not introduce unnecessary dependencies.
- Do not modify unrelated implementation work.

Do not create a generic design system framework.

The goal is a maintainable foundation for a small
content-driven website.

## 11. Verification

Run the repository's relevant verification commands.

At minimum:

- Type/content checks.
- Production build.

For the visual implementation:

- Inspect the rendered page at desktop width.
- Inspect the rendered page at mobile width.
- Check for horizontal overflow.
- Check keyboard focus behavior.
- Check readable text contrast.
- Check reduced-motion behavior where applicable.
- Compare the overall visual direction with the reference.

Use browser inspection or screenshots where tooling permits.

If browser-based verification is unavailable, report that
limitation explicitly.

Do not claim that a visual or accessibility check was completed
unless it was actually performed.

Resolve errors introduced by this task.

## 12. Task documentation

Update:

`prompts/BBF-002/README.md`

Follow the task documentation rules in `prompts/README.md`.

Document:

- The actual implementation.
- Dependencies added, if any.
- Relevant implementation decisions.
- Verification commands and results.
- Remaining limitations.
- Meaningful lessons learned, if any.

Keep the human review status pending.

Only the repository owner can explicitly approve the implementation.

Do not modify this historical prompt file.

Do not invent pull requests, commits, reviews, or test results.

## Deliverables

1. Centralized CSS design tokens.
2. Typography and font configuration.
3. Global CSS foundation.
4. Responsive layout primitives.
5. Minimal shared visual styles or components.
6. A small homepage demonstrating the design foundation.
7. Updated task documentation.
8. Successful relevant checks and production build.

## Completion criteria

This task is complete when:

- The visual foundation matches the documented design direction.
- Typography and design tokens are implemented consistently.
- The starter page demonstrates the dark BBF identity.
- The layout behaves correctly on mobile and desktop.
- Keyboard focus is visible.
- The implementation introduces no unnecessary dependencies
  or premature product features.
- Relevant checks pass.
- The task README reflects the actual implementation.

Do not begin BBF-003 or implement additional homepage features.

Leave the result ready for repository owner review.