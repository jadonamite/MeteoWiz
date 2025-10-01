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
=======
# Copilot Instructions for MeteoWiz

## Project Overview
- **MeteoWiz** is a professional meteorological data management system for weather observers, built with Next.js (JavaScript-only) for scalability and maintainability.
- Key features: weather observation entry, daily register, METAR/SPECI formatting, and data persistence.

## Architecture & Key Patterns
- **Next.js file-based routing**: All pages are in `pages/`. API endpoints are in `pages/api/` (e.g., `pages/api/observations.js`, `pages/api/metar/[id].js`).
- **UI Components**: Modular, reusable components in `components/`. Layout components in `components/layout/`.
- **State Management**: Uses React Context API (`contexts/WeatherContext.js`) for global state.
- **Custom Hooks**: Place shared logic in `hooks/` (e.g., `useLocalStorage.js`).
- **Utilities**: Weather calculations and formatting in `utils/` (e.g., `metarFormatter.js`, `weatherCalculations.js`).
- **Database/Backend**: `lib/database.js` handles persistence. API routes are ready for DB integration.
- **Styling**: Global styles in `styles/globals.css` and `app/globals.css`.

## Developer Workflows
- **Install & Run**: Use `npm install` then `npm run dev` to start the app at `http://localhost:3000`.
- **No TypeScript**: All code is JavaScript for now.
- **Testing**: No explicit test framework present; add tests in a `__tests__/` folder if needed.
- **Data Standards**: Weather data follows WMO; METAR/SPECI formatting follows ICAO.

## Project Conventions
- **Component Naming**: Use PascalCase for components (e.g., `WeatherInputForm.js`).
- **API Naming**: Use RESTful patterns for API endpoints.
- **State**: Use Context for app-wide state, props for local state.
- **Expansion**: Structure is modular for easy addition of new features (see `Future Expansion Areas` in `README.md`).

## Integration Points
- **Database**: `lib/database.js` is the entry for persistence logic.
- **External APIs**: Future integrations should go in `services/` (folder exists in docs, create if needed).
- **Authentication**: System is ready for auth, but not yet implemented.

## Examples
- To add a new weather calculation, place logic in `utils/weatherCalculations.js` and expose via Context or API as needed.
- To add a new page, create a file in `pages/` (e.g., `pages/new-feature.js`).
- To add a new API route, add a file in `pages/api/`.

## References
- See `README.md` for high-level roadmap and standards.
- See `contexts/WeatherContext.js` for state patterns.
- See `components/` for UI conventions.

---
For questions or unclear patterns, review the `README.md` or ask for clarification in project discussions.
>>>>>>> 534b6ce2f9a740a211916407df7e6122ae852110
