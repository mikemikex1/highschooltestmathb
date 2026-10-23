# Math B visual asset organization

This directory is the planned home for Phase 7.6 visual assets. Each lesson has
one stable folder: `l01` through `l20`. Asset names are semantic and stable,
for example `l16-slope-rise-run.svg`; generated names such as `image1.svg` are
not allowed.

The registry is [../../visual-registry.js](../../visual-registry.js). Part 1
only defines the contract and planned asset paths. Part 2 will add SVG files
and renderer adapters incrementally.

## Asset contract

- repository-local SVG; no CDN, remote image, or third-party embed;
- `role="img"`, a meaningful `<title>`, and a `<desc>` for important SVGs;
- structured numeric data in the registry or a nearby source module;
- labels, line styles, markers, and text in addition to color;
- intrinsic/minimum width for complex diagrams, with local visual scrolling;
- no document-level horizontal overflow at 320px or 390px;
- all visible mathematical text goes through the approved math formatter.

The existing approved matrix baseline remains at
`assets/matrix-linear-transformation.svg` until its planned companion modules
are added.
