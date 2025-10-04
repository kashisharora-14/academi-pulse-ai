# NEDP - National Education Data Platform

## Overview
The National Education Data Platform (NEDP) is an AI-powered, full-stack application designed to connect and empower students, teachers, institutions, and government bodies within the education ecosystem. Its primary purpose is to track progress, analyze performance, and drive educational excellence through data-driven insights. The platform aims to revolutionize education management, offering features like role-based dashboards, AI-powered recommendations, gamified progress tracking, and a universal verification system to enhance transparency and efficiency in the educational sector.

## Recent Changes (October 4, 2025)
### ✅ Take Action Functionality Implementation
Implemented comprehensive "Take Action" functionality for AI-Powered Recommendations in the Admin Dashboard:

**Features Added:**
1. **Dropout Risk Intervention Dialog**
   - Shows 5 institutions with critical dropout rates (>10% increase)
   - Displays institution details: name, city, dropout rate, total students, at-risk students
   - Action buttons: "Deploy Mentorship Program", "Review Financial Aid", "Academic Support"
   - Success toast notifications with intervention plan timeline

2. **Compliance Gap Review Dialog**
   - Shows 3 institutions with pending NAAC reaccreditation
   - Displays compliance issues and deadlines
   - Action buttons: "Schedule Review", "Request Extension"
   - Success notifications with review scheduling confirmation

3. **Excellence Support Program Dialog**
   - Shows 3 institutions with NIRF ranking improvement potential
   - Displays current rank, potential rank, and scores
   - Action buttons: "Allocate Research Grant", "Faculty Development", "NIRF Mentorship"
   - Success notifications with resource allocation confirmation

**Technical Implementation:**
- Used shadcn Dialog components for modal interactions
- State management with React useState hooks
- Toast notifications using sonner library
- Real institution data with metrics (dropout rates, NIRF rankings, compliance deadlines)
- Responsive design with proper color coding (red for urgent, yellow for moderate, orange for opportunity)

**Files Modified:**
- `/src/pages/AdminDashboard.tsx` - Added dialog components, state management, and action handlers

## User Preferences
The user prefers clear, concise communication and a focus on high-level functionality over granular implementation details. The user values iterative development and asks to be consulted before any major architectural changes or feature removals. The user also prefers detailed explanations for complex features but in simple language.

## System Architecture
The NEDP is a Vite + React + TypeScript application. The UI/UX is built using `shadcn-ui` components styled with Tailwind CSS, ensuring a responsive design with dark mode support. Supabase handles both authentication and database management, serving as the primary backend. Routing is managed by React Router DOM, and state management utilizes TanStack Query (React Query). Geographic data visualization is integrated via React Leaflet.

Key features include:
- **Role-based Dashboards**: Tailored interfaces for Admin, Institution, Student, and Teacher roles.
- **AI-powered Insights**: Features an AI chatbot and recommendation engine for scholarships, internships, and institutional funding.
- **Smart QR Integration**: Dynamic QR codes for student IDs, certificates (with blockchain authenticity), and universal verification.
- **One-Click Export & Smart Reports**: PDF and Excel export of dashboards, scorecards, and raw data, along with shareable links and auto-generated digital transcripts.
- **Gamified Progress Tracking**: Progress bars, badges, and achievement tracking for academic and extracurricular activities.
- **Cross-Platform Accessibility**: Mobile-first design with an offline mode for encrypted PDF record downloads.
- **Universal Verification System**: Blockchain-secured system for employers/universities to verify credentials via QR or link, reducing fraud.
- **Beneficiary Journey Mapper**: Visualizes student lifecycle from admission to alumni, exportable as a digital journey map.
- **Policy Report Generator**: Natural language query processing for government-level insights, with dynamic filtering and AI-generated analysis.
- **Scholarship Management**: AI-powered eligibility matching, application forms, and real-time tracking for students.
- **Affiliated Colleges Map**: Interactive map visualization for universities to monitor affiliated colleges, with performance-based color coding.
- **Geo-Analytics Map**: Nation-wide map with institutions color-coded by performance (NIRF rank, dropout rate) for government oversight.
- **✅ Intervention Alert Actions**: Fully functional "Take Action", "Review", and "Support" buttons with comprehensive dialogs showing institution details and multiple intervention options.

The development environment is configured for Replit, using `npm` with `--legacy-peer-deps` due to `react-leaflet` compatibility. Vite is set up for HMR and allows `allowedHosts` for Replit's proxy domains.

## External Dependencies
- **Supabase**: Backend services, including authentication and database.
- **React Leaflet**: Interactive map components (version 4.2.1).
- **shadcn-ui**: UI component library.
- **Tailwind CSS**: Utility-first CSS framework.
- **React Router DOM**: Client-side routing.
- **TanStack Query (React Query)**: Data fetching, caching, and state management.
- **qrcode & qrcode.react**: QR code generation.
- **jspdf & jspdf-autotable**: PDF document generation and export.
- **xlsx**: Excel file export functionality.
- **html2canvas**: Capturing screenshots/images for PDF generation.
- **openai**: Prepared for AI recommendation engine integration.
- **sonner**: Toast notification system.
