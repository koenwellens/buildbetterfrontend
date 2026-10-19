# Development content fixtures

`content/fixture.ts` supplies synthetic article, author, example, and preview
records. Local HTML/CSS files provide real resources. The cases cover prose-only,
code-only, preview-only, both-resource, and ordered mixed-example articles. None
is editorial content or a real contributor profile.

Native production loaders read only `src/content/articles/*.mdx`,
`src/content/authors/*.json`, and `src/examples/*/example.json`. No production
module imports this test tree or `src/drafts/`.

The Node integration tests copy the production middleware, root route, configuration,
validation code, and fixtures into
disposable projects, then invoke the installed Astro CLI. Test-only article routes
use native `getCollection()`/`render()`; a probe queries native references with
`getEntries()`. Neither route is present in the website. Temporary projects are
removed after testing. Their paths are canonicalized to avoid macOS `/var` versus
`/private/var` aliases in Astro's virtual script IDs.

Production-failure regressions cover metadata, quoted YAML dates, missing native
references (which sync logs without failing), future dates, invalid published
MDX/imports, identity mismatches, preview registrations, and resource deletions
after a successful build. Missing-reference tests use only a standalone page with
no content queries or homepage; future-date tests also remove the homepage.
A counted wrapper around the real validator verifies one invocation across
multiple static pages/endpoints and a fresh invocation on the next build.
Unit checks retain source/preview symlink containment
and target-type protections, UTF-8 reads, and derived resource availability.

The draft isolation case creates a draft importing uniquely marked CSS, JS, and
an Astro component with a client script, alongside malformed MDX and a throwing
JS import. Cold/cached builds inspect both `dist/` and Astro's generated module
registration file. Draft routes, metadata, modules, and assets must be absent.
Moving the same candidate and companion assets into the published directory must
render it and process its imports normally. Moving it back must remove its output
on a repeated build. No custom compiler or import validator participates.

The article-rendering regression also copies the actual route, layouts, fonts,
styles, and components, then temporarily publishes the labeled
`src/drafts/fluid-typography.mdx` candidate inside that disposable project. It
checks initial HTML, dates/authors, reading time excluding fences, native images,
six frontend code languages, ordered sources, code-only/preview-only/prose-only
cases, metadata/repository links, iframe permissions, companion CSS, and removal
of all article/preview files after withdrawal. Unused HTML and Astro-component
markers must stay absent from output. No fixture metadata enters real production.

This test uses the actual local Fonts API, whose temporary localhost listener
must be permitted in restricted execution environments. Browser rendering and
keyboard checks complement these build/artifact checks; static assertions alone
do not establish responsive layout or accessibility conformance.

## Preview security browser regressions

`preview-security/project.ts` creates a disposable native Astro project using
the production renderer. Node regressions verify rejection of arbitrary HTML/SVG
companions and malformed documents, resource collisions, and cached withdrawal.
The source files containing attack probes remain outside production inputs.

The separate dependency-free browser suite is `preview-security/browser.html`.
It loads direct URLs in unsandboxed test contexts so the served document must
enforce its own restrictions. It checks denied execution, HTML-like comments,
HTML/SVG 404s, permitted classic scripts/CSS/data images, opaque-origin parent
and storage isolation, and unpublished/draft exclusion. It runs automatically
when opened in a real browser; `npm test` runs the Node/build regressions and
does not launch a browser.

From the repository root, on the selected Node version:

```sh
bbf_security_root="$(node --experimental-strip-types tests/fixtures/preview-security/project.ts)"
python3 -m http.server 4324 --bind 127.0.0.1 --directory "$bbf_security_root/dist"
```

Open `http://localhost:4324/security-tests.html`; expect `6/6 passed; 0 failed`.
The harness is copied into the disposable `dist/` only after its production
build. Never copy it or these test records into the real publication. Stop the
local server and remove that disposable directory after review.
