# Build Better Frontend

An independent English-language frontend engineering publication.
**Understand it. Build it. See it.**

BBF-001 establishes the Astro + TypeScript + MDX foundation. The root page
is a minimal setup page; the homepage design and publication features are
not implemented yet.

## Local development

Use a supported even-numbered Node.js release, at least 22.12.0, and npm
9.6.5 or newer. The repository's `.nvmrc` selects Node 24. With nvm installed:

```sh
nvm install
nvm use
npm ci
npm run dev
```

The development server defaults to `http://localhost:4321`.
`package-lock.json` records the reproducible npm dependency tree.

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run check` | Sync Astro content/types and check Astro and TypeScript files |
| `npm run build` | Run checks, then generate the static site in `dist/` |
| `npm run preview` | Serve an existing production build locally |

Run `npm run build` before `npm run preview`. Preview is a local verification
server, not production hosting. No CI workflow or deployment is configured.
Astro 7 runs these servers in the background; use `npm run dev -- stop` or
`npm run preview -- stop` to stop them. Replace `stop` with `status` or `logs`
to inspect the corresponding server.

## Project structure

```text
src/
├── components/          # Future focused Astro UI components
├── content/
│   ├── articles/        # Future authored MDX articles
│   └── authors/         # Future verified author data
├── content.config.ts   # Collection registration entry point (currently empty)
├── examples/            # Future reviewed article sources and previews
├── layouts/
│   └── BaseLayout.astro # HTML document, typed metadata, global CSS import
├── pages/
│   └── index.astro      # Minimal foundation route
└── styles/
    └── global.css      # Minimal global CSS entry point
public/                 # Files copied unchanged to the build
```

Empty directories are retained with `.gitkeep`. Collection schemas, reference
validation, and publication eligibility are deferred to the content task;
there is no authored content to validate yet. `src/examples/` keeps future
reviewed implementations outside automatically published `public/` assets.

`astro.config.mjs` configures static output, the official MDX integration,
and `https://buildbetterfrontend.com` as the canonical production origin.
TypeScript extends Astro's strict configuration. The project has no UI
framework, Tailwind, testing framework, or client-side application runtime.

## Specifications and implementation history

- [Product](docs/product.md)
- [Design system](docs/design-system.md)
- [Article experience](docs/article-experience.md)
- [Architecture](docs/architecture.md)
- [Repository instructions](AGENTS.md)
- [BBF-001 implementation record](prompts/BBF-001/README.md)
