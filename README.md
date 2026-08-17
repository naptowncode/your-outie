# Your Outie — Wellness Session

A *Severance*-inspired ambient web experience that displays surreal "Your outie..." affirmations in rotating stark color palettes, with occasional glitch-outs.

## Overview

Single-file vanilla HTML/CSS/JS. No build step, no dependencies beyond Google Fonts (Inter).

Open `index.html` in a browser to run.

## Features

### Affirmation Cycle
- **Staggered fade-in**: "Your outie" appears first, rest of phrase follows after ~1s delay
- **Hold**: 7 seconds
- **Fade-out**: 2.4s synchronized fade of text and line
- **Cross-fade**: 2s background color transition to next palette
- **Repeat**: Indefinitely

### Color Palettes (4, rotating)
| # | Background | Foreground | Line |
|---|------------|------------|------|
| 1 | `#ffffff` (white) | `#111111` (near-black) | `#111111` |
| 2 | `#880000` (dark red) | `#ffffff` (white) | `#ffffff` |
| 3 | `#224499` (dark blue) | `#ffffff` (white) | `#ffffff` |
| 4 | `#334433` (dark green) | `#ffffee` (cream) | `#ffffee` |

All combinations meet WCAG AAA contrast.

### Glitch-Outs
- **Trigger**: Every 20–60 seconds (real time)
- **Blinks**: 3–6 per glitch
- **Each blink**:
  - Random shift (±12px X/Y) applied to both text and line
  - **6 thin horizontal clipping blocks** (background-colored) overlay the phrase at random positions/heights
  - Duration: 15–55ms
  - Interval between blinks: 400–500ms (with occasional 80ms "stutter")
- **After last blink**: Text and line disappear instantly (no animation)
- **Color scheme**: Does NOT change after glitch; only changes after normal fade-out

### Affirmations (68 total)
- **34 "normal"**: Mundane, relatable ("prefers the window seat on airplanes", "knows they are loved")
- **34 "absurd"**: Surreal, corporate-sterile ("can divide by zero", "has over two hundred words for snow")
- **Selection logic**: First, 3 random normal, then a shuffle of all absurd and remaining normal. After pool exhaustion, reshuffles combined pool.
- **Time-based meta-commentary**: After 1+ hours, returns increasingly pointed messages ("has not refreshed this page in over an hour", "really should go outside and touch grass")

### Typography
- **Font**: Inter (Google Fonts)
- **Letter-spacing**: `-0.20em` (approximates Forma DJR from *Severance*)
- **Size**: `clamp(2.25rem, 6vw, 4.5rem)` — responsive
- **Weight**: 500

### Accessibility
- `prefers-reduced-motion`: Disables all animations, shows text/line instantly
- `aria-live="polite"` on phrase for screen readers
- `visibilitychange` listener pauses animation when tab hidden, resumes on return
- All color combinations meet WCAG AAA

### Technical Details
- **Single file**: `index.html` (HTML + CSS + JS)
- **No build step**, no bundler, no framework
- **Google Fonts**: Inter with `display=swap`
- **State**: Module-level variables, recursive `runCycle()` loop
- **Timing**: `Date.now()`-based scheduling with `setTimeout`/`Promise` sleep helper
- **Clipping blocks**: 6 pre-created absolute-positioned divs, repositioned per blink (no DOM churn, single layout read per glitch)

## Running

Literally just open `index.html` in any browser. It's fine.

## License

Don't like them, don't want them. This project is free and public domain to the extent allowed by law (see [LICENSE](LICENSE)).

That said, be aware that this project was heavily vibe-coded using a variety of models and may contain scraps of whatever copyrighted code those were trained on. Because intellectual property is over, and we're all going to jail.
