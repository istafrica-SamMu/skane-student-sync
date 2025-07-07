
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Filter, 
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
  Database,
  Settings,
  School,
  Building
} from "lucide-react";
import { useForm } from "react-hook-form";

interface SISIntegration {
  id: string;
  principalName: string;
  municipalityName: string;
  systemType: 'IST Administration' | 'Tieto' | 'Procapita' | 'Extens' | 'Other';
  status: 'active' | 'inactive' | 'error' | 'pending';
  lastRun: string;
  nextRun: string;
  successRate: number;
  totalRuns: number;
  errors: number;
  studentsCount: number;
  createdAt: string;
  updatedAt: string;
}

const mockIntegrations: SISIntegration[] = [
  {
    id: '1',
    principalName: 'Anna Andersson',
    municipalityName: 'Stockholm',
    systemType: 'IST Administration',
    status: 'active',
    lastRun: '2024-01-07 14:30',
    nextRun: '2024-01-08 06:00',
    successRate: 98.5,
    totalRuns: 245,
    errors: 3,
    studentsCount: 1250,
    createdAt: '2023-09-15',
    updatedAt: '2024-01-07'
  },
  {
    id: '2',
    principalName: 'Erik Johansson',
    municipalityName: 'Göteborg',
    systemType: 'Tieto',
    status: 'error',
    lastRun: '2024-01-07 06:00',
    nextRun: '2024-01-08 06:00',
    successRate: 85.2,
    totalRuns: 189,
    errors: 28,
    studentsCount: 890,
    createdAt: '2023-10-20',
    updatedAt: '2024-01-07'
  },
  {
    id: '3',
    principalName: 'Maria Larsson',
    municipalityName: 'Malmö',
    systemType: 'Procapita',
    status: 'active',
    lastRun: '2024-01-07 12:15',
    nextRun: '2024-01-08 06:00',
    successRate: 96.8,
    totalRuns: 156,
    errors: 5,
    studentsCount: 745,
    createdAt: '2023-11-05',
    updatedAt: '2024-01-07'
  }
];

export default function SISIntegrationsManagement() {
  const [integrations, setIntegrations] = useState<SISIntegration[]>(mockIntegrations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [systemFilter, setSystemFilter] = useState<string>('all');
  const [selectedIntegration, setSelectedIntegration] = useState<SISIntegration | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      principalName: '',
      municipalityName: '',
      systemType: '',
      apiEndpoint: '',
      apiKey: '',
      syncFrequency: '',
      dataMapping: ''
    }
  });

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.principalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.municipalityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.systemType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || integration.status === statusFilter;
    const matchesSystem = systemFilter === 'all' || integration.systemType === systemFilter;
    
    return matchesSearch && matchesStatus && matchesSystem;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'inactive': return <Clock className="h-4 w-4 text-gray-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleAddIntegration = (data: any) => {
    const newIntegration: SISIntegration = {
      id: Date.now().toString(),
      principalName: data.principalName,
      municipalityName: data.municipalityName,
      systemType: data.systemType,
      status: 'pending',
      lastRun: '-',
      nextRun: 'Pending setup',
      successRate: 0,
      totalRuns: 0,
      errors: 0,
      studentsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    setIntegrations([...integrations, newIntegration]);
    setIsAddDialogOpen(false);
    form.reset();
  };

  const handleEditIntegration = (data: any) => {
    if (selectedIntegration) {
      const updatedIntegrations = integrations.map(integration =>
        integration.id === selectedIntegration.id
          ? { ...integration, ...data, updatedAt: new Date().toISOString().split('T')[0] }
          : integration
      );
      setIntegrations(updatedIntegrations);
      setIsEditDialogOpen(false);
      setSelectedIntegration(null);
      form.reset();
    }
  };

  const handleDeleteIntegration = () => {
    if (selectedIntegration) {
      setIntegrations(integrations.filter(integration => integration.id !== selectedIntegration.id));
      setIsDeleteDialogOpen(false);
      setSelectedIntegration(null);
    }
  };

  const totalIntegrations = integrations.length;
  const activeIntegrations = integrations.filter(i => i.status === 'active').length;
  const errorIntegrations = integrations.filter(i => i.status === 'error').length;
  const totalStudents = integrations.reduce((sum, i) => sum + i.studentsCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">SIS Integrations Management</h1>
          <p className="text-ike-neutral mt-1">Manage student information system integrations for principals</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ike-primary hover:bg-ike-primary-dark">
              <Plus className="h-4 w-4 mr-2" />
              Add Integration
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New SIS Integration</DialogTitle>
              <DialogDescription>
                Set up a new student information system integration for a principal
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddIntegration)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="principalName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Principal Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter principal name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="municipalityName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Municipality</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter municipality name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="systemType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>System Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select system type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="IST Administration">IST Administration</SelectItem>
                          <SelectItem value="Tieto">Tieto</SelectItem>
                          <SelectItem value="Procapita">Procapita</SelectItem>
                          <SelectItem value="Extens">Extens</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apiEndpoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Endpoint</FormLabel>
                      <FormControl>
                        <Input placeholder="https://api.example.com/sis" {...field} />
                      </FormControl>
                      <FormDescription>
                        The API endpoint for the SIS system
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="syncFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sync Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sync frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-ike-primary hover:bg-ike-primary-dark">
                    Create Integration
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Integrations</CardTitle>
            <Database className="h-4 w-4 text-ike-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{totalIntegrations}</div>
            <p className="text-xs text-ike-neutral mt-1">Across all municipalities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Active Integrations</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeIntegrations}</div>
            <p className="text-xs text-ike-neutral mt-1">Running successfully</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Error Integrations</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{errorIntegrations}</div>
            <p className="text-xs text-ike-neutral mt-1">Requiring attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Students</CardTitle>
            <School className="h-4 w-4 text-ike-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{totalStudents.toLocaleString()}</div>
            <p className="text-xs text-ike-neutral mt-1">Across all systems</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Integrations Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
                <Input
                  placeholder="Search by principal, municipality, or system..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={systemFilter} onValueChange={setSystemFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="System" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Systems</SelectItem>
                  <SelectItem value="IST Administration">IST Admin</SelectItem>
                  <SelectItem value="Tieto">Tieto</SelectItem>
                  <SelectItem value="Procapita">Procapita</SelectItem>
                  <SelectItem value="Extens">Extens</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Principal</TableHead>
                  <TableHead>Municipality</TableHead>
                  <TableHead>System</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Success Rate</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIntegrations.map((integration) => (
                  <TableRow key={integration.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-ike-primary/10 rounded-full flex items-center justify-center">
                          <School className="h-4 w-4 text-ike-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-ike-neutral-dark">{integration.principalName}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-ike-neutral" />
                        <span className="text-ike-neutral-dark">{integration.municipalityName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-ike-primary border-ike-primary/30">
                        {integration.systemType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(integration.status)}
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${integration.successRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-ike-neutral-dark">
                          {integration.successRate}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-ike-neutral-dark">
                        {integration.studentsCount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="text-ike-neutral-dark">{integration.lastRun}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedIntegration(integration);
                            setIsDetailsDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedIntegration(integration);
                            form.reset({
                              principalName: integration.principalName,
                              municipalityName: integration.municipalityName,
                              systemType: integration.systemType,
                              apiEndpoint: '',
                              apiKey: '',
                              syncFrequency: 'daily',
                              dataMapping: ''
                            });
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedIntegration(integration);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Integration Details</DialogTitle>
            <DialogDescription>
              Detailed information about the SIS integration
            </DialogDescription>
          </DialogHeader>
          {selectedIntegration && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="runs">Runs History</TabsTrigger>
                <TabsTrigger value="errors">Errors</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-ike-neutral">Principal:</span>
                        <span className="font-medium">{selectedIntegration.principalName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ike-neutral">Municipality:</span>
                        <span className="font-medium">{selectedIntegration.municipalityName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ike-neutral">System Type:</span>
                        <Badge variant="outline">{selectedIntegration.systemType}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ike-neutral">Status:</span>
                        <Badge className={getStatusColor(selectedIntegration.status)}>
                          {selectedIntegration.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-ike-neutral">Success Rate:</span>
                        <span className="font-medium text-green-600">{selectedIntegration.successRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ike-neutral">Total Runs:</span>
                        <span className="font-medium">{selectedIntegration.totalRuns}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ike-neutral">Errors:</span>
                        <span className="font-medium text-red-600">{selectedIntegration.errors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ike-neutral">Students:</span>
                        <span className="font-medium">{selectedIntegration.studentsCount.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="runs">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Recent Runs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      <div className="space-y-2">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className="flex items-center justify-between p-2 border rounded">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm">Sync completed successfully</span>
                            </div>
                            <div className="text-xs text-ike-neutral">
                              {new Date(Date.now() - i * 86400000).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="errors">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Recent Errors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      <div className="space-y-2">
                        {selectedIntegration.errors > 0 && (
                          <div className="flex items-start gap-2 p-2 border border-red-200 rounded">
                            <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                            <div className="flex-1">
                              <div className="text-sm font-medium">API Connection Timeout</div>
                              <div className="text-xs text-ike-neutral">Failed to connect to SIS API endpoint</div>
                              <div className="text-xs text-ike-neutral mt-1">
                                {new Date(Date.now() - 3600000).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        )}
                        {selectedIntegration.errors === 0 && (
                          <div className="text-center text-ike-neutral py-8">
                            <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-2" />
                            <p>No errors in the last 30 days</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Integration Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Sync Frequency</label>
                        <p className="text-sm text-ike-neutral">Daily at 06:00</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Data Retention</label>
                        <p className="text-sm text-ike-neutral">90 days</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Notification Email</label>
                        <p className="text-sm text-ike-neutral">{selectedIntegration.principalName.toLowerCase().replace(' ', '.')}@kommun.se</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Auto Retry</label>
                        <p className="text-sm text-ike-neutral">Enabled (3 attempts)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Integration</DialogTitle>
            <DialogDescription>
              Update the SIS integration settings
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditIntegration)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="principalName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Principal Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="municipalityName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Municipality</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="systemType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>System Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="IST Administration">IST Administration</SelectItem>
                        <SelectItem value="Tieto">Tieto</SelectItem>
                        <SelectItem value="Procapita">Procapita</SelectItem>
                        <SelectItem value="Extens">Extens</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-ike-primary hover:bg-ike-primary-dark">
                  Update Integration
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Integration</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this integration? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedIntegration && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">Integration to be deleted:</span>
              </div>
              <div className="mt-2 text-sm text-red-700">
                <p><strong>Principal:</strong> {selectedIntegration.principalName}</p>
                <p><strong>Municipality:</strong> {selectedIntegration.municipalityName}</p>
                <p><strong>System:</strong> {selectedIntegration.systemType}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteIntegration}
            >
              Delete Integration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
