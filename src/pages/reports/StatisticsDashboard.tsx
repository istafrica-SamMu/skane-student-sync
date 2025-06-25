
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
  Database
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
  const [filterOpen, setFilterOpen] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [currentView, setCurrentView] = useState('current');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [savedViews, setSavedViews] = useState(['Monthly IKE Report', 'Payment Stream Analysis', 'Regional Comparison', 'Educational Path Trends']);
  const [newViewName, setNewViewName] = useState('');
  const [selectedReconciliation, setSelectedReconciliation] = useState('');
  const [showHistoricalData, setShowHistoricalData] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    timePeriod: '',
    educationalPath: '',
    schoolUnit: '',
    paymentStream: '',
    region: 'all',
    reconciliationDate: ''
  });

  const handleSaveView = () => {
    if (newViewName.trim()) {
      setSavedViews([...savedViews, newViewName.trim()]);
      setNewViewName('');
    }
  };

  const handleExport = (format: string) => {
    console.log(`Exporting ${format} in Excel format...`);
    // Simulate Excel export with editable format
    setTimeout(() => {
      alert(`${format} exported as editable Excel file successfully!`);
    }, 1000);
  };

  const handleReconciliationSelect = (reconciliationDate: string) => {
    setSelectedReconciliation(reconciliationDate);
    setShowHistoricalData(true);
    console.log(`Loading data for reconciliation: ${reconciliationDate}`);
  };

  const applyFilters = () => {
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
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">IKE Statistics & Analysis Dashboard</h1>
          <p className="text-ike-neutral">Comprehensive analysis and reporting for Skåne IKE collaboration area</p>
        </div>
        
        {/* Saved Views and Controls */}
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
          
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Load Saved View" />
            </SelectTrigger>
            <SelectContent>
              {savedViews.map((view, index) => (
                <SelectItem key={index} value={view}>{view}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog>
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
                  />
                </div>
                <Button onClick={handleSaveView} className="w-full">
                  Save Analysis View
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant={mapView ? "default" : "outline"}
            onClick={() => setMapView(!mapView)}
          >
            <Map className="w-4 h-4 mr-2" />
            {mapView ? 'Chart View' : 'Geographical Analysis'}
          </Button>
        </div>
      </div>

      <div className="flex space-x-6">
        {/* Enhanced Filter Panel for IKE Requirements */}
        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="mb-4">
              <Filter className="w-4 h-4 mr-2" />
              IKE Analysis Filters
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

              {/* Historical Reconciliation Data */}
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

              {/* Educational Path Changes Filter */}
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

              {/* School Unit Changes Filter */}
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

              {/* Payment Streams Filter */}
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

              {/* Time Period */}
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
                <Button onClick={applyFilters} className="w-full">Apply IKE Filters</Button>
                <Button variant="outline" onClick={resetFilters} className="w-full">Reset All Filters</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex-1">
          {/* Enhanced Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {quickStatsData.map((stat, index) => (
              <Card key={index}>
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
              {/* Current Data View */}
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

              {/* Historical Comparison View */}
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
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {/* Regional Analysis View */}
              {currentView === 'regional' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Regional Analysis - Skåne Municipalities</CardTitle>
                    <CardDescription>Breakdown by sub-regions within the Skåne collaboration area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {regionalData.map((region, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
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
              >
                <FileDown className="w-4 h-4 mr-2" />
                Monthly IKE Report
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleExport('Educational Path Analysis')}
              >
                <FileDown className="w-4 h-4 mr-2" />
                Educational Path Analysis
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleExport('Payment Stream Analysis')}
              >
                <FileDown className="w-4 h-4 mr-2" />
                Payment Stream Analysis
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleExport('Regional Comparison Report')}
              >
                <FileDown className="w-4 h-4 mr-2" />
                Regional Comparison
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
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
                            <Checkbox id="student-enrollment" defaultChecked />
                            <Label htmlFor="student-enrollment" className="text-sm">Student Enrollment</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="education-paths" />
                            <Label htmlFor="education-paths" className="text-sm">Educational Paths</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="path-changes" />
                            <Label htmlFor="path-changes" className="text-sm">Path Changes</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label className="font-medium">System Data</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="school-units" />
                            <Label htmlFor="school-units" className="text-sm">School Units</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="payment-streams" defaultChecked />
                            <Label htmlFor="payment-streams" className="text-sm">Payment Streams</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="geographical" />
                            <Label htmlFor="geographical" className="text-sm">Geographical Data</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Export Format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xlsx">Excel (.xlsx) - Editable</SelectItem>
                        <SelectItem value="csv">CSV - Data Only</SelectItem>
                        <SelectItem value="pdf">PDF Report - Formatted</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      className="w-full"
                      onClick={() => handleExport('Custom IKE Data')}
                    >
                      Export IKE Data
                    </Button>
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
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trend Analysis
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Regional Breakdown
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <History className="w-4 h-4 mr-2" />
                Reconciliation History
              </Button>

              <Button variant="outline" className="w-full justify-start">
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
