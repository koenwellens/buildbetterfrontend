# Vendored fonts

The two unmodified Latin variable WOFF2 files come from Fontsource npm
packages version 5.3.0:

- `@fontsource-variable/plus-jakarta-sans`: Plus Jakarta Sans, Google Fonts
  version v12; normal style, weight range 200–800, 27,348 bytes.
- `@fontsource-variable/fira-code`: Fira Code, Google Fonts version v27;
  normal style, weight range 300–700, 36,276 bytes.

Both are licensed under SIL Open Font License 1.1. The original copyright
and license text is retained in `public/fonts/` so it also ships in the static
distribution. These are assets,
not installed npm dependencies. No package or lockfile changes are needed.

Licenses: [Plus Jakarta Sans](../../../public/fonts/Plus-Jakarta-Sans-LICENSE.txt)
and [Fira Code](../../../public/fonts/Fira-Code-LICENSE.txt).

Sources: [Plus Jakarta Sans](https://fontsource.org/fonts/plus-jakarta-sans),
[Fira Code](https://fontsource.org/fonts/fira-code), and the respective
versioned npm packages. Upstream projects are
[tokotype/PlusJakartaSans](https://github.com/tokotype/PlusJakartaSans) and
[tonsky/FiraCode](https://github.com/tonsky/FiraCode).

Astro's local Fonts API generates font faces, fingerprinted URLs, and
metric-adjusted fallbacks. The sans font is preloaded; the mono font loads
when used. Both use `font-display: swap`. Only Latin normal style is shipped
for the current English interface. Add licensed subsets or real italic
variants when actual content needs them.
