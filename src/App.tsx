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
import MunicipalityManagement from "./pages/system/MunicipalityManagement";
import SchoolUnits from "./pages/system/SchoolUnits";
import SchoolYears from "./pages/system/SchoolYears";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

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
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/system/users" element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              } />
              <Route path="/system/municipalities" element={
                <ProtectedRoute>
                  <MunicipalityManagement />
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
              <Route path="/students" element={
                <ProtectedRoute>
                  <Students />
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
              <Route path="/reports/contributions" element={
                <ProtectedRoute>
                  <ContributionReports />
                </ProtectedRoute>
              } />
              <Route path="/reports/statistics" element={
                <ProtectedRoute>
                  <Statistics />
                </ProtectedRoute>
              } />
              <Route path="/reports/follow-up" element={
                <ProtectedRoute>
                  <FollowUpReports />
                </ProtectedRoute>
              } />
              <Route path="/integration" element={
                <ProtectedRoute>
                  <Integration />
                </ProtectedRoute>
              } />
              <Route path="/integration/*" element={
                <ProtectedRoute>
                  <Integration />
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
