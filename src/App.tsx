import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { RoleBasedSidebar } from "@/components/RoleBasedSidebar";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentPlacements from "./pages/StudentPlacements";
import StudentConflicts from "./pages/StudentConflicts";
import StudentBulk from "./pages/StudentBulk";
import Financial from "./pages/Financial";
import PriceLists from "./pages/PriceLists";
import Reports from "./pages/Reports";
import ContributionReports from "./pages/ContributionReports";
import Statistics from "./pages/Statistics";
import FollowUpReports from "./pages/FollowUpReports";
import Integration from "./pages/Integration";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import UserManagement from "./pages/system/UserManagement";
import RoleManagement from "./pages/system/RoleManagement";
import MunicipalityManagement from "./pages/system/MunicipalityManagement";
import GroupManagement from "./pages/system/GroupManagement";
import SchoolUnits from "./pages/system/SchoolUnits";
import SchoolYears from "./pages/system/SchoolYears";
import Support from "./pages/system/Support";
import StudyPaths from "./pages/study-paths/StudyPaths";
import PriceCodes from "./pages/study-paths/PriceCodes";
import NationalPrograms from "./pages/study-paths/NationalPrograms";
import PopulationData from "./pages/operations/PopulationData";
import AddressUpdates from "./pages/operations/AddressUpdates";
import MunicipalSchoolUnits from "./pages/operations/MunicipalSchoolUnits";
import MunicipalUserAdmin from "./pages/operations/MunicipalUserAdmin";
import RegionalStatistics from "./pages/reports/RegionalStatistics";
import MonthlyCompilation from "./pages/reports/MonthlyCompilation";
import FinancialAnalysis from "./pages/reports/FinancialAnalysis";
import ChangeTracking from "./pages/reports/ChangeTracking";
import StudentLists from "./pages/reports/StudentLists";
import SchoolFinancialReports from "./pages/reports/SchoolFinancialReports";
import SchoolStatistics from "./pages/reports/SchoolStatistics";
import Messages from "./pages/my-page/Messages";
import EnrollmentSettings from "./pages/my-page/EnrollmentSettings";
import ActivityLogs from "./pages/my-page/ActivityLogs";
import ExtensExport from "./pages/integration/ExtensExport";
import PopulationRegistry from "./pages/integration/PopulationRegistry";
import IntegrationTesting from "./pages/integration/IntegrationTesting";
import TaxAgencyHub from "./pages/integration/TaxAgencyHub";
import UHRBEDAIntegration from "./pages/integration/UHRBEDAIntegration";
import StudentsByClass from "./pages/students/StudentsByClass";
import MunicipalStudents from "./pages/students/MunicipalStudents";
import ExternalStudents from "./pages/students/ExternalStudents";
import TravelCardDocuments from "./pages/students/TravelCardDocuments";
import ScheduleIntegration from "./pages/integration/ScheduleIntegration";
import ImportStudentData from "./pages/integration/ImportStudentData";
import IntegrationStatus from "./pages/integration/IntegrationStatus";
import AdditionalAmounts from "./pages/financial/AdditionalAmounts";
import PaymentBlocks from "./pages/financial/PaymentBlocks";
import MunicipalFinancialReports from "./pages/financial/MunicipalFinancialReports";
import InterMunicipalCompensation from "./pages/financial/InterMunicipalCompensation";
import AccountingConfiguration from "./pages/financial/AccountingConfiguration";
import MoneyToReceive from "./pages/reports/MoneyToReceive";
import MoneyToPay from "./pages/reports/MoneyToPay";
import MunicipalStatistics from "./pages/reports/MunicipalStatistics";
import FinancialExport from "./pages/reports/FinancialExport";
import SchoolInfo from "./pages/my-school/SchoolInfo";
import OrgAdminDashboard from "./pages/OrgAdminDashboard";
import DevAdminDashboard from "./pages/DevAdminDashboard";
import PrincipalManagement from "./pages/system/PrincipalManagement";
import ContactOccasions from "./pages/kaa/ContactOccasions";
import KAARegistry from "./pages/KAARegistry";
import StatisticsSwedenReports from "./pages/kaa/StatisticsSwedenReports";
import MeasuresAndActions from "./pages/kaa/MeasuresAndActions";
import KAADashboard from "./pages/kaa/KAADashboard";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppContent = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Custom dashboard routing based on role
  const getDashboardComponent = () => {
    switch (user?.role) {
      case 'orgadmin':
        return <OrgAdminDashboard />;
      case 'devadmin':
        return <DevAdminDashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-ike-neutral-light">
        <RoleBasedSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/login" element={<Navigate to="/dashboard" replace />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  {getDashboardComponent()}
                </ProtectedRoute>
              } />
              
              {/* KAA Management Routes */}
              <Route path="/kaa/dashboard" element={
                <ProtectedRoute>
                  <KAADashboard />
                </ProtectedRoute>
              } />
              <Route path="/kaa/registry" element={
                <ProtectedRoute>
                  <KAARegistry />
                </ProtectedRoute>
              } />
              <Route path="/kaa/contacts" element={
                <ProtectedRoute>
                  <ContactOccasions />
                </ProtectedRoute>
              } />
              <Route path="/kaa/measures" element={
                <ProtectedRoute>
                  <MeasuresAndActions />
                </ProtectedRoute>
              } />
              <Route path="/kaa/scb-reports" element={
                <ProtectedRoute>
                  <StatisticsSwedenReports />
                </ProtectedRoute>
              } />
              
              {/* System Management Routes */}
              <Route path="/system/users" element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              } />
              <Route path="/system/roles" element={
                <ProtectedRoute>
                  <RoleManagement />
                </ProtectedRoute>
              } />
              <Route path="/system/municipalities" element={
                <ProtectedRoute>
                  <MunicipalityManagement />
                </ProtectedRoute>
              } />
              <Route path="/system/groups" element={
                <ProtectedRoute>
                  <GroupManagement />
                </ProtectedRoute>
              } />
              <Route path="/system/schools" element={
                <ProtectedRoute>
                  <SchoolUnits />
                </ProtectedRoute>
              } />
              <Route path="/system/school-years" element={
                <ProtectedRoute>
                  <SchoolYears />
                </ProtectedRoute>
              } />
              <Route path="/system/support" element={
                <ProtectedRoute>
                  <Support />
                </ProtectedRoute>
              } />
              <Route path="/study-paths" element={
                <ProtectedRoute>
                  <StudyPaths />
                </ProtectedRoute>
              } />
              <Route path="/study-paths/price-codes" element={
                <ProtectedRoute>
                  <PriceCodes />
                </ProtectedRoute>
              } />
              <Route path="/study-paths/programs" element={
                <ProtectedRoute>
                  <NationalPrograms />
                </ProtectedRoute>
              } />
              <Route path="/operations/population" element={
                <ProtectedRoute>
                  <PopulationData />
                </ProtectedRoute>
              } />
              <Route path="/operations/addresses" element={
                <ProtectedRoute>
                  <AddressUpdates />
                </ProtectedRoute>
              } />
              <Route path="/operations/municipal-schools" element={
                <ProtectedRoute>
                  <MunicipalSchoolUnits />
                </ProtectedRoute>
              } />
              <Route path="/operations/municipal-users" element={
                <ProtectedRoute>
                  <MunicipalUserAdmin />
                </ProtectedRoute>
              } />
              <Route path="/students" element={
                <ProtectedRoute>
                  <Students />
                </ProtectedRoute>
              } />
              <Route path="/students/classes" element={
                <ProtectedRoute>
                  <StudentsByClass />
                </ProtectedRoute>
              } />
              <Route path="/students/municipal" element={
                <ProtectedRoute>
                  <MunicipalStudents />
                </ProtectedRoute>
              } />
              <Route path="/students/external" element={
                <ProtectedRoute>
                  <ExternalStudents />
                </ProtectedRoute>
              } />
              <Route path="/students/travel-cards" element={
                <ProtectedRoute>
                  <TravelCardDocuments />
                </ProtectedRoute>
              } />
              <Route path="/students/placements" element={
                <ProtectedRoute>
                  <StudentPlacements />
                </ProtectedRoute>
              } />
              <Route path="/students/conflicts" element={
                <ProtectedRoute>
                  <StudentConflicts />
                </ProtectedRoute>
              } />
              <Route path="/students/bulk" element={
                <ProtectedRoute>
                  <StudentBulk />
                </ProtectedRoute>
              } />
              <Route path="/financial" element={
                <ProtectedRoute>
                  <Financial />
                </ProtectedRoute>
              } />
              <Route path="/financial/calculations" element={
                <ProtectedRoute>
                  <Financial />
                </ProtectedRoute>
              } />
              <Route path="/financial/pricelists" element={
                <ProtectedRoute>
                  <PriceLists />
                </ProtectedRoute>
              } />
              <Route path="/financial/accounting-configuration" element={
                <ProtectedRoute>
                  <AccountingConfiguration />
                </ProtectedRoute>
              } />
              <Route path="/financial/additional-amounts" element={
                <ProtectedRoute>
                  <AdditionalAmounts />
                </ProtectedRoute>
              } />
              <Route path="/financial/payment-blocks" element={
                <ProtectedRoute>
                  <PaymentBlocks />
                </ProtectedRoute>
              } />
              <Route path="/financial/reports" element={
                <ProtectedRoute>
                  <MunicipalFinancialReports />
                </ProtectedRoute>
              } />
              <Route path="/financial/compensation" element={
                <ProtectedRoute>
                  <InterMunicipalCompensation />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="/reports/standard" element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="/reports/students" element={
                <ProtectedRoute>
                  <StudentLists />
                </ProtectedRoute>
              } />
              <Route path="/reports/financial" element={
                <ProtectedRoute>
                  <SchoolFinancialReports />
                </ProtectedRoute>
              } />
              <Route path="/reports/statistics" element={
                <ProtectedRoute>
                  <SchoolStatistics />
                </ProtectedRoute>
              } />
              <Route path="/reports/contributions" element={
                <ProtectedRoute>
                  <ContributionReports />
                </ProtectedRoute>
              } />
              <Route path="/reports/follow-up" element={
                <ProtectedRoute>
                  <FollowUpReports />
                </ProtectedRoute>
              } />
              <Route path="/reports/regional" element={
                <ProtectedRoute>
                  <RegionalStatistics />
                </ProtectedRoute>
              } />
              <Route path="/reports/monthly" element={
                <ProtectedRoute>
                  <MonthlyCompilation />
                </ProtectedRoute>
              } />
              <Route path="/reports/changes" element={
                <ProtectedRoute>
                  <ChangeTracking />
                </ProtectedRoute>
              } />
              <Route path="/reports/money-to-receive" element={
                <ProtectedRoute>
                  <MoneyToReceive />
                </ProtectedRoute>
              } />
              <Route path="/reports/money-to-pay" element={
                <ProtectedRoute>
                  <MoneyToPay />
                </ProtectedRoute>
              } />
              <Route path="/reports/municipal-statistics" element={
                <ProtectedRoute>
                  <MunicipalStatistics />
                </ProtectedRoute>
              } />
              <Route path="/reports/financial-export" element={
                <ProtectedRoute>
                  <FinancialExport />
                </ProtectedRoute>
              } />
              <Route path="/my-page/messages" element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              } />
              <Route path="/my-page/enrollment" element={
                <ProtectedRoute>
                  <EnrollmentSettings />
                </ProtectedRoute>
              } />
              <Route path="/my-page/logs" element={
                <ProtectedRoute>
                  <ActivityLogs />
                </ProtectedRoute>
              } />
              <Route path="/my-page/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/my-school/info" element={
                <ProtectedRoute>
                  <SchoolInfo />
                </ProtectedRoute>
              } />
              <Route path="/integration/schedule" element={
                <ProtectedRoute>
                  <ScheduleIntegration />
                </ProtectedRoute>
              } />
              <Route path="/integration/import" element={
                <ProtectedRoute>
                  <ImportStudentData />
                </ProtectedRoute>
              } />
              <Route path="/integration/status" element={
                <ProtectedRoute>
                  <IntegrationStatus />
                </ProtectedRoute>
              } />
              <Route path="/integration" element={
                <ProtectedRoute>
                  <Integration />
                </ProtectedRoute>
              } />
              <Route path="/integration/extens" element={
                <ProtectedRoute>
                  <ExtensExport />
                </ProtectedRoute>
              } />
              <Route path="/integration/population" element={
                <ProtectedRoute>
                  <PopulationRegistry />
                </ProtectedRoute>
              } />
              <Route path="/integration/testing" element={
                <ProtectedRoute>
                  <IntegrationTesting />
                </ProtectedRoute>
              } />
              <Route path="/integration/tax-agency-hub" element={
                <ProtectedRoute>
                  <TaxAgencyHub />
                </ProtectedRoute>
              } />
              <Route path="/integration/uhr-beda" element={
                <ProtectedRoute>
                  <UHRBEDAIntegration />
                </ProtectedRoute>
              } />
              <Route path="/integration/*" element={
                <ProtectedRoute>
                  <Integration />
                </ProtectedRoute>
              } />
              <Route path="/system/principals" element={
                <ProtectedRoute>
                  <PrincipalManagement />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/settings/*" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="*" element={
                <ProtectedRoute>
                  <NotFound />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
