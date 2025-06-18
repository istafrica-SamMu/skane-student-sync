
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Mail, CheckCircle, Calendar } from "lucide-react";
import { notificationService, type Notification } from "@/services/notificationService";
import { useToast } from "@/hooks/use-toast";

interface StudentEnrollment {
  id: number;
  studentId: number;
  studentName: string;
  schoolUnit: string;
  contactEmail: string;
  startDate: string;
  endDate?: string;
  studyPath: string;
  schoolYear: string;
}

interface DualPlacementDetectorProps {
  enrollments: StudentEnrollment[];
  onDetectionChange: (hasConflicts: boolean) => void;
}

const DualPlacementDetector = ({ enrollments, onDetectionChange }: DualPlacementDetectorProps) => {
  const { toast } = useToast();
  const [dualPlacements, setDualPlacements] = useState<Notification[]>([]);

  const checkDateOverlap = (start1: string, end1: string | undefined, start2: string, end2: string | undefined): boolean => {
    const startDate1 = new Date(start1);
    const endDate1 = end1 ? new Date(end1) : new Date('2099-12-31');
    const startDate2 = new Date(start2);
    const endDate2 = end2 ? new Date(end2) : new Date('2099-12-31');

    return startDate1 <= endDate2 && startDate2 <= endDate1;
  };

  const detectDualPlacements = () => {
    const conflicts: Map<number, StudentEnrollment[]> = new Map();

    // Group enrollments by student
    const studentEnrollments: Map<number, StudentEnrollment[]> = new Map();
    enrollments.forEach(enrollment => {
      const existing = studentEnrollments.get(enrollment.studentId) || [];
      existing.push(enrollment);
      studentEnrollments.set(enrollment.studentId, existing);
    });

    // Check for overlapping enrollments per student
    studentEnrollments.forEach((studentEnrollmentList, studentId) => {
      if (studentEnrollmentList.length > 1) {
        for (let i = 0; i < studentEnrollmentList.length; i++) {
          for (let j = i + 1; j < studentEnrollmentList.length; j++) {
            const enrollment1 = studentEnrollmentList[i];
            const enrollment2 = studentEnrollmentList[j];

            if (checkDateOverlap(
              enrollment1.startDate, enrollment1.endDate,
              enrollment2.startDate, enrollment2.endDate
            )) {
              const existing = conflicts.get(studentId) || [];
              if (!existing.some(e => e.id === enrollment1.id)) existing.push(enrollment1);
              if (!existing.some(e => e.id === enrollment2.id)) existing.push(enrollment2);
              conflicts.set(studentId, existing);
            }
          }
        }
      }
    });

    // Create notifications for conflicts
    const newNotifications: Notification[] = [];
    conflicts.forEach((conflictingEnrollments, studentId) => {
      const studentName = conflictingEnrollments[0].studentName;
      const overlappingSchools = conflictingEnrollments.map(enrollment => ({
        schoolUnit: enrollment.schoolUnit,
        startDate: enrollment.startDate,
        endDate: enrollment.endDate,
        contactEmail: enrollment.contactEmail
      }));

      const notificationId = notificationService.createDualPlacementNotification(
        studentId,
        studentName,
        { overlappingSchools }
      );

      const notification = notificationService.getActiveNotifications().find(n => n.id === notificationId);
      if (notification) {
        newNotifications.push(notification);
      }
    });

    setDualPlacements(newNotifications);
    onDetectionChange(newNotifications.length > 0);

    if (newNotifications.length > 0) {
      toast({
        title: "Dual Placements Detected",
        description: `${newNotifications.length} student(s) have overlapping school placements. Payments blocked.`,
        variant: "destructive"
      });
    }
  };

  const resolveDualPlacement = (notificationId: string) => {
    notificationService.resolveNotification(notificationId);
    setDualPlacements(prev => prev.filter(n => n.id !== notificationId));
    
    if (dualPlacements.length === 1) {
      onDetectionChange(false);
    }

    toast({
      title: "Dual Placement Resolved",
      description: "The overlapping placement has been marked as resolved.",
    });
  };

  const sendDailyReminders = () => {
    notificationService.sendDailyReminders();
    toast({
      title: "Daily Reminders Sent",
      description: "Email reminders sent to all schools with dual placements.",
    });
  };

  useEffect(() => {
    detectDualPlacements();
  }, [enrollments]);

  if (dualPlacements.length === 0) {
    return (
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-700 flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            No Dual Placements Detected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">All student placements are properly configured.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-l-red-500">
      <CardHeader>
        <CardTitle className="flex items-center text-red-700">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Dual Placement Conflicts ({dualPlacements.length})
        </CardTitle>
        <CardDescription>
          Students with overlapping school placements. Payments are blocked until resolved.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 mb-4">
          <Button onClick={sendDailyReminders} variant="outline" size="sm">
            <Mail className="w-4 h-4 mr-2" />
            Send Daily Reminders
          </Button>
          <Button onClick={detectDualPlacements} variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Re-scan for Conflicts
          </Button>
        </div>

        {dualPlacements.map((notification) => {
          const details = notification.details;
          return (
            <div key={notification.id} className="border rounded-lg p-4 bg-red-50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-red-800">{notification.studentName}</h4>
                  <p className="text-sm text-red-600">Student ID: {notification.studentId}</p>
                </div>
                <Badge variant="destructive">Payment Blocked</Badge>
              </div>

              <div className="space-y-2 mb-3">
                <p className="text-sm font-medium text-red-700">Overlapping Schools:</p>
                {details.overlappingSchools.map((school: any, index: number) => (
                  <div key={index} className="bg-white border border-red-200 rounded p-2">
                    <p className="font-medium">{school.schoolUnit}</p>
                    <p className="text-xs text-gray-600">
                      {school.startDate} - {school.endDate || 'Ongoing'}
                    </p>
                    <p className="text-xs text-blue-600">{school.contactEmail}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => resolveDualPlacement(notification.id)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Mark Resolved
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default DualPlacementDetector;
