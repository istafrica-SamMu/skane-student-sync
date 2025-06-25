import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Filter, 
  Save, 
  Download, 
  Map, 
  Calendar,
  School,
  ArrowUpDown,
  ChevronDown,
  Eye,
  FileDown,
  History,
  MapPin,
  Search,
  Settings,
  Database,
  Trash2,
  Edit,
  Check,
  X
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ComposedChart, Area, AreaChart } from 'recharts';

// Enhanced sample data for IKE requirements
const quickStatsData = [
  { title: "Total Students", value: "12,847", change: "+2.4%", icon: Users, trend: "up" },
  { title: "Active School Units", value: "156", change: "-1.2%", icon: School, trend: "down" },
  { title: "Monthly Compensation", value: "€2.4M", change: "+5.7%", icon: DollarSign, trend: "up" },
  { title: "Educational Path Changes", value: "324", change: "+12.3%", icon: ArrowUpDown, trend: "up" },
  { title: "Payment Streams", value: "1,247", change: "+8.1%", icon: TrendingUp, trend: "up" },
  { title: "Historical Reconciliations", value: "89", change: "0%", icon: History, trend: "neutral" },
];

const chartData = [
  { name: 'Jan', students: 4000, compensation: 2400, transfers: 240, paymentStreams: 180 },
  { name: 'Feb', students: 3000, compensation: 1398, transfers: 221, paymentStreams: 165 },
  { name: 'Mar', students: 2000, compensation: 9800, transfers: 229, paymentStreams: 190 },
  { name: 'Apr', students: 2780, compensation: 3908, transfers: 200, paymentStreams: 175 },
  { name: 'May', students: 1890, compensation: 4800, transfers: 218, paymentStreams: 185 },
  { name: 'Jun', students: 2390, compensation: 3800, transfers: 250, paymentStreams: 195 },
];

const educationalPathData = [
  { name: 'Gymnasieskola', value: 45, color: '#8884d8', students: 5800 },
  { name: 'Komvux', value: 25, color: '#82ca9d', students: 3200 },
  { name: 'Yrkeshögskola', value: 20, color: '#ffc658', students: 2570 },
  { name: 'Special Education', value: 10, color: '#ff7c7c', students: 1277 },
];

const regionalData = [
  { region: 'Malmö', students: 3250, schoolUnits: 45, compensation: 850000 },
  { region: 'Lund', students: 2100, schoolUnits: 28, compensation: 620000 },
  { region: 'Helsingborg', students: 2850, schoolUnits: 38, compensation: 790000 },
  { region: 'Kristianstad', students: 1890, schoolUnits: 25, compensation: 520000 },
  { region: 'Landskrona', students: 1456, schoolUnits: 18, compensation: 380000 },
  { region: 'Trelleborg', students: 1301, schoolUnits: 15, compensation: 340000 },
];

const reconciliationHistory = [
  { date: '2024-06-01', type: 'Monthly', status: 'Completed', records: 12847 },
  { date: '2024-05-01', type: 'Monthly', status: 'Completed', records: 12623 },
  { date: '2024-04-01', type: 'Monthly', status: 'Completed', records: 12445 },
  { date: '2024-03-01', type: 'Quarterly', status: 'Completed', records: 12234 },
];

export default function StatisticsDashboard() {
  const { toast } = useToast();
  const [filterOpen, setFilterOpen] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [currentView, setCurrentView] = useState('current');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [savedViews, setSavedViews] = useState(['Monthly IKE Report', 'Payment Stream Analysis', 'Regional Comparison', 'Educational Path Trends']);
  const [newViewName, setNewViewName] = useState('');
  const [selectedReconciliation, setSelectedReconciliation] = useState('');
  const [showHistoricalData, setShowHistoricalData] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [saveViewOpen, setSaveViewOpen] = useState(false);
  const [customExportOpen, setCustomExportOpen] = useState(false);
  const [deleteViewOpen, setDeleteViewOpen] = useState(false);
  const [viewToDelete, setViewToDelete] = useState('');
  
  // New states for Quick Analysis Tools
  const [trendAnalysisOpen, setTrendAnalysisOpen] = useState(false);
  const [regionalBreakdownOpen, setRegionalBreakdownOpen] = useState(false);
  const [reconciliationHistoryOpen, setReconciliationHistoryOpen] = useState(false);
  const [transferAnalysisOpen, setTransferAnalysisOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  const [selectedFilters, setSelectedFilters] = useState({
    timePeriod: '',
    educationalPath: '',
    schoolUnit: '',
    paymentStream: '',
    region: 'all',
    reconciliationDate: ''
  });
  const [customExportSettings, setCustomExportSettings] = useState({
    studentEnrollment: true,
    educationPaths: false,
    pathChanges: false,
    schoolUnits: false,
    paymentStreams: true,
    geographical: false,
    format: 'xlsx'
  });

  const handleSaveView = () => {
    if (newViewName.trim()) {
      setSavedViews([...savedViews, newViewName.trim()]);
      setNewViewName('');
      setSaveViewOpen(false);
      toast({
        title: "View Saved",
        description: `Analysis view "${newViewName.trim()}" has been saved successfully.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid view name.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteView = (viewName: string) => {
    setViewToDelete(viewName);
    setDeleteViewOpen(true);
  };

  const confirmDeleteView = () => {
    setSavedViews(savedViews.filter(view => view !== viewToDelete));
    setDeleteViewOpen(false);
    setViewToDelete('');
    toast({
      title: "View Deleted",
      description: `Analysis view "${viewToDelete}" has been deleted.`,
    });
  };

  const handleLoadView = (viewName: string) => {
    toast({
      title: "View Loaded",
      description: `Analysis view "${viewName}" has been loaded successfully.`,
    });
    console.log(`Loading saved view: ${viewName}`);
  };

  const handleExport = async (format: string) => {
    setIsExporting(true);
    setExportProgress(0);
    
    // Simulate export progress
    const progressInterval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsExporting(false);
          toast({
            title: "Export Complete",
            description: `${format} exported as editable Excel file successfully!`,
          });
          return 100;
        }
        return prev + 20;
      });
    }, 500);

    console.log(`Exporting ${format} in Excel format...`);
  };

  const handleCustomExport = async () => {
    const selectedFields = Object.entries(customExportSettings)
      .filter(([key, value]) => value && key !== 'format')
      .map(([key]) => key);

    if (selectedFields.length === 0) {
      toast({
        title: "No Data Selected",
        description: "Please select at least one data field to export.",
        variant: "destructive",
      });
      return;
    }

    setCustomExportOpen(false);
    await handleExport('Custom IKE Data');
  };

  const handleReconciliationSelect = (reconciliationDate: string) => {
    setSelectedReconciliation(reconciliationDate);
    setShowHistoricalData(true);
    toast({
      title: "Historical Data Loaded",
      description: `Data for reconciliation ${reconciliationDate} has been loaded.`,
    });
    console.log(`Loading data for reconciliation: ${reconciliationDate}`);
  };

  const applyFilters = () => {
    const activeFilters = Object.entries(selectedFilters)
      .filter(([key, value]) => value && value !== 'all' && value !== '')
      .length;

    toast({
      title: "Filters Applied",
      description: `${activeFilters} filter(s) have been applied to the analysis.`,
    });
    
    console.log('Applied filters:', selectedFilters);
    setFilterOpen(false);
  };

  const resetFilters = () => {
    setSelectedFilters({
      timePeriod: '',
      educationalPath: '',
      schoolUnit: '',
      paymentStream: '',
      region: 'all',
      reconciliationDate: ''
    });
    
    toast({
      title: "Filters Reset",
      description: "All filters have been reset to default values.",
    });
  };

  const toggleMapView = () => {
    setMapView(!mapView);
    toast({
      title: mapView ? "Chart View Activated" : "Map View Activated",
      description: mapView ? "Switched to statistical chart view." : "Switched to geographical map view.",
    });
  };

  const handleTrendAnalysis = async () => {
    setTrendAnalysisOpen(false);
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          setCurrentView('comparison');
          toast({
            title: "Trend Analysis Complete",
            description: "Historical trend analysis has been generated and applied to the dashboard.",
          });
          return 100;
        }
        return prev + 25;
      });
    }, 800);

    console.log('Running trend analysis...');
  };

  const handleRegionalBreakdown = async () => {
    setRegionalBreakdownOpen(false);
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          setCurrentView('regional');
          toast({
            title: "Regional Analysis Complete",
            description: "Regional breakdown analysis has been generated and applied to the dashboard.",
          });
          return 100;
        }
        return prev + 20;
      });
    }, 600);

    console.log('Running regional breakdown analysis...');
  };

  const handleReconciliationHistory = async () => {
    setReconciliationHistoryOpen(false);
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          setShowHistoricalData(true);
          toast({
            title: "Reconciliation History Analysis Complete",
            description: "Historical reconciliation data has been loaded and is ready for comparison.",
          });
          return 100;
        }
        return prev + 30;
      });
    }, 700);

    console.log('Loading reconciliation history analysis...');
  };

  const handleTransferAnalysis = async () => {
    setTransferAnalysisOpen(false);
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          // Apply transfer-specific filters
          setSelectedFilters(prev => ({
            ...prev,
            educationalPath: 'changes',
            schoolUnit: 'transfers'
          }));
          toast({
            title: "Transfer Analysis Complete",
            description: "Student transfer and path change analysis has been applied to the dashboard.",
          });
          return 100;
        }
        return prev + 15;
      });
    }, 500);

    console.log('Running transfer analysis...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">IKE Statistics & Analysis Dashboard</h1>
          <p className="text-ike-neutral">Comprehensive analysis and reporting for Skåne IKE collaboration area</p>
        </div>
        
        {/* Enhanced Controls */}
        <div className="flex items-center space-x-4">
          <Select value={selectedReconciliation} onValueChange={handleReconciliationSelect}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Select Historical Reconciliation" />
            </SelectTrigger>
            <SelectContent>
              {reconciliationHistory.map((reconciliation, index) => (
                <SelectItem key={index} value={reconciliation.date}>
                  {reconciliation.date} - {reconciliation.type} ({reconciliation.records} records)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select onValueChange={handleLoadView}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Load Saved View" />
            </SelectTrigger>
            <SelectContent>
              {savedViews.map((view, index) => (
                <SelectItem key={index} value={view}>
                  <div className="flex items-center justify-between w-full">
                    <span>{view}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteView(view);
                      }}
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </Button>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog open={saveViewOpen} onOpenChange={setSaveViewOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Analysis View
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Current Analysis Configuration</DialogTitle>
                <DialogDescription>
                  Save your current filter settings, view configuration, and chart selections for future use.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="viewName">View Name</Label>
                  <Input
                    id="viewName"
                    value={newViewName}
                    onChange={(e) => setNewViewName(e.target.value)}
                    placeholder="Enter analysis view name..."
                    className="mt-1"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveView} className="flex-1">
                    <Check className="w-4 h-4 mr-2" />
                    Save View
                  </Button>
                  <Button variant="outline" onClick={() => setSaveViewOpen(false)} className="flex-1">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant={mapView ? "default" : "outline"}
            onClick={toggleMapView}
          >
            <Map className="w-4 h-4 mr-2" />
            {mapView ? 'Chart View' : 'Geographical Analysis'}
          </Button>
        </div>
      </div>

      {/* Export Progress Modal */}
      {isExporting && (
        <Dialog open={isExporting} onOpenChange={() => {}}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Exporting Data</DialogTitle>
              <DialogDescription>
                Please wait while we prepare your Excel export file...
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-ike-primary h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-center text-ike-neutral">{exportProgress}% Complete</p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete View Confirmation Modal */}
      <Dialog open={deleteViewOpen} onOpenChange={setDeleteViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Saved View</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the view "{viewToDelete}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex space-x-2">
            <Button variant="destructive" onClick={confirmDeleteView} className="flex-1">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete View
            </Button>
            <Button variant="outline" onClick={() => setDeleteViewOpen(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Analysis Progress Modal */}
      {isAnalyzing && (
        <Dialog open={isAnalyzing} onOpenChange={() => {}}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Running Analysis</DialogTitle>
              <DialogDescription>
                Please wait while we process your analysis request...
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-ike-primary h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${analysisProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-center text-ike-neutral">{analysisProgress}% Complete</p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Trend Analysis Modal */}
      <Dialog open={trendAnalysisOpen} onOpenChange={setTrendAnalysisOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>IKE Trend Analysis</DialogTitle>
            <DialogDescription>
              Analyze historical trends across student enrollment, educational paths, and payment streams.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Analysis Period</Label>
                <Select defaultValue="6months">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                    <SelectItem value="2years">Last 2 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Focus Area</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    <SelectItem value="enrollment">Student Enrollment</SelectItem>
                    <SelectItem value="pathchanges">Educational Path Changes</SelectItem>
                    <SelectItem value="payments">Payment Streams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleTrendAnalysis} className="flex-1">
                <TrendingUp className="w-4 h-4 mr-2" />
                Run Trend Analysis
              </Button>
              <Button variant="outline" onClick={() => setTrendAnalysisOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Regional Breakdown Modal */}
      <Dialog open={regionalBreakdownOpen} onOpenChange={setRegionalBreakdownOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Regional Breakdown Analysis</DialogTitle>
            <DialogDescription>
              Generate detailed statistics for Skåne regions and municipalities.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Regional Scope</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Entire Skåne Collaboration Area</SelectItem>
                  <SelectItem value="north">North Skåne Region</SelectItem>
                  <SelectItem value="south">South Skåne Region</SelectItem>
                  <SelectItem value="municipalities">By Municipality</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Analysis Metrics</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="students" defaultChecked />
                  <Label htmlFor="students" className="text-sm">Student Distribution</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="schoolunits" defaultChecked />
                  <Label htmlFor="schoolunits" className="text-sm">School Units</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="compensation" defaultChecked />
                  <Label htmlFor="compensation" className="text-sm">Compensation Flows</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="transfers" />
                  <Label htmlFor="transfers" className="text-sm">Transfer Patterns</Label>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleRegionalBreakdown} className="flex-1">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Regional Analysis
              </Button>
              <Button variant="outline" onClick={() => setRegionalBreakdownOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reconciliation History Modal */}
      <Dialog open={reconciliationHistoryOpen} onOpenChange={setReconciliationHistoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reconciliation History Analysis</DialogTitle>
            <DialogDescription>
              Compare current data with previous reconciliation periods for trend analysis.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Comparison Periods</Label>
              <div className="space-y-2 mt-2">
                {reconciliationHistory.slice(0, 3).map((reconciliation, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox id={`reconciliation-${index}`} defaultChecked={index < 2} />
                    <Label htmlFor={`reconciliation-${index}`} className="text-sm">
                      {reconciliation.date} - {reconciliation.type} ({reconciliation.records} records)
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Analysis Focus</Label>
              <Select defaultValue="variance">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="variance">Period-to-Period Variance</SelectItem>
                  <SelectItem value="trends">Long-term Trends</SelectItem>
                  <SelectItem value="anomalies">Anomaly Detection</SelectItem>
                  <SelectItem value="growth">Growth Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleReconciliationHistory} className="flex-1">
                <History className="w-4 h-4 mr-2" />
                Run Historical Comparison
              </Button>
              <Button variant="outline" onClick={() => setReconciliationHistoryOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transfer Analysis Modal */}
      <Dialog open={transferAnalysisOpen} onOpenChange={setTransferAnalysisOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Student Transfer Analysis</DialogTitle>
            <DialogDescription>
              Analyze educational path changes and school unit transfers within the IKE system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Transfer Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transfers</SelectItem>
                    <SelectItem value="pathchange">Educational Path Changes</SelectItem>
                    <SelectItem value="schoolunit">School Unit Changes</SelectItem>
                    <SelectItem value="municipal">Municipal Transfers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Time Frame</Label>
                <Select defaultValue="currentyear">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="currentmonth">Current Month</SelectItem>
                    <SelectItem value="currentyear">Current School Year</SelectItem>
                    <SelectItem value="lastyear">Previous School Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Analysis Dimensions</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="frequency" defaultChecked />
                  <Label htmlFor="frequency" className="text-sm">Transfer Frequency</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="patterns" defaultChecked />
                  <Label htmlFor="patterns" className="text-sm">Transfer Patterns</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="impact" />
                  <Label htmlFor="impact" className="text-sm">Financial Impact</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="reasons" />
                  <Label htmlFor="reasons" className="text-sm">Transfer Reasons</Label>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleTransferAnalysis} className="flex-1">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Analyze Transfers
              </Button>
              <Button variant="outline" onClick={() => setTransferAnalysisOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex space-x-6">
        {/* Enhanced Filter Panel */}
        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="mb-4">
              <Filter className="w-4 h-4 mr-2" />
              IKE Analysis Filters
              {Object.values(selectedFilters).filter(value => value && value !== 'all').length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {Object.values(selectedFilters).filter(value => value && value !== 'all').length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-96">
            <SheetHeader>
              <SheetTitle>IKE System Analysis Filters</SheetTitle>
              <SheetDescription>
                Filter all registered and integrated data from Skåne IKE system
              </SheetDescription>
            </SheetHeader>
            
            <div className="space-y-6 mt-6">
              {/* Regional Selection */}
              <div>
                <Label className="text-sm font-medium">Collaboration Area / Sub-regions</Label>
                <Select value={selectedFilters.region} onValueChange={(value) => setSelectedFilters({...selectedFilters, region: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Entire Skåne Collaboration Area</SelectItem>
                    <SelectItem value="malmoe">Malmö Region</SelectItem>
                    <SelectItem value="lund">Lund Region</SelectItem>
                    <SelectItem value="helsingborg">Helsingborg Region</SelectItem>
                    <SelectItem value="kristianstad">Kristianstad Region</SelectItem>
                    <SelectItem value="north">North Skåne</SelectItem>
                    <SelectItem value="south">South Skåne</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Historical Reconciliation Data</Label>
                <Select value={selectedFilters.reconciliationDate} onValueChange={(value) => setSelectedFilters({...selectedFilters, reconciliationDate: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reconciliation period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Period</SelectItem>
                    {reconciliationHistory.map((reconciliation, index) => (
                      <SelectItem key={index} value={reconciliation.date}>
                        {reconciliation.date} - {reconciliation.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Educational Path Changes</Label>
                <Select value={selectedFilters.educationalPath} onValueChange={(value) => setSelectedFilters({...selectedFilters, educationalPath: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by educational path" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Educational Paths</SelectItem>
                    <SelectItem value="gymnasieskola">Gymnasieskola</SelectItem>
                    <SelectItem value="komvux">Komvux</SelectItem>
                    <SelectItem value="yrkeshogskola">Yrkeshögskola</SelectItem>
                    <SelectItem value="special">Special Education</SelectItem>
                    <SelectItem value="changes">Show Only Path Changes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">School Unit Changes</Label>
                <Select value={selectedFilters.schoolUnit} onValueChange={(value) => setSelectedFilters({...selectedFilters, schoolUnit: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by school unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All School Units</SelectItem>
                    <SelectItem value="municipal">Municipal School Units</SelectItem>
                    <SelectItem value="private">Private School Units</SelectItem>
                    <SelectItem value="external">External School Units</SelectItem>
                    <SelectItem value="transfers">Show Only Unit Transfers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Payment Streams Analysis</Label>
                <Select value={selectedFilters.paymentStream} onValueChange={(value) => setSelectedFilters({...selectedFilters, paymentStream: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payment Streams</SelectItem>
                    <SelectItem value="grundskola">Grundskola Compensation</SelectItem>
                    <SelectItem value="gymnasium">Gymnasium Compensation</SelectItem>
                    <SelectItem value="special">Special Education</SelectItem>
                    <SelectItem value="municipal">Municipal Payments</SelectItem>
                    <SelectItem value="external">External Payments</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Time Period Analysis</Label>
                <Select value={selectedFilters.timePeriod} onValueChange={(value) => setSelectedFilters({...selectedFilters, timePeriod: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select analysis period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current-month">Current Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                    <SelectItem value="comparison">Historical Comparison</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-3">
                <Button onClick={applyFilters} className="w-full">
                  <Check className="w-4 h-4 mr-2" />
                  Apply IKE Filters
                </Button>
                <Button variant="outline" onClick={resetFilters} className="w-full">
                  <X className="w-4 h-4 mr-2" />
                  Reset All Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex-1">
          {/* Enhanced Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {quickStatsData.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-ike-neutral" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-ike-neutral'}`}>
                    {stat.change} from last reconciliation
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Analysis Mode Toggle */}
          <Tabs value={currentView} onValueChange={setCurrentView} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="current">Current Data</TabsTrigger>
              <TabsTrigger value="comparison">Historical Comparison</TabsTrigger>
              <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Main Analysis Area or Geographical Map View */}
          {mapView ? (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Geographical Analysis - Skåne IKE System</CardTitle>
                <CardDescription>Interactive map showing student residences and school unit locations across Skåne</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-ike-neutral-light rounded-lg flex flex-col items-center justify-center">
                  <div className="text-center">
                    <Map className="w-16 h-16 text-ike-neutral mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Interactive Skåne Map</h3>
                    <p className="text-ike-neutral mb-2">Geographical analysis of student placement and school locations</p>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      <Badge variant="outline">Student Residences</Badge>
                      <Badge variant="outline">School Unit Locations</Badge>
                      <Badge variant="outline">Payment Flow Visualization</Badge>
                    </div>
                    <p className="text-sm text-ike-neutral-dark">
                      Click regions to drill down: Skåne → Municipality → School Unit → Student Data
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {currentView === 'current' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>IKE System Trends</CardTitle>
                      <CardDescription>Student enrollment, compensation, and transfer trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="students" fill="#8884d8" name="Students" />
                          <Line type="monotone" dataKey="transfers" stroke="#82ca9d" strokeWidth={2} name="Transfers" />
                          <Line type="monotone" dataKey="paymentStreams" stroke="#ffc658" strokeWidth={2} name="Payment Streams" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Educational Path Distribution</CardTitle>
                      <CardDescription>Student distribution across educational paths in Skåne</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={educationalPathData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={(entry) => `${entry.name}: ${entry.value}%`}
                          >
                            {educationalPathData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name) => [
                            `${value}% (${educationalPathData.find(d => d.name === name)?.students || 0} students)`,
                            name
                          ]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              )}

              {currentView === 'comparison' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Historical Data Comparison</CardTitle>
                    <CardDescription>Compare current period with previous reconciliation data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="students" stackId="1" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="transfers" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                        <Area type="monotone" dataKey="paymentStreams" stackId="1" stroke="#ffc658" fill="#ffc658" />
                      </AreaChart>
                    </CardContent>
                  </Card>
                </Card>
              )}

              {currentView === 'regional' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Regional Analysis - Skåne Municipalities</CardTitle>
                    <CardDescription>Breakdown by sub-regions within the Skåne collaboration area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {regionalData.map((region, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center space-x-4">
                            <MapPin className="w-5 h-5 text-ike-primary" />
                            <div>
                              <h4 className="font-semibold">{region.region}</h4>
                              <p className="text-sm text-ike-neutral">{region.schoolUnits} school units</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{region.students.toLocaleString()} students</p>
                            <p className="text-sm text-ike-neutral">€{region.compensation.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Export Center */}
        <div className="w-72 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">IKE Export Center</CardTitle>
              <CardDescription>Export statistical reports in editable Excel format</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleExport('IKE Monthly Statistical Report')}
                disabled={isExporting}
              >
                <FileDown className="w-4 h-4 mr-2" />
                Monthly IKE Report
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleExport('Educational Path Analysis')}
                disabled={isExporting}
              >
                <FileDown className="w-4 h-4 mr-2" />
                Educational Path Analysis
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleExport('Payment Stream Analysis')}
                disabled={isExporting}
              >
                <FileDown className="w-4 h-4 mr-2" />
                Payment Stream Analysis
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleExport('Regional Comparison Report')}
                disabled={isExporting}
              >
                <FileDown className="w-4 h-4 mr-2" />
                Regional Comparison
              </Button>
              
              <Dialog open={customExportOpen} onOpenChange={setCustomExportOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start" disabled={isExporting}>
                    <Download className="w-4 h-4 mr-2" />
                    Custom IKE Export
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Custom IKE Data Export</DialogTitle>
                    <DialogDescription>
                      Select specific data fields from the IKE system for export to editable Excel format.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="font-medium">Student Data</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="student-enrollment" 
                              checked={customExportSettings.studentEnrollment}
                              onCheckedChange={(checked) => setCustomExportSettings(prev => ({...prev, studentEnrollment: checked as boolean}))}
                            />
                            <Label htmlFor="student-enrollment" className="text-sm">Student Enrollment</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="education-paths" 
                              checked={customExportSettings.educationPaths}
                              onCheckedChange={(checked) => setCustomExportSettings(prev => ({...prev, educationPaths: checked as boolean}))}
                            />
                            <Label htmlFor="education-paths" className="text-sm">Educational Paths</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="path-changes" 
                              checked={customExportSettings.pathChanges}
                              onCheckedChange={(checked) => setCustomExportSettings(prev => ({...prev, pathChanges: checked as boolean}))}
                            />
                            <Label htmlFor="path-changes" className="text-sm">Path Changes</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label className="font-medium">System Data</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="school-units" 
                              checked={customExportSettings.schoolUnits}
                              onCheckedChange={(checked) => setCustomExportSettings(prev => ({...prev, schoolUnits: checked as boolean}))}
                            />
                            <Label htmlFor="school-units" className="text-sm">School Units</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="payment-streams" 
                              checked={customExportSettings.paymentStreams}
                              onCheckedChange={(checked) => setCustomExportSettings(prev => ({...prev, paymentStreams: checked as boolean}))}
                            />
                            <Label htmlFor="payment-streams" className="text-sm">Payment Streams</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="geographical" 
                              checked={customExportSettings.geographical}
                              onCheckedChange={(checked) => setCustomExportSettings(prev => ({...prev, geographical: checked as boolean}))}
                            />
                            <Label htmlFor="geographical" className="text-sm">Geographical Data</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Select 
                      value={customExportSettings.format} 
                      onValueChange={(value) => setCustomExportSettings(prev => ({...prev, format: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Export Format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xlsx">Excel (.xlsx) - Editable</SelectItem>
                        <SelectItem value="csv">CSV - Data Only</SelectItem>
                        <SelectItem value="pdf">PDF Report - Formatted</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex space-x-2">
                      <Button onClick={handleCustomExport} className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Export IKE Data
                      </Button>
                      <Button variant="outline" onClick={() => setCustomExportOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Analysis Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setTrendAnalysisOpen(true)}
                disabled={isAnalyzing}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Trend Analysis
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setRegionalBreakdownOpen(true)}
                disabled={isAnalyzing}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Regional Breakdown
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setReconciliationHistoryOpen(true)}
                disabled={isAnalyzing}
              >
                <History className="w-4 h-4 mr-2" />
                Reconciliation History
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setTransferAnalysisOpen(true)}
                disabled={isAnalyzing}
              >
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Transfer Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
