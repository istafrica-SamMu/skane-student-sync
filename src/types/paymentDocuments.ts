
export interface PaymentDocument {
  id: string;
  documentNumber: string;
  type: "preliminary" | "definitive";
  status: "draft" | "approved" | "processed" | "error";
  period: string;
  measurementDate: string;
  createdDate: string;
  municipality: string;
  principal: string;
  schoolUnit: string;
  totalAmount: number;
  studentCount: number;
  errorMessages?: string[];
  canDelete: boolean;
}

export interface PaymentDocumentItem {
  id: string;
  documentId: string;
  studentPersonalId: string;
  studentFirstName: string;
  studentLastName: string;
  schoolUnit: string;
  studyPath: string;
  year: string;
  priceCode: string;
  baseAmount: number;
  additionalAmount: number;
  totalAmount: number;
  errorMessages?: string[];
}

export interface PaymentDocumentFilters {
  period?: string;
  documentType?: "preliminary" | "definitive" | "all";
  municipality?: string;
  principal?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}
