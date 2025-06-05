
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'sv' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  sv: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.students': 'Studenthantering',
    'nav.students.registry': 'Studentregister',
    'nav.students.placements': 'Placeringar & Överföringar',
    'nav.students.conflicts': 'Konfliktlösning',
    'nav.students.bulk': 'Massoperationer',
    'nav.financial': 'Ekonomihantering',
    'nav.financial.calculations': 'IKE-beräkningar',
    'nav.financial.pricelists': 'Prislistor',
    'nav.reports': 'Rapporter & Analys',
    'nav.reports.standard': 'Standardrapporter',
    'nav.reports.contributions': 'Bidragsrapporter',
    'nav.reports.statistics': 'Statistik',
    'nav.reports.followup': 'Uppföljningsrapporter',
    'nav.integration': 'Integration & Import',
    'nav.settings': 'Inställningar',
    
    // Common
    'common.search': 'Sök studenter, skolor, rapporter...',
    'common.export': 'Exportera data',
    'common.generate': 'Generera rapport',
    'common.new': 'Ny',
    'common.edit': 'Redigera',
    'common.delete': 'Ta bort',
    'common.save': 'Spara',
    'common.cancel': 'Avbryt',
    'common.loading': 'Laddar...',
    
    // Dashboard
    'dashboard.welcome': 'Välkommen tillbaka!',
    'dashboard.overview': 'Här är en översikt över ditt IKE-system',
    'dashboard.totalStudents': 'Totala studenter',
    'dashboard.activeCalculations': 'Aktiva beräkningar',
    'dashboard.pendingConflicts': 'Väntande konflikter',
    'dashboard.monthlyAmount': 'Månadsbelopp',
    'dashboard.calculationStatus': 'Beräkningsstatus',
    'dashboard.recentActivity': 'Senaste aktivitet',
    'dashboard.quickActions': 'Snabbåtgärder',
    
    // Students
    'students.title': 'Studenthantering',
    'students.description': 'Hantera studentregistrering och placeringar',
    'students.totalStudents': 'Totala studenter',
    'students.intercommunal': 'Interkommunala',
    'students.pendingTransfers': 'Väntande överföringar',
    'students.newThisMonth': 'Nya denna månad',
    'students.addNew': 'Lägg till ny student',
    'students.importData': 'Importera data',
    'students.exportList': 'Exportera lista',
    
    // User menu
    'user.profile': 'Profil',
    'user.settings': 'Inställningar',
    'user.logout': 'Logga ut',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.students': 'Student Management',
    'nav.students.registry': 'Student Registry',
    'nav.students.placements': 'Placements & Transfers',
    'nav.students.conflicts': 'Conflict Resolution',
    'nav.students.bulk': 'Bulk Operations',
    'nav.financial': 'Financial Management',
    'nav.financial.calculations': 'IKE Calculations',
    'nav.financial.pricelists': 'Price Lists',
    'nav.reports': 'Reports & Analysis',
    'nav.reports.standard': 'Standard Reports',
    'nav.reports.contributions': 'Contribution Reports',
    'nav.reports.statistics': 'Statistics',
    'nav.reports.followup': 'Follow-up Reports',
    'nav.integration': 'Integration & Import',
    'nav.settings': 'Settings',
    
    // Common
    'common.search': 'Search students, schools, reports...',
    'common.export': 'Export data',
    'common.generate': 'Generate report',
    'common.new': 'New',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back!',
    'dashboard.overview': 'Here\'s an overview of your IKE system',
    'dashboard.totalStudents': 'Total Students',
    'dashboard.activeCalculations': 'Active Calculations',
    'dashboard.pendingConflicts': 'Pending Conflicts',
    'dashboard.monthlyAmount': 'Monthly Amount',
    'dashboard.calculationStatus': 'Calculation Status',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.quickActions': 'Quick Actions',
    
    // Students
    'students.title': 'Student Management',
    'students.description': 'Manage student registration and placements',
    'students.totalStudents': 'Total Students',
    'students.intercommunal': 'Intercommunal',
    'students.pendingTransfers': 'Pending Transfers',
    'students.newThisMonth': 'New this Month',
    'students.addNew': 'Add New Student',
    'students.importData': 'Import Data',
    'students.exportList': 'Export List',
    
    // User menu
    'user.profile': 'Profile',
    'user.settings': 'Settings',
    'user.logout': 'Logout',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('sv');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['sv']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
