# IKE Student Sync - React to Vue Migration Analysis

## Project Overview

The **skane-student-sync** is a comprehensive React-based student management system for the Skåne region in Sweden. It's a multi-role application that handles student data, financial calculations, reporting, and integration with various government systems.

## Current React Project Structure

### Core Technologies
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.1
- **Styling**: Tailwind CSS with custom IKE design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **State Management**: React Context API + TanStack Query
- **Routing**: React Router DOM 6.26.2
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts
- **Maps**: Mapbox GL

### Project Architecture

#### 1. Authentication & Authorization System
- **AuthContext**: Role-based authentication with 5 user roles
- **User Roles**: 
  - `regional-admin`: Full regional access
  - `municipality-admin`: Municipal-level administration
  - `school-admin`: School-level administration
  - `orgadmin`: Organization administrator
  - `devadmin`: Development administrator
- **Permission System**: Granular permissions with scope-based access control

#### 2. Internationalization
- **LanguageContext**: Swedish/English support
- **Translation System**: Comprehensive translation keys for all UI elements
- **Dynamic Language Switching**: Real-time language toggle

#### 3. Navigation & Layout
- **RoleBasedSidebar**: Dynamic sidebar based on user role
- **Header**: Search functionality and breadcrumb navigation
- **Responsive Design**: Mobile-first approach with collapsible sidebar

#### 4. Core Application Modules

##### Student Management
- **Students**: Main student registry with search/filter
- **StudentPlacements**: Transfer management between schools
- **StudentConflicts**: Conflict resolution system
- **StudentBulk**: Bulk operations and data import
- **TFRegistration**: Tax agency number registration
- **TravelCardDocuments**: Travel card management
- **Privacy Features**: Protected data display and privacy indicators

##### Financial Management
- **Financial**: Main financial dashboard
- **PriceLists**: Municipal price list management
- **AdditionalAmounts**: Extra charges and fees
- **PaymentBlocks**: Payment restrictions
- **AccountingConfiguration**: System configuration
- **InterMunicipalCompensation**: Cross-municipal payments

##### Reporting & Analytics
- **Reports**: Standard reporting interface
- **ContributionReports**: Contribution analysis
- **Statistics**: Statistical overview
- **FollowUpReports**: Follow-up reporting
- **GeographicalAnalysis**: Map-based analysis
- **FinancialAnalysis**: Financial reporting
- **ChangeTracking**: System change logs

##### Integration Management
- **Integration**: Main integration hub
- **ImportStudentData**: Data import from external sources
- **TaxAgencyHub**: Tax agency integration
- **UHRBEDAIntegration**: University integration
- **AdmissionIntegration**: Admission system integration
- **PopulationRegistry**: Population data integration
- **ScheduleIntegration**: Schedule management

##### KAA Management (Special Education)
- **KAARegistry**: KAA student registry
- **KAADashboard**: KAA overview dashboard
- **MeasuresAndActions**: Special education measures
- **ContactOccasions**: Contact management
- **StatisticsSwedenReports**: Official statistics

##### System Administration
- **UserManagement**: User administration
- **RoleManagement**: Role and permission management
- **MunicipalityManagement**: Municipal administration
- **SchoolUnits**: School unit management
- **SchoolYears**: Academic year management
- **PrincipalManagement**: Principal administration
- **GroupManagement**: Group administration

##### Operations
- **PopulationData**: Population data management
- **AddressUpdates**: Address change management
- **MunicipalSchoolUnits**: Municipal school administration
- **MunicipalUserAdmin**: Municipal user administration

#### 5. Component Architecture

##### UI Components (shadcn/ui based)
- **Form Components**: Input, Select, Checkbox, Radio, etc.
- **Layout Components**: Card, Dialog, Sheet, Sidebar, etc.
- **Data Display**: Table, Badge, Progress, etc.
- **Navigation**: Breadcrumb, Menu, Tabs, etc.
- **Feedback**: Toast, Alert, Progress, etc.

##### Custom Components
- **Student Components**: Privacy indicators, protected data display
- **Financial Components**: Payment blocks, accounting strings
- **Integration Components**: Error details, import modals
- **KAA Components**: Registration modals, statistics reports
- **System Components**: Role-based sidebar, language toggle

#### 6. State Management
- **React Context**: Authentication, language, theme
- **TanStack Query**: Server state management
- **Local State**: Component-level state with useState
- **Form State**: React Hook Form for complex forms

#### 7. Routing Structure
```
/                           → Dashboard (role-based)
/dashboard                  → Main dashboard
/students                   → Student registry
/students/placements        → Student transfers
/students/conflicts         → Conflict resolution
/students/bulk              → Bulk operations
/students/tf-registration   → TF number registration
/students/conflict-resolution → Conflict resolution
/students/classes           → Students by class
/students/municipal         → Municipal students
/students/external          → External students
/students/travel-cards      → Travel card documents
/financial                  → Financial management
/financial/pricelists       → Price lists
/financial/additional-amounts → Additional amounts
/financial/payment-blocks   → Payment blocks
/financial/accounting-configuration → Accounting config
/financial/compensation     → Inter-municipal compensation
/reports                    → Reports hub
/reports/students           → Student reports
/reports/financial          → Financial reports
/reports/statistics         → Statistics
/reports/contributions      → Contribution reports
/reports/follow-up          → Follow-up reports
/reports/regional           → Regional statistics
/reports/monthly            → Monthly compilation
/reports/changes            → Change tracking
/reports/money-to-receive   → Money to receive
/reports/money-to-pay       → Money to pay
/reports/municipal-statistics → Municipal statistics
/reports/financial-export   → Financial export
/integration                → Integration hub
/integration/import         → Data import
/integration/status         → Integration status
/integration/schedule       → Schedule integration
/integration/extens         → Extens export
/integration/population     → Population registry
/integration/testing        → Integration testing
/integration/tax-agency-hub → Tax agency hub
/integration/uhr-beda       → UHR BEDA integration
/integration/admission      → Admission integration
/kaa                        → KAA management
/kaa/dashboard              → KAA dashboard
/kaa/registry               → KAA registry
/kaa/measures               → Measures and actions
/kaa/contacts               → Contact occasions
/kaa/scb-reports            → Statistics Sweden reports
/system                     → System administration
/system/users               → User management
/system/roles               → Role management
/system/municipalities      → Municipality management
/system/groups              → Group management
/system/schools             → School units
/system/school-years        → School years
/system/principals          → Principal management
/system/support             → Support
/operations                 → Operations
/operations/population      → Population data
/operations/addresses       → Address updates
/operations/municipal-schools → Municipal school units
/operations/municipal-users → Municipal user admin
/study-paths                → Study path management
/study-paths/price-codes    → Price codes
/study-paths/programs       → National programs
/analysis                   → Analysis
/analysis/geographical      → Geographical analysis
/my-page                    → Personal pages
/my-page/messages           → Messages
/my-page/enrollment         → Enrollment settings
/my-page/logs               → Activity logs
/my-page/settings           → Settings
/my-school                  → School information
/my-school/info             → School info
/settings                   → Settings
/statistics                 → Statistics
```

## Vue Project Current State

The **ike-vue** project is currently a basic Vue 3 setup with:
- **Framework**: Vue 3.5.13 with TypeScript
- **Build Tool**: Vite 6.2.4
- **State Management**: Pinia 3.0.1
- **Routing**: Vue Router 4.5.0
- **UI Library**: PrimeVue 4.3.5
- **Forms**: VeeValidate 4.15.1 with Zod
- **Internationalization**: Vue I18n 9.14.4
- **Data Fetching**: TanStack Vue Query 5.80.10
- **Icons**: PrimeIcons 7.0.0

## Migration Strategy Recommendations

### Phase 1: Foundation Setup
1. **Authentication System**: Migrate AuthContext to Pinia store
2. **Internationalization**: Set up Vue I18n with existing translations
3. **Routing**: Implement Vue Router with role-based guards
4. **Layout Components**: Create base layout with sidebar and header

### Phase 2: Core Components
1. **UI Component Library**: Replace shadcn/ui with PrimeVue components
2. **Form System**: Migrate React Hook Form to VeeValidate
3. **Data Fetching**: Set up TanStack Vue Query
4. **State Management**: Implement Pinia stores for complex state

### Phase 3: Feature Migration
1. **Dashboard**: Role-based dashboard components
2. **Student Management**: Core student functionality
3. **Financial Management**: Financial calculations and reports
4. **Reporting**: Analytics and reporting features
5. **Integration**: External system integrations
6. **Administration**: System administration features

### Phase 4: Advanced Features
1. **KAA Management**: Special education features
2. **Geographical Analysis**: Map-based features
3. **Bulk Operations**: Data import/export functionality
4. **Advanced Reporting**: Complex reporting features

## Key Migration Considerations

### 1. Component Architecture
- **React Components** → **Vue Single File Components**
- **JSX** → **Vue Template Syntax**
- **React Hooks** → **Vue Composition API**
- **Context API** → **Pinia Stores**

### 2. State Management
- **React Context** → **Pinia Stores**
- **useState/useEffect** → **ref/reactive/computed**
- **TanStack Query** → **TanStack Vue Query**

### 3. Routing
- **React Router** → **Vue Router**
- **Route Guards** → **Navigation Guards**
- **Protected Routes** → **Route Meta + Guards**

### 4. Forms
- **React Hook Form** → **VeeValidate**
- **Zod Schemas** → **Zod with VeeValidate**
- **Form Validation** → **VeeValidate Rules**

### 5. UI Components
- **shadcn/ui + Radix** → **PrimeVue**
- **Tailwind CSS** → **PrimeVue + Custom CSS**
- **Lucide Icons** → **PrimeIcons**

### 6. Internationalization
- **LanguageContext** → **Vue I18n**
- **Translation Keys** → **i18n Messages**
- **Dynamic Switching** → **i18n Locale**

## File Structure Mapping

### React → Vue Structure
```
src/
├── components/          → components/
│   ├── ui/             → components/ui/ (PrimeVue components)
│   ├── students/       → components/students/
│   ├── financial/      → components/financial/
│   └── integration/    → components/integration/
├── contexts/           → stores/ (Pinia stores)
├── hooks/              → composables/
├── pages/              → views/
├── config/             → config/
├── services/           → services/
├── types/              → types/
└── lib/                → utils/
```

## Next Steps

1. **Set up Vue project foundation** with proper TypeScript configuration
2. **Migrate authentication system** to Pinia store
3. **Implement internationalization** with Vue I18n
4. **Create base layout components** (sidebar, header, main content)
5. **Set up routing system** with role-based navigation
6. **Begin component migration** starting with core UI components

This analysis provides a comprehensive overview of the React project structure and a roadmap for migrating to Vue while maintaining all functionality and user experience. 