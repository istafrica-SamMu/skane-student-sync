
export interface PaymentError {
  id: string;
  studentId: number;
  studentName: string;
  personalId: string;
  errorType: 'price_code_missing' | 'municipality_connection' | 'emigrated' | 'overlapping_placement' | 'year_4_upper_secondary' | 'year_5_adapted' | 'has_diploma' | 'integration_missing';
  errorCategory: 'payment_blocking' | 'information' | 'validation';
  severity: 'high' | 'medium' | 'low';
  municipality: string;
  principal?: string;
  schoolUnit?: string;
  studyPath?: string;
  errorMessage: string;
  detectedDate: string;
  status: 'active' | 'resolved' | 'investigating';
  paymentImpact?: {
    blockedAmount: number;
    affectedPeriods: string[];
  };
  additionalInfo?: {
    priceCode?: string;
    placementDates?: string[];
    diplomaDate?: string;
  };
}

export interface ErrorListFilters {
  errorType?: string;
  municipality?: string;
  principal?: string;
  severity?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface ErrorResolution {
  errorId: string;
  resolvedBy: string;
  resolvedDate: string;
  resolution: string;
  notes?: string;
}
