import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import MunicipalStudents from "./pages/students/MunicipalStudents";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
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
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/students" element={<PrivateRoute><Students /></PrivateRoute>} />
              <Route path="/students/municipal" element={<PrivateRoute><MunicipalStudents /></PrivateRoute>} />
              <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
              
              {/* Reports Routes */}
              <Route path="/reports/regional" element={<PrivateRoute><RegionalStatistics /></PrivateRoute>} />
              <Route path="/reports/municipal" element={<PrivateRoute><MunicipalStatistics /></PrivateRoute>} />

              {/* Financial Routes */}
              <Route path="/financial/municipal" element={<PrivateRoute><MunicipalFinancialReports /></PrivateRoute>} />
              
              {/* Statistics Route */}
              <Route path="/statistics" element={<PrivateRoute><Statistics /></PrivateRoute>} />
              
              {/* Analysis Routes */}
              <Route path="/analysis/geographical" element={<PrivateRoute><GeographicalAnalysis /></PrivateRoute>} />
              <Route path="/analysis/advanced" element={<PrivateRoute><AdvancedAnalytics /></PrivateRoute>} />
              
            </Routes>
          </div>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
