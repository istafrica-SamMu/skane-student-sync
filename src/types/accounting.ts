
export interface AccountingStringFormData {
  counterpartyId: string;
  counterpartyName: string;
  priceCodeGroup: "university_prep" | "vocational_prep" | "introductory" | "individual";
  priceCodes: string | string[]; // Allow both string (for form input) and string[] (for data)
  schoolType: "upper_secondary" | "adapted_upper_secondary";
  accountingCode: string;
  costCenter: string;
  project?: string;
  startDate: string;
  endDate?: string;
}

export interface AccountingString extends Omit<AccountingStringFormData, 'priceCodes'> {
  id: string;
  priceCodes: string[]; // Always array in the data model
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountingTemplate {
  id: string;
  name: string;
  description?: string;
  templateData: Omit<AccountingStringFormData, 'counterpartyId' | 'counterpartyName'>;
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
