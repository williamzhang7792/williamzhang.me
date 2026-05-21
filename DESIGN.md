# DESIGN.md

The aesthetic spec for `williamzhang.me`. Tracked in the repo, not linked from
any page. Read this before changing anything visual or adding anything new.

If a future Cursor session (or future you) is about to add something, this
document is the first stop. The temptation→counter table near the bottom
exists specifically because the most likely failure mode is accreting touches.

---

## 1. Vibe

Muji-inspired. Warm, restrained, material. The site should feel like a
well-organized notebook sitting on a desk — not a polished portfolio.

Three principles, in order of weight:

1. **Restraint is the aesthetic.** When in doubt, remove rather than add.
2. **Negative space is content.** Generous whitespace is doing work.
3. **Honest materials.** Typography looks like typography. The "paper" looks
   like paper. The signature is hand-drawn ink. The badminton game is doodled
   in the margin. No decorative effects pretending to be material.

Light mode only — deliberate, not an oversight. Cream + burgundy is a
light-mode palette; offering dark mode would dilute the choice.

## 2. Color tokens

Defined as CSS variables in [`src/styles/global.css`](./src/styles/global.css)
and mirrored in Tailwind via `@theme`. **Do not hardcode hex values in
component styles** — always use the tokens.

| Token             | Hex       | Use                                                                  |
| ----------------- | --------- | -------------------------------------------------------------------- |
| `--bg-outer`      | `#C9B998` | Linen "desk" — the background outside the paper                       |
| `--bg-paper`      | `#F5EDDD` | Cream paper — every page sits on this                                |
| `--text-body`     | `#2C2C2C` | Default body text                                                    |
| `--text-muted`    | `#9A9A98` | Captions, timestamps, location, footer socials default state         |
| `--accent`        | `#7A0E20` | Burgundy — **use sparingly**: name, section labels, hover/focus, signature, "lately:" label, OG image, favicon |
| `--border-subtle` | `#D5D5D3` | Hairline dividers (footer top, note-row separators)                  |

### Burgundy is a high-impact color. Where it is used today:

- The name (`<h1>` on the about page)
- Italic section labels ("i've been doing:", "i've been thinking about:")
- The "lately:" label inline in the lately line
- All hover/focus states (text + underline)
- Signature stroke
- Court line + cork inside the badminton canvas
- Favicon, OG image
- Reading progress bar fill

### Burgundy must NOT be used for:

- Body text
- Bullet text default state
- Footer text default state
- Backgrounds
- Borders (use `--border-subtle`)
- Decorative accents

If you find yourself wanting more burgundy: stop. The palette works because of
the sparing use. Spreading it dilutes the impact.

## 3. Typography

| Family                   | When                                  |
| ------------------------ | ------------------------------------- |
| Cormorant Garamond       | Everything by default. Body, headings, name |
| IBM Plex Mono            | Timestamps only — the "last touched" line, note dates |
| Caveat                   | Signature, all in-game text in the badminton canvas. Nowhere else |

Typography rules:

- One serif family throughout the long-form text. No sans-serif additions.
- Section labels are **italic, lowercase, burgundy**. They earn their
  emphasis through italics + color, not through size or weight.
- Body text is 18px / line-height 1.7. Note body is 18px / 1.75.
- The `lately:` label uses italic burgundy; the rest of the line is muted.

## 4. Spacing

Multiples of 8 wherever possible:

- Page margins: 80px (desktop) / 48px (mobile, `<= 720px`) top/bottom on the paper
- Page side padding: 60px (desktop) / 24px (mobile)
- Section spacing: 40px between sections
- Bullet padding: 4px vertical
- Footer top padding: 32px
- Footer top margin from content: 96px

## 5. Layered shell

Every page lives inside a **`.paper`** container that floats on the linen
background. The structure:

```
<body class="bg-outer">
  <main class="paper">              ← cream, max-width 700px, drop shadow
    <WashiTexture />                 ← absolute SVG noise overlay (opacity 0.04)
    <Nav />
    <main slot content>
    <Footer />                       ← socials left, signature + last-touched right
  </main>
</body>
```

The cursor is `crosshair` on the paper, default outside. On touch devices the
crosshair is suppressed (looks broken on tap).

## 6. Component contract

### `<Bullet {...props} />`

Single source of truth for "↳ icon text" lines. Type is exported from
[`src/data/about.ts`](./src/data/about.ts):

```ts
type Bullet = {
  icon: string;        // Lucide PascalCase name, OR the literal "shuttlecock"
  text: string;
  href: string | null; // null → plain text, no hover
};
```

Rendering rules:

- `icon === "shuttlecock"` → renders the inline custom SVG (matches Lucide's
  1.5-stroke line-art weight). Documented as a string-magic special case.
- Any other string → looked up on `@lucide/astro`'s exports. Unknown names log
  a warning in dev and render no icon.
- `href` set → renders `<a class="link-underline">`, gets the L→R underline
  grow on hover/focus.
- `href: null` → renders `<span>`, no hover affordance. This signals
  "personality / opinion" rather than "credential".

**Constraint: no multi-link bullets.** If you want two destinations, split
into two bullets. The schema is enforced by TypeScript and by the rendering
logic — don't try to add a `links: [...]` field.

### `<Bullet>` — adding a new bullet

Edit `about.ts`. The arrays are typed; TS errors if you miss a field. Order
matters — items render top to bottom.

### `<Signature />`

Placeholder is a Caveat-traced "W. Zhang" + flourish. Animates on first visit
via `stroke-dashoffset` (flourish) + opacity fade-in (text), gated by
`safeStorage["wz-sig-seen"]`. After animation completes once, the signature
renders static.

**Replacing with the real handwritten version**: provide an SVG with a single
continuous path. Replace the inner `<text>` and `<path>` of
`Signature.astro` with your path data. The animation works as long as the
stroke length matches `stroke-dasharray`.

### `<ReadingProgress />`

Mounted only inside `NoteLayout.astro` — never on About or Notes index. Uses
`requestAnimationFrame` + `passive` scroll listener. Formula:

```
progress = clamp(0, 100, (scrollY + viewportHeight - articleTop) / articleHeight * 100)
```

`role="progressbar"`, `aria-valuenow` updated on each frame.

### `<BadmintonGame />`

Lazy-mounted via a "play a quick rally" trigger. Hidden on touch
(`@media (hover: none)`), replaced by a static fallback line. Game text is
all Caveat. Court line and net have hand-drawn jitter. Player is a lowercase
"w"; CPU is a single dot. Best rally persists in `safeStorage`.

### Notes content

Files in `src/content/notes/*.md`. Frontmatter validated by Zod schema in
[`src/content.config.ts`](./src/content.config.ts):

```yaml
---
title: "..."
date: 2026-05-21
description: "Up to 160 chars; doubles as og:description for the note."
draft: false
---
```

Set `draft: true` to commit a piece without publishing it. Drafts render in
`npm run dev` but are filtered out of production builds.

## 7. Hard "do not add" list

These are the additions that look defensible individually but break the
aesthetic in aggregate. The Muji discipline says: pick the things you have,
make them perfect, leave the rest out.

- Gradients (anywhere, of any direction)
- Drop shadows on text
- Dark mode toggle
- A second accent color
- Decorative icons (icons exist only inside `<Bullet>` to add scannable rhythm)
- Hover sound effects
- Particle effects, cursor trails, glitter
- Scaling or transform-based hover effects (only color shifts + underline)
- Photos of yourself
- Hero images
- Multi-CTA buttons ("hire me", "schedule a call")
- A skills list
- "Always learning" or other generic filler phrases
- A second mini-game on any page
- A view counter or visitor counter
- A pop-up newsletter signup
- A "what I've changed my mind about" section (postpone indefinitely)
- A recommendations / reading list page (postpone indefinitely)
- Cursor ink-spread effects (decided against during planning)
- Easter eggs beyond the badminton game

## 8. Anticipatory guardrails — temptation → counter

When future you reaches for one of these, the counter is what to remember.

| Temptation                                | Counter                                                            |
| ----------------------------------------- | ------------------------------------------------------------------ |
| "want to add a hero image"                | cream + name in burgundy is the hero                                |
| "want a second accent color"              | no, burgundy is the only accent                                     |
| "want a contact form"                     | the email link in the footer is enough                              |
| "want a photo of yourself"                | no                                                                  |
| "want a project showcase page"            | the notes page does this through writing                            |
| "want to add dark mode"                   | reread the planning conversation; the cream + burgundy palette is fundamentally a light-mode aesthetic |
| "want hover sounds / cursor trails"       | explicitly cut for aesthetic reasons; do not reopen                |
| "want a hire-me CTA"                      | email in the footer is enough; you're not selling                   |
| "want to add a custom illustration"       | the signature, the shuttlecock, and the doodled court are it       |
| "want to make the bullets feel cuter"     | the icons + the L→R underline are the personality. add restraint, not flourish |
| "want a fancy 404 page"                   | a single italic line "this page wandered off" on the cream paper is the entire thing |

## 9. Maintenance commitments

Calendar these. They slide otherwise.

| Task                                                                | Cadence                       |
| ------------------------------------------------------------------- | ----------------------------- |
| Replace placeholder `signature.svg` with the real handwritten version | within 30 days of launch    |
| Replace `hello-world.md` with a substantive first piece              | within 2 weeks of launch     |
| Refresh the `lately:` line in `about.ts`                            | every 1-3 months              |
| Walk the site, ask "is this earning its place?" for each personality element | 30 days post-launch, then quarterly |

The 30-day post-launch review specifically interrogates: badminton game,
bullet icons, washi texture visibility, signature animation freshness,
`lately:` line currency. Cut anything that isn't pulling its weight.

## 10. Restraint pledge

Future additions are subtractive — *pick what to cut before adding.*

This is a soft guardrail. Real enforcement is your discipline, not this
document. The document is here so the next idea has to confront the existing
restraint before it gets built.

If you find yourself wanting to add something not addressed above, the
question is: "what am I cutting to make room for this?" If the answer is
"nothing", you're probably about to weaken the aesthetic. Sit with the want
for a week. If it still feels essential, then make the trade.

The strongest version of this site at any future point has the same number
of personality elements as today, not more.
