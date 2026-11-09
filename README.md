# ENVY — Underground Streetwear

ENVY is an Android-first, installable storefront for an independent oversized streetwear label.

## Current implementation
- Responsive storefront landing page and Drop 001 product catalogue.
- Category filters and product detail/size selection.
- Shopping bag with quantity controls and persistent browser storage.
- Checkout form that saves a clearly labelled local order request for preview only.
- PWA manifest and service worker for Android installation through Chrome.
- Original private mockup archive preserved at `archive.html`.

## Important launch status
This repository currently contains a front-end prototype. Cart and preview order requests are stored in the visitor's browser only. They are **not** shared with the brand, no payment is collected, and the checkout is not production-ready. Before accepting real customers, connect a secure shared database (for products, stock and orders), authenticated admin access, server-side order validation, delivery rules, privacy/returns policies, and a South African payment provider such as PayFast or Yoco. Never place payment secrets in browser code.

## Run locally
Open `index.html` through a local web server. For Android installation, deploy the site over HTTPS, open it in Chrome, then choose **Install app** or **Add to Home screen**.

## Main files
- `index.html` — storefront
- `archive.html` — preserved original ENVY mockup archive
- `manifest.json` — installable app metadata
- `sw.js` — offline shell cache
- `icon.svg` — ENVY app icon
