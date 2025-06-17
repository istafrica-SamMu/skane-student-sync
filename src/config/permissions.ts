
import { Permission, RoleTemplate } from "@/types/roleManagement";

export const PERMISSIONS: Permission[] = [
  // Student Data Permissions
  {
    id: 'view_student_data',
    name: 'View Student Data',
    category: 'student_data',
    scope: 'school',
    description: 'Access to view student information within assigned scope'
  },
  {
    id: 'edit_student_data',
    name: 'Edit Student Data',
    category: 'student_data',
    scope: 'school',
    description: 'Ability to modify student information'
  },
  {
    id: 'view_all_municipal_students',
    name: 'View All Municipal Students',
    category: 'student_data',
    scope: 'municipal',
    description: 'Access to all student data within municipality'
  },
  {
    id: 'view_regional_students',
    name: 'View Regional Students',
    category: 'student_data',
    scope: 'regional',
    description: 'Access to student data across region'
  },
  
  // Financial Permissions
  {
    id: 'view_financial_reports',
    name: 'View Financial Reports',
    category: 'financial',
    scope: 'school',
    description: 'Access to financial reports within scope'
  },
  {
    id: 'manage_price_lists',
    name: 'Manage Price Lists',
    category: 'financial',
    scope: 'municipal',
    description: 'Create and modify municipal price lists'
  },
  {
    id: 'approve_compensation',
    name: 'Approve Compensation',
    category: 'financial',
    scope: 'regional',
    description: 'Approve inter-municipal compensation'
  },
  
  // Administration Permissions
  {
    id: 'manage_school_users',
    name: 'Manage School Users',
    category: 'administration',
    scope: 'school',
    description: 'Add, edit, and remove users within school'
  },
  {
    id: 'manage_municipal_users',
    name: 'Manage Municipal Users',
    category: 'administration',
    scope: 'municipal',
    description: 'Manage users within municipality'
  },
  {
    id: 'manage_all_users',
    name: 'Manage All Users',
    category: 'administration',
    scope: 'system',
    description: 'System-wide user management'
  },
  
  // Reports Permissions
  {
    id: 'view_regional_statistics',
    name: 'View Regional Statistics',
    category: 'reports',
    scope: 'regional',
    description: 'Access to documented regional statistics'
  },
  {
    id: 'generate_municipal_reports',
    name: 'Generate Municipal Reports',
    category: 'reports',
    scope: 'municipal',
    description: 'Create and export municipal reports'
  }
];

export const ROLE_TEMPLATES: RoleTemplate[] = [
  {
    id: 'regional_admin',
    name: 'Regional Administrator',
    description: 'Full regional access with system management capabilities',
    defaultPermissions: PERMISSIONS,
    requiredOrganizationalLinks: []
  },
  {
    id: 'municipality_admin',
    name: 'Municipality Administrator', 
    description: 'Municipal-level administration and user management',
    defaultPermissions: PERMISSIONS.filter(p => 
      ['municipal', 'regional'].includes(p.scope) || p.category === 'reports'
    ),
    requiredOrganizationalLinks: ['municipality']
  },
  {
    id: 'school_admin',
    name: 'School Administrator',
    description: 'School-level administration and student management',
    defaultPermissions: PERMISSIONS.filter(p => 
      ['school', 'regional'].includes(p.scope) && p.category !== 'system'
    ),
    requiredOrganizationalLinks: ['municipality', 'schoolUnit']
  },
  {
    id: 'school_principal',
    name: 'School Principal',
    description: 'Principal with full school management access',
    defaultPermissions: PERMISSIONS.filter(p => 
      ['school', 'regional'].includes(p.scope) && p.category !== 'system'
    ),
    requiredOrganizationalLinks: ['municipality', 'schoolUnit', 'principal']
  },
  {
    id: 'teacher',
    name: 'Teacher',
    description: 'Classroom teacher with limited student access',
    defaultPermissions: PERMISSIONS.filter(p => 
      p.scope === 'school' && ['student_data', 'reports'].includes(p.category)
    ),
    requiredOrganizationalLinks: ['municipality', 'schoolUnit', 'group']
  }
];
