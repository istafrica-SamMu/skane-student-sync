import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Students from "@/pages/Students";
import StudentBulk from "@/pages/StudentBulk";
import StudentConflicts from "@/pages/StudentConflicts";
import StudentPlacements from "@/pages/StudentPlacements";
import StudentsByClass from "@/pages/students/StudentsByClass";
import TFRegistration from "@/pages/students/TFRegistration";
import ConflictResolution from "@/pages/students/ConflictResolution";
import MunicipalStudents from "@/pages/students/MunicipalStudents";
import ExternalStudents from "@/pages/students/ExternalStudents";
import TravelCardDocuments from "@/pages/students/TravelCardDocuments";
import Financial from "@/pages/Financial";
import AccountingConfiguration from "@/pages/financial/AccountingConfiguration";
import PriceLists from "@/pages/PriceLists";
import AdditionalAmounts from "@/pages/financial/AdditionalAmounts";
import PaymentBlocks from "@/pages/financial/PaymentBlocks";
import PaymentDocuments from "@/pages/financial/PaymentDocuments";
import InterMunicipalCompensation from "@/pages/financial/InterMunicipalCompensation";
import Reports from "@/pages/Reports";
import ReportsDashboard from "@/pages/reports/ReportsDashboard";
import ChangeLists from "@/pages/reports/ChangeLists";
import ChangeTracking from "@/pages/reports/ChangeTracking";
import MoneyToReceive from "@/pages/reports/MoneyToReceive";
import MoneyToPay from "@/pages/reports/MoneyToPay";
import MunicipalStatistics from "@/pages/reports/MunicipalStatistics";
import RegionalStatistics from "@/pages/reports/RegionalStatistics";
import FinancialExport from "@/pages/reports/FinancialExport";
import FinancialAnalysis from "@/pages/reports/FinancialAnalysis";
import SchoolStatistics from "@/pages/reports/SchoolStatistics";
import SchoolFinancialReports from "@/pages/reports/SchoolFinancialReports";
import StudentLists from "@/pages/reports/StudentLists";
import ContributionReports from "@/pages/ContributionReports";
import FollowUpReports from "@/pages/FollowUpReports";
import MonthlyCompilation from "@/pages/reports/MonthlyCompilation";
import Statistics from "@/pages/Statistics";
import Integration from "@/pages/Integration";
import IntegrationStatus from "@/pages/integration/IntegrationStatus";
import IntegrationTesting from "@/pages/integration/IntegrationTesting";
import ImportStudentData from "@/pages/integration/ImportStudentData";
import TaxAgencyHub from "@/pages/integration/TaxAgencyHub";
import PopulationRegistry from "@/pages/integration/PopulationRegistry";
import UHRBEDAIntegration from "@/pages/integration/UHRBEDAIntegration";
import AdmissionIntegration from "@/pages/integration/AdmissionIntegration";
import ScheduleIntegration from "@/pages/integration/ScheduleIntegration";
import ExtensExport from "@/pages/integration/ExtensExport";
import StudyPaths from "@/pages/StudyPaths";
import StudyPathsPage from "@/pages/study-paths/StudyPaths";
import PriceCodesPage from "@/pages/study-paths/PriceCodes";
import NationalPrograms from "@/pages/study-paths/NationalPrograms";
import KAADashboard from "@/pages/kaa/KAADashboard";
import KAARegistry from "@/pages/KAARegistry";
import MeasuresAndActions from "@/pages/kaa/MeasuresAndActions";
import ContactOccasions from "@/pages/kaa/ContactOccasions";
import StatisticsSwedenReports from "@/pages/kaa/StatisticsSwedenReports";
import GeographicalAnalysis from "@/pages/analysis/GeographicalAnalysis";
import MunicipalSchoolUnits from "@/pages/operations/MunicipalSchoolUnits";
import MunicipalUserAdmin from "@/pages/operations/MunicipalUserAdmin";
import AddressUpdates from "@/pages/operations/AddressUpdates";
import PopulationData from "@/pages/operations/PopulationData";
import UserManagement from "@/pages/system/UserManagement";
import RoleManagement from "@/pages/system/RoleManagement";
import MunicipalityManagement from "@/pages/system/MunicipalityManagement";
import GroupManagement from "@/pages/system/GroupManagement";
import PrincipalManagement from "@/pages/system/PrincipalManagement";
import SchoolUnits from "@/pages/system/SchoolUnits";
import SchoolYears from "@/pages/system/SchoolYears";
import Support from "@/pages/system/Support";
import Messages from "@/pages/my-page/Messages";
import EnrollmentSettings from "@/pages/my-page/EnrollmentSettings";
import ActivityLogs from "@/pages/my-page/ActivityLogs";
import SchoolInfo from "@/pages/my-school/SchoolInfo";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Router>
              <Toaster />
              
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/students/bulk" element={<StudentBulk />} />
                <Route path="/students/conflicts" element={<StudentConflicts />} />
                <Route path="/students/placements" element={<StudentPlacements />} />
                <Route path="/students/classes" element={<StudentsByClass />} />
                <Route path="/students/tf-registration" element={<TFRegistration />} />
                <Route path="/students/conflict-resolution" element={<ConflictResolution />} />
                <Route path="/students/municipal" element={<MunicipalStudents />} />
                <Route path="/students/external" element={<ExternalStudents />} />
                <Route path="/students/travel-cards" element={<TravelCardDocuments />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/financial/accounting-configuration" element={<AccountingConfiguration />} />
                <Route path="/financial/pricelists" element={<PriceLists />} />
                <Route path="/financial/additional-amounts" element={<AdditionalAmounts />} />
                <Route path="/financial/payment-blocks" element={<PaymentBlocks />} />
                <Route path="/financial/payment-documents" element={<PaymentDocuments />} />
                <Route path="/financial/compensation" element={<InterMunicipalCompensation />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/dashboard" element={<ReportsDashboard />} />
                <Route path="/reports/change-lists" element={<ChangeLists />} />
                <Route path="/reports/change-tracking" element={<ChangeTracking />} />
                <Route path="/reports/money-to-receive" element={<MoneyToReceive />} />
                <Route path="/reports/money-to-pay" element={<MoneyToPay />} />
                <Route path="/reports/municipal-statistics" element={<MunicipalStatistics />} />
                <Route path="/reports/regional-statistics" element={<RegionalStatistics />} />
                <Route path="/reports/financial-export" element={<FinancialExport />} />
                <Route path="/reports/financial-analysis" element={<FinancialAnalysis />} />
                <Route path="/reports/school-statistics" element={<SchoolStatistics />} />
                <Route path="/reports/school-financial" element={<SchoolFinancialReports />} />
                <Route path="/reports/student-lists" element={<StudentLists />} />
                <Route path="/reports/contribution" element={<ContributionReports />} />
                <Route path="/reports/follow-up" element={<FollowUpReports />} />
                <Route path="/reports/monthly-compilation" element={<MonthlyCompilation />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/integration" element={<Integration />} />
                <Route path="/integration/status" element={<IntegrationStatus />} />
                <Route path="/integration/testing" element={<IntegrationTesting />} />
                <Route path="/integration/import" element={<ImportStudentData />} />
                <Route path="/integration/tax-agency-hub" element={<TaxAgencyHub />} />
                <Route path="/integration/population-registry" element={<PopulationRegistry />} />
                <Route path="/integration/uhr-beda" element={<UHRBEDAIntegration />} />
                <Route path="/integration/admission" element={<AdmissionIntegration />} />
                <Route path="/integration/schedule" element={<ScheduleIntegration />} />
                <Route path="/integration/extens-export" element={<ExtensExport />} />
                <Route path="/study-paths" element={<StudyPaths />} />
                <Route path="/study-paths/study-paths" element={<StudyPathsPage />} />
                <Route path="/study-paths/price-codes" element={<PriceCodesPage />} />
                <Route path="/study-paths/national-programs" element={<NationalPrograms />} />
                <Route path="/kaa/dashboard" element={<KAADashboard />} />
                <Route path="/kaa/registry" element={<KAARegistry />} />
                <Route path="/kaa/measures" element={<MeasuresAndActions />} />
                <Route path="/kaa/contacts" element={<ContactOccasions />} />
                <Route path="/kaa/scb-reports" element={<StatisticsSwedenReports />} />
                <Route path="/analysis/geographical" element={<GeographicalAnalysis />} />
                <Route path="/operations/municipal-schools" element={<MunicipalSchoolUnits />} />
                <Route path="/operations/municipal-users" element={<MunicipalUserAdmin />} />
                <Route path="/operations/address-updates" element={<AddressUpdates />} />
                <Route path="/operations/population-data" element={<PopulationData />} />
                <Route path="/system/users" element={<UserManagement />} />
                <Route path="/system/roles" element={<RoleManagement />} />
                <Route path="/system/municipalities" element={<MunicipalityManagement />} />
                <Route path="/system/groups" element={<GroupManagement />} />
                <Route path="/system/principals" element={<PrincipalManagement />} />
                <Route path="/system/schools" element={<SchoolUnits />} />
                <Route path="/system/school-years" element={<SchoolYears />} />
                <Route path="/system/support" element={<Support />} />
                <Route path="/my-page/messages" element={<Messages />} />
                <Route path="/my-page/enrollment" element={<EnrollmentSettings />} />
                <Route path="/my-page/logs" element={<ActivityLogs />} />
                <Route path="/my-school/info" element={<SchoolInfo />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
