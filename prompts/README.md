# Building Build Better Frontend with Codex

Build Better Frontend (BBF) is an open-source frontend
publication built with Astro, TypeScript, and MDX.

This directory documents how Codex was used during
the development of the website.

The goal is not just to showcase the final implementation,
but also to make the development process transparent
and educational.

## Philosophy

AI-assisted development is more than generating code.

We believe effective AI-assisted development involves:

- Clear requirements and constraints.
- Small, focused implementation tasks.
- Human review and technical judgment.
- Iterative improvements.
- Verification through tests and builds.
- Learning from both successes and failures.

Codex is used as a development assistant, not as a
replacement for engineering decisions.

## Directory structure

Each implementation task has a unique identifier.

For example:

prompts/
BBF-001/
01-initial.md
02-correction.md
README.md

The numbered Markdown files contain the actual prompts
provided to Codex.

Additional prompt files are created when corrections,
refinements, or reviews require further instructions.

Not every task needs multiple prompts.

## Task documentation

Each task may include a README.md documenting:

- The objective.
- The implementation outcome.
- Relevant commits or pull requests.
- Corrections that were necessary.
- Lessons learned.

These documents describe what actually happened.
They should not be written as if an expected result
has already been achieved.

## Prompt history

Prompts are preserved as they were submitted.

Follow-up prompts are stored separately rather than
rewriting the original instructions.

This makes it possible to understand how an implementation
evolved over time.

Minor conversational interactions without educational
value may be omitted.

## Repository specifications

The implementation is guided by:

- [Product specification](../docs/product.md)
- [Design system](../docs/design-system.md)
- [Article experience](../docs/article-experience.md)
- [Architecture](../docs/architecture.md)
- [Codex instructions](../AGENTS.md)

These documents describe the intended product and
engineering principles.

The prompts in this directory document how individual
tasks were executed.

## Transparency

This is a curated record of meaningful development
interactions, not a complete transcript of every
conversation with Codex.

All content is reviewed before publication to avoid
exposing secrets or private information.

## Task documentation template

Each implementation task has a `README.md` in its
own directory (`prompts/BBF-XXX/`).

Codex maintains this document throughout implementation.

Use the following structure:

```markdown
# BBF-XXX — Task Title

## Objective

Briefly describe the purpose of the task.

## Prompts

- [01 — Initial implementation](./01-initial.md)

## Implementation

**Status:** Pending

Briefly summarize the actual implementation.

**Pull request:** Not yet created.

## Verification

### Automated

- [ ] Relevant checks — Pending

### Human review

- [ ] Repository owner review — Pending

## Lessons learned

Only include meaningful lessons supported by
the actual development process. Omit this section
if there are none.
```

### Documentation rules

- Record actual outcomes, not expected outcomes.
- Link to the relevant pull request when available.
- List executed verification commands and their results.
- Never mark automated checks as passed unless executed.
- Never mark human review as accepted without explicit
  confirmation from the repository owner.
- Record the human review date when accepted.
- Keep implementation summaries concise.
- Include follow-up prompts only when they actually exist.
- Do not modify previously submitted prompts.
- Do not invent lessons learned.
- Update the task README as implementation progresses.