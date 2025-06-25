
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
  FileDown
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Sample data
const quickStatsData = [
  { title: "Total Students", value: "12,847", change: "+2.4%", icon: Users, trend: "up" },
  { title: "Active School Units", value: "156", change: "-1.2%", icon: School, trend: "down" },
  { title: "Monthly Compensation", value: "€2.4M", change: "+5.7%", icon: DollarSign, trend: "up" },
  { title: "Study Path Changes", value: "324", change: "+12.3%", icon: ArrowUpDown, trend: "up" },
];

const chartData = [
  { name: 'Jan', students: 4000, compensation: 2400, transfers: 240 },
  { name: 'Feb', students: 3000, compensation: 1398, transfers: 221 },
  { name: 'Mar', students: 2000, compensation: 9800, transfers: 229 },
  { name: 'Apr', students: 2780, compensation: 3908, transfers: 200 },
  { name: 'May', students: 1890, compensation: 4800, transfers: 218 },
  { name: 'Jun', students: 2390, compensation: 3800, transfers: 250 },
];

const pieData = [
  { name: 'Municipal Schools', value: 65, color: '#8884d8' },
  { name: 'External Schools', value: 25, color: '#82ca9d' },
  { name: 'Private Schools', value: 10, color: '#ffc658' },
];

export default function StatisticsDashboard() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [currentView, setCurrentView] = useState('current');
  const [savedViews, setSavedViews] = useState(['Monthly Report', 'Year Comparison', 'Regional Overview']);
  const [newViewName, setNewViewName] = useState('');

  const handleSaveView = () => {
    if (newViewName.trim()) {
      setSavedViews([...savedViews, newViewName.trim()]);
      setNewViewName('');
    }
  };

  const handleExport = (format: string) => {
    console.log(`Exporting ${format} report...`);
    // Simulate export
    setTimeout(() => {
      alert(`${format} report exported successfully!`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Statistics Dashboard</h1>
          <p className="text-ike-neutral">Comprehensive analysis and reporting tools</p>
        </div>
        
        {/* Saved Views */}
        <div className="flex items-center space-x-4">
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
                Save View
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Current View</DialogTitle>
                <DialogDescription>
                  Save your current filter and chart configuration for quick access later.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="viewName">View Name</Label>
                  <Input
                    id="viewName"
                    value={newViewName}
                    onChange={(e) => setNewViewName(e.target.value)}
                    placeholder="Enter view name..."
                  />
                </div>
                <Button onClick={handleSaveView} className="w-full">
                  Save View
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant={mapView ? "default" : "outline"}
            onClick={() => setMapView(!mapView)}
          >
            <Map className="w-4 h-4 mr-2" />
            {mapView ? 'Chart View' : 'Map View'}
          </Button>
        </div>
      </div>

      <div className="flex space-x-6">
        {/* Filter Panel */}
        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="mb-4">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>IKE Analysis Filters</SheetTitle>
              <SheetDescription>
                Configure your data view with specific IKE filters
              </SheetDescription>
            </SheetHeader>
            
            <div className="space-y-6 mt-6">
              {/* Time Period */}
              <div>
                <Label className="text-sm font-medium">Time Period</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current-month">Current Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Educational Path Changes */}
              <div>
                <Label className="text-sm font-medium">Educational Path Changes</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All study paths" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Study Paths</SelectItem>
                    <SelectItem value="gymnasieskola">Gymnasieskola</SelectItem>
                    <SelectItem value="komvux">Komvux</SelectItem>
                    <SelectItem value="yrkeshogskola">Yrkeshögskola</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* School Unit Changes */}
              <div>
                <Label className="text-sm font-medium">School Unit Changes</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All school units" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All School Units</SelectItem>
                    <SelectItem value="municipal">Municipal Only</SelectItem>
                    <SelectItem value="private">Private Only</SelectItem>
                    <SelectItem value="external">External Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Stream Analysis */}
              <div>
                <Label className="text-sm font-medium">Payment Stream Analysis</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All compensation types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="grundskola">Grundskola</SelectItem>
                    <SelectItem value="gymnasium">Gymnasium</SelectItem>
                    <SelectItem value="special">Special Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-3">
                <Button className="w-full">Apply Filters</Button>
                <Button variant="outline" className="w-full">Reset Filters</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex-1">
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {quickStatsData.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-ike-neutral" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View Mode Toggle */}
          <Tabs value={currentView} onValueChange={setCurrentView} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Current Data</TabsTrigger>
              <TabsTrigger value="comparison">Historical Comparison</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Main Chart Area or Map View */}
          {mapView ? (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Geographical Analysis</CardTitle>
                <CardDescription>Interactive map showing regional distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-ike-neutral-light rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Map className="w-16 h-16 text-ike-neutral mx-auto mb-4" />
                    <p className="text-ike-neutral">Interactive map will be displayed here</p>
                    <p className="text-sm text-ike-neutral-dark mt-2">
                      Click regions to drill down: Skåne → Municipality → School Unit
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>Student enrollment and compensation trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="students" fill="#8884d8" />
                      <Bar dataKey="compensation" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>School Distribution</CardTitle>
                  <CardDescription>Student distribution by school type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={(entry) => `${entry.name}: ${entry.value}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Historical Comparison for Comparison View */}
          {currentView === 'comparison' && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Historical Comparison</CardTitle>
                <CardDescription>Compare current period with previous periods</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="students" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="transfers" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Export Tools */}
        <div className="w-64 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Export Center</CardTitle>
              <CardDescription>Download pre-configured reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleExport('Monthly Statistical Report')}
              >
                <FileDown className="w-4 h-4 mr-2" />
                Monthly Report
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleExport('Regional Comparison')}
              >
                <FileDown className="w-4 h-4 mr-2" />
                Regional Comparison
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleExport('Payment Analysis')}
              >
                <FileDown className="w-4 h-4 mr-2" />
                Payment Analysis
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Custom Export
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Custom Data Export</DialogTitle>
                    <DialogDescription>
                      Select the data fields you want to include in your export.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>
                          <input type="checkbox" className="mr-2" defaultChecked />
                          Student Data
                        </Label>
                        <Label>
                          <input type="checkbox" className="mr-2" />
                          School Units
                        </Label>
                        <Label>
                          <input type="checkbox" className="mr-2" />
                          Study Paths
                        </Label>
                      </div>
                      <div className="space-y-2">
                        <Label>
                          <input type="checkbox" className="mr-2" defaultChecked />
                          Compensation
                        </Label>
                        <Label>
                          <input type="checkbox" className="mr-2" />
                          Transfers
                        </Label>
                        <Label>
                          <input type="checkbox" className="mr-2" />
                          Geography
                        </Label>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Export Format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="pdf">PDF Report</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      className="w-full"
                      onClick={() => handleExport('Custom Data')}
                    >
                      Export Data
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Analysis</CardTitle>
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
                <Calendar className="w-4 h-4 mr-2" />
                Period Comparison
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
