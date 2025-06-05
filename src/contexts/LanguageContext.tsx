
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'sv';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'header.search.placeholder': 'Search students, schools, reports...',
    'header.breadcrumb.dashboard': 'Dashboard',
    'header.breadcrumb.students': 'Student Management > Student Registry',
    'header.breadcrumb.students.placements': 'Student Management > Placements & Transfers',
    'header.breadcrumb.students.conflicts': 'Student Management > Conflict Resolution',
    'header.breadcrumb.students.bulk': 'Student Management > Bulk Operations',
    'header.breadcrumb.financial': 'Financial Management > IKE Calculations',
    'header.breadcrumb.financial.pricelists': 'Financial Management > Price Lists',
    'header.breadcrumb.reports': 'Reports & Analysis > Standard Reports',
    'header.breadcrumb.reports.contributions': 'Reports & Analysis > Contribution Reports',
    'header.breadcrumb.reports.statistics': 'Reports & Analysis > Statistics',
    'header.breadcrumb.reports.follow-up': 'Reports & Analysis > Follow-up Reports',
    'header.breadcrumb.integration': 'Integration & Import',
    'header.breadcrumb.settings': 'Settings',
    
    // Dashboard
    'dashboard.welcome': 'Welcome to IKE 2.0',
    'dashboard.date': 'Skåne Regional Platform',
    'dashboard.export': 'Export Data',
    'dashboard.generate': 'Generate Report',
    'dashboard.total.students': 'Total Students',
    'dashboard.active.calculations': 'Active Calculations',
    'dashboard.pending.conflicts': 'Pending Conflicts',
    'dashboard.monthly.amount': 'Monthly Amount',
    'dashboard.from.last.month': 'from last month',
    'dashboard.ongoing.processing': 'Ongoing processing',
    'dashboard.requires.attention': 'Requires attention',
    'dashboard.for.november': 'SEK for November 2024',
    'dashboard.calculation.status': 'Current Calculation Status',
    'dashboard.monthly.calculation': 'Monthly IKE calculation for November 2024',
    'dashboard.data.validation': 'Data validation',
    'dashboard.preliminary.calculation': 'Preliminary calculation',
    'dashboard.final.calculation': 'Final calculation',
    'dashboard.completed': 'Completed',
    'dashboard.ongoing': 'Ongoing',
    'dashboard.pending': 'Pending',
    'dashboard.next.run': 'Next run:',
    'dashboard.quick.actions': 'Quick Actions',
    'dashboard.common.tasks': 'Common tasks and functions',
    'dashboard.new.student': 'New Student',
    'dashboard.new.calculation': 'New Calculation',
    'dashboard.resolve.conflicts': 'Resolve Conflicts',
    'dashboard.recent.activity': 'Recent Activity',
    'dashboard.system.events': 'Overview of system events and user activity',
    'dashboard.student.registered': 'New student registered',
    'dashboard.conflict.resolved': 'Conflict resolved',
    'dashboard.calculation.started': 'Calculation started',
    'dashboard.data.imported': 'Data imported',
    'dashboard.done': 'Done',
    'dashboard.resolved': 'Resolved'
  },
  sv: {
    // Header
    'header.search.placeholder': 'Sök studenter, skolor, rapporter...',
    'header.breadcrumb.dashboard': 'Dashboard',
    'header.breadcrumb.students': 'Studenthantering > Studentregister',
    'header.breadcrumb.students.placements': 'Studenthantering > Placeringar & Överföringar',
    'header.breadcrumb.students.conflicts': 'Studenthantering > Konfliktlösning',
    'header.breadcrumb.students.bulk': 'Studenthantering > Massoperationer',
    'header.breadcrumb.financial': 'Ekonomihantering > IKE-beräkningar',
    'header.breadcrumb.financial.pricelists': 'Ekonomihantering > Prislistor',
    'header.breadcrumb.reports': 'Rapporter & Analys > Standardrapporter',
    'header.breadcrumb.reports.contributions': 'Rapporter & Analys > Bidragsrapporter',
    'header.breadcrumb.reports.statistics': 'Rapporter & Analys > Statistik',
    'header.breadcrumb.reports.follow-up': 'Rapporter & Analys > Uppföljningsrapporter',
    'header.breadcrumb.integration': 'Integration & Import',
    'header.breadcrumb.settings': 'Inställningar',
    
    // Dashboard
    'dashboard.welcome': 'Välkommen till IKE 2.0',
    'dashboard.date': 'Skåne Regional Platform',
    'dashboard.export': 'Exportera Data',
    'dashboard.generate': 'Generera Rapport',
    'dashboard.total.students': 'Totala Studenter',
    'dashboard.active.calculations': 'Aktiva Beräkningar',
    'dashboard.pending.conflicts': 'Väntande Konflikter',
    'dashboard.monthly.amount': 'Månadsbelopp',
    'dashboard.from.last.month': 'från förra månaden',
    'dashboard.ongoing.processing': 'Pågående processning',
    'dashboard.requires.attention': 'Kräver uppmärksamhet',
    'dashboard.for.november': 'SEK för november 2024',
    'dashboard.calculation.status': 'Aktuell Beräkningsstatus',
    'dashboard.monthly.calculation': 'Månatlig IKE-beräkning för november 2024',
    'dashboard.data.validation': 'Datavalidering',
    'dashboard.preliminary.calculation': 'Preliminär beräkning',
    'dashboard.final.calculation': 'Slutlig beräkning',
    'dashboard.completed': 'Klar',
    'dashboard.ongoing': 'Pågående',
    'dashboard.pending': 'Väntande',
    'dashboard.next.run': 'Nästa körning:',
    'dashboard.quick.actions': 'Snabbåtgärder',
    'dashboard.common.tasks': 'Vanliga uppgifter och funktioner',
    'dashboard.new.student': 'Ny Student',
    'dashboard.new.calculation': 'Ny Beräkning',
    'dashboard.resolve.conflicts': 'Lös Konflikter',
    'dashboard.recent.activity': 'Senaste Aktivitet',
    'dashboard.system.events': 'Översikt över systemhändelser och användaraktivitet',
    'dashboard.student.registered': 'Ny student registrerad',
    'dashboard.conflict.resolved': 'Konflikt löst',
    'dashboard.calculation.started': 'Beräkning startad',
    'dashboard.data.imported': 'Data importerad',
    'dashboard.done': 'Klar',
    'dashboard.resolved': 'Löst'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'sv' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
