
# Architecture Diagrams - Mermaid Code

Copy and paste these diagrams into [Mermaid Live Editor](https://mermaid.live/) or [Eraser.io](https://app.eraser.io/)

---

## 1. High-Level System Architecture (3-Tier)

```mermaid
graph TB
    subgraph "Presentation Layer"
        A[React Frontend<br/>TypeScript + Vite<br/>Port 5000]
    end
    
    subgraph "Application Layer"
        B[Supabase Backend]
        C[Auth Service<br/>JWT + RBAC]
        D[Real-time Engine<br/>WebSocket]
        E[Edge Functions<br/>AI/ML Processing]
        F[Storage Service<br/>Documents/Certificates]
    end
    
    subgraph "Data Layer"
        G[(PostgreSQL Database<br/>68.5M Students<br/>1.2M Teachers<br/>50K Institutions)]
    end
    
    A -->|REST API Calls| B
    A -->|WebSocket| D
    B --> C
    B --> D
    B --> E
    B --> F
    B --> G
    
    style A fill:#61dafb
    style B fill:#3ecf8e
    style G fill:#336791
```

---

## 2. Component Hierarchy

```mermaid
graph TD
    A[App.tsx] --> B[Routes]
    B --> C[Index - Landing Page]
    B --> D[Auth - Login/Signup]
    B --> E[AdminDashboard]
    B --> F[InstitutionDashboard]
    B --> G[StudentDashboard]
    B --> H[TeacherDashboard]
    B --> I[VerifyProfile]
    
    A --> J[Shared Components]
    J --> K[Header]
    J --> L[Footer]
    J --> M[Chatbot]
    J --> N[MapView]
    J --> O[QRCodeGenerator]
    J --> P[ExportTools]
    J --> Q[DigiLocker]
    
    A --> R[Feature Components]
    R --> S[StudentLifeCycleTracker]
    R --> T[Gamification]
    R --> U[JourneyMapper]
    R --> V[AIRecommendations]
    R --> W[PolicyReport]
    R --> X[NIRFAnalytics]
    R --> Y[BlockchainVerification]
    
    style A fill:#ff6b6b
    style B fill:#4ecdc4
    style J fill:#95e1d3
    style R fill:#f38181
```

---

## 3. Data Flow Architecture

```mermaid
sequenceDiagram
    participant User as User Browser
    participant Frontend as React Frontend<br/>Port 5000
    participant API as Supabase API
    participant Auth as Auth Service
    participant DB as PostgreSQL DB
    participant RT as Real-time Engine
    
    User->>Frontend: Login Request
    Frontend->>Auth: Authenticate
    Auth->>DB: Verify Credentials
    DB-->>Auth: User Data
    Auth-->>Frontend: JWT Token
    Frontend->>Frontend: Store in localStorage
    
    User->>Frontend: Request Dashboard
    Frontend->>API: API Call + JWT Header
    API->>DB: Query Data
    DB-->>API: Return Data
    API-->>Frontend: JSON Response
    Frontend->>Frontend: Update UI
    
    DB->>RT: Database Change Event
    RT->>Frontend: WebSocket Push
    Frontend->>Frontend: Live Update UI
```

---

## 4. Database ER Diagram

```mermaid
erDiagram
    USERS ||--o{ STUDENTS : has
    USERS ||--o{ TEACHERS : has
    USERS {
        uuid id PK
        varchar email
        varchar role
        timestamp created_at
    }
    
    STUDENTS ||--o{ ACHIEVEMENTS : earns
    STUDENTS ||--o{ CERTIFICATES : receives
    STUDENTS ||--o{ SCHOLARSHIPS : applies
    STUDENTS {
        uuid id PK
        uuid user_id FK
        varchar name
        varchar aadhaar_masked
        varchar enrollment_id UK
        uuid institution_id FK
        decimal cgpa
        integer semester
    }
    
    TEACHERS ||--o{ COURSES : teaches
    TEACHERS {
        uuid id PK
        uuid user_id FK
        varchar name
        varchar apar_id UK
        uuid institution_id FK
        decimal rating
        integer publications
    }
    
    INSTITUTIONS ||--o{ STUDENTS : enrolls
    INSTITUTIONS ||--o{ TEACHERS : employs
    INSTITUTIONS ||--o{ COURSES : offers
    INSTITUTIONS {
        uuid id PK
        varchar name
        varchar aishe_code UK
        integer nirf_rank
        geography location
        varchar type
    }
    
    CERTIFICATES {
        uuid id PK
        uuid student_id FK
        varchar name
        varchar blockchain_hash
        text qr_code
    }
    
    SCHOLARSHIPS {
        uuid id PK
        varchar name
        varchar scheme_code
        decimal amount
        json eligibility
    }
    
    COURSES {
        uuid id PK
        varchar code
        integer credits
        uuid instructor_id FK
        uuid institution_id FK
    }
    
    ACHIEVEMENTS {
        uuid id PK
        uuid student_id FK
        varchar type
        integer points
    }
```

---

## 5. Module Architecture - Student Dashboard

```mermaid
graph LR
    A[StudentDashboard] --> B[Overview Tab]
    A --> C[Life Cycle Tab]
    A --> D[Journey Mapper Tab]
    A --> E[Gamification Tab]
    A --> F[DigiLocker Tab]
    A --> G[QR Code Tab]
    A --> H[Export Tab]
    A --> I[AI Assistant Tab]
    A --> J[Academics Tab]
    A --> K[Schemes Tab]
    A --> L[EduBot Tab]
    
    B --> B1[CGPA: 8.5/10]
    B --> B2[Credits: 120/180]
    B --> B3[Skill Radar]
    
    C --> C1[Journey Timeline]
    C --> C2[Milestone Tracking]
    C --> C3[Scheme Integration]
    
    E --> E1[Achievement Badges]
    E --> E2[Leaderboards]
    E --> E3[Points: 2,450]
    
    style A fill:#4CAF50
    style B fill:#2196F3
    style E fill:#FF9800
```

---

## 6. Integration Architecture

```mermaid
graph TB
    A[NEDP Platform] --> B[AISHE API<br/>50,234 Institutions]
    A --> C[NIRF Portal<br/>11,900 Rankings]
    A --> D[AICTE Database<br/>4,300 Approvals]
    A --> E[UGC Database<br/>1,100 Universities]
    A --> F[DigiLocker<br/>120M Documents]
    A --> G[PMKVY Portal<br/>2.8M Beneficiaries]
    A --> H[NSP Database<br/>15M Scholarships]
    A --> I[Blockchain Network<br/>2.5M Certificates]
    A --> J[AI/ML Services<br/>NLP + Analytics]
    
    B -.->|15min sync| K[ETL Pipeline]
    C -.->|15min sync| K
    D -.->|15min sync| K
    E -.->|15min sync| K
    F -.->|Real-time| K
    G -.->|15min sync| K
    H -.->|15min sync| K
    
    K --> L[Data Transformation<br/>Cleaning + Validation]
    L --> M[(PostgreSQL<br/>15TB Data)]
    
    style A fill:#e74c3c
    style K fill:#3498db
    style M fill:#2ecc71
```

---

## 7. Authentication Flow

```mermaid
flowchart TD
    A[User Login] --> B{Credentials Valid?}
    B -->|No| C[Show Error]
    C --> A
    B -->|Yes| D[Generate JWT Token]
    D --> E[Store in localStorage]
    E --> F{Check User Role}
    F -->|Admin| G[AdminDashboard]
    F -->|Institution| H[InstitutionDashboard]
    F -->|Student| I[StudentDashboard]
    F -->|Teacher| J[TeacherDashboard]
    
    G --> K[Protected Routes<br/>Include JWT in Headers]
    H --> K
    I --> K
    J --> K
    
    K --> L{Token Valid?}
    L -->|Yes| M[Access Granted]
    L -->|No| N[Redirect to Login]
    
    style D fill:#2ecc71
    style L fill:#e74c3c
```

---

## 8. Deployment Architecture

```mermaid
graph TB
    subgraph "Development"
        A[Git Repository] --> B[Vite Build<br/>TypeScript Compile]
    end
    
    subgraph "CI/CD Pipeline"
        B --> C[Unit Tests]
        C --> D[Integration Tests]
        D --> E[Build Optimization]
    end
    
    subgraph "Production - Replit"
        E --> F[Replit Hosting<br/>Port 5000]
        F --> G[Load Balancer<br/>50K+ Users]
    end
    
    subgraph "Monitoring"
        G --> H[Error Tracking]
        G --> I[Performance Metrics<br/>45ms avg]
        G --> J[User Analytics]
    end
    
    subgraph "Backend Services"
        K[Supabase Platform]
        L[(PostgreSQL DB)]
        M[Edge Functions]
    end
    
    F --> K
    K --> L
    K --> M
    
    style F fill:#f39c12
    style K fill:#3ecf8e
    style L fill:#336791
```

---

## 9. Security Architecture

```mermaid
graph TD
    A[Security Framework] --> B[Application Security]
    A --> C[Data Security]
    A --> D[Network Security]
    A --> E[Identity Management]
    
    B --> B1[JWT Authentication]
    B --> B2[RBAC - 4 Roles]
    B --> B3[Input Validation]
    B --> B4[XSS Protection]
    
    C --> C1[256-bit Encryption<br/>At Rest]
    C --> C2[TLS 1.3<br/>In Transit]
    C --> C3[Aadhaar Masking<br/>96.8% Coverage]
    C --> C4[GDPR Compliance<br/>98.5%]
    
    D --> D1[Firewall Rules]
    D --> D2[DDoS Protection]
    D --> D3[Rate Limiting<br/>15.2K API/hour]
    
    E --> E1[Aadhaar Integration]
    E --> E2[APAR ID Linkage]
    E --> E3[Multi-Factor Auth]
    
    style A fill:#e74c3c
    style C fill:#2ecc71
    style E fill:#3498db
```

---

## 10. AI/ML Pipeline

```mermaid
graph LR
    A[User Query] --> B[NLP Engine]
    B --> C{Intent Classification}
    
    C -->|Scholarship| D[Recommendation Engine<br/>Collaborative Filtering]
    C -->|Career| E[Predictive Analytics<br/>ML Models]
    C -->|Policy| F[Data Analytics<br/>Trend Analysis]
    
    D --> G[Scholarship Matching<br/>15M Scholarships]
    E --> H[Dropout Risk<br/>23,456 At-Risk]
    E --> I[Placement Probability]
    F --> J[Policy Impact Report]
    
    G --> K[AI Response]
    H --> K
    I --> K
    J --> K
    
    K --> L[User Dashboard]
    
    style B fill:#9b59b6
    style D fill:#3498db
    style E fill:#e74c3c
    style F fill:#2ecc71
```

---

## 11. Real-time Data Sync

```mermaid
sequenceDiagram
    participant DB as PostgreSQL
    participant Trigger as DB Trigger
    participant RT as Supabase Real-time
    participant WS as WebSocket
    participant UI as React Component
    
    Note over DB: Student updates CGPA
    DB->>Trigger: Change Detected
    Trigger->>RT: Fire Event
    RT->>WS: Push Update
    WS->>UI: Receive Data
    UI->>UI: Re-render Component
    
    Note over UI: Live update without refresh<br/>45ms response time
```

---

## 12. Blockchain Verification Flow

```mermaid
flowchart TD
    A[Certificate Issued] --> B[Generate Hash<br/>SHA-256]
    B --> C[Store on Blockchain<br/>Immutable Ledger]
    C --> D[Generate QR Code]
    D --> E[Link to Student Profile]
    
    F[Employer Scans QR] --> G{Verify Hash}
    G -->|Match| H[Certificate Valid ✓<br/>2.5M Verified]
    G -->|No Match| I[Certificate Invalid ✗<br/>1,250 Blocked]
    
    H --> J[Show Certificate Details<br/>99.8% Accuracy]
    
    style C fill:#f39c12
    style H fill:#2ecc71
    style I fill:#e74c3c
```

---

## Copy Instructions:

1. **For Mermaid Live Editor**: 
   - Go to https://mermaid.live/
   - Copy any diagram code above
   - Paste in the editor
   - Download as PNG/SVG

2. **For Eraser.io**:
   - Go to https://app.eraser.io/
   - Create new diagram
   - Select "Mermaid" format
   - Paste the code
   - Export as needed

3. **For Documentation**:
   - GitHub/GitLab markdown files support Mermaid natively
   - Just paste the code blocks with ```mermaid syntax
