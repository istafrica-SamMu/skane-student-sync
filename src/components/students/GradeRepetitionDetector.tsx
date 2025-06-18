
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Mail, CheckCircle, User } from "lucide-react";
import { notificationService, type Notification } from "@/services/notificationService";
import { useToast } from "@/hooks/use-toast";

interface StudentEnrollmentHistory {
  id: number;
  studentId: number;
  studentName: string;
  studyPath: string;
  schoolYear: string;
  schoolUnit: string;
  startDate: string;
  endDate?: string;
  homeMunicipalityContact: string;
}

interface GradeRepetitionDetectorProps {
  enrollmentHistory: StudentEnrollmentHistory[];
  onDetectionChange: (hasRepetitions: boolean) => void;
}

const GradeRepetitionDetector = ({ enrollmentHistory, onDetectionChange }: GradeRepetitionDetectorProps) => {
  const { toast } = useToast();
  const [gradeRepetitions, setGradeRepetitions] = useState<Notification[]>([]);

  const detectGradeRepetitions = () => {
    const studentHistory: Map<number, StudentEnrollmentHistory[]> = new Map();
    
    // Group enrollment history by student
    enrollmentHistory.forEach(enrollment => {
      const existing = studentHistory.get(enrollment.studentId) || [];
      existing.push(enrollment);
      studentHistory.set(enrollment.studentId, existing);
    });

    const newNotifications: Notification[] = [];

    // Check each student's enrollment history
    studentHistory.forEach((history, studentId) => {
      // Sort by start date to get chronological order
      const sortedHistory = history.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      
      for (let i = 1; i < sortedHistory.length; i++) {
        const previous = sortedHistory[i - 1];
        const current = sortedHistory[i];

        // Check if current enrollment matches previous (same study path and year)
        if (previous.studyPath === current.studyPath && 
            previous.schoolYear === current.schoolYear) {
          
          const notificationId = notificationService.createGradeRepetitionNotification(
            studentId,
            current.studentName,
            {
              previousEnrollment: {
                studyPath: previous.studyPath,
                schoolYear: previous.schoolYear,
                schoolUnit: previous.schoolUnit,
                startDate: previous.startDate,
                endDate: previous.endDate
              },
              currentEnrollment: {
                studyPath: current.studyPath,
                schoolYear: current.schoolYear,
                schoolUnit: current.schoolUnit,
                startDate: current.startDate
              },
              homeMunicipalityContact: current.homeMunicipalityContact
            }
          );

          const notification = notificationService.getActiveNotifications().find(n => n.id === notificationId);
          if (notification) {
            newNotifications.push(notification);
          }
        }
      }
    });

    setGradeRepetitions(newNotifications);
    onDetectionChange(newNotifications.length > 0);

    if (newNotifications.length > 0) {
      toast({
        title: "Grade Repetitions Detected",
        description: `${newNotifications.length} student(s) are re-enrolling in the same grade. Municipalities notified.`,
        variant: "default"
      });
    }
  };

  const acknowledgeRepetition = (notificationId: string) => {
    notificationService.resolveNotification(notificationId);
    setGradeRepetitions(prev => prev.filter(n => n.id !== notificationId));
    
    if (gradeRepetitions.length === 1) {
      onDetectionChange(false);
    }

    toast({
      title: "Grade Repetition Acknowledged",
      description: "The grade repetition has been acknowledged.",
    });
  };

  const resendNotification = (notification: Notification) => {
    const details = notification.details;
    console.log('📧 GRADE REPETITION RE-NOTIFICATION:', {
      to: details.homeMunicipalityContact,
      subject: `RE-SEND: Grade Repetition Notice - ${notification.studentName}`,
      studentName: notification.studentName,
      details
    });

    toast({
      title: "Notification Re-sent",
      description: `Grade repetition notification re-sent for ${notification.studentName}`,
    });
  };

  useEffect(() => {
    detectGradeRepetitions();
  }, [enrollmentHistory]);

  if (gradeRepetitions.length === 0) {
    return (
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-700 flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            No Grade Repetitions Detected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">All student enrollments are for new grades or study paths.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-l-orange-500">
      <CardHeader>
        <CardTitle className="flex items-center text-orange-700">
          <RotateCcw className="w-5 h-5 mr-2" />
          Grade Repetitions ({gradeRepetitions.length})
        </CardTitle>
        <CardDescription>
          Students re-enrolling in the same grade and education. Home municipalities have been notified.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={detectGradeRepetitions} variant="outline" size="sm" className="mb-4">
          <RotateCcw className="w-4 h-4 mr-2" />
          Re-scan for Repetitions
        </Button>

        {gradeRepetitions.map((notification) => {
          const details = notification.details;
          return (
            <div key={notification.id} className="border rounded-lg p-4 bg-orange-50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-orange-800">{notification.studentName}</h4>
                  <p className="text-sm text-orange-600">Student ID: {notification.studentId}</p>
                </div>
                <Badge className="bg-orange-500 text-white">Grade Repetition</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="bg-white border border-orange-200 rounded p-3">
                  <p className="text-sm font-medium text-orange-700 mb-1">Previous Enrollment:</p>
                  <p className="font-medium">{details.previousEnrollment.studyPath}</p>
                  <p className="text-sm">Year {details.previousEnrollment.schoolYear}</p>
                  <p className="text-xs text-gray-600">{details.previousEnrollment.schoolUnit}</p>
                  <p className="text-xs text-gray-500">
                    {details.previousEnrollment.startDate} - {details.previousEnrollment.endDate || 'Ongoing'}
                  </p>
                </div>

                <div className="bg-white border border-orange-200 rounded p-3">
                  <p className="text-sm font-medium text-orange-700 mb-1">Current Enrollment:</p>
                  <p className="font-medium">{details.currentEnrollment.studyPath}</p>
                  <p className="text-sm">Year {details.currentEnrollment.schoolYear}</p>
                  <p className="text-xs text-gray-600">{details.currentEnrollment.schoolUnit}</p>
                  <p className="text-xs text-gray-500">
                    Started: {details.currentEnrollment.startDate}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-3">
                <p className="text-sm">
                  <span className="font-medium">Municipal Contact:</span> {details.homeMunicipalityContact}
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => acknowledgeRepetition(notification.id)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Acknowledge
                </Button>
                <Button 
                  onClick={() => resendNotification(notification)}
                  variant="outline"
                  size="sm"
                >
                  <Mail className="w-4 h-4 mr-1" />
                  Re-send Notice
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default GradeRepetitionDetector;
