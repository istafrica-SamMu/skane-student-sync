
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DualPlacementDetector from "@/components/students/DualPlacementDetector";
import GradeRepetitionDetector from "@/components/students/GradeRepetitionDetector";

const ConflictResolution = () => {
  const { toast } = useToast();
  const [hasConflicts, setHasConflicts] = useState(false);
  const [hasGradeRepetitions, setHasGradeRepetitions] = useState(false);

  // Mock enrollment data for conflict detection
  const [enrollments] = useState([
    {
      id: 1,
      studentId: 1,
      studentName: "Ahmed Hassan",
      schoolUnit: "Malmö Gymnasium",
      contactEmail: "malmo.gym@education.se",
      startDate: "2024-08-15",
      studyPath: "Naturvetenskap",
      schoolYear: "1"
    },
    {
      id: 2,
      studentId: 2,
      studentName: "Fatima Al-Rashid",
      schoolUnit: "Lund Gymnasium",
      contactEmail: "lund.gym@education.se",
      startDate: "2024-08-15",
      studyPath: "Samhällsvetenskap",
      schoolYear: "2"
    },
    {
      id: 3,
      studentId: 3,
      studentName: "Erik Johansson",
      schoolUnit: "Helsingborg Gymnasium",
      contactEmail: "helsingborg.gym@education.se",
      startDate: "2024-08-15",
      endDate: "2024-12-15",
      studyPath: "Teknik",
      schoolYear: "1"
    },
    {
      id: 4,
      studentId: 3, // Same student, different school (dual placement)
      studentName: "Erik Johansson",
      schoolUnit: "Kristianstad Gymnasium",
      contactEmail: "kristianstad.gym@education.se",
      startDate: "2024-09-01",
      studyPath: "Teknik",
      schoolYear: "1"
    },
    {
      id: 5,
      studentId: 5,
      studentName: "Maria Svensson",
      schoolUnit: "Ystad Gymnasium",
      contactEmail: "ystad.gym@education.se",
      startDate: "2024-08-15",
      studyPath: "Ekonomi",
      schoolYear: "2"
    }
  ]);

  // Mock enrollment history for grade repetition testing
  const [enrollmentHistory] = useState([
    {
      id: 1,
      studentId: 5,
      studentName: "Maria Svensson",
      studyPath: "Ekonomi",
      schoolYear: "2",
      schoolUnit: "Malmö Gymnasium",
      startDate: "2023-08-15",
      endDate: "2024-06-15",
      homeMunicipalityContact: "ystad.municipality@kommun.se"
    },
    {
      id: 2,
      studentId: 5,
      studentName: "Maria Svensson",
      studyPath: "Ekonomi",
      schoolYear: "2", // Same grade repetition
      schoolUnit: "Ystad Gymnasium",
      startDate: "2024-08-15",
      homeMunicipalityContact: "ystad.municipality@kommun.se"
    }
  ]);

  const runConflictAnalysis = () => {
    toast({
      title: "Conflict Analysis Started",
      description: "Running comprehensive conflict detection analysis...",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Conflict Resolution</h1>
          <p className="text-ike-neutral mt-2">
            Detect and resolve student placement conflicts and enrollment issues
          </p>
        </div>
        <Button 
          onClick={runConflictAnalysis}
          className="bg-ike-primary hover:bg-ike-primary-dark text-white"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Run Analysis
        </Button>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Active Conflicts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">12</div>
            <div className="text-xs text-ike-error">Requires attention</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Under Investigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">5</div>
            <div className="text-xs text-ike-neutral">Ongoing process</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Resolved This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">23</div>
            <div className="text-xs text-ike-success">95% resolution rate</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Average Resolution Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">2.3</div>
            <div className="text-xs text-ike-neutral">Days</div>
          </CardContent>
        </Card>
      </div>

      {/* Conflict Detection Systems */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DualPlacementDetector 
          enrollments={enrollments}
          onDetectionChange={setHasConflicts}
        />
        <GradeRepetitionDetector 
          enrollmentHistory={enrollmentHistory}
          onDetectionChange={setHasGradeRepetitions}
        />
      </div>

      {/* Alert Summary */}
      {(hasConflicts || hasGradeRepetitions) && (
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-700">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Detection Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {hasConflicts && (
                <div className="flex items-center text-red-600">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span>Dual placement conflicts detected - Payments blocked</span>
                </div>
              )}
              {hasGradeRepetitions && (
                <div className="flex items-center text-orange-600">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  <span>Grade repetitions detected - Municipalities notified</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conflict Resolution Process */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Resolution Process</CardTitle>
          <CardDescription>
            Standard process for handling student placement conflicts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-ike-error rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-ike-neutral-dark">Automatic Detection</h4>
                <p className="text-sm text-ike-neutral">System automatically detects conflicts during enrollment processing</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-ike-warning rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-ike-neutral-dark">Prioritization</h4>
                <p className="text-sm text-ike-neutral">Conflicts are prioritized based on severity and impact</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-ike-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-ike-neutral-dark">Investigation</h4>
                <p className="text-sm text-ike-neutral">Staff investigates and gathers additional information</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-ike-success rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <div>
                <h4 className="font-medium text-ike-neutral-dark">Resolution</h4>
                <p className="text-sm text-ike-neutral">Conflict is resolved and payments are unblocked</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConflictResolution;
