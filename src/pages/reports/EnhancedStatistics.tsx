import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Download,
  Save,
  Filter,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  ArrowUpDown,
  RefreshCw,
  Settings,
  Eye,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  FileText,
  MoreVertical
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { AccessManagement } from "@/components/reports/AccessManagement";

const EnhancedStatistics = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  // State management
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'current' | 'historical'>('current');
  const [showSaveView, setShowSaveView] = useState(false);
  const [showLoadView, setShowLoadView] = useState(false);
  const [showAccessManagement, setShowAccessManagement] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [comparePeriod, setComparePeriod] = useState('last-month');
  
  // Filters state
  const [filters, setFilters] = useState({
    educationalPathChanges: '',
    schoolUnitChanges: '',
    paymentStreams: '',
    municipality: '',
    timeRange: { from: '', to: '' }
  });

  // Saved views
  const [savedViews, setSavedViews] = useState([
    { id: 1, name: "Monthly Report", description: "Standard monthly statistics" },
    { id: 2, name: "Regional Overview", description: "All municipalities comparison" },
    { id: 3, name: "Payment Analysis", description: "Focus on compensation flows" }
  ]);

  const [newViewName, setNewViewName] = useState("");
  const [newViewDescription, setNewViewDescription] = useState("");

  // Sample data
  const keyMetrics = [
    { title: "Total Students", value: "2,847", change: "+5.2%", trend: "up" },
    { title: "Educational Path Changes", value: "127", change: "-8.1%", trend: "down" },
    { title: "School Unit Transfers", value: "89", change: "+12.3%", trend: "up" },
    { title: "Payment Streams Active", value: "156", change: "+2.4%", trend: "up" }
  ];

  const regionalData = [
    { municipality: "Malmö", students: 950, transfers: 45, compensation: 2400000 },
    { municipality: "Lund", students: 750, transfers: 32, compensation: 1850000 },
    { municipality: "Helsingborg", students: 620, transfers: 28, compensation: 1520000 },
    { municipality: "Kristianstad", students: 410, transfers: 18, compensation: 980000 },
    { municipality: "Landskrona", students: 117, transfers: 8, compensation: 340000 }
  ];

  const exportTemplates = [
    { id: 'monthly', name: 'Monthly Statistical Report', format: 'Excel', icon: FileSpreadsheet },
    { id: 'regional', name: 'Regional Comparison Report', format: 'PDF', icon: FileText },
    { id: 'payment', name: 'Payment Analysis Report', format: 'Excel', icon: FileSpreadsheet },
    { id: 'custom', name: 'Custom Data Export', format: 'CSV', icon: FileText }
  ];

  // Functions
  const handleSaveView = () => {
    if (!newViewName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for the view.",
        variant: "destructive",
      });
      return;
    }

    const newView = {
      id: savedViews.length + 1,
      name: newViewName,
      description: newViewDescription || "Custom saved view"
    };

    setSavedViews([...savedViews, newView]);
    setNewViewName("");
    setNewViewDescription("");
    setShowSaveView(false);
    
    toast({
      title: "View Saved",
      description: `"${newViewName}" has been saved successfully.`,
    });
  };

  const handleLoadView = (view: any) => {
    toast({
      title: "View Loaded",
      description: `"${view.name}" configuration has been applied.`,
    });
    setShowLoadView(false);
  };

  const handleExport = (template: any) => {
    toast({
      title: "Export Started",
      description: `Generating ${template.name} in ${template.format} format...`,
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `${template.name} is ready for download.`,
      });
    }, 2000);
  };

  const resetFilters = () => {
    setFilters({
      educationalPathChanges: '',
      schoolUnitChanges: '',
      paymentStreams: '',
      municipality: '',
      timeRange: { from: '', to: '' }
    });
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Enhanced Statistics & Analytics</h1>
          <p className="text-ike-neutral mt-1">
            Comprehensive analysis with saved views, advanced filtering, and export capabilities
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowLoadView(true)}
            className="border-ike-primary text-ike-primary hover:bg-ike-primary/10"
          >
            <Eye className="w-4 h-4 mr-2" />
            Load View
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowSaveView(true)}
            className="border-ike-success text-ike-success hover:bg-ike-success/10"
          >
            <Save className="w-4 h-4 mr-2" />
            Save View
          </Button>
          <Button
            onClick={() => window.location.href = '/analysis/geographical'}
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Geographical View
          </Button>
        </div>
      </div>

      {/* View Mode Toggle */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Label className="text-sm font-medium">View Mode:</Label>
              <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                <TabsList>
                  <TabsTrigger value="current">Current Data</TabsTrigger>
                  <TabsTrigger value="historical">Historical Comparison</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex items-center space-x-4">
              {viewMode === 'historical' && (
                <>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-month">Current Month</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="current-quarter">Current Quarter</SelectItem>
                      <SelectItem value="last-quarter">Last Quarter</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-ike-neutral">vs</span>
                  <Select value={comparePeriod} onValueChange={setComparePeriod}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Compare with" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="last-quarter">Last Quarter</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-ike-primary/10 text-ike-primary" : ""}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <Card className="border-ike-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-ike-primary">
              <Filter className="w-5 h-5 mr-2" />
              IKE-Specific Filters
            </CardTitle>
            <CardDescription>
              Filter data by educational path changes, school transfers, and payment streams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="path-changes">Educational Path Changes</Label>
                <Select value={filters.educationalPathChanges} onValueChange={(value) => setFilters({...filters, educationalPathChanges: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="All path changes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Changes</SelectItem>
                    <SelectItem value="natural-to-social">Natural Sciences → Social Sciences</SelectItem>
                    <SelectItem value="tech-to-business">Technology → Business</SelectItem>
                    <SelectItem value="arts-to-other">Arts → Other Programs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="school-transfers">School Unit Changes</Label>
                <Select value={filters.schoolUnitChanges} onValueChange={(value) => setFilters({...filters, schoolUnitChanges: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="All transfers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transfers</SelectItem>
                    <SelectItem value="municipal-to-external">Municipal → External</SelectItem>
                    <SelectItem value="external-to-municipal">External → Municipal</SelectItem>
                    <SelectItem value="inter-municipal">Inter-Municipal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-streams">Payment Streams</Label>
                <Select value={filters.paymentStreams} onValueChange={(value) => setFilters({...filters, paymentStreams: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="All payments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Streams</SelectItem>
                    <SelectItem value="compensation">Inter-Municipal Compensation</SelectItem>
                    <SelectItem value="additional">Additional Amounts</SelectItem>
                    <SelectItem value="special-needs">Special Needs Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="municipality">Municipality</Label>
                <Select value={filters.municipality} onValueChange={(value) => setFilters({...filters, municipality: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="All municipalities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Municipalities</SelectItem>
                    <SelectItem value="malmo">Malmö</SelectItem>
                    <SelectItem value="lund">Lund</SelectItem>
                    <SelectItem value="helsingborg">Helsingborg</SelectItem>
                    <SelectItem value="kristianstad">Kristianstad</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="flex space-x-2">
                  <Input
                    type="date"
                    value={filters.timeRange.from}
                    onChange={(e) => setFilters({...filters, timeRange: {...filters.timeRange, from: e.target.value}})}
                    className="border-ike-primary/20"
                  />
                  <Input
                    type="date"
                    value={filters.timeRange.to}
                    onChange={(e) => setFilters({...filters, timeRange: {...filters.timeRange, to: e.target.value}})}
                    className="border-ike-primary/20"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <Button variant="outline" onClick={resetFilters} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="border-l-4 border-l-ike-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">{metric.value}</div>
              <div className={`text-xs mt-1 flex items-center ${
                metric.trend === 'up' ? 'text-ike-success' : 'text-ike-error'
              }`}>
                <TrendingUp className={`w-3 h-3 mr-1 ${
                  metric.trend === 'down' ? 'rotate-180' : ''
                }`} />
                {metric.change} from last period
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <TrendingUp className="w-5 h-5 mr-2 text-ike-primary" />
              Student Enrollment Trends
            </CardTitle>
            <CardDescription>
              {viewMode === 'historical' ? 'Comparison between selected periods' : 'Current period analysis'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded-lg">
              <div className="text-center text-ike-neutral">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
                <p>Interactive Trend Chart</p>
                <p className="text-sm">
                  {viewMode === 'historical' 
                    ? `Comparing ${selectedPeriod} vs ${comparePeriod}`
                    : 'Current enrollment trends'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <PieChart className="w-5 h-5 mr-2 text-ike-primary" />
              Regional Distribution
            </CardTitle>
            <CardDescription>
              Student distribution across municipalities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {regionalData.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-ike-neutral-light rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-ike-neutral-dark">{region.municipality}</h4>
                      <span className="text-sm text-ike-neutral">{region.students} students</span>
                    </div>
                    <Progress value={(region.students / 2847) * 100} className="h-2" />
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-sm font-medium text-ike-neutral-dark">{region.transfers}</div>
                    <div className="text-xs text-ike-neutral">transfers</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Center */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Download className="w-5 h-5 mr-2 text-ike-primary" />
            Export Center
          </CardTitle>
          <CardDescription>
            Pre-configured report templates and custom export options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exportTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-ike-primary/10 rounded-lg flex items-center justify-center">
                      <template.icon className="w-4 h-4 text-ike-primary" />
                    </div>
                    <Badge variant="outline">{template.format}</Badge>
                  </div>
                  <h3 className="font-medium text-ike-neutral-dark mb-2">{template.name}</h3>
                  <Button 
                    size="sm" 
                    className="w-full bg-ike-primary hover:bg-ike-primary-dark text-white"
                    onClick={() => handleExport(template)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Analysis Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <ArrowUpDown className="w-5 h-5 mr-2 text-ike-primary" />
              Comparison Tool
            </CardTitle>
            <CardDescription>Side-by-side period comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-ike-success hover:bg-ike-success/90 text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Compare Periods
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Calendar className="w-5 h-5 mr-2 text-ike-primary" />
              Historical Explorer
            </CardTitle>
            <CardDescription>Navigate through historical data</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-ike-warning hover:bg-ike-warning/90 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Explore Timeline
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Settings className="w-5 h-5 mr-2 text-ike-primary" />
              Access Management
            </CardTitle>
            <CardDescription>Manage analysis access for users</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full bg-ike-neutral hover:bg-ike-neutral/90 text-white"
              disabled={user?.role !== 'regional-admin'}
              onClick={() => setShowAccessManagement(true)}
            >
              <Users className="w-4 h-4 mr-2" />
              {user?.role === 'regional-admin' ? 'Manage Access' : 'Admin Only'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Save View Modal */}
      <Dialog open={showSaveView} onOpenChange={setShowSaveView}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Current View</DialogTitle>
            <DialogDescription>
              Save your current filter and display settings for future use.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="view-name">View Name</Label>
              <Input
                id="view-name"
                placeholder="Enter view name..."
                value={newViewName}
                onChange={(e) => setNewViewName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="view-description">Description (Optional)</Label>
              <Input
                id="view-description"
                placeholder="Describe this view..."
                value={newViewDescription}
                onChange={(e) => setNewViewDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveView(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveView}>
              <Save className="w-4 h-4 mr-2" />
              Save View
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load View Modal */}
      <Dialog open={showLoadView} onOpenChange={setShowLoadView}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Load Saved View</DialogTitle>
            <DialogDescription>
              Select a saved view to apply its configuration.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {savedViews.map((view) => (
              <div key={view.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-ike-neutral-light/50">
                <div>
                  <h4 className="font-medium text-ike-neutral-dark">{view.name}</h4>
                  <p className="text-sm text-ike-neutral">{view.description}</p>
                </div>
                <Button size="sm" onClick={() => handleLoadView(view)}>
                  Load
                </Button>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoadView(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Access Management Modal */}
      <AccessManagement 
        isOpen={showAccessManagement} 
        onClose={() => setShowAccessManagement(false)} 
      />
    </div>
  );
};

export default EnhancedStatistics;
