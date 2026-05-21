# williamzhang.me

Personal site. Astro + Tailwind, Muji-inspired aesthetic, deployed to Vercel.

See [`DESIGN.md`](./DESIGN.md) for the aesthetic spec, design tokens, and the
"do not add" guardrails. Read it before changing anything visual.

## Local dev

```bash
npm install
npm run dev          # localhost:4321
npm run build        # static output to dist/
npm run preview      # serve the built dist/
```

## Editing content

| Goal                                | File                                           |
| ----------------------------------- | ---------------------------------------------- |
| Update name, location, lately, bullets | `src/data/about.ts`                          |
| Add a new note                      | drop a `.md` into `src/content/notes/`         |
| Mark a note as work-in-progress     | set `draft: true` in its frontmatter           |
| Swap the signature                  | replace `public/signature.svg` (single path)   |
| Regenerate the OG preview image     | `node scripts/og-to-png.mjs`                   |
| Adjust colors / spacing             | `src/styles/global.css` (top of file)          |

Notes with `draft: true` render in `npm run dev` but are filtered out of
production builds — useful for committing pieces before they're ready.

## Deploying

The repo deploys to Vercel as a static Astro site. First-time setup:

1. Push to GitHub (already at `williamzhang7792/williamzhang7792.github.io`)
2. Import the repo on [Vercel](https://vercel.com/new). It auto-detects Astro
   and uses the build command from `vercel.json`.
3. Connect the `williamzhang.me` domain in Vercel's domain settings; update
   DNS at the registrar to point at Vercel.
4. Vercel Web Analytics activates automatically once a custom domain is
   connected and the site has had at least one production deploy.

After setup: every push to `main` auto-deploys. Preview deploys for branches.

## Maintenance reminders

| Task                                              | Cadence    |
| ------------------------------------------------- | ---------- |
| Replace placeholder `signature.svg` with real one | within 30 days of launch |
| Replace `hello-world.md` with substantive piece    | within 2 weeks of launch |
| Refresh the `lately:` line in `about.ts`           | every 1-3 months |
| Walk the site, ask "is this earning its place?"    | 30 days post-launch, then quarterly |

Calendar these. They slide otherwise.

## Performance budget

Verified via `dist/_astro/` after `npm run build`:

- Total JS: under 30 KB (currently ~4.5 KB)
- Total CSS: under 20 KB (currently ~12 KB)
- Lighthouse target: ≥ 95 on all four categories

## Rollback knobs

If a personality element doesn't land, see §17 of the original plan or:

- **Badminton game**: delete `<BadmintonGame />` from `src/pages/index.astro`
  and set `about.thinking[3].href` to `null`. Bullet + icon stay.
- **Signature animation**: replace contents of `Signature.astro` with a static
  Caveat text node, no animation.
- **Reading progress bar**: remove `<ReadingProgress />` from `NoteLayout.astro`.
- **Bullet icons**: remove the icon block from `Bullet.astro` if they compete
  with text instead of creating rhythm.
- **Washi texture**: remove `<WashiTexture />` from `BaseLayout.astro`.

The site is designed to survive any single rollback without breaking the
aesthetic. Do the rollback rather than spend hours fixing.
