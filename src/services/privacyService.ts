
export interface PrivacyMark {
  id: string;
  studentId: number;
  type: 'protected_registration' | 'confidentiality_marking' | 'witness_protection';
  level: 'high' | 'medium' | 'low';
  reason: string;
  appliedDate: string;
  expiryDate?: string;
  authorizedBy: string;
  notes?: string;
}

export interface ProtectedStudent {
  id: number;
  displayId: string; // Masked identifier for display
  privacyMark: PrivacyMark;
  maskedData: {
    firstName: string;
    lastName: string;
    birthDate: string;
    address?: string;
    personalNumber?: string;
  };
  unmaskedData: {
    firstName: string;
    lastName: string;
    birthDate: string;
    address?: string;
    personalNumber?: string;
  };
}

class PrivacyService {
  private protectedStudents: ProtectedStudent[] = [
    {
      id: 2, // Fatima Al-Rashid from TF registration
      displayId: "PS-001-2024",
      privacyMark: {
        id: "PM-001",
        studentId: 2,
        type: "protected_registration",
        level: "high",
        reason: "Witness protection program",
        appliedDate: "2024-01-15",
        authorizedBy: "Municipal Authority"
      },
      maskedData: {
        firstName: "F****",
        lastName: "A****",
        birthDate: "2007-**-**",
        personalNumber: "200711-****"
      },
      unmaskedData: {
        firstName: "Fatima",
        lastName: "Al-Rashid",
        birthDate: "2007-11-28",
        personalNumber: "200711-2345"
      }
    },
    {
      id: 5, // Maria Svensson from TF registration  
      displayId: "PS-002-2024",
      privacyMark: {
        id: "PM-002",
        studentId: 5,
        type: "confidentiality_marking",
        level: "medium",
        reason: "Family safety concerns",
        appliedDate: "2024-02-01",
        authorizedBy: "School Principal"
      },
      maskedData: {
        firstName: "M****",
        lastName: "S****",
        birthDate: "2007-**-**",
        personalNumber: "200712-****"
      },
      unmaskedData: {
        firstName: "Maria",
        lastName: "Svensson",
        birthDate: "2007-12-03",
        personalNumber: "200712-0345"
      }
    }
  ];

  isStudentProtected(studentId: number): boolean {
    return this.protectedStudents.some(ps => ps.id === studentId);
  }

  getProtectedStudent(studentId: number): ProtectedStudent | null {
    return this.protectedStudents.find(ps => ps.id === studentId) || null;
  }

  getPrivacyMark(studentId: number): PrivacyMark | null {
    const protectedStudent = this.getProtectedStudent(studentId);
    return protectedStudent?.privacyMark || null;
  }

  getMaskedData(studentId: number, field: string): string {
    const protectedStudent = this.getProtectedStudent(studentId);
    if (!protectedStudent) return '';
    
    return (protectedStudent.maskedData as any)[field] || '';
  }

  canViewUnmaskedData(userRole: string): boolean {
    // Only certain roles can view unmasked data
    return ['system_admin', 'principal', 'municipal_admin'].includes(userRole);
  }

  getDisplayData(studentId: number, field: string, userRole: string = 'user'): string {
    const protectedStudent = this.getProtectedStudent(studentId);
    if (!protectedStudent) return '';
    
    if (this.canViewUnmaskedData(userRole)) {
      return (protectedStudent.unmaskedData as any)[field] || '';
    } else {
      return (protectedStudent.maskedData as any)[field] || '';
    }
  }

  addPrivacyMark(studentId: number, privacyMark: Omit<PrivacyMark, 'id'>): void {
    // Implementation for adding new privacy marks
    console.log(`Adding privacy mark for student ${studentId}:`, privacyMark);
  }

  removePrivacyMark(studentId: number): void {
    this.protectedStudents = this.protectedStudents.filter(ps => ps.id !== studentId);
  }
}

export const privacyService = new PrivacyService();
