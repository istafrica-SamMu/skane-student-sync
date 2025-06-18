
export interface PaymentBlock {
  id: string;
  type: "Student" | "School" | "Principal";
  targetId: string;
  targetName: string;
  school?: string;
  principal?: string;
  program?: string;
  reason: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentBlockFormData {
  type: "Student" | "School" | "Principal";
  targetId: string;
  targetName: string;
  school?: string;
  principal?: string;
  program?: string;
  reason: string;
  startDate: string;
  endDate?: string;
}

export interface PaymentBlockFilters {
  type?: string;
  isActive?: boolean;
  school?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}
