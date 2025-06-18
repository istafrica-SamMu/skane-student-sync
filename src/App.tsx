
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { RoleBasedSidebar } from '@/components/RoleBasedSidebar';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import KAARegistry from '@/pages/KAARegistry';
import ContactOccasions from '@/pages/kaa/ContactOccasions';
import MeasuresAndActions from '@/pages/kaa/MeasuresAndActions';
import KAADashboard from '@/pages/kaa/KAADashboard';
import TaxAgencyHub from '@/pages/integration/TaxAgencyHub';
import UHRBEDAIntegration from '@/pages/integration/UHRBEDAIntegration';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <RoleBasedSidebar />
                  <main className="flex-1 p-6">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/kaa-registry" element={<KAARegistry />} />
                      <Route path="/kaa/dashboard" element={<KAADashboard />} />
                      <Route path="/kaa/contact-occasions" element={<ContactOccasions />} />
                      <Route path="/kaa/measures-actions" element={<MeasuresAndActions />} />
                      <Route path="/integration/tax-agency" element={<TaxAgencyHub />} />
                      <Route path="/integration/uhr-beda" element={<UHRBEDAIntegration />} />
                    </Routes>
                  </main>
                </div>
              </SidebarProvider>
            } />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
