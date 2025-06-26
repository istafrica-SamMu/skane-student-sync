
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SidebarProvider } from '@/contexts/SidebarContext';

import { Index } from '@/pages';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Students from '@/pages/Students';
import StudentPlacements from '@/pages/StudentPlacements';
import StudentConflicts from '@/pages/StudentConflicts';
import StudentBulk from '@/pages/StudentBulk';
import Financial from '@/pages/Financial';
import PriceLists from '@/pages/PriceLists';
import Reports from '@/pages/Reports';
import ContributionReports from '@/pages/ContributionReports';
import Statistics from '@/pages/Statistics';
import FollowUpReports from '@/pages/FollowUpReports';
import Integration from '@/pages/Integration';
import Settings from '@/pages/Settings';
import StudyPaths from '@/pages/StudyPaths';
import KAARegistry from '@/pages/KAARegistry';
import PaymentStreamsAnalysis from '@/pages/analysis/PaymentStreamsAnalysis';
import GeographicalAnalysis from '@/pages/analysis/GeographicalAnalysis';
import NotFound from '@/pages/NotFound';
import { Header } from '@/components/Header';
import { RoleBasedSidebar } from '@/components/RoleBasedSidebar';
import KAAStatisticsAnalysis from "@/pages/kaa/KAAStatisticsAnalysis";
import PriceListsAnalysis from "@/pages/analysis/PriceListsAnalysis";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <div className="min-h-screen flex w-full">
              <RoleBasedSidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
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
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/study-paths" element={<StudyPaths />} />
                    <Route path="/kaa/registry" element={<KAARegistry />} />
                    <Route path="/analysis/payment-streams" element={<PaymentStreamsAnalysis />} />
                    <Route path="/analysis/geographical" element={<GeographicalAnalysis />} />
                    <Route path="/analysis/price-lists" element={<PriceListsAnalysis />} />
                    <Route path="/kaa/statistics-analysis" element={<KAAStatisticsAnalysis />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </QueryClientProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
