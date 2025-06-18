
export interface AccountingString {
  id: string;
  counterpartyId: string;
  counterpartyName: string;
  priceCodeGroup: "university_prep" | "vocational_prep" | "introductory" | "individual";
  priceCodes: string[];
  schoolType: "upper_secondary" | "adapted_upper_secondary";
  accountingCode: string;
  costCenter: string;
  project?: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountingStringFormData {
  counterpartyId: string;
  counterpartyName: string;
  priceCodeGroup: "university_prep" | "vocational_prep" | "introductory" | "individual";
  priceCodes: string[];
  schoolType: "upper_secondary" | "adapted_upper_secondary";
  accountingCode: string;
  costCenter: string;
  project?: string;
  startDate: string;
  endDate?: string;
}

export interface AccountingTemplate {
  id: string;
  name: string;
  description: string;
  priceCodeGroup: "university_prep" | "vocational_prep" | "introductory" | "individual";
  schoolType: "upper_secondary" | "adapted_upper_secondary";
  accountingCode: string;
  costCenter: string;
  project?: string;
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
}
