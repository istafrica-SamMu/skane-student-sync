
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain,
  MapPin,
  Calculator,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Route,
  Home,
  School,
  Ruler
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface EligibilityFactors {
  distanceKm: number;
  walkingTimeMinutes: number;
  publicTransportAvailable: boolean;
  safeWalkingRoute: boolean;
  specialNeeds: boolean;
  weatherConsiderations: boolean;
  ageGroup: string;
  recommendedDecision: 'eligible' | 'not-eligible' | 'review-required';
  confidence: number;
}

interface PendingStudent {
  id: number;
  name: string;
  grade: string;
  homeAddress: string;
  schoolAddress: string;
  factors: EligibilityFactors;
}

const EligibilityDecisionTools = () => {
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState<PendingStudent | null>(null);
  const [showDecisionDialog, setShowDecisionDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data for pending decisions
  const pendingStudents: PendingStudent[] = [
    {
      id: 1,
      name: "Emma Karlsson",
      grade: "3",
      homeAddress: "Bergsgatan 45, 213 45 Malmö",
      schoolAddress: "Malmö Centrum Grundskola, Storgatan 15",
      factors: {
        distanceKm: 2.8,
        walkingTimeMinutes: 35,
        publicTransportAvailable: true,
        safeWalkingRoute: false,
        specialNeeds: false,
        weatherConsiderations: true,
        ageGroup: "primary",
        recommendedDecision: "eligible",
        confidence: 85
      }
    },
    {
      id: 2,
      name: "Lucas Andersson",
      grade: "7",
      homeAddress: "Södra Vägen 12, 214 56 Malmö",
      schoolAddress: "Rosengård Skola, Rosengård Centrum 8",
      factors: {
        distanceKm: 1.2,
        walkingTimeMinutes: 15,
        publicTransportAvailable: true,
        safeWalkingRoute: true,
        specialNeeds: false,
        weatherConsiderations: false,
        ageGroup: "secondary",
        recommendedDecision: "not-eligible",
        confidence: 92
      }
    },
    {
      id: 3,
      name: "Sofia Pettersson",
      grade: "5",
      homeAddress: "Norra Gatan 78, 215 67 Malmö",
      schoolAddress: "Västra Skolan, Västergatan 45",
      factors: {
        distanceKm: 3.5,
        walkingTimeMinutes: 45,
        publicTransportAvailable: false,
        safeWalkingRoute: true,
        specialNeeds: true,
        weatherConsiderations: true,
        ageGroup: "primary",
        recommendedDecision: "review-required",
        confidence: 65
      }
    }
  ];

  const getRecommendationBadge = (decision: string, confidence: number) => {
    switch (decision) {
      case "eligible":
        return <Badge className="bg-ike-success text-white"><CheckCircle className="w-3 h-3 mr-1" />Eligible ({confidence}%)</Badge>;
      case "not-eligible":
        return <Badge className="bg-ike-error text-white"><XCircle className="w-3 h-3 mr-1" />Not Eligible ({confidence}%)</Badge>;
      case "review-required":
        return <Badge className="bg-ike-warning text-white"><AlertTriangle className="w-3 h-3 mr-1" />Review Required ({confidence}%)</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-ike-success";
    if (confidence >= 60) return "text-ike-warning";
    return "text-ike-error";
  };

  const handleReviewStudent = (student: PendingStudent) => {
    setSelectedStudent(student);
    setShowDecisionDialog(true);
  };

  const handleMakeDecision = async (decision: 'eligible' | 'not-eligible') => {
    if (!selectedStudent) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate decision processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Decision Recorded",
        description: `${selectedStudent.name} marked as ${decision === 'eligible' ? 'eligible' : 'not eligible'} for travel card`,
      });
      
      console.log("Eligibility decision made:", {
        studentId: selectedStudent.id,
        studentName: selectedStudent.name,
        decision,
        factors: selectedStudent.factors
      });
      
      setShowDecisionDialog(false);
      setSelectedStudent(null);
      
    } catch (error) {
      toast({
        title: "Decision Failed",
        description: "Failed to record the eligibility decision. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const runBulkAnalysis = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate bulk analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Bulk Analysis Complete",
        description: `Analyzed ${pendingStudents.length} students. Updated recommendations available.`,
      });
      
      console.log("Bulk eligibility analysis completed");
      
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to complete bulk analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="border-l-4 border-l-ike-primary">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-ike-neutral-dark">
          <div className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-ike-primary" />
            Enhanced Eligibility Decision Tools
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={runBulkAnalysis}
            disabled={isProcessing}
            className="border-ike-primary text-ike-primary hover:bg-ike-primary/10"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-ike-primary mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Calculator className="w-4 h-4 mr-1" />
                Run Bulk Analysis
              </>
            )}
          </Button>
        </CardTitle>
        <CardDescription>
          AI-powered eligibility assessment with distance calculation and safety analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-ike-neutral-light p-3 rounded-lg">
            <p className="font-medium text-ike-neutral-dark mb-1">Pending Decisions</p>
            <p className="text-2xl font-bold text-ike-primary">{pendingStudents.length}</p>
            <p className="text-xs text-ike-neutral">Students awaiting review</p>
          </div>
          <div className="bg-ike-success/10 p-3 rounded-lg">
            <p className="font-medium text-ike-neutral-dark mb-1">High Confidence</p>
            <p className="text-2xl font-bold text-ike-success">
              {pendingStudents.filter(s => s.factors.confidence >= 80).length}
            </p>
            <p className="text-xs text-ike-neutral">Automated recommendations</p>
          </div>
          <div className="bg-ike-warning/10 p-3 rounded-lg">
            <p className="font-medium text-ike-neutral-dark mb-1">Needs Review</p>
            <p className="text-2xl font-bold text-ike-warning">
              {pendingStudents.filter(s => s.factors.recommendedDecision === 'review-required').length}
            </p>
            <p className="text-xs text-ike-neutral">Manual review required</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-ike-neutral-dark">Students Pending Decision</h4>
          {pendingStudents.map((student) => (
            <div key={student.id} className="border border-ike-neutral/20 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-ike-neutral-dark">{student.name}</h5>
                  <p className="text-sm text-ike-neutral">Grade {student.grade}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getRecommendationBadge(student.factors.recommendedDecision, student.factors.confidence)}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleReviewStudent(student)}
                    className="border-ike-primary text-ike-primary hover:bg-ike-primary/10"
                  >
                    Review
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center">
                  <Ruler className="w-4 h-4 mr-1 text-ike-neutral" />
                  <span className="text-ike-neutral">{student.factors.distanceKm} km</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-ike-neutral" />
                  <span className="text-ike-neutral">{student.factors.walkingTimeMinutes} min walk</span>
                </div>
                <div className="flex items-center">
                  <Route className="w-4 h-4 mr-1 text-ike-neutral" />
                  <span className={student.factors.publicTransportAvailable ? "text-ike-success" : "text-ike-error"}>
                    {student.factors.publicTransportAvailable ? "Transit available" : "No transit"}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${getConfidenceColor(student.factors.confidence)}`}>
                    {student.factors.confidence}% confidence
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Decision Review Dialog */}
      <Dialog open={showDecisionDialog} onOpenChange={setShowDecisionDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Brain className="w-5 h-5 mr-2 text-ike-primary" />
              Eligibility Decision Review
            </DialogTitle>
            <DialogDescription>
              Review all factors and make an informed eligibility decision
            </DialogDescription>
          </DialogHeader>
          
          {selectedStudent && (
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="factors">All Factors</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-ike-neutral">Student</label>
                      <div className="mt-1">
                        <p className="font-medium text-ike-neutral-dark">{selectedStudent.name}</p>
                        <p className="text-sm text-ike-neutral">Grade {selectedStudent.grade}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Home className="w-4 h-4 mt-1 text-ike-neutral" />
                      <div>
                        <label className="text-sm font-medium text-ike-neutral">Home Address</label>
                        <p className="text-sm text-ike-neutral-dark">{selectedStudent.homeAddress}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <School className="w-4 h-4 mt-1 text-ike-neutral" />
                      <div>
                        <label className="text-sm font-medium text-ike-neutral">School Address</label>
                        <p className="text-sm text-ike-neutral-dark">{selectedStudent.schoolAddress}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-ike-neutral-light p-3 rounded-lg">
                      <h4 className="font-medium text-ike-neutral-dark mb-2">AI Recommendation</h4>
                      <div className="space-y-2">
                        {getRecommendationBadge(selectedStudent.factors.recommendedDecision, selectedStudent.factors.confidence)}
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-ike-neutral">Confidence Level</span>
                            <span className={`font-medium ${getConfidenceColor(selectedStudent.factors.confidence)}`}>
                              {selectedStudent.factors.confidence}%
                            </span>
                          </div>
                          <Progress value={selectedStudent.factors.confidence} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="analysis" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-ike-neutral-dark">Distance Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-ike-neutral">Distance to school:</span>
                        <span className="text-sm font-medium text-ike-neutral-dark">{selectedStudent.factors.distanceKm} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-ike-neutral">Walking time:</span>
                        <span className="text-sm font-medium text-ike-neutral-dark">{selectedStudent.factors.walkingTimeMinutes} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-ike-neutral">Age group:</span>
                        <span className="text-sm font-medium text-ike-neutral-dark capitalize">{selectedStudent.factors.ageGroup}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-ike-neutral-dark">Safety & Accessibility</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-ike-neutral">Public transport:</span>
                        <Badge variant={selectedStudent.factors.publicTransportAvailable ? "default" : "destructive"}>
                          {selectedStudent.factors.publicTransportAvailable ? "Available" : "Not available"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-ike-neutral">Safe walking route:</span>
                        <Badge variant={selectedStudent.factors.safeWalkingRoute ? "default" : "destructive"}>
                          {selectedStudent.factors.safeWalkingRoute ? "Safe" : "Unsafe"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-ike-neutral">Special needs:</span>
                        <Badge variant={selectedStudent.factors.specialNeeds ? "secondary" : "outline"}>
                          {selectedStudent.factors.specialNeeds ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="factors" className="space-y-4">
                <div className="bg-ike-neutral-light p-4 rounded-lg">
                  <h4 className="font-medium text-ike-neutral-dark mb-3">All Eligibility Factors</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedStudent.factors).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-ike-neutral capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                        </span>
                        <span className="text-sm font-medium text-ike-neutral-dark">
                          {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDecisionDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => handleMakeDecision('not-eligible')}
              disabled={isProcessing}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Not Eligible
            </Button>
            <Button 
              className="bg-ike-success hover:bg-ike-success/90 text-white"
              onClick={() => handleMakeDecision('eligible')}
              disabled={isProcessing}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve Eligibility
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EligibilityDecisionTools;
