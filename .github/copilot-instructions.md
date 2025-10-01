<<<<<<< HEAD

# Copilot Instructions for MeteoWiz

## Project Overview
- **MeteoWiz** is a Next.js app (JavaScript-only) for meteorological data management. The current codebase is a minimal Next.js 15+ app directory structure, using Tailwind CSS and Vercel's Geist font.
- The project is scaffolded with `create-next-app` and uses the `/src/app/` directory for routing and layout.

## Architecture & Key Patterns
- **App Directory Routing**: All routes and layouts are in `src/app/` (e.g., `src/app/page.js`, `src/app/layout.js`). No `pages/` directory is present.
- **Styling**: Uses Tailwind CSS via `src/app/globals.css` and PostCSS config. Font variables are set up for Geist Sans/Mono.
- **Assets**: Static assets (SVGs, icons) are in `public/`.
- **No Custom Components/State**: There are currently no `components/`, `contexts/`, `hooks/`, or `utils/` directories. Add new features directly under `src/app/` or create new folders as needed.
- **Config**: Project config files include `next.config.mjs`, `eslint.config.mjs`, `postcss.config.mjs`, and `jsconfig.json` (with `@/*` alias for `src/*`).

## Developer Workflows
- **Install & Run**: Use `npm install` then `npm run dev` to start the app at [http://localhost:3000](http://localhost:3000).
- **Build**: Use `npm run build` and `npm start` for production.
- **Lint**: Run `npm run lint` (uses Next.js core-web-vitals ESLint config).
- **No TypeScript**: All code is JavaScript.
- **No Test Framework**: No tests or test folders are present.

## Project Conventions
- **File Naming**: Use PascalCase for new React components, kebab-case for CSS files, and keep route files lowercase (e.g., `page.js`).
- **Routing**: Add new routes as folders/files under `src/app/` (see Next.js app directory docs).
- **Styling**: Use Tailwind utility classes and extend `globals.css` as needed.
- **Assets**: Place static files in `public/` and reference with `/` paths.

## Integration Points
- **Fonts**: Uses `next/font` for Geist Sans/Mono (see `src/app/layout.js`).
- **Tailwind**: Configured via `postcss.config.mjs` and imported in `globals.css`.
- **No API/DB**: No backend, API, or database logic is present yet. Add new features as needed.

## Examples
- To add a new route: create a file (e.g., `src/app/about/page.js`).
- To add global styles: edit `src/app/globals.css`.
- To add a new static asset: place it in `public/` and reference as `/asset.svg`.

## References
- See `README.md` for getting started and deployment.
- See `src/app/layout.js` and `src/app/page.js` for app structure and usage patterns.
- See `src/app/globals.css` for Tailwind and CSS conventions.

---
If you add new folders (components, hooks, etc.), update this file to document new patterns. For unclear patterns, review the `README.md` or ask for clarification.
