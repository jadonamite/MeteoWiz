# MeteoWiz
# Weather Observer System

## Overview
Professional meteorological data management system for weather observers.
Built with Next.js for scalability and maintainability.

## Current Features (0.04% of total scope)
- Weather observation data entry (Computational Page)
- Daily Register output (traditional weather log)
- METAR/SPECI formatting (aviation weather codes)
- Data persistence and retrieval

## Architecture

### Folder Structure
```
├── components/           # Reusable UI components
├── contexts/            # Global state management
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── pages/              # Next.js file-based routing
│   ├── api/           # Backend API routes
│   └── ...           # Frontend pages
├── services/          # External service integrations
├── styles/           # Global styles and themes
└── utils/           # Helper functions
```


### Key Design Decisions
- **JavaScript-only** for rapid development
- **Context API** for state management 
- **File-based routing** for intuitive navigation
- **Modular components** for future expansion
- **API routes** ready for database integration

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.


## Development Notes
- All weather data structures follow WMO standards
- METAR/SPECI formatting complies with ICAO standards
- Database schema designed for scalability
- Authentication system ready for implementation

---
