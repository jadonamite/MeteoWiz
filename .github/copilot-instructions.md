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
