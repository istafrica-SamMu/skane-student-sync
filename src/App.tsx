
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-ike-neutral-light">
              <AppSidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/students/placements" element={<StudentPlacements />} />
                    <Route path="/students/conflicts" element={<StudentConflicts />} />
                    <Route path="/students/bulk" element={<StudentBulk />} />
                    <Route path="/financial" element={<Financial />} />
                    <Route path="/financial/calculations" element={<Financial />} />
                    <Route path="/financial/pricelists" element={<PriceLists />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/reports/standard" element={<Reports />} />
                    <Route path="/reports/contributions" element={<ContributionReports />} />
                    <Route path="/reports/statistics" element={<Statistics />} />
                    <Route path="/reports/follow-up" element={<FollowUpReports />} />
                    <Route path="/integration" element={<Integration />} />
                    <Route path="/integration/*" element={<Integration />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/settings/*" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
