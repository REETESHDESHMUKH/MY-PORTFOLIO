# Reetesh Deshmukh — Portfolio

[View the live portfolio](https://reetesh-deshmukh.vercel.app/)

A Next.js portfolio in the selected Mosaic / Sage + Clay design. The desktop sidebar stays stationary while the main panel scrolls. Small screens use a collapsible navigation menu and a separate content scroll area.

## Run locally

Use Node.js 20.9 or later. Install with `npm ci`, then run `npm run dev` and open http://localhost:3000. For production, run `npm run build` followed by `npm start`.

## Deploy on Vercel

The [Vercel project](https://vercel.com/reeteshdeshmukhs-projects/reetesh-deshmukh) is connected to `REETESHDESHMUKH/MY-PORTFOLIO` on the personal Hobby plan. Its **Root Directory** is `portfolio-ui`, its framework preset is **Next.js**, and it uses Node.js **24.x**, `npm ci` to install, and `npm run build` to build. Files outside the root directory are excluded. No environment variables or paid services are required.

The completed portfolio currently lives on `redeshm/initProject`, not `main`. Vercel tracks `redeshm/initProject` as the production branch, so subsequent pushes publish updates automatically. If the work is merged into `main`, update Branch Tracking under Settings → Environments → Production. Vercel supplies the public HTTPS URL; a custom domain is optional.

The coding-profile route must run server-side, so do not enable static export. Its in-memory cache is per server instance and can reset on cold starts. Provider outages still display the labeled fallback states.

Next.js is pinned to a patched 15.x release. The PostCSS, Nano ID, and Sharp overrides pin patched transitive versions; re-run `npm audit --omit=dev` when updating them.

## Update content

- `src/data/portfolio.ts`: personal details, experience, project descriptions and links, skills, community roles, and published blog posts.
- `src/components/portfolio/Portfolio.tsx`: sections, education, achievements, navigation, and interactions.
- `src/app/globals.css`: Sage + Clay colors, typography, fixed desktop layout, and responsive styles.
- `public/documents/reetesh-deshmukh-resume.pdf`: downloadable résumé supplied by the owner.
- `public/images/reetesh-deshmukh-enhanced.png`: hat-free, AI-enhanced profile portrait, using the owner's second photo as a hairstyle reference. `ProfilePhoto.tsx` and `.profile-photo-image` frame the face and hair. The original photo is preserved at `public/images/reetesh-deshmukh.jpeg`; generation details and the full prompt are in `output/imagegen/profile-photo-edit.md`.

No blog posts were present in the provided sources. The blog section has an intentional empty state. Add actual article entries to `blogPosts` to replace it.

## Coding profiles

`GET /api/coding-profiles` reads Codeforces API, LeetCode GraphQL, and the official AtCoder Algorithm profile. AtCoder's unique solved count comes from the community-maintained [AtCoder Problems API](https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/api.md), with attribution on the card section. Its accepted-problem rank is not used as the official contest rank. The route uses fixed handles, timeouts, independent provider fallbacks, request coalescing, and a 15-minute in-memory cache (one minute when a provider fails). It requires outbound network access on the deployed Node.js server; a static export cannot supply this route.

Current rating, peak rating, solved count, rank, and check time have distinct labels. On a failure the résumé snapshot is explicitly labeled, and unknown counts remain unknown. AtCoder has no résumé fallback: missing values appear as —, and one working source is retained as a partial update if the other source fails. Provisional AtCoder ratings are labeled. Codeforces totals deduplicate accepted problems; histories reaching 10,000 submissions fall back instead of publishing an incomplete count. AtCoder HTML parsing may need an update if its public page changes. No API keys are required.

## Welcome animation and icons

The ~2.25-second welcome pairs an italic “hello.” reveal with a soft sage-and-clay halo. It can be skipped by clicking, pressing any key, or using Skip intro, and replayed from the footer. It does not wait for stats or block the page from loading. CSS removes it even without JavaScript, and `prefers-reduced-motion` skips it entirely. Change the timing and colors in `globals.css`; behavior lives in `WelcomeIntro.tsx`.

The hero includes a lightweight, code-native SVG desk scene: a coder works at a laptop with gently moving hands, a head tilt, blinking, and coffee steam. `CoderAnimation.tsx` starts it after the welcome and offers Pause/Play. It pauses offscreen and in hidden tabs; reduced-motion and no-JavaScript visitors get a complete static illustration. CSS handles the motion without per-frame React updates. It stays beside the introduction on wide cards and stacks below on smaller cards. Visibility and motion-preference tests live beside `src/lib/coder-animation.mjs`.

Technology logos are bundled SVGs from [Devicon](https://github.com/devicons/devicon/tree/7330accdbc47e2dc0c19789a48533c4a3c50fe58), pinned to that revision with its MIT license in `public/icons/DEVICON-LICENSE`. `TechIcon.tsx` maps labels to assets and uses Lucide symbols for generic concepts. Logos are decorative beside visible names, muted by default, and regain color on hover. Company badges use an Oracle-inspired capsule mark and a learning symbol for SmartKnower; neither implies endorsement.

## Checks

`npm test` verifies accepted-problem deduplication, provider parsing, unrated profiles, independent outage fallbacks, coder-animation preferences, and résumé-aligned BUS PRIX content with its earlier-version source label. `npm run lint` checks source; `npm run build` checks the production bundle and TypeScript.

## Content provenance

The supplied résumé is the primary source for current OCI experience, contact details, NITK degree dates, CGPA, and achievements. Additional projects, the SmartKnower internship, GVN school details, and NITK community roles come from the owner's previous [portfolio](https://github.com/REETESHDESHMUKH/portfolio/blob/5c4a99cccbbfebffd0628e03c4fb7adcb025bd1c/src/constants/index.js).

The featured BUS PRIX card follows the résumé's Bus Ticket Booking System: Python, Django REST APIs, React, PostgreSQL, and Redis, including seat selection, booking history, cancellations, transaction-safe seat locking, and cached route/schedule searches. Its GitHub link is visibly labeled “Earlier version” because that repository documents the older Django/MySQL implementation; the details explain the distinction. Commented-out template contributions in the old portfolio were not imported. Old sample emails, stale employment wording, and hard-coded solved counts were not copied.

Fonts are served locally; their SIL Open Font License files are in `public/fonts`. Icons use the installed `lucide-react` package. No remote fonts, analytics, or contact-form service are required.
