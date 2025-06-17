
export interface Municipality {
  id: string;
  name: string;
  code: string;
  region: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SchoolUnit {
  id: string;
  name: string;
  code: string;
  municipalityId: string;
  municipality: Municipality;
  type: 'elementary' | 'middle' | 'high' | 'special' | 'adult_education';
  address: string;
  principalId?: string;
  principal?: Principal;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Principal {
  id: string;
  name: string;
  email: string;
  socialSecurityNumber: string;
  schoolUnits: SchoolUnit[];
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  schoolUnitId: string;
  schoolUnit: SchoolUnit;
  grade: string;
  academicYear: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationalHierarchyContext {
  municipalities: Municipality[];
  schoolUnits: SchoolUnit[];
  principals: Principal[];
  groups: Group[];
}

export interface DataAccessRule {
  userId: string;
  roleId: string;
  municipalityIds: string[];
  schoolUnitIds: string[];
  groupIds: string[];
  canAccessRegionalStats: boolean;
  canAccessAllMunicipalData: boolean;
  restrictions: {
    studentDataScope: 'none' | 'assigned_only' | 'school_only' | 'municipal_only' | 'regional' | 'system_wide';
    financialDataScope: 'none' | 'school_only' | 'municipal_only' | 'regional' | 'system_wide';
    reportsScope: 'none' | 'assigned_only' | 'school_only' | 'municipal_only' | 'regional' | 'system_wide';
  };
}
