# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server on `0.0.0.0:5173`
- `npm run build` — create a production build
- `npm run preview` — preview the production build locally
- There are currently no lint or test scripts in `package.json`, so there is no built-in single-test command yet.

## Stack and entry points

- Vite 6 + Vue 3 + Vue Router 4 + Pinia + Vant 4
- JavaScript-only project; no TypeScript setup
- `src/main.js` bootstraps the app, imports global styles, manually registers Vant components, and mounts Pinia + router.
- `vite.config.js` defines the `@` alias to `/src`, injects `src/styles/variables.scss` into every SCSS file, and exposes the dev server on port 5173.

## High-level architecture

- Routing is centralized in `src/router/index.js`. Pages are lazy-loaded from `src/views/<feature>/index.vue`, and the global `beforeEach` hook sets `document.title` from `route.meta.title`.
- The codebase is page-first: most UI state, mock data, and interaction logic live directly inside each view component instead of shared composables.
- Shared UI is minimal right now. `src/components/BottomNav.vue` is the main reusable shell component for the tabbed sections.
- Global theme tokens live in `src/styles/variables.scss`, while `src/styles/index.scss` contains the reset and common layout helpers. Component/page SCSS can use the theme variables without importing them explicitly.
- Pinia stores are in `src/stores/`. `drama.js` owns category/recommendation/detail state and falls back to mock data when API calls fail; `user.js` owns token/profile state and persists the token in `localStorage`.
- API access is centralized in `src/api/index.js` through a thin `fetch` wrapper. The base URL comes from `import.meta.env.VITE_API_BASE_URL` and defaults to `/api`; bearer auth is pulled from `localStorage`.

## Repository-specific gotchas

- `request()` in `src/api/index.js` merges headers but does not serialize `options.params`. For GET requests with query parameters, build the query string into the URL yourself before calling `request()`.
- The app currently mixes store/API-backed flows with hardcoded page-local mock data. Before wiring a feature, check whether the page already bypasses the store/API layer.
- Not every view folder is registered in the router. For example, `src/views/wallet/index.vue` exists, but `src/router/index.js` does not define a `/wallet` route. Some paths pushed from the profile page also do not have router entries yet.
- Vant components are manually registered in `src/main.js`; if you introduce a new Vant component, register it there unless you also change the component import strategy.
