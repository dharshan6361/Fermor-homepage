# Fermor homepage

A redesigned homepage for Fermor, built with Next.js (App Router), React, TypeScript and Tailwind CSS v4.

- **Live:** _add your Vercel URL here after deploying_
- **Repo:** _add your GitHub URL here_

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

Node 20+ recommended.

## Deploy

Push to GitHub, then import the repo at vercel.com/new. No environment variables or config needed.

## What the page says, and why

Fermor's own site has two sides: free, transparent calculators for India, and a wider product (Market, Portfolio, Act, Ask) built around **Understand. Act. Grow.** I wanted the homepage to hold both without feeling split, so:

1. **Hero: a working SIP forecast instead of an illustration.** A visitor can do something useful in the first five seconds. Sliders update the headline number and chart live, and "Show the maths" reveals the formula with their own inputs filled in. That one component carries the brand idea: no black boxes.
2. **Understand / Act / Grow as interactive tabs.** Each pillar gets a small, real interaction (spending breakdown, set up a SIP, goal projection) rather than a screenshot.
3. **Calculators as a grid showing each formula.** Links go to the live calculators on fermor.in.
4. **Ask demo.** Scripted, clearly labelled sample conversation. No model is called.
5. **Principles, insights, FAQ, waitlist, footer.** The footer keeps the "not a SEBI-registered adviser" disclosure, and the Ask section repeats it, because trust is the product here.

## Design decisions

- **Palette:** warm paper background, deep green ink, moss as the single accent, a small amber highlight. Green reads as growth without the generic fintech blue or purple gradient.
- **Type:** Fraunces (serif display) for headlines and big numbers, Inter for UI text. The serif gives numbers weight and keeps it from looking like a template. Both are self-hosted via `@fontsource-variable`, so there is no layout shift or third-party request.
- **Numbers:** Indian grouping (₹12,34,567) and lakh/crore short forms throughout. Tabular figures on anything that changes live.
- **Motion:** one gentle scroll-reveal and a typewriter in the Ask demo. Both are disabled under `prefers-reduced-motion`.
- **Accessibility:** semantic landmarks, labelled sliders with live `<output>`, keyboard-navigable tabs (arrow keys), native `<details>` for the FAQ, visible focus states, Escape closes the mobile menu.

## Structure

```
app/            layout, global styles and design tokens, page
components/     one file per section (Hero, Pillars, Calculators, AskDemo, ...)
lib/finance.ts  pure SIP / EMI maths and INR formatting
```

Calculation logic lives apart from the UI so it can be read and unit-tested on its own.

## Known limits

- All figures in the product panels are sample data.
- The waitlist form validates and shows a success state, but does not submit anywhere. Connect it to an API route or form service to collect emails.
- "Log in" and the calculator/article links point to the live fermor.in pages.
