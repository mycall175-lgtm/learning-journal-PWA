# Learning Journal PWA

## Overview

A Progressive Web App (PWA) for documenting weekly learning journeys in mobile application development (FGCT6021). Students can write reflections, showcase projects, play a mini-game, and view portfolio reflections for Labs 1-7. The app works offline and can be installed on any device.

**Student**: Mykel Yadav  
**Student ID**: 2321764  
**Email**: mycall175@gmail.com

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **Jan 2025**: Added Flask backend with JSON file storage for PythonAnywhere deployment
- **Jan 2025**: Created Portfolio page with Labs 1-7 reflections and Mini Project (sections 9.1-9.4)
- **Jan 2025**: Added third-party API integration (Quotable API for inspirational quotes)
- **Jan 2025**: Enhanced Browser API documentation in the Portfolio page
- **Jan 2025**: Added accessibility features documentation

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/` (Home, Journal, Projects, Game, Portfolio, About)
- Reusable components in `client/src/components/`
- UI primitives from shadcn/ui in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`
- Theme support via custom ThemeProvider (light/dark mode)

### Backend Architecture

#### Express.js Backend (Development - Replit)
- **Framework**: Express.js with TypeScript
- **API Style**: RESTful endpoints under `/api/`
- **Storage**: In-memory storage with seeded sample data
- **Build**: esbuild for production bundling

#### Flask Backend (Production - PythonAnywhere)
- **Framework**: Python Flask
- **API Style**: RESTful endpoints under `/api/`
- **Storage**: JSON file storage (`flask_backend/data/`)
- **Location**: `flask_backend/app.py`

Key API routes:
- `GET/POST /api/reflections` - List/Create reflections
- `GET/PUT/DELETE /api/reflections/:id` - Read/Update/Delete reflection
- `GET /api/projects` - List projects

### Data Storage
- **Development**: In-memory storage (`MemStorage` class)
- **Production (Flask)**: JSON file storage
  - `flask_backend/data/reflections.json`
  - `flask_backend/data/projects.json`

### PWA Features
- Service Worker for offline caching (`client/public/sw.js` - v4)
- Web App Manifest for installation (`client/public/manifest.json`)
- Custom PWA icons (icon-192.png, icon-512.png)
- Offline fallback page (`client/public/offline.html`)
- Offline indicator component
- Install prompt handling in main App component

### Third-Party API Integration
- **Quotable API**: Fetches inspirational quotes for the home page
- Cached in localStorage to reduce API calls
- Fallback quotes for offline/error scenarios
- Uses React Query for data fetching

### Browser APIs Used
1. **LocalStorage API**: Theme persistence, quote caching, game scores
2. **Service Worker API**: Offline caching and background sync
3. **Navigator API**: Online/offline detection, PWA install prompt
4. **Fetch API**: API requests to backend and third-party services

### Accessibility Features
- Semantic HTML structure with proper heading hierarchy
- ARIA labels on interactive elements and navigation
- High contrast color scheme meeting WCAG guidelines
- Keyboard navigation support throughout the application
- Focus indicators on all interactive elements
- Screen reader compatible content structure

### Project Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Route pages (Home, Journal, Projects, Game, Portfolio, About)
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and providers
│   └── public/           # Static assets, SW, manifest, icons
├── flask_backend/        # Python Flask backend (for PythonAnywhere)
│   ├── app.py            # Flask application
│   └── data/             # JSON file storage
├── server/               # Express backend (for Replit)
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   └── storage.ts        # Data storage layer
├── shared/               # Shared types and schemas
│   └── schema.ts         # Drizzle schema definitions
└── dist/public/          # Built frontend files
```

## Deployment

### Replit (Development)
- Uses Express.js backend with in-memory storage
- Run: `npm run dev`

### PythonAnywhere (Production)
1. Upload `flask_backend/` and `dist/public/` to PythonAnywhere
2. Configure WSGI to point to `flask_backend/app.py`
3. Ensure `data/` directory is writable

## External Dependencies

### UI Components
- **Radix UI**: Headless component primitives (dialogs, menus, forms)
- **shadcn/ui**: Pre-styled component library built on Radix
- **Lucide React**: Icon library

### Form Handling
- **React Hook Form**: Form state management
- **Zod**: Schema validation

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **Google Fonts**: Inter, DM Sans, Fira Code font families

## GitHub Repository
https://github.com/mycall175-lgtm/learning-journal-PWA
