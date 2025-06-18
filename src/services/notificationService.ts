
export interface Notification {
  id: string;
  type: 'dual_placement' | 'grade_repetition';
  studentId: number;
  studentName: string;
  message: string;
  details: any;
  createdAt: string;
  resolved: boolean;
}

export interface DualPlacementDetails {
  overlappingSchools: Array<{
    schoolUnit: string;
    startDate: string;
    endDate?: string;
    contactEmail: string;
  }>;
}

export interface GradeRepetitionDetails {
  previousEnrollment: {
    studyPath: string;
    schoolYear: string;
    schoolUnit: string;
    startDate: string;
    endDate?: string;
  };
  currentEnrollment: {
    studyPath: string;
    schoolYear: string;
    schoolUnit: string;
    startDate: string;
  };
  homeMunicipalityContact: string;
}

class NotificationService {
  private notifications: Notification[] = [];

  createDualPlacementNotification(
    studentId: number,
    studentName: string,
    details: DualPlacementDetails
  ): string {
    const id = `dual_${studentId}_${Date.now()}`;
    const notification: Notification = {
      id,
      type: 'dual_placement',
      studentId,
      studentName,
      message: `Student ${studentName} has overlapping school placements. Payment blocked until resolved.`,
      details,
      createdAt: new Date().toISOString(),
      resolved: false
    };
    
    this.notifications.push(notification);
    this.sendDualPlacementEmail(notification);
    return id;
  }

  createGradeRepetitionNotification(
    studentId: number,
    studentName: string,
    details: GradeRepetitionDetails
  ): string {
    const id = `grade_${studentId}_${Date.now()}`;
    const notification: Notification = {
      id,
      type: 'grade_repetition',
      studentId,
      studentName,
      message: `Student ${studentName} is re-enrolling in the same grade and education.`,
      details,
      createdAt: new Date().toISOString(),
      resolved: false
    };
    
    this.notifications.push(notification);
    this.sendGradeRepetitionEmail(notification);
    return id;
  }

  private sendDualPlacementEmail(notification: Notification): void {
    const details = notification.details as DualPlacementDetails;
    console.log('📧 DUAL PLACEMENT EMAIL SENT:', {
      to: details.overlappingSchools.map(school => school.contactEmail),
      subject: `URGENT: Overlapping School Placement - ${notification.studentName}`,
      body: `
        Student: ${notification.studentName}
        Issue: Overlapping school placements detected
        Schools involved: ${details.overlappingSchools.map(s => s.schoolUnit).join(', ')}
        
        No payment will be made until this overlapping placement is corrected.
        Please contact the other schools to resolve this issue.
        
        This message will be sent daily until resolved.
      `
    });
  }

  private sendGradeRepetitionEmail(notification: Notification): void {
    const details = notification.details as GradeRepetitionDetails;
    console.log('📧 GRADE REPETITION EMAIL SENT:', {
      to: details.homeMunicipalityContact,
      subject: `Grade Repetition Notice - ${notification.studentName}`,
      body: `
        Student: ${notification.studentName}
        Previous: ${details.previousEnrollment.studyPath} Year ${details.previousEnrollment.schoolYear}
        Current: ${details.currentEnrollment.studyPath} Year ${details.currentEnrollment.schoolYear}
        
        This student is re-enrolling in the same education and grade.
      `
    });
  }

  getActiveNotifications(): Notification[] {
    return this.notifications.filter(n => !n.resolved);
  }

  getDualPlacementNotifications(): Notification[] {
    return this.notifications.filter(n => n.type === 'dual_placement' && !n.resolved);
  }

  resolveNotification(id: string): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.resolved = true;
    }
  }

  // Simulate daily email sending
  sendDailyReminders(): void {
    const dualPlacements = this.getDualPlacementNotifications();
    dualPlacements.forEach(notification => {
      this.sendDualPlacementEmail(notification);
    });
  }
}

export const notificationService = new NotificationService();
