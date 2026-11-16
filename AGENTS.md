# Tomato Energy: switch journey prototype

A mobile-first, coded prototype of a Figma design (portfolio case study). Fictional supplier: Tomato Energy.
Figma source: file `lNYXlhpTTsJyrBQLCLaIMs` ("Microsite - for portfolio"). Originally drafted in Figma Make; the
untouched Make runtime files are archived in `_make-export/` and are not used.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npx tsc --noEmit   # typecheck (Vite does not typecheck)
```

Handy links: `?intro=0` skips the loading animation, `?scenario=trad|objected|switchError|technical|cancelled|payment`
opens a user type or error state directly.

## Stack

React 19, Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`, utilities in JSX, global CSS in `src/index.css`), TypeScript. No router, no backend.

## Layout

- `src/App.tsx`: phone frame (desktop), scenario/user-type/error controls, demo note. Owns user, scenario and intro replay state.
- `src/LoadingStage.tsx`: the loading intro, driven by a single `requestAnimationFrame` clock.
- `src/LoadingAnimation.tsx`: draws the intro. `src/motion.ts` (gravity falls, bounces, the logo mark's path) and
  `src/timeline.ts` (frame timings, speed, total length) hold the tuning.
- `src/handoff.ts`: end-of-intro hand-off. Copies of the intro's logo and greeting are measured and flown to the landing page's logo and greeting (move + resize), then swapped for the real ones.
- `src/Microsite.tsx`: the landing page (header, MPAN, progress bar, accordion mount).
- `src/SmartMeterAccordion.tsx`: the journey stepper. Steps and error screens are data (`SCENARIOS`), rendered by one small component.
- `src/user.ts`: fake-user generator (name, UK address, 13-digit MPAN, always-future dates).
- `src/TomatoBounce.tsx`: the hopping tomato in the corner (random rest between hops; picks from four hop "moves" in `MOVES`, never the same twice in a row; elastic landing from `bounce()` in `motion.ts`).
- `public/assets/`: SVGs exported from Figma (referenced by filename).

## Conventions

- Mobile first: no hover styles inside the design. Prototype chrome (scenario rail) is desktop-only.
- Use the real Figma icons/assets, never emoji or glyph placeholders.
- Motion: bright, bouncy, continuous (no mid-air pauses). Tune with measured traces; see `src/motion.ts`.
- Some interactions (sub-step chips, checkboxes, popups) exist for display only; the demo note in the controls says so.
