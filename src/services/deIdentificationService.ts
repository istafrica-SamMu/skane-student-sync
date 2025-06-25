
interface DeIdentifiedStudent {
  id: string;
  anonymizedId: string;
  studyPath: string;
  schoolYear: number;
  schoolUnit: string;
  municipality: string;
  priceCode: string;
  unitPrice: number;
  entryDate: string;
  status: 'active' | 'completed' | 'transferred';
  ageGroup: string; // Instead of exact age
  region: string;
}

interface DeIdentifiedChange {
  studentId: string;
  date: string;
  field: string;
  oldValue: string;
  newValue: string;
  reason: string;
  municipality: string;
}

class DeIdentificationService {
  private anonymizedIdMap = new Map<string, string>();
  private idCounter = 1;

  generateAnonymizedId(originalId: string): string {
    if (!this.anonymizedIdMap.has(originalId)) {
      this.anonymizedIdMap.set(originalId, `ANON-${this.idCounter.toString().padStart(6, '0')}`);
      this.idCounter++;
    }
    return this.anonymizedIdMap.get(originalId)!;
  }

  getAgeGroup(birthDate: string): string {
    const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
    if (age <= 16) return '≤16';
    if (age <= 18) return '17-18';
    if (age <= 20) return '19-20';
    return '21+';
  }

  deIdentifyStudent(student: any): DeIdentifiedStudent {
    return {
      id: student.id,
      anonymizedId: this.generateAnonymizedId(student.id),
      studyPath: student.studyPath,
      schoolYear: student.schoolYear,
      schoolUnit: student.schoolUnit,
      municipality: student.municipality,
      priceCode: student.priceCode,
      unitPrice: student.unitPrice,
      entryDate: student.entryDate,
      status: student.status,
      ageGroup: this.getAgeGroup(student.birthDate),
      region: student.region || 'Unknown'
    };
  }

  deIdentifyChange(change: any): DeIdentifiedChange {
    return {
      studentId: this.generateAnonymizedId(change.studentId),
      date: change.date,
      field: change.field,
      oldValue: change.oldValue,
      newValue: change.newValue,
      reason: change.reason,
      municipality: change.municipality
    };
  }

  // Mock regional data with de-identification
  getRegionalStudentData(): DeIdentifiedStudent[] {
    const mockData = [
      {
        id: '1', studyPath: 'Naturvetenskap', schoolYear: 2, schoolUnit: 'Malmö Gymnasium',
        municipality: 'Malmö', priceCode: 'GYNAT02', unitPrice: 87500, entryDate: '2023-08-15',
        status: 'active', birthDate: '2006-03-15', region: 'Skåne'
      },
      {
        id: '2', studyPath: 'Teknik', schoolYear: 1, schoolUnit: 'Lund Technical School',
        municipality: 'Lund', priceCode: 'GYTEK01', unitPrice: 95000, entryDate: '2024-08-20',
        status: 'active', birthDate: '2007-05-22', region: 'Skåne'
      },
      {
        id: '3', studyPath: 'Samhällsvetenskap', schoolYear: 3, schoolUnit: 'Helsingborg Gymnasium',
        municipality: 'Helsingborg', priceCode: 'GYSAM03', unitPrice: 82000, entryDate: '2022-08-12',
        status: 'completed', birthDate: '2005-01-10', region: 'Skåne'
      },
      {
        id: '4', studyPath: 'Ekonomi', schoolYear: 2, schoolUnit: 'Kristianstad Business School',
        municipality: 'Kristianstad', priceCode: 'GYEKO02', unitPrice: 78000, entryDate: '2023-08-18',
        status: 'active', birthDate: '2006-09-03', region: 'Skåne'
      }
    ];
    
    return mockData.map(student => this.deIdentifyStudent(student));
  }

  getRegionalChanges(): DeIdentifiedChange[] {
    const mockChanges = [
      {
        studentId: '1', date: '2024-01-15', field: 'Study Path', oldValue: 'Samhällsvetenskap',
        newValue: 'Naturvetenskap', reason: 'Student request', municipality: 'Malmö'
      },
      {
        studentId: '2', date: '2024-02-10', field: 'School Unit', oldValue: 'Lund Gymnasium',
        newValue: 'Lund Technical School', reason: 'Program specialization', municipality: 'Lund'
      }
    ];
    
    return mockChanges.map(change => this.deIdentifyChange(change));
  }
}

export const deIdentificationService = new DeIdentificationService();
export type { DeIdentifiedStudent, DeIdentifiedChange };
