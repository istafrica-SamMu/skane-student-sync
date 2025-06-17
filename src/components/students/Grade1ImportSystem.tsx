
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  Users, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  School
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ImportStatus {
  isRunning: boolean;
  progress: number;
  total: number;
  processed: number;
  errors: string[];
  lastImport: string | null;
}

const Grade1ImportSystem = () => {
  const { toast } = useToast();
  const [importStatus, setImportStatus] = useState<ImportStatus>({
    isRunning: false,
    progress: 0,
    total: 0,
    processed: 0,
    errors: [],
    lastImport: localStorage.getItem('grade1-lastImport')
  });
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);

  // Check if we're in Grade 1 import season (July-August)
  const isImportSeason = () => {
    const now = new Date();
    const month = now.getMonth() + 1; // JavaScript months are 0-indexed
    return month === 7 || month === 8; // July or August
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImportFile(file);
    }
  };

  const simulateImport = async () => {
    setImportStatus(prev => ({ 
      ...prev, 
      isRunning: true, 
      progress: 0, 
      processed: 0, 
      total: 150,
      errors: [] 
    }));

    // Simulate import progress
    for (let i = 0; i <= 150; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setImportStatus(prev => ({
        ...prev,
        progress: (i / 150) * 100,
        processed: i
      }));
    }

    const now = new Date().toISOString();
    setImportStatus(prev => ({
      ...prev,
      isRunning: false,
      lastImport: now,
      progress: 100
    }));

    localStorage.setItem('grade1-lastImport', now);
    
    toast({
      title: "Import Completed",
      description: "Successfully imported 150 Grade 1 students from admissions system",
    });

    setShowImportDialog(false);
    setImportFile(null);
  };

  const handleStartImport = async () => {
    if (!importFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to import",
        variant: "destructive",
      });
      return;
    }

    await simulateImport();
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString('sv-SE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeasonBadge = () => {
    if (isImportSeason()) {
      return <Badge className="bg-ike-success text-white">Import Season Active</Badge>;
    }
    return <Badge className="bg-ike-neutral text-white">Outside Import Season</Badge>;
  };

  return (
    <Card className="border-l-4 border-l-ike-warning">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-ike-neutral-dark">
          <div className="flex items-center">
            <School className="w-5 h-5 mr-2 text-ike-warning" />
            Grade 1 Student Import (July-August)
          </div>
          {getSeasonBadge()}
        </CardTitle>
        <CardDescription>
          Import new Grade 1 students from the municipal admissions system during enrollment period
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium text-ike-neutral-dark mb-1">Last Import</p>
            <p className="text-ike-neutral flex items-center">
              <Calendar className="w-4 h-4 mr-1 text-ike-primary" />
              {formatDateTime(importStatus.lastImport)}
            </p>
            {importStatus.lastImport && (
              <p className="text-xs text-ike-neutral mt-1">
                {importStatus.processed} students imported
              </p>
            )}
          </div>
          <div>
            <p className="font-medium text-ike-neutral-dark mb-1">Import Status</p>
            <p className="text-ike-neutral flex items-center">
              {importStatus.isRunning ? (
                <>
                  <Clock className="w-4 h-4 mr-1 text-ike-warning" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-1 text-ike-success" />
                  Ready
                </>
              )}
            </p>
            {importStatus.isRunning && (
              <p className="text-xs text-ike-neutral mt-1">
                {importStatus.processed} of {importStatus.total} processed
              </p>
            )}
          </div>
          <div>
            <p className="font-medium text-ike-neutral-dark mb-1">Import Action</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowImportDialog(true)}
              disabled={importStatus.isRunning}
              className="border-ike-warning text-ike-warning hover:bg-ike-warning/10"
            >
              {importStatus.isRunning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-ike-warning mr-2"></div>
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-1" />
                  Start Import
                </>
              )}
            </Button>
          </div>
        </div>

        {importStatus.isRunning && (
          <div className="bg-ike-warning/10 border border-ike-warning/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-ike-warning">
                Importing Grade 1 Students
              </span>
              <span className="text-sm text-ike-warning">
                {Math.round(importStatus.progress)}%
              </span>
            </div>
            <Progress value={importStatus.progress} className="h-2" />
            <p className="text-xs text-ike-neutral mt-2">
              Processing student data from admissions system...
            </p>
          </div>
        )}

        {!isImportSeason() && (
          <div className="bg-ike-neutral-light border border-ike-neutral/20 rounded-lg p-3">
            <div className="flex items-center text-ike-neutral mb-2">
              <AlertTriangle className="w-4 h-4 mr-2" />
              <span className="font-medium">Outside Import Season</span>
            </div>
            <p className="text-sm text-ike-neutral">
              Grade 1 student imports are typically performed during July and August. 
              Contact system administrators for off-season imports.
            </p>
          </div>
        )}
        
        <div className="bg-ike-neutral-light p-3 rounded-lg">
          <h4 className="font-medium text-ike-neutral-dark mb-2">Import Process</h4>
          <ul className="text-sm text-ike-neutral space-y-1">
            <li>• Connects to municipal admissions system</li>
            <li>• Validates student enrollment data</li>
            <li>• Assigns school units based on addresses</li>
            <li>• Generates initial travel card eligibility</li>
          </ul>
        </div>
      </CardContent>

      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Upload className="w-5 h-5 mr-2 text-ike-warning" />
              Import Grade 1 Students
            </DialogTitle>
            <DialogDescription>
              Import new Grade 1 students from the municipal admissions system
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-ike-primary/20 rounded-lg p-6 text-center">
              <FileSpreadsheet className="w-12 h-12 mx-auto text-ike-primary mb-4" />
              <h3 className="text-lg font-medium text-ike-neutral-dark mb-2">
                Select Import File
              </h3>
              <p className="text-sm text-ike-neutral mb-4">
                Upload the student data file from the admissions system (Excel format)
              </p>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileSelect}
                className="hidden"
                id="import-file"
              />
              <label htmlFor="import-file">
                <Button variant="outline" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </label>
              {importFile && (
                <p className="text-sm text-ike-success mt-2">
                  Selected: {importFile.name}
                </p>
              )}
            </div>

            <div className="bg-ike-warning/10 p-4 rounded-lg">
              <h4 className="font-medium text-ike-warning mb-2">Import Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-ike-neutral">Expected Students:</span>
                  <span className="font-medium text-ike-neutral-dark ml-2">~150</span>
                </div>
                <div>
                  <span className="text-ike-neutral">Process Time:</span>
                  <span className="font-medium text-ike-neutral-dark ml-2">2-3 minutes</span>
                </div>
                <div>
                  <span className="text-ike-neutral">File Format:</span>
                  <span className="font-medium text-ike-neutral-dark ml-2">Excel (.xlsx)</span>
                </div>
                <div>
                  <span className="text-ike-neutral">Source System:</span>
                  <span className="font-medium text-ike-neutral-dark ml-2">Admissions</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportDialog(false)}>
              Cancel
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  className="bg-ike-warning hover:bg-ike-warning/90 text-white"
                  disabled={!importFile}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Start Import
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Grade 1 Import</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will import approximately 150 new Grade 1 students from the admissions system. 
                    The process cannot be undone. Are you sure you want to continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleStartImport}
                    className="bg-ike-warning hover:bg-ike-warning/90 text-white"
                  >
                    Yes, Start Import
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Grade1ImportSystem;
