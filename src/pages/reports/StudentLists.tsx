
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Users, 
  Download,
  FileText,
  GraduationCap,
  Eye,
  CheckCircle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const StudentLists = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [previewModal, setPreviewModal] = useState({ isOpen: false, report: null });
  const [generateModal, setGenerateModal] = useState({ isOpen: false, report: null });

  const availableReports = [
    {
      id: 1,
      name: "Current Student Roster",
      description: "Complete list of all enrolled students",
      category: "Student Lists",
      format: "Excel/PDF",
      lastGenerated: "2024-11-15",
      icon: Users
    },
    {
      id: 2,
      name: "Students by Class",
      description: "Students organized by class and study path",
      category: "Student Lists",
      format: "Excel/PDF",
      lastGenerated: "2024-11-14",
      icon: GraduationCap
    }
  ];

  const handleGenerateReport = (report) => {
    console.log(`Generating report with ID: ${report.id}`);
    setGenerateModal({ isOpen: true, report });
  };

  const handlePreviewReport = (report) => {
    console.log(`Previewing report with ID: ${report.id}`);
    setPreviewModal({ isOpen: true, report });
  };

  const confirmGenerate = () => {
    // Add actual report generation logic here
    console.log(`Confirmed generation of report: ${generateModal.report?.name}`);
    setGenerateModal({ isOpen: false, report: null });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Student Lists & Reports</h1>
          <p className="text-ike-neutral mt-2">
            Generate and download student lists and statistics for your school
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">247</div>
            <div className="text-xs text-ike-neutral mt-1">Currently enrolled</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Active Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">12</div>
            <div className="text-xs text-ike-neutral mt-1">This academic year</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Study Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">8</div>
            <div className="text-xs text-ike-neutral mt-1">Available programs</div>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <FileText className="w-5 h-5 mr-2 text-ike-primary" />
            Available Student Reports
          </CardTitle>
          <CardDescription>
            Generate and download student lists and statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-ike-neutral-light/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-ike-primary/10 text-ike-primary rounded-lg flex items-center justify-center">
                    <report.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ike-neutral-dark">{report.name}</h3>
                    <p className="text-sm text-ike-neutral mt-1">{report.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant="outline">{report.category}</Badge>
                      <Badge variant="secondary">{report.format}</Badge>
                      <span className="text-xs text-ike-neutral">
                        Last: {report.lastGenerated}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-ike-neutral text-ike-neutral hover:bg-ike-neutral-light"
                    onClick={() => handlePreviewReport(report)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-ike-primary hover:bg-ike-primary-dark text-white"
                    onClick={() => handleGenerateReport(report)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Generate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview Modal */}
      <Dialog open={previewModal.isOpen} onOpenChange={(open) => setPreviewModal({ isOpen: open, report: null })}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Eye className="w-5 h-5 mr-2 text-ike-primary" />
              Preview Report: {previewModal.report?.name}
            </DialogTitle>
            <DialogDescription>
              Preview the content and structure of this report before generating
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="bg-ike-neutral-light/30 border-2 border-dashed border-ike-neutral/30 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 text-ike-neutral mx-auto mb-4" />
              <h3 className="text-lg font-medium text-ike-neutral-dark mb-2">Report Preview</h3>
              <p className="text-ike-neutral mb-4">{previewModal.report?.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-ike-neutral-dark">Format</div>
                  <div className="text-ike-neutral">{previewModal.report?.format}</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-ike-neutral-dark">Category</div>
                  <div className="text-ike-neutral">{previewModal.report?.category}</div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setPreviewModal({ isOpen: false, report: null })}
            >
              Close
            </Button>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
              onClick={() => {
                setPreviewModal({ isOpen: false, report: null });
                handleGenerateReport(previewModal.report);
              }}
            >
              <Download className="w-4 h-4 mr-1" />
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Modal */}
      <Dialog open={generateModal.isOpen} onOpenChange={(open) => setGenerateModal({ isOpen: open, report: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Download className="w-5 h-5 mr-2 text-ike-primary" />
              Generate Report
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to generate "{generateModal.report?.name}"?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-ike-primary/5 border border-ike-primary/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-ike-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-ike-neutral-dark">Report Details</h4>
                  <p className="text-sm text-ike-neutral mt-1">{generateModal.report?.description}</p>
                  <p className="text-sm text-ike-neutral mt-2">
                    <span className="font-medium">Format:</span> {generateModal.report?.format}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setGenerateModal({ isOpen: false, report: null })}
            >
              Cancel
            </Button>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
              onClick={confirmGenerate}
            >
              <Download className="w-4 h-4 mr-1" />
              Generate & Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentLists;
