# ENVY — The Movement

ENVY is an Android-first social platform for underground streetwear culture. The current phase is focused on brand awareness, community growth and audience engagement — not selling products.

## Platform

- Public, mobile-first editorial feed for ENVY posts.
- Owner-only post creation, drafts, publishing, archiving and deletion.
- Customer accounts and public community profiles.
- Follow ENVY, like posts, comment, repost, save and share.
- Owner dashboard for post views, likes, comments, reposts and followers.
- Installable Progressive Web App (PWA).

## Technology

- Static HTML/CSS/JavaScript hosted with GitHub Pages.
- Supabase Auth for customer and owner sessions.
- Supabase Postgres with Row Level Security on every public table.
- Supabase Storage bucket `envy-social-media` for public post images; uploads are restricted to the authorised owner.
- Browser uses only the Supabase publishable key. Never put service-role or secret keys in frontend files.

## Security model

The current owner account is identified by a fixed Auth UUID in database policies. Only that user can create, edit, publish, archive or delete posts and upload media. Customers can manage only their own likes, comments, reposts, follows and saved posts. Public visitors can read published posts and share links.

The owner dashboard is at `owner.html`; `admin.html` redirects to it.

## Development notes

The social rebuild is being developed on the `social-platform` branch. GitHub Pages deployment remains restricted to `main` until the new platform is tested and approved for release.

The previous shopping tables and checkout RPC have been removed from the database. The old checkout Edge Function has been retired and returns HTTP 410 with JWT verification enabled. No cart, product catalogue, checkout, payments or order workflow is part of this phase.

## Remaining launch checks

- Enable Supabase leaked-password protection in Auth settings.
- Complete browser/device testing for sign-up, login, post publishing, likes, comments, reposts, follows and analytics.
- Add rate limiting/anti-spam protections for views and comments before a large public launch.
- Complete Instagram integration through Meta's official APIs after the core platform is stable.
