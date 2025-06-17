
export interface OrganizationalRole {
  id: string;
  roleType: string;
  municipality?: string;
  schoolUnit?: string;
  principal?: string;
  group?: string;
  permissions: Permission[];
  isActive: boolean;
  startDate: string;
  endDate?: string;
}

export interface Permission {
  id: string;
  name: string;
  category: 'student_data' | 'financial' | 'administration' | 'reports' | 'system';
  scope: 'municipal' | 'school' | 'group' | 'regional' | 'system';
  description: string;
}

export interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  defaultPermissions: Permission[];
  requiredOrganizationalLinks: ('municipality' | 'schoolUnit' | 'principal' | 'group')[];
}

export interface DataAccessRule {
  roleType: string;
  canAccessMunicipalities: string[];
  canAccessSchoolUnits: string[];
  canAccessGroups: string[];
  canAccessRegionalStats: boolean;
}
