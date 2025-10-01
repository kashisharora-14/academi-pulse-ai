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
- **Important**: Vite is configured with `allowedHosts: ['.replit.dev']` to support Replit's dynamic proxy domains (wildcard pattern allows all *.replit.dev subdomains)
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

### October 1, 2025 - Scholarship Eligibility & Application Tracking System
- ✅ **Implemented Comprehensive Scholarship Management for Students**
- Added intelligent scholarship eligibility matching and application tracking workflow
- Features included:
  - **Eligibility Checker**: AI-powered matching shows students which scholarships they qualify for
    - Match percentage based on CGPA, category, family income, and other criteria
    - Displays scholarship amount, deadlines, and eligibility requirements
    - Personalized recommendations (Central Sector, INSPIRE, Dr. Ambedkar Post Matric, PM Scholarship, etc.)
  - **Functional Application Form**: Complete scholarship application workflow
    - Modal dialog opens when clicking "Apply for Scholarship" or "Apply Now"
    - Pre-filled student information (name, ID, email)
    - Required fields: Phone, Father's Name, Mother's Name
    - Financial details: Annual Income, Category (General/OBC/SC/ST/EWS)
    - Bank details: Account Number, IFSC Code
    - Identity: Aadhar Number, Residential Address
    - Document checklist displayed (Income Certificate, Caste Certificate, Aadhar, Bank Passbook, Mark sheets)
    - Form validation ensures all fields are filled
    - Submission sends request to Financial Aid Department
    - Success confirmation with Application ID
  - **Application Tracking System**: Complete workflow visibility from submission to disbursement
    - Real-time progress tracking with 5-stage workflow:
      1. Application Submitted ✓
      2. Document Verification ✓
      3. Department Review (In Progress)
      4. Final Approval (Pending)
      5. Disbursement (Pending)
    - Visual progress indicators with color-coded status
    - Animated pulse effects for active stages
  - **Status Updates & Notifications**:
    - Real-time status updates from Financial Aid Department
    - Expected decision timelines
    - Action required alerts for missing documents
  - **Application States**:
    - Under Department Review (Blue) - being reviewed by department
    - Approved (Green) - sanctioned with disbursement date
    - Documents Required (Orange) - action needed from student
  - **Document Upload Workflow**: Students can upload required documents directly
  - **Active Schemes Display**: Shows ongoing scholarships and benefits with disbursement tracking
- Accessible via Student Dashboard → Schemes tab
- Complete flow: Student fills form → Submits to department → Tracks progress → Gets approval → Receives disbursement
- Department receives application with all student details for verification and approval

### October 1, 2025 - Affiliated Colleges Map Feature for Institution Dashboard
- ✅ **Implemented Affiliated Colleges Network Visualization**
- Added comprehensive map view showing university's affiliated colleges across different cities
- Example implementation for Panjab University with 10 affiliated colleges across Punjab
- Features included:
  - **Interactive Map**: Geographic distribution of all affiliated colleges on OpenStreetMap
  - **Performance Tracking**: Color-coded markers (Blue=Good, Yellow=Average, Orange=Needs Attention)
  - **Summary Statistics**: Total students, average placement, high performers, colleges needing attention
  - **City-wise Organization**: Colleges grouped by city (Chandigarh, Jalandhar, Amritsar, Ludhiana, Bathinda, Mohali)
  - **Detailed Information Table**: Complete college data including NIRF rank, placement %, accreditation, programs offered
  - **College Details**: Each college shows:
    - Name, location, city, and type (Government/Private)
    - Student count, NIRF ranking, placement rate
    - Research score, dropout rate, performance status
    - Programs offered, establishment year, NAAC accreditation
- Accessible via Institution Dashboard → Campus tab
- Helps universities monitor and manage their affiliated college network
- Enables identification of high-performing and struggling colleges for targeted support

### October 1, 2025 - Enhanced Map with Performance Color-Coding
- ✅ **Implemented Multi-Color Performance Markers on Map**
- Added comprehensive performance metrics to 20 institutions nationwide
- Color-coded markers based on performance levels:
  - 🟢 **Green (Excellent)**: Top performers like IITs, NITs (NIRF rank 1-10)
  - 🔵 **Blue (Good)**: Strong institutions (NIRF rank 11-20)
  - 🟡 **Yellow (Average)**: Moderate performance (NIRF rank 21-50)
  - 🟠 **Orange (Needs Attention)**: Below average, intervention needed (NIRF rank 51-90)
  - 🔴 **Red (Critical)**: Poor performance, urgent action required (NIRF rank 90+, high dropout >20%)
- Each institution now includes:
  - City, Type, Student Count
  - NIRF Rank, Placement Rate, Research Score, Dropout Rate
  - Detailed popup information with all metrics
- Map enables government to quickly identify:
  - Institutions requiring immediate intervention (red markers)
  - Success stories to showcase (green markers)
  - Geographic patterns in educational performance
- Accessible via Admin Dashboard → Geo-Analytics tab

### October 1, 2025 - Fresh GitHub Clone Setup Complete
- Successfully set up fresh GitHub clone in Replit environment
- Installed all npm dependencies (480 packages) with `--legacy-peer-deps` flag
- Verified Vite configuration for Replit environment:
  - Host: 0.0.0.0 on port 5000
  - allowedHosts: ['.replit.dev'] for Replit proxy support
- Confirmed Supabase environment variables in .env file
- Development server running successfully on port 5000
- Application tested and verified working correctly
- Configured autoscale deployment:
  - Build: `npm run build`
  - Run: `npx vite preview --host 0.0.0.0 --port 5000`
- All features and components rendering properly
- No LSP errors or code issues detected

### October 1, 2025 - Feature #1: Policy Report Generator Complete
- ✅ **Implemented Policy Report Generator** with full government-level insights
- Created PolicyReport.tsx component with natural language query parsing
- Created PolicyReportData.ts with 180+ synthetic data points covering all states and schemes
- Features:
  - Natural language queries (e.g., "How many rural female students benefited from NSP in Punjab?")
  - Dynamic filtering by State, Scheme, Year, Gender, Locality
  - Real-time AI-generated insights based on filtered data
  - Confidence scoring for query results
  - Data aggregation (beneficiaries, budget, utilization rates)
  - Auto-updates when filters change
  - Tabbed interface for Visualizations, Data Table, and Heatmaps
- Integrated into AdminDashboard as "Policy Reports" tab
- Fully functional with normalization layer for case-insensitive filtering
- Production-ready with proper data binding and error handling

### October 1, 2025 - Fresh Import Setup
- Imported fresh clone from GitHub repository
- Installed all npm dependencies with `--legacy-peer-deps` flag (478 packages)
- Fixed JSX syntax error in TeacherDashboard.tsx (mismatched closing tags)
- Configured Vite server with `allowedHosts: ['.replit.dev']` to allow Replit's dynamic proxy domains and prevent host blocking errors
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
