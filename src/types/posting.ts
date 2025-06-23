
export interface PostingTemplate {
  id: string;
  municipalityId: string;
  municipalityName: string;
  name: string;
  description?: string;
  accountingCode: string;
  costCenter: string;
  project?: string;
  department?: string;
  activity?: string;
  isDefault: boolean;
  applicableFor: "student" | "school" | "principal" | "all";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostingRule {
  id: string;
  municipalityId: string;
  entityType: "student" | "school" | "principal";
  isMandatory: boolean;
  requiresFinancialIntegration: boolean;
  fallbackToMunicipalitySettings: boolean;
  templateId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostingEntry {
  id: string;
  additionalAmountId: number;
  templateId: string;
  templateName: string;
  accountingCode: string;
  costCenter: string;
  project?: string;
  department?: string;
  activity?: string;
  amount: number;
  postingDate: string;
  status: "pending" | "posted" | "failed" | "cancelled";
  errorMessage?: string;
  postedBy: string;
  postedAt?: string;
  createdAt: string;
}

export interface FinancialIntegration {
  municipalityId: string;
  municipalityName: string;
  isEnabled: boolean;
  integrationSystem: "agresso" | "raindance" | "unit4" | "custom";
  connectionStatus: "connected" | "disconnected" | "error";
  lastSync?: string;
  configuration: {
    autoPostingEnabled: boolean;
    requiresApproval: boolean;
    batchProcessing: boolean;
  };
}
