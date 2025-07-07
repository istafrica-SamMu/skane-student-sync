
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';

// Layout Components
import ProtectedRoute from '@/components/ProtectedRoute';
import RoleBasedLayout from '@/components/RoleBasedLayout';

// Page Components
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';

// System Management
import UserManagement from '@/pages/system/UserManagement';
import PersonRegister from '@/pages/system/PersonRegister';
import RoleManagement from '@/pages/system/RoleManagement';
import GroupManagement from '@/pages/system/GroupManagement';
import MunicipalityManagement from '@/pages/system/MunicipalityManagement';
import PrincipalManagement from '@/pages/system/PrincipalManagement';
import SchoolUnits from '@/pages/system/SchoolUnits';
import SchoolYears from '@/pages/system/SchoolYears';
import Support from '@/pages/system/Support';

// Student Management
import Students from '@/pages/Students';
import StudentPlacements from '@/pages/StudentPlacements';
import StudentConflicts from '@/pages/StudentConflicts';
import StudentBulk from '@/pages/StudentBulk';
import MunicipalStudents from '@/pages/students/MunicipalStudents';
import ExternalStudents from '@/pages/students/ExternalStudents';
import TFRegistration from '@/pages/students/TFRegistration';
import TravelCardDocuments from '@/pages/students/TravelCardDocuments';
import StudentsByClass from '@/pages/students/StudentsByClass';
import ConflictResolution from '@/pages/students/ConflictResolution';

// Financial Management
import Financial from '@/pages/Financial';
import PriceLists from '@/pages/PriceLists';
import AdditionalAmounts from '@/pages/financial/AdditionalAmounts';
import InterMunicipalCompensation from '@/pages/financial/InterMunicipalCompensation';
import PaymentBlocks from '@/pages/financial/PaymentBlocks';
import PaymentDocuments from '@/pages/financial/PaymentDocuments';
import AccountingConfiguration from '@/pages/financial/AccountingConfiguration';
import MunicipalFinancialReports from '@/pages/financial/MunicipalFinancialReports';

// Integration Management
import Integration from '@/pages/Integration';
import SISIntegrationsManagement from '@/pages/integration/SISIntegrationsManagement';
import TaxAgencyHub from '@/pages/integration/TaxAgencyHub';
import UHRBEDAIntegration from '@/pages/integration/UHRBEDAIntegration';
import AdmissionIntegration from '@/pages/integration/AdmissionIntegration';
import ImportStudentData from '@/pages/integration/ImportStudentData';
import PopulationRegistry from '@/pages/integration/PopulationRegistry';
import ExtensExport from '@/pages/integration/ExtensExport';
import ScheduleIntegration from '@/pages/integration/ScheduleIntegration';
import IntegrationStatus from '@/pages/integration/IntegrationStatus';
import IntegrationTesting from '@/pages/integration/IntegrationTesting';

// Study Path Management
import StudyPaths from '@/pages/StudyPaths';
import NationalPrograms from '@/pages/study-paths/NationalPrograms';
import PriceCodes from '@/pages/study-paths/PriceCodes';

// Operations
import MunicipalSchoolUnits from '@/pages/operations/MunicipalSchoolUnits';
import MunicipalUserAdmin from '@/pages/operations/MunicipalUserAdmin';
import AddressUpdates from '@/pages/operations/AddressUpdates';
import PopulationData from '@/pages/operations/PopulationData';

// KAA Management
import { KAARoutes } from '@/routes/kaaRoutes';

// Reports
import Reports from '@/pages/Reports';
import ReportsDashboard from '@/pages/reports/ReportsDashboard';
import StatisticsDashboard from '@/pages/reports/StatisticsDashboard';
import RegionalStatistics from '@/pages/reports/RegionalStatistics';
import MunicipalStatistics from '@/pages/reports/MunicipalStatistics';
import SchoolStatistics from '@/pages/reports/SchoolStatistics';
import ContributionReports from '@/pages/ContributionReports';
import Statistics from '@/pages/Statistics';
import FollowUpReports from '@/pages/FollowUpReports';
import ChangeLists from '@/pages/reports/ChangeLists';
import ErrorLists from '@/pages/reports/ErrorLists';
import ChangeTracking from '@/pages/reports/ChangeTracking';
import StudentLists from '@/pages/reports/StudentLists';
import FinancialAnalysis from '@/pages/reports/FinancialAnalysis';
import FinancialExport from '@/pages/reports/FinancialExport';
import MoneyToPay from '@/pages/reports/MoneyToPay';
import MoneyToReceive from '@/pages/reports/MoneyToReceive';
import MonthlyCompilation from '@/pages/reports/MonthlyCompilation';
import SchoolFinancialReports from '@/pages/reports/SchoolFinancialReports';

// Analysis
import PaymentStreamsAnalysis from '@/pages/analysis/PaymentStreamsAnalysis';
import PriceListsAnalysis from '@/pages/analysis/PriceListsAnalysis';
import GeographicalAnalysis from '@/pages/analysis/GeographicalAnalysis';

// My Page
import Messages from '@/pages/my-page/Messages';
import ContactDirectory from '@/pages/my-page/ContactDirectory';
import EnrollmentSettings from '@/pages/my-page/EnrollmentSettings';
import ActivityLogs from '@/pages/my-page/ActivityLogs';
import Settings from '@/pages/Settings';

// School
import SchoolInfo from '@/pages/my-school/SchoolInfo';

// Create a query client instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<RoleBasedLayout />}>
                  {/* Dashboard Routes */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  
                  {/* System Management Routes */}
                  <Route path="/system/users" element={<UserManagement />} />
                  <Route path="/system/person-register" element={<PersonRegister />} />
                  <Route path="/system/roles" element={<RoleManagement />} />
                  <Route path="/system/groups" element={<GroupManagement />} />
                  <Route path="/system/municipalities" element={<MunicipalityManagement />} />
                  <Route path="/system/principals" element={<PrincipalManagement />} />
                  <Route path="/system/schools" element={<SchoolUnits />} />
                  <Route path="/system/school-years" element={<SchoolYears />} />
                  <Route path="/system/support" element={<Support />} />
                  
                  {/* Student Management Routes */}
                  <Route path="/students" element={<Students />} />
                  <Route path="/students/placements" element={<StudentPlacements />} />
                  <Route path="/students/conflicts" element={<StudentConflicts />} />
                  <Route path="/students/bulk" element={<StudentBulk />} />
                  <Route path="/students/municipal" element={<MunicipalStudents />} />
                  <Route path="/students/external" element={<ExternalStudents />} />
                  <Route path="/students/tf-registration" element={<TFRegistration />} />
                  <Route path="/students/travel-cards" element={<TravelCardDocuments />} />
                  <Route path="/students/by-class" element={<StudentsByClass />} />
                  <Route path="/students/conflict-resolution" element={<ConflictResolution />} />
                  
                  {/* Financial Management Routes */}
                  <Route path="/financial" element={<Financial />} />
                  <Route path="/financial/pricelists" element={<PriceLists />} />
                  <Route path="/financial/additional-amounts" element={<AdditionalAmounts />} />
                  <Route path="/financial/compensation" element={<InterMunicipalCompensation />} />
                  <Route path="/financial/payment-blocks" element={<PaymentBlocks />} />
                  <Route path="/financial/payment-documents" element={<PaymentDocuments />} />
                  <Route path="/financial/accounting-configuration" element={<AccountingConfiguration />} />
                  <Route path="/financial/municipal-reports" element={<MunicipalFinancialReports />} />
                  
                  {/* Integration Management Routes */}
                  <Route path="/integration" element={<Integration />} />
                  <Route path="/integration/sis-management" element={<SISIntegrationsManagement />} />
                  <Route path="/integration/tax-agency-hub" element={<TaxAgencyHub />} />
                  <Route path="/integration/uhr-beda" element={<UHRBEDAIntegration />} />
                  <Route path="/integration/admission" element={<AdmissionIntegration />} />
                  <Route path="/integration/import" element={<ImportStudentData />} />
                  <Route path="/integration/population-registry" element={<PopulationRegistry />} />
                  <Route path="/integration/extens-export" element={<ExtensExport />} />
                  <Route path="/integration/schedule" element={<ScheduleIntegration />} />
                  <Route path="/integration/status" element={<IntegrationStatus />} />
                  <Route path="/integration/testing" element={<IntegrationTesting />} />
                  
                  {/* Study Path Management Routes */}
                  <Route path="/study-paths" element={<StudyPaths />} />
                  <Route path="/study-paths/national-programs" element={<NationalPrograms />} />
                  <Route path="/study-paths/price-codes" element={<PriceCodes />} />
                  
                  {/* Operations Routes */}
                  <Route path="/operations/municipal-schools" element={<MunicipalSchoolUnits />} />
                  <Route path="/operations/municipal-users" element={<MunicipalUserAdmin />} />
                  <Route path="/operations/address-updates" element={<AddressUpdates />} />
                  <Route path="/operations/population-data" element={<PopulationData />} />
                  
                  {/* KAA Management Routes */}
                  <Route path="/kaa/*" element={<KAARoutes />} />
                  
                  {/* Reports Routes */}
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/reports/dashboard" element={<ReportsDashboard />} />
                  <Route path="/reports/statistics-dashboard" element={<StatisticsDashboard />} />
                  <Route path="/reports/regional-statistics" element={<RegionalStatistics />} />
                  <Route path="/reports/municipal-statistics" element={<MunicipalStatistics />} />
                  <Route path="/reports/school-statistics" element={<SchoolStatistics />} />
                  <Route path="/reports/contributions" element={<ContributionReports />} />
                  <Route path="/reports/statistics" element={<Statistics />} />
                  <Route path="/reports/follow-up" element={<FollowUpReports />} />
                  <Route path="/reports/change-lists" element={<ChangeLists />} />
                  <Route path="/reports/error-lists" element={<ErrorLists />} />
                  <Route path="/reports/change-tracking" element={<ChangeTracking />} />
                  <Route path="/reports/student-lists" element={<StudentLists />} />
                  <Route path="/reports/financial-analysis" element={<FinancialAnalysis />} />
                  <Route path="/reports/financial-export" element={<FinancialExport />} />
                  <Route path="/reports/money-to-pay" element={<MoneyToPay />} />
                  <Route path="/reports/money-to-receive" element={<MoneyToReceive />} />
                  <Route path="/reports/monthly-compilation" element={<MonthlyCompilation />} />
                  <Route path="/reports/school-financial-reports" element={<SchoolFinancialReports />} />
                  
                  {/* Analysis Routes */}
                  <Route path="/analysis/payment-streams" element={<PaymentStreamsAnalysis />} />
                  <Route path="/analysis/price-lists" element={<PriceListsAnalysis />} />
                  <Route path="/analysis/geographical" element={<GeographicalAnalysis />} />
                  
                  {/* My Page Routes */}
                  <Route path="/my-page/messages" element={<Messages />} />
                  <Route path="/my-page/contacts" element={<ContactDirectory />} />
                  <Route path="/my-page/enrollment" element={<EnrollmentSettings />} />
                  <Route path="/my-page/logs" element={<ActivityLogs />} />
                  <Route path="/my-page/settings" element={<Settings />} />
                  
                  {/* School Routes */}
                  <Route path="/my-school/info" element={<SchoolInfo />} />
                </Route>
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
