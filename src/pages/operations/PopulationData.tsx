import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, Download, Upload, BarChart3, RefreshCw, FileText, Database, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PopulationData() {
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [syncDialogOpen, setSyncDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [exportFormat, setExportFormat] = useState("excel");
  const [reportType, setReportType] = useState("summary");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImportData = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to import.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate import process
    setTimeout(() => {
      setIsLoading(false);
      setImportDialogOpen(false);
      setSelectedFile(null);
      toast({
        title: "Import completed",
        description: "Population data has been successfully imported.",
      });
    }, 2000);
  };

  const handleSyncRegistry = async () => {
    setIsLoading(true);
    setSyncDialogOpen(false);
    
    // Simulate sync process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registry sync completed",
        description: "Population registry has been synchronized successfully.",
      });
    }, 3000);
  };

  const handleExportReport = async () => {
    setIsLoading(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      setExportDialogOpen(false);
      toast({
        title: "Export completed",
        description: `Population report exported as ${exportFormat.toUpperCase()} file.`,
      });
    }, 1500);
  };

  const handleGenerateReport = async () => {
    setIsLoading(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsLoading(false);
      setReportDialogOpen(false);
      toast({
        title: "Report generated",
        description: `${reportType} report has been generated successfully.`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Population Data</h1>
          <p className="text-ike-neutral mt-2">
            Manage and analyze regional population statistics
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import Data
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Import Population Data</DialogTitle>
                <DialogDescription>
                  Upload a CSV or Excel file containing population data to import into the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    File
                  </Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    className="col-span-3"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                </div>
                {selectedFile && (
                  <div className="flex items-center gap-2 text-sm text-ike-neutral">
                    <FileText className="w-4 h-4" />
                    <span>{selectedFile.name}</span>
                    <Badge variant="outline">{(selectedFile.size / 1024).toFixed(1)} KB</Badge>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleImportData} disabled={!selectedFile || isLoading}>
                  {isLoading ? "Importing..." : "Import Data"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog open={syncDialogOpen} onOpenChange={setSyncDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Registry
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sync Population Registry</AlertDialogTitle>
                <AlertDialogDescription>
                  This will synchronize the local population data with the national registry. 
                  This process may take several minutes and will update existing records.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSyncRegistry}>
                  Start Sync
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Export Population Report</DialogTitle>
                <DialogDescription>
                  Generate and download a comprehensive population report in your preferred format.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="format" className="text-right">
                    Format
                  </Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="csv">CSV (.csv)</SelectItem>
                      <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date-range" className="text-right">
                    Date Range
                  </Label>
                  <Select defaultValue="current-year">
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-year">Current Year</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                      <SelectItem value="all-time">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleExportReport} disabled={isLoading}>
                  {isLoading ? "Exporting..." : "Export Report"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Show loading indicator when syncing */}
      {isLoading && (
        <Card className="border-ike-primary">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <RefreshCw className="w-6 h-6 animate-spin text-ike-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Processing...</p>
                <Progress value={45} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Population</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">1,250,430</div>
            <p className="text-xs text-ike-neutral">+2.5% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-ike-neutral">School Age (6-18)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">156,742</div>
            <p className="text-xs text-ike-neutral">12.5% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-ike-neutral">Municipalities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">42</div>
            <p className="text-xs text-ike-neutral">Active regions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-ike-neutral">Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">Dec 10</div>
            <p className="text-xs text-ike-neutral">Registry sync</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-primary">
              <Users className="w-5 h-5 mr-2" />
              Data Filters
            </CardTitle>
            <CardDescription>
              Filter population data by various criteria
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Age Range</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All ages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="0-5">0-5 years</SelectItem>
                    <SelectItem value="6-12">6-12 years</SelectItem>
                    <SelectItem value="13-18">13-18 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Municipality</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All municipalities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Municipalities</SelectItem>
                    <SelectItem value="athens">Athens</SelectItem>
                    <SelectItem value="thessaloniki">Thessaloniki</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Generate Population Report</DialogTitle>
                  <DialogDescription>
                    Create a detailed report based on your selected filters and criteria.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="report-type" className="text-right">
                      Report Type
                    </Label>
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">Summary Report</SelectItem>
                        <SelectItem value="detailed">Detailed Analysis</SelectItem>
                        <SelectItem value="trends">Trend Analysis</SelectItem>
                        <SelectItem value="demographics">Demographics Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="include-charts" className="text-right">
                      Include Charts
                    </Label>
                    <Select defaultValue="yes">
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes, include charts</SelectItem>
                        <SelectItem value="no">No, data only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleGenerateReport} disabled={isLoading}>
                    {isLoading ? "Generating..." : "Generate Report"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Population Trends</CardTitle>
            <CardDescription>
              Regional population growth patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-ike-neutral">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Population trend charts will be displayed here</p>
              <p className="text-sm">Select filters to view detailed analytics</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
