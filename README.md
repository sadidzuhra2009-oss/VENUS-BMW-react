# VENUS — BMW Collection

A premium, responsive React + Vite showcase for the VENUS BMW sales and rental concept. The visual direction uses steel, silver, white and black, with restrained motion and responsive layouts.

## Run locally

1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. Open the terminal in this folder and run:

```bash
npm install
npm run dev
```

4. Open the local URL printed by Vite (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Included interactions

- English / Dari interface toggle, including RTL layout.
- BMW-only sample vehicle collection.
- Sale / rental filters, search, and price sorting.
- Vehicle detail modal and saved/favorite buttons.
- Inquiry form that prepares an email draft.
- Responsive mobile navigation and motion/reveal effects.

## Before presenting or publishing

- The vehicle listings, specifications and prices are demonstration data. Verify or replace them with approved real listings.
- Photos are remote Unsplash URLs; internet access is required and photos should be checked against each exact vehicle model before public use.
- The inquiry form currently opens the visitor's email application. Replace `contact@venus-auto.com` in `src/App.jsx` with the real VENUS contact email, or connect a backend/form service.
- This is a frontend demonstration, not a connected database, authentication system, or live booking platform.
