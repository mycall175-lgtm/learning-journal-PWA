# Learning Journal PWA

## Overview

A Progressive Web App (PWA) for documenting weekly learning journeys in mobile application development. Students can write reflections, showcase projects, and build a professional portfolio. The app works offline and can be installed on any device.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/` (Home, Journal, Projects, About)
- Reusable components in `client/src/components/`
- UI primitives from shadcn/ui in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`
- Theme support via custom ThemeProvider (light/dark mode)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Style**: RESTful endpoints under `/api/`
- **Build**: esbuild for production bundling

Key routes:
- `/api/reflections` - CRUD operations for learning reflections
- `/api/projects` - CRUD operations for project showcases

### Data Storage
- **Schema Definition**: Drizzle ORM with PostgreSQL dialect
- **Current Storage**: In-memory storage (`MemStorage` class) with seeded sample data
- **Database Ready**: Schema defined in `shared/schema.ts` for PostgreSQL migration

The storage layer uses an interface pattern (`IStorage`) allowing easy swap between in-memory and database implementations.

### PWA Features
- Service Worker for offline caching (`client/public/sw.js`)
- Web App Manifest for installation (`client/public/manifest.json`)
- Offline indicator component
- Install prompt handling in main App component

### Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Route pages
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and providers
│   └── public/          # Static assets, SW, manifest
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   └── storage.ts    # Data storage layer
├── shared/           # Shared types and schemas
│   └── schema.ts     # Drizzle schema definitions
└── script/           # Build scripts
```

## External Dependencies

### Database
- **Drizzle ORM**: Schema definition and query building
- **PostgreSQL**: Target database (via `drizzle-kit` and `pg` packages)
- Database URL configured via `DATABASE_URL` environment variable

### UI Components
- **Radix UI**: Headless component primitives (dialogs, menus, forms)
- **shadcn/ui**: Pre-styled component library built on Radix
- **Lucide React**: Icon library

### Form Handling
- **React Hook Form**: Form state management
- **Zod**: Schema validation (integrated with Drizzle via `drizzle-zod`)

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **Google Fonts**: Inter, DM Sans, Fira Code font families

### Session Management
- **connect-pg-simple**: PostgreSQL session store (available for future auth)
- **express-session**: Session middleware (available for future auth)