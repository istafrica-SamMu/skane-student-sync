
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
    'dashboard.resolved': 'Resolved',
    
    // Students
    'students.title': 'Student Registry',
    'students.subtitle': 'Manage student registration and placements',
    'students.export': 'Export',
    'students.new.student': 'New Student',
    'students.total.students': 'Total Students',
    'students.intercommunal': 'Intercommunal',
    'students.pending.transfers': 'Pending Transfers',
    'students.new.this.month': 'New this Month',
    'students.search.filter': 'Search and Filter',
    'students.search.placeholder': 'Search by name or personal number...',
    'students.all.statuses': 'All statuses',
    'students.all.municipalities': 'All municipalities',
    'students.active': 'Active',
    'students.conflict': 'Conflict',
    'students.pending': 'Pending',
    'students.unknown': 'Unknown',
    'students.student.list': 'Students',
    'students.detailed.list': 'Detailed list of all registered students',
    'students.name': 'Name',
    'students.personal.number': 'Personal Number',
    'students.municipality': 'Municipality',
    'students.school': 'School',
    'students.program': 'Program',
    'students.class': 'Class',
    'students.status': 'Status',
    'students.amount': 'Amount (SEK)',
    'students.actions': 'Actions',
    'students.view.details': 'View details',
    'students.edit': 'Edit',
    'students.transfer': 'Transfer',

    // Student Placements
    'placements.title': 'Placements & Transfers',
    'placements.subtitle': 'Manage student transfers between municipalities and schools',
    'placements.new.transfer': 'New Transfer',
    'placements.pending.transfers': 'Pending Transfers',
    'placements.requires.approval': 'Requires approval',
    'placements.approved.this.month': 'Approved this Month',
    'placements.from.last.month': 'from last month',
    'placements.completed.transfers': 'Completed transfers',
    'placements.since.term.start': 'Since term start',
    'placements.current.requests': 'Current Transfer Requests',
    'placements.recent.transfers': 'Recent and ongoing student transfers',
    'placements.from': 'From:',
    'placements.to': 'To:',
    'placements.program': 'Program:',
    'placements.reason': 'Reason:',
    'placements.pending': 'Pending',
    'placements.approved': 'Approved',
    'placements.completed': 'Completed',
    'placements.unknown': 'Unknown',
    'placements.approve': 'Approve',
    'placements.reject': 'Reject',
    'placements.execute': 'Execute',
    'placements.view.details': 'View details',
    'placements.transfer.process': 'Transfer Process',
    'placements.process.description': 'Standard process for student transfers between municipalities',
    'placements.step.application': 'Application received',
    'placements.step.application.desc': 'Student or guardian submits application',
    'placements.step.review': 'Review',
    'placements.step.review.desc': 'Both sending and receiving school review the application',
    'placements.step.approval': 'Approval',
    'placements.step.approval.desc': 'Decision made by responsible administrator',
    'placements.step.execution': 'Execution',
    'placements.step.execution.desc': 'System updates student registry and calculates new contributions'
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
    'dashboard.resolved': 'Löst',
    
    // Students
    'students.title': 'Studentregister',
    'students.subtitle': 'Hantera studentregistrering och placeringar',
    'students.export': 'Exportera',
    'students.new.student': 'Ny Student',
    'students.total.students': 'Totala Studenter',
    'students.intercommunal': 'Interkommunala',
    'students.pending.transfers': 'Väntande Överföringar',
    'students.new.this.month': 'Nya denna månad',
    'students.search.filter': 'Sök och Filtrera',
    'students.search.placeholder': 'Sök efter namn eller personnummer...',
    'students.all.statuses': 'Alla statusar',
    'students.all.municipalities': 'Alla kommuner',
    'students.active': 'Aktiv',
    'students.conflict': 'Konflikt',
    'students.pending': 'Väntande',
    'students.unknown': 'Okänd',
    'students.student.list': 'Studenter',
    'students.detailed.list': 'Detaljerad lista över alla registrerade studenter',
    'students.name': 'Namn',
    'students.personal.number': 'Personnummer',
    'students.municipality': 'Kommun',
    'students.school': 'Skola',
    'students.program': 'Program',
    'students.class': 'Klass',
    'students.status': 'Status',
    'students.amount': 'Belopp (SEK)',
    'students.actions': 'Åtgärder',
    'students.view.details': 'Visa detaljer',
    'students.edit': 'Redigera',
    'students.transfer': 'Överför',

    // Student Placements
    'placements.title': 'Placeringar & Överföringar',
    'placements.subtitle': 'Hantera studentöverföringar mellan kommuner och skolor',
    'placements.new.transfer': 'Ny Överföring',
    'placements.pending.transfers': 'Väntande Överföringar',
    'placements.requires.approval': 'Kräver godkännande',
    'placements.approved.this.month': 'Godkända denna månad',
    'placements.from.last.month': 'från förra månaden',
    'placements.completed.transfers': 'Genomförda överföringar',
    'placements.since.term.start': 'Sedan terminsstart',
    'placements.current.requests': 'Aktuella Överföringsförfrågningar',
    'placements.recent.transfers': 'Pågående och nyligen genomförda studentöverföringar',
    'placements.from': 'Från:',
    'placements.to': 'Till:',
    'placements.program': 'Program:',
    'placements.reason': 'Anledning:',
    'placements.pending': 'Väntande',
    'placements.approved': 'Godkänd',
    'placements.completed': 'Genomförd',
    'placements.unknown': 'Okänd',
    'placements.approve': 'Godkänn',
    'placements.reject': 'Avslå',
    'placements.execute': 'Genomför',
    'placements.view.details': 'Visa detaljer',
    'placements.transfer.process': 'Överföringsprocess',
    'placements.process.description': 'Standardprocess för studentöverföringar mellan kommuner',
    'placements.step.application': 'Ansökan inkommen',
    'placements.step.application.desc': 'Student eller vårdnadshavare lämnar in ansökan',
    'placements.step.review': 'Granskning',
    'placements.step.review.desc': 'Både avgående och mottagande skola granskar ansökan',
    'placements.step.approval': 'Godkännande',
    'placements.step.approval.desc': 'Beslut fattas av ansvarig administrator',
    'placements.step.execution': 'Genomförande',
    'placements.step.execution.desc': 'Systemet uppdaterar studentregistret och beräknar nya bidrag'
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
