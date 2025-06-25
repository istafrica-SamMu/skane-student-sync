
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
import Statistics from "./pages/Statistics";
import ContactDirectory from "./pages/my-page/ContactDirectory";
import MunicipalFinancialReports from "./pages/financial/MunicipalFinancialReports";
import SchoolStatistics from "./pages/reports/SchoolStatistics";
import MunicipalUserAdmin from "./pages/operations/MunicipalUserAdmin";
import EnhancedStatistics from "./pages/reports/EnhancedStatistics";

const queryClient = new QueryClient();

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex w-full">
      <SidebarProvider>
        <RoleBasedSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/students/placements" element={<StudentPlacements />} />
              <Route path="/students/conflicts" element={<StudentConflicts />} />
              <Route path="/students/bulk" element={<StudentBulk />} />
              <Route path="/financial" element={<Financial />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/my-page/contacts" element={<ContactDirectory />} />
              <Route path="/reports/financial" element={<MunicipalFinancialReports />} />
              <Route path="/reports/students" element={<SchoolStatistics />} />
              <Route path="/reports/enhanced-statistics" element={<EnhancedStatistics />} />
              <Route path="/operations/municipal-users" element={<MunicipalUserAdmin />} />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <LanguageProvider>
            <BrowserRouter>
              <AppContent />
              <Toaster />
              <Sonner />
            </BrowserRouter>
          </LanguageProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
