# NEDP - National Education Data Platform

## Overview
This is a Vite + React + TypeScript application for a National Education Data Platform (NEDP). It's an AI-powered education platform that connects students, teachers, institutions, and government to track progress, analyze performance, and drive educational excellence.

## Project Architecture
- **Frontend**: Vite + React + TypeScript
- **UI Library**: shadcn-ui + Tailwind CSS
- **Backend**: Supabase (Authentication & Database)
- **Routing**: React Router DOM
- **State Management**: TanStack Query (React Query)
- **Map Integration**: React Leaflet

## Tech Stack
- Vite v5.4.19
- React 18.3.1
- TypeScript
- shadcn-ui components
- Tailwind CSS
- Supabase for backend services
- React Router for navigation
- React Leaflet v4.2.1 (downgraded from v5.0 for React 18 compatibility)

## Development Setup
The project has been configured to run in the Replit environment:
- Development server runs on port 5000 (0.0.0.0)
- Uses npm with legacy-peer-deps enabled (due to react-leaflet compatibility)
- Vite configured with HMR on port 5000
- **Important**: Vite is configured to allow all hosts via `allowedHosts: true` to support Replit's dynamic proxy domains
- Supabase connection via environment variables

## Key Features
- Role-based dashboards (Admin, Institution, Student, Teacher)
- AI-powered insights and chatbot
- Map visualization with Leaflet
- Authentication system
- Responsive design with dark mode support

## Running the Project
The workflow "Start application" runs `npm run dev` which starts the Vite development server on port 5000.

## Environment Variables
The project uses the following Supabase environment variables (already configured in `.env`):
- VITE_SUPABASE_PROJECT_ID
- VITE_SUPABASE_PUBLISHABLE_KEY
- VITE_SUPABASE_URL

## Project Structure
- `/src/pages` - Page components for different routes
- `/src/components` - Reusable React components
- `/src/components/ui` - shadcn-ui components
- `/src/integrations/supabase` - Supabase client and types
- `/src/lib` - Utility functions
- `/src/hooks` - Custom React hooks
- `/public` - Static assets

## Notes
- This project was imported from Lovable.dev
- npm uses `--legacy-peer-deps` for package installation due to react-leaflet peer dependency requirements
- Configured for Replit's proxy environment with proper host settings
- **Important**: react-leaflet was downgraded from v5.0.0 to v4.2.1 to fix "render2 is not a function" error caused by React 18 compatibility issues. v5.0+ requires React 19.
