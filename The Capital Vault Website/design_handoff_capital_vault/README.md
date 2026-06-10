# Handoff: The Capital Vault — Marketing Landing Page

## Overview
A single-page, high-converting marketing site for **The Capital Vault**, a capital-advisory
service that connects established business operators with a network of 500+ institutional and
private lenders. The page positions the brand as a premium "strategic funding" desk that
engineers competition among lenders to secure non-dilutive capital fast.

## About the Design Files
The files in this bundle are **design references created in HTML/CSS/vanilla JS** — a working
prototype that demonstrates the intended look, copy, layout, and interactions. They are **not
meant to be shipped as-is**. Your task is to **recreate this design in the target codebase's
environment** (e.g. React/Next.js, Vue, Astro, etc.) using its established component patterns,
styling system, and conventions. If no codebase exists yet, choose the most appropriate modern
framework (Next.js + Tailwind is a good default for a marketing site) and implement it there.

- `The Capital Vault.html` — the full page (all markup, CSS in a `<style>` block, JS at bottom).
- `image-slot.js` — a custom element used only as a drag-and-drop image placeholder in the
  prototype. **Do not port this.** Replace each `<image-slot>` with a normal responsive
  `<img>`/`<picture>` (or your CMS image component) and real photography.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy, and interactions are all intended as
shown. Recreate the UI faithfully. The only placeholders are the two photographic areas (hero
background + case-study image), which render as a subtle gold pinstripe pattern and must be
filled with real images.

---

## Design Tokens

### Color
| Token | Value | Use |
|---|---|---|
| `--black` | `#0a0a0a` | Primary page background (dark bands) |
| `--black-deep` | `#060606` | Footer background, hero scrim base |
| `--panel` | `#141210` | Inset panels / image-slot fallback, "Why" banner |
| `--gold` | `#d4af37` | Primary brand accent (buttons, kickers, emphasis) |
| `--gold-soft` | `#cbb069` | — |
| `--gold-deep` | `#a87f2a` | Gold emphasis on light/cream backgrounds |
| `--cream` | `#f7f4ed` | Light "catalogue" band background; light text on dark |
| `--cream-2` | `#efe9dc` | — |
| `--ink` | `#16130d` | Primary text on cream bands |
| `--ink-soft` | `#4a443a` | Secondary text on cream bands |
| `--text` | `#e9e5dc` | Primary text on dark bands |
| `--muted` | `#9a948a` | Secondary text on dark |
| `--muted-dim` | `#6f6a62` | Tertiary text on dark |
| `--hairline` | `rgba(212,175,55,0.20)` | Gold 1px dividers/borders |
| `--hairline-soft` | `rgba(212,175,55,0.12)` | Fainter gold dividers |
| `--hairline-ink` | `rgba(22,19,13,0.14)` | Dividers on cream bands |

### Typography
- **Display / headings:** `'Playfair Display', serif` (Google Fonts), weights 400–900.
  Headlines use weight 800 with an *italic 500* `<em>` accent rendered in gold. `letter-spacing: -0.02em`, `line-height: ~1.02`.
- **Body / UI:** `'Sora', sans-serif` (Google Fonts), weights 300–700. Body copy is weight 300–400.
- **Kickers / eyebrows / button labels / spec labels:** Sora, 11–13px, weight 600,
  `text-transform: uppercase`, `letter-spacing: 0.1em–0.28em`, gold.
- Hero H1: `clamp(46px, 6.4vw, 92px)`. Section H2: `clamp(36px, 4.6vw, 60px)`.

### Spacing / Layout
- Content container: `max-width: 1240px`, side padding `40px` (24px on mobile).
- Section vertical padding (`.band`): `130px` desktop, `88px` mobile.
- 4px base scale; common gaps 16/24/32/40/72px.

### Shape / Elevation
- Buttons & pills: small radius `2px` (sharp, editorial) — note: pills/badges use `9999px`.
- **No drop shadows by design.** Depth comes from black↔cream band switches and gold hairlines.
- Badge pills & tags: `border-radius: 9999px`.

### Motion
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Scroll-reveal: elements fade/translate-up in as they enter the viewport. **Critical pattern:**
  the visible end-state is the *base* style; the hidden/animated state is only applied after JS
  confirms a live animation frame (class `anim-on` on `<html>`). This guarantees content is never
  trapped invisible in SSR/print/no-JS. In a React build, use `IntersectionObserver` with the same
  "visible by default, enhance with motion" principle and respect `prefers-reduced-motion`.
- Stat counters animate 0→target on scroll into view; **base markup contains the final value** so
  it's correct without JS.

---

## Page Structure (top → bottom)

### 1. Header / Nav (fixed)
- Fixed top bar, transparent over hero; on scroll >20px gains `rgba(8,8,8,0.82)` bg +
  `backdrop-filter: blur(14px)` + bottom hairline.
- Left: wordmark "The Capital **Vault**" (Vault in gold) with a rotated-square gold diamond mark.
- Center links: **The Desk** (#approach), **Capital Menu** (#funding), **Process** (#work),
  **Results** (#results), **FAQ** (#faq).
- Right: gold pill button **"Request Consultation"** (#start).
- < 720px: links collapse into a hamburger → full-screen overlay menu.

### 2. Hero (full-bleed photo)
- Full-viewport (`min-height: 94vh`) with a background image area + a left-to-right dark scrim
  gradient for legibility. **Replace the `<image-slot id="hero-bg">` with a real full-bleed photo**
  (business owner / operator at work).
- Gold badge pill: "◆ Strategic Funding for Proven Operators".
- H1: **"Make the lenders *compete for you.*"** ("compete for you." in italic gold.)
- Lede: "The Capital Vault connects established enterprises with **500+ institutional and private
  lenders**, then engineers a competitive environment where they bid for your business. The result:
  the most favorable non-dilutive rates on the market, with the approval certainty traditional
  banking can't match."
- CTAs: gold **"Request a Strategic Capital Consultation →"** + outline **"View the Capital Menu"**.
- Trust row: "500+ lender network · 100% non-dilutive · Funded in 5–23 days".

### 3. Stats band (#approach)
Four stats separated by vertical hairlines, top/bottom hairline rules. Numbers in Playfair.
- 600+ — Businesses funded
- $80M+ — Capital procured
- 500+ — Institutional lender partners
- 5–23 — Average days to funding

### 4. Case Study (#results) — cream band
Two-column: copy left, image right.
- Kicker: "The Liquidity Breakthrough · Case No. 014".
- H2: "Three bank declines. *$1.3M deployed.*"
- Three labeled rows:
  - **The Situation** — "A regional HVAC operator with **$5M+ in revenue**, declined by three traditional banks over a 620 credit score and no collateral."
  - **The Solution** — "We leveraged our **500+ lender network** to find partners who weigh cash flow and trajectory over credit score, then secured multiple competing offers."
  - **The Result** — "**$1.3M deployed in 59 days.** He expanded into two new territories that year, keeping 100% ownership and control."
- Button: dark **"See More Breakthroughs →"**.
- Right column: **replace `<image-slot id="case-visual">` with a real photo**. Overlays: a
  "Funded in 59 days" tag (top-left) and a glassy quote panel (bottom): *"Everyone said no. The
  Vault found the yes, and the structure to make it work."* — Operator, Regional HVAC.

### 5. Why The Capital Vault — dark band
- Kicker "Why The Capital Vault", H2 "Why operators choose *the Vault.*"
- Three numbered cards (01/02/03), hover lifts + gold border:
  - **We master the system** — "We still use the traditional banks, then expand your reach to 500+ lenders, so you're never limited by one institution's rigid criteria."
  - **We engineer competition** — "When 500+ lenders compete for your business, you win. We force the market to work for you and secure the lowest rates available anywhere."
  - **We ensure approval** — "Our desk evaluates your enterprise's intrinsic value, matching you with the specific lenders in our network ready to fund your industry and your stage."
- Banner (panel bg + hairline): "The Capital Vault puts the operator first." / "We engineer the
  *competition*. You keep the leverage and 100% of your equity." + gold button "Start Your Capital Strategy".

### 6. Capital Menu (#funding) — dark band
- Kicker "The Capital Menu", H2 "The capital allocation *menu.*", intro paragraph (right-aligned),
  and a **"24 hrs — Funding as fast as 24 hours"** highlight strip.
- A list of instrument rows, each: `[ title + description | 3 spec columns | actions ]`.
  Row hover shows a left-to-right gold tint. Columns: **Amount / Speed / Rate** (gold labels).
  Actions: gold "Apply" button + "Learn more".

| Instrument | Tag | Amount | Speed | Rate |
|---|---|---|---|---|
| Business Line of Credit | Most flexible | Up to $10M | 1–3 days | From 8% APR |
| Revenue-Based Financing | Funds in 24 hrs | Up to $5M | As fast as 24 hrs | Factor-rate based |
| SBA Loan Programs | — | Up to $5M | 1–3 months | Prime + |
| Term Loans | — | Up to $2M | 3–10 days | From 9% APR |
| Equipment Financing | — | Up to $5M | 2–7 days | From 7% APR |
| 0% Interest Credit Lines | Most popular | Up to $150K | 7–14 days | 0% intro APR |

- Footer line: "Not sure which instrument fits? **Our desk engineers the structure for you.**" +
  outline button "Get Your Capital Match →".

### 7. How It Works (#work) — cream band
- Kicker "How It Works", H2 "Simple. Strategic. *Successful.*"
- Three steps (01/02/03) with a thin gold rule:
  - **Consultation** — "A 20-minute strategic assessment of your revenue, growth, and capital needs. We map every instrument you qualify for." (meta: "20-minute assessment")
  - **Structuring** — "We engineer your file and position it across our 500+ lender network, forcing lenders to compete to maximize your offers." (meta: "500+ lenders, one file")
  - **Deployment** — "You receive the capital you need at the best possible rates. You keep 100% of your equity. No dilution, no strings." (meta: "Funded in 5–23 days")

### 8. FAQ (#faq) — dark band
Two-column (heading left, accordion right). Accordion: only one open at a time; +/− gold sign
toggles; answer height animates open. Questions:
1. How quickly can I get capital?
2. What if my credit isn't perfect?
3. Will I give up equity?
4. How much can I qualify for?
5. What's the cost?
(See HTML for full answer copy.)

### 9. Lead Form (#start) — cream band
- Aside: kicker "Strategic Capital Consultation", H2 "Request your strategic *consultation.*",
  paragraph, and three check-marked points (Real clarity / No obligation / Zero upfront fees).
- Form card (dark): Full Name, Email, Phone, Annual Revenue (select), "What do you need capital
  for?" (textarea), gold submit **"Request My Consultation →"**, fine print.
- On submit: client-side validation (required fields + email regex); on success the form is
  replaced by a confirmation panel ("Your consultation is reserved.").
- In production, wire the form to your CRM/webhook/email service.

### 10. CTA — gold band
Full gold background, black text, two faint outlined circles as decoration.
- Kicker "Power Your Growth", H2 "Ready to power your *growth?*", paragraph, dark button
  **"Request Your Consultation →"**.

### 11. Footer — near-black
Four columns (brand+tagline / Navigate / Contact / Legal) above a copyright + regulatory
disclosure row.
- **Contact:** 989-614-4359 · support@thecapitalvault.com · 24 Greenway Plaza, Ste 1800,
  Houston, TX 77046 (linked to Google Maps) · Schedule a Consultation.
- Disclosure: "The Capital Vault is a capital advisory service, not a direct lender or bank.
  Funding availability, amounts, and terms are determined by third-party lenders and subject to approval."

---

## Interactions & Behavior Summary
- **Sticky header** state toggles on scroll.
- **Mobile menu** open/close (hamburger animates to X; body scroll lock optional).
- **Scroll-reveal** fade/translate (visible-by-default, enhance-with-JS; respect reduced motion).
- **Animated stat counters** 0→target on enter (final value in base markup).
- **FAQ accordion** single-open with height transition.
- **Lead form** validation + success state swap.
- **Hover states** on buttons (lift + bg change), nav links (gold underline draw), cards (border + lift), funding rows (gold tint).
- **Responsive:** 1024px and 720px breakpoints. Grids collapse 2-up→1-up; nav→hamburger; hero clamps.

## Assets
- Fonts: Google Fonts — Playfair Display + Sora (already linked in the HTML `<head>`).
- Photography: **none included** — supply a hero photo and a case-study photo. The brand mark and
  all icons are pure CSS (rotated squares, CSS check/plus glyphs); no icon library required.

## Files in this bundle
- `The Capital Vault.html` — complete design reference (markup + CSS + JS).
- `image-slot.js` — prototype-only placeholder element (do **not** port; use real images).
- `README.md` — this document.
