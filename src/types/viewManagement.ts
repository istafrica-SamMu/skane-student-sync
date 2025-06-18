
export interface ViewColumn {
  key: string;
  label: string;
  visible: boolean;
  width?: number;
}

export interface ViewFilter {
  field: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'between' | 'before' | 'after';
  value: string | string[];
}

export interface SavedView {
  id: string;
  name: string;
  description?: string;
  columns: ViewColumn[];
  filters: ViewFilter[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isDefault?: boolean;
  isSystemView?: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ViewPreset {
  id: string;
  name: string;
  description: string;
  filters: ViewFilter[];
  columns: ViewColumn[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isSystemDefault?: boolean;
}
