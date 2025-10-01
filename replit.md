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

### New Advanced Features (Added September 30, 2025)

1. **Smart QR Integration**
   - Dynamic QR codes for students, institutions, and faculty
   - QR on student ID cards → verified achievements/resume
   - QR on certificates → blockchain authenticity check
   - Universal verification for employers/universities
   - Components: `QRCodeGenerator.tsx`, `VerifyProfile.tsx`

2. **One-Click Export & Smart Reports**
   - PDF export with formatted dashboards and scorecards
   - Excel export for raw data (govt/admin use)
   - Shareable links for profiles and reports
   - Auto-generated digital transcripts with QR authentication
   - Component: `ExportTools.tsx`

3. **AI-Powered Recommendations**
   - Scholarship and internship suggestions based on student profile
   - Scheme/funding recommendations for institutions
   - Match scoring and eligibility checking
   - Real-time opportunity discovery
   - Component: `AIRecommendations.tsx`

4. **Gamified Progress Tracking**
   - Progress bars for academic + extracurricular journey
   - Badges for compliance levels (Gold, Silver, Bronze)
   - Achievement tracking and rewards
   - Component: Already exists in `Gamification.tsx`

5. **Cross-Platform Accessibility**
   - Mobile-first responsive design
   - Offline mode: Download records as encrypted PDF wallet cards
   - Optimized for all device sizes

6. **Universal Verification System**
   - Employers/universities can verify alumni/student data via QR or link
   - Blockchain-secured verification
   - Reduces fake certificate fraud
   - Route: `/verify/:code` and `/shared/:code`

7. **Beneficiary Journey Mapper**
   - Visual flow of student's lifecycle: Admission → Scholarship → Internship → Placement → Alumni
   - Exportable as PDF digital journey map
   - Timeline visualization with progress tracking
   - Component: `JourneyMapper.tsx`

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

## Deployment Configuration
The project is configured for autoscale deployment:
- Build command: `npm run build`
- Run command: `npx vite preview --host 0.0.0.0 --port 5000`
- Deployment target: autoscale (suitable for static frontend with external backend)

## Recent Changes

### October 1, 2025 - Fresh Import Setup
- Imported fresh clone from GitHub repository
- Installed all npm dependencies with `--legacy-peer-deps` flag (478 packages)
- Fixed JSX syntax error in TeacherDashboard.tsx (mismatched closing tags)
- Verified Vite dev server runs correctly on port 5000
- Confirmed application loads and renders properly with all features working
- Verified Supabase environment variables are configured in .env file
- Configured deployment settings for autoscale deployment
- Application fully functional and ready for use

### September 30, 2025 - Initial Setup
- Successfully imported GitHub repository to Replit
- Installed all npm dependencies with `--legacy-peer-deps` flag
- Verified Vite dev server runs correctly on port 5000
- Confirmed application loads and renders properly
- Configured deployment settings for production

### Advanced Features Implementation
- Added QR code generation system using `qrcode.react` library
- Implemented PDF/Excel export functionality using `jspdf`, `jspdf-autotable`, and `xlsx`
- Created AI-powered recommendation engine for students and institutions
- Built beneficiary journey mapper with visual timeline
- Added universal verification system with blockchain-secured QR codes
- Integrated smart export tools with shareable links
- Created verification route for employers/universities to validate credentials
- Added new tabs to Student Dashboard: Journey, QR Code, Export, AI Recommendations

### Dependencies Added
- `qrcode` & `qrcode.react` - QR code generation
- `jspdf` & `jspdf-autotable` - PDF generation and export
- `xlsx` - Excel file export
- `html2canvas` - Screenshot/image capture for PDFs
- `openai` - AI recommendation engine (prepared for integration)

## Notes
- This project was imported from Lovable.dev
- npm uses `--legacy-peer-deps` for package installation due to react-leaflet peer dependency requirements
- Configured for Replit's proxy environment with proper host settings
- **Important**: react-leaflet was downgraded from v5.0.0 to v4.2.1 to fix "render2 is not a function" error caused by React 18 compatibility issues. v5.0+ requires React 19.
