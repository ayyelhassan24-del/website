# CLAUDE.md — Frontend Website Rules

## Plugin Setup (Run Once)

```
# Add the Claude Code Plugins Marketplace
/plugin marketplace add anthropics/claude-code

# Install the Frontend Design Plugin
/plugin install frontend-design@claude-code-plugins
```

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` — saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

---

# Capital Vault — Brand Guidelines

## Brand Position
Premium business funding authority. The vault that opens when banks say no. Aesthetic = old-money private bank, not fintech startup. Authority over playfulness. Gravitas over hype.

## Logo
- Primary file: `brand_assets/ABU LOGO.png` (used across all sites/sales pages)
- Mark: vault door + "CV" monogram in brushed gold on black
- Wordmark: "CAPITAL" in black, "VAULT" in gold
- Clearspace: minimum padding around logo = height of the "C" in CAPITAL on all sides
- Min size: 120px wide on web, never smaller
- Never recolor, rotate, distort, or add effects to the logo

## Color Palette

### Primary
- **Vault Black** — `#0A0A0A` — backgrounds, body text, primary surfaces
- **Vault Gold** — `#C9A961` — primary accent, CTAs, highlights, active states
- **Bone White** — `#F7F4ED` — light backgrounds, cards on dark, premium negative space

### Secondary
- **Deep Bronze** — `#8B6F3D` — hover states on gold, secondary accents, dividers
- **Champagne** — `#E8D9B0` — subtle gold tint for backgrounds, soft accents
- **Charcoal** — `#1F1F1F` — elevated dark surfaces (cards on black bg)
- **Slate Gray** — `#6B6B6B` — secondary text, muted UI

### Functional
- **Success Green** — `#3F7A57` (deep, not bright — keep premium feel)
- **Alert Red** — `#A63D3D` (deep wine red, not fire-engine)

### Usage Rules
- Default to Black + Gold + Bone White. That's 90% of any layout.
- Never use bright/saturated colors (no Tailwind blue, no bright green, no neon)
- Gold is precious — use sparingly for emphasis, never for large flat areas
- Backgrounds: Vault Black OR Bone White, never both fighting in the same section

## Typography

### Pairing
- **Headlines:** `Playfair Display` (serif) — weight 700/900, tight tracking `-0.02em`
- **Body & UI:** `Inter` (sans) — weight 400 body, 500/600 UI
- Both available via Google Fonts CDN

### Scale
- H1 (hero): 56-72px desktop / 36-44px mobile, line-height 1.1
- H2 (section): 40-48px desktop / 28-32px mobile, line-height 1.15
- H3 (subsection): 24-28px, line-height 1.25
- Body: 16-18px, line-height 1.7
- Small/caption: 13-14px, tracking `+0.05em`, often UPPERCASE for labels

### Rules
- Serif headlines = authority. Never use Inter for a hero headline.
- Body must always be Inter. Never serif body — kills readability.
- Numbers in stats/proof points: Playfair Display, gold color, oversized

## Buttons & CTAs

### Primary CTA
- Background: Vault Gold `#C9A961`
- Text: Vault Black `#0A0A0A`, weight 600, tracking `+0.05em`, UPPERCASE
- Padding: 16px 32px (desktop), 14px 24px (mobile)
- Border-radius: 4px (sharp, not pill — premium feel)
- Hover: background shifts to Deep Bronze `#8B6F3D`, subtle gold-tinted shadow
- Active: scale 0.98

### Secondary CTA
- Background: transparent
- Border: 1px solid Vault Gold `#C9A961`
- Text: Vault Gold `#C9A961`
- Hover: background fills Vault Gold, text becomes Vault Black

### Tertiary / Text Link
- Underlined, Vault Gold, hover Deep Bronze
- Never plain blue links. Never.

## Iconography
- Style: thin-stroke outlined (1.5-2px stroke), sharp corners
- Library: Lucide or Heroicons (outline variant)
- Color: Vault Gold for accent icons, Vault Black/Charcoal for UI
- Never use filled emoji-style icons. Never use playful/rounded icon sets.

## Imagery Style
- Photography: dimly-lit, high-contrast, warm tones — NOT bright stock-photo lifestyle
- Subjects: business owners, signed paperwork, handshakes, vault/bank interiors
- Always apply: gradient overlay `bg-gradient-to-t from-black/70 to-transparent`
- Color treatment: warm `mix-blend-multiply` layer with `#1F1F1F` for cohesion
- Avoid: generic stock business photos, suit-and-handshake clichés, AI-generated faces

## Surfaces & Depth
- Layering: base (Vault Black) → elevated (Charcoal `#1F1F1F`) → floating (Charcoal + 1px Gold border)
- Shadows: warm gold-tinted, low opacity. Example: `box-shadow: 0 4px 24px rgba(201, 169, 97, 0.12)`
- Border-radius: 4-8px MAX. Sharp = premium. Rounded = playful (wrong brand).
- Dividers: 1px Deep Bronze at 30% opacity, OR Vault Gold at 20% opacity

## Voice in Copy (when generating placeholder text)
- Authority, not hype. "We place capital." not "Get FUNDED FAST!!!"
- Specific numbers over vague claims. "$1.3M in 59 days" not "huge results"
- Short sentences. Banker confidence, not infomercial energy.
- Never use exclamation marks in headlines. Never use "🔥💰🚀"-tier emoji.

## Anti-Patterns (Never Do)
- Bright/neon colors anywhere
- Pill-shaped buttons or chunky rounded cards
- Default Tailwind blue/indigo as primary
- Sans-serif hero headlines
- Stock "businessman handshake" photography
- Fintech-startup gradient hero (purple-to-pink, etc.)
- Playful illustrations or emoji
- More than 2 fonts on a page

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
