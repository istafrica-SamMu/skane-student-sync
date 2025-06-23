
export interface ReportCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  reports: ReportType[];
}

export interface ReportType {
  id: string;
  name: string;
  description: string;
  formats: ('PDF' | 'CSV' | 'Excel')[];
  requiresDateRange: boolean;
  requiresMunicipality: boolean;
  requiresPrincipal: boolean;
}

export interface ReportFilters {
  dateFrom?: string;
  dateTo?: string;
  municipality?: string;
  principal?: string;
  schoolUnit?: string;
  format: 'PDF' | 'CSV' | 'Excel';
}

export interface GeneratedReport {
  id: string;
  name: string;
  type: string;
  category: string;
  format: 'PDF' | 'CSV' | 'Excel';
  generatedDate: string;
  period: string;
  municipality?: string;
  principal?: string;
  fileSize: string;
  status: 'generating' | 'completed' | 'failed';
  downloadUrl?: string;
}
