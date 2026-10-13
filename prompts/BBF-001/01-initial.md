# BBF-001 — Project Foundation

We are starting the implementation of Build Better Frontend.

Read AGENTS.md and all four documents in docs/ before
making any changes.

Also inspect the homepage reference image to understand
the intended visual direction. Do not implement it yet.

## Objective

Establish a minimal, maintainable Astro project that will
serve as the foundation for Build Better Frontend.

This task is strictly about project setup and verification.

## Requirements

1. Initialize Astro with TypeScript and strict type checking.
2. Configure the official Astro MDX integration.
3. Use static site generation by default.
4. Configure the canonical site URL:
   https://buildbetterfrontend.com
5. Create a sensible project structure for:
    - Pages
    - Layouts
    - Components
    - Content collections
    - Article examples
    - Shared styles
    - Static assets
6. Establish a minimal global CSS entry point.
7. Configure meaningful scripts for:
    - Development
    - Type/content checking
    - Production build
8. Add an appropriate .gitignore.
9. Document local development commands in README.md.

## Constraints

- Use the current stable Astro version and compatible
  official integrations.
- Follow existing repository conventions.
- Preserve all existing documentation.
- Do not install a UI component framework.
- Do not install Tailwind.
- Do not add React, Vue or Angular.
- Do not introduce a testing framework unless required
  for this specific setup task.
- Do not implement the homepage design yet.
- Do not implement article components yet.
- Do not implement search or the Frontend Explorer yet.
- Do not add placeholder articles or fictitious authors.
- Do not add functionality outside the requested scope.

## Quality expectations

Prefer Astro's native capabilities.

Avoid speculative abstractions and infrastructure.

Keep the initial project structure small and expand it
when implementing actual features.

Use explicit TypeScript types at relevant boundaries.

## Verification

Run the available type/content checks and production build.

Resolve any errors introduced by this task.

Inspect the final diff for unintended changes.

## Deliverables

1. A working Astro project.
2. A minimal and understandable project structure.
3. Development and verification commands.
4. A concise summary of:
    - Changes made
    - Dependencies added
    - Checks performed and their results
    - Architectural decisions
    - Remaining limitations

Do not start the next implementation phase.