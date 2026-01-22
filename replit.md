# Learning Journal PWA

## Overview

A Progressive Web App (PWA) for documenting weekly learning reflections in mobile application development. The application allows users to create and manage learning journal entries, showcase projects, and includes features like offline support, installability, dark/light theme switching, and a simple tic-tac-toe game.

Built for the FGCT6021 Mobile Application Development course, this full-stack application uses React with TypeScript on the frontend and Express.js on the backend, with an alternative Flask backend available.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state caching and synchronization
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Build Tool**: Vite with HMR support
- **PWA Features**: Service worker for offline caching, web app manifest for installability

### Backend Architecture
- **Primary Server**: Express.js with TypeScript
- **Alternative Server**: Flask (Python) in `flask_backend/` directory
- **API Pattern**: RESTful API with `/api/reflections` and `/api/projects` endpoints
- **Data Validation**: Zod schemas shared between frontend and backend via `@shared/` alias

### Data Storage
- **Schema Definition**: Drizzle ORM with PostgreSQL dialect
- **Current Storage**: In-memory storage (`MemStorage` class) with seed data
- **Database Ready**: Schema defined in `shared/schema.ts` supports PostgreSQL migration via `drizzle-kit push`
- **Flask Alternative**: JSON file-based persistence in `flask_backend/data/`

### Project Structure
```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and providers
│   └── public/           # Static assets, PWA manifest, service worker
├── server/               # Express.js backend
├── shared/               # Shared types and schemas
├── flask_backend/        # Alternative Python backend
└── migrations/           # Database migrations (Drizzle)
```

### Key Design Patterns
- **Monorepo Structure**: Client, server, and shared code in single repository
- **Path Aliases**: `@/` for client source, `@shared/` for shared modules
- **Form Handling**: React Hook Form with Zod validation
- **Theme System**: CSS variables with localStorage persistence
- **Offline Strategy**: Service worker with cache-first for static assets, network-first for API calls

## External Dependencies

### Database
- **PostgreSQL**: Required for production (via `DATABASE_URL` environment variable)
- **Drizzle ORM**: Database toolkit for type-safe queries
- **drizzle-kit**: CLI for schema migrations

### UI Framework
- **Radix UI**: Accessible, unstyled component primitives
- **shadcn/ui**: Pre-built component library using Radix + Tailwind
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel component

### External APIs
- **Quotable API**: `https://api.quotable.io/random` for daily inspirational quotes (with offline fallback)

### Development Tools
- **Vite**: Frontend build and dev server
- **esbuild**: Backend bundling for production
- **tsx**: TypeScript execution for development

### Session Management
- **connect-pg-simple**: PostgreSQL session store (available but not currently active)
- **express-session**: Session middleware infrastructure