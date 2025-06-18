
export interface AdditionalAmount {
  id: number;
  type: "Student" | "School" | "Principal";
  targetId: string; // ID of student, school, or principal
  targetName: string; // Name for display
  school?: string;
  principal?: string;
  program?: string;
  category: "Basic amount" | "Mother tongue" | "NIU" | "Special support" | "Supplement IMV" | "Other amount";
  title: string;
  amount: number;
  multiplier: number;
  note: string;
  status: "active" | "pending" | "expired";
  validFrom: string;
  validTo?: string;
  autoEndDate?: boolean; // For tracking automatic end dates
  createdAt: string;
  updatedAt: string;
}

export interface AmountCategory {
  id: string;
  name: string;
  isDefault: boolean;
  canDelete: boolean;
}

export interface AmountFormData {
  type: "Student" | "School" | "Principal";
  targetId: string;
  targetName: string;
  school?: string;
  principal?: string;
  program?: string;
  category: string;
  title: string;
  amount: number;
  multiplier: number;
  note: string;
  validFrom: string;
  validTo?: string;
}

export interface BulkAmountOperation {
  operation: "create" | "update" | "terminate";
  filters: {
    year?: string;
    studyPath?: string;
    schoolUnit?: string;
    municipality?: string;
  };
  changes: Partial<AmountFormData>;
}
