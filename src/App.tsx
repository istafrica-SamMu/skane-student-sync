
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import MunicipalStudents from "./pages/students/MunicipalStudents";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Statistics from "./pages/Statistics";
import RegionalStatistics from "./pages/reports/RegionalStatistics";
import MunicipalStatistics from "./pages/reports/MunicipalStatistics";
import MunicipalFinancialReports from "./pages/financial/MunicipalFinancialReports";
import GeographicalAnalysis from "./pages/analysis/GeographicalAnalysis";
import AdvancedAnalytics from "./pages/analysis/AdvancedAnalytics";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/students/municipal" element={<MunicipalStudents />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Reports Routes */}
              <Route path="/reports/regional" element={<RegionalStatistics />} />
              <Route path="/reports/municipal" element={<MunicipalStatistics />} />

              {/* Financial Routes */}
              <Route path="/financial/municipal" element={<MunicipalFinancialReports />} />
              
              {/* Statistics Route */}
              <Route path="/statistics" element={<Statistics />} />
              
              {/* Analysis Routes */}
              <Route path="/analysis/geographical" element={<GeographicalAnalysis />} />
              <Route path="/analysis/advanced" element={<AdvancedAnalytics />} />
              
            </Routes>
          </div>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
