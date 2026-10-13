# Build Better Frontend

An independent English-language frontend engineering publication.
**See it. Build it. Understand it.**

BBF-001 established the Astro + TypeScript + MDX foundation. BBF-002 adds
the visual foundation. The root page is a small design validation surface;
the full homepage and publication features are not implemented yet.

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
server, not production hosting. The GitHub Pages workflow in
`.github/workflows/deploy.yml` uses `npm ci` and `npm run build`. BBF-002
verifies local output; remote CI and deployment were not run for this task.
Astro 7 runs these servers in the background; use `npm run dev -- stop` or
`npm run preview -- stop` to stop them. Replace `stop` with `status` or `logs`
to inspect the corresponding server.

## Project structure

```text
src/
├── assets/fonts/        # Licensed local Latin variable WOFF2 fonts
├── components/          # Future focused Astro UI components
├── content/
│   ├── articles/        # Future authored MDX articles
│   └── authors/         # Future verified author data
├── content.config.ts   # Collection registration entry point (currently empty)
├── examples/            # Future reviewed article sources and previews
├── layouts/
│   └── BaseLayout.astro # HTML document, typed metadata, global CSS import
├── pages/
│   └── index.astro      # Minimal design validation route
└── styles/
    ├── global.css      # Reset, typography, controls, media, and focus
    ├── tokens.css      # Central design values and responsive gutters
    └── primitives.css  # Containers, actions, labels, badges, and surfaces
public/                 # Files copied unchanged to the build
└── fonts/              # Original font licenses for static distribution
```

Empty directories are retained with `.gitkeep`. Collection schemas, reference
validation, and publication eligibility are deferred to the content task;
there is no authored content to validate yet. `src/examples/` keeps future
reviewed implementations outside automatically published `public/` assets.

`astro.config.mjs` configures static output, the official MDX integration,
and `https://buildbetterfrontend.com` as the canonical production origin.
TypeScript extends Astro's strict configuration. The project has no UI
framework, Tailwind, testing framework, or client-side application runtime.

The native Astro Fonts API serves the vendored fonts, generates optimized
fallbacks, and preloads the reading font. See [font provenance and licenses](src/assets/fonts/README.md).
Design values follow [the design specification](docs/design-system.md).

## Specifications and implementation history

- [Product](docs/product.md)
- [Design system](docs/design-system.md)
- [Article experience](docs/article-experience.md)
- [Architecture](docs/architecture.md)
- [Repository instructions](AGENTS.md)
- [BBF-001 implementation record](prompts/BBF-001/README.md)
- [BBF-002 implementation record](prompts/BBF-002/README.md)
