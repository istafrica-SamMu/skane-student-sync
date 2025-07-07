
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
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
} from "@/components/ui/alert-dialog";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  Trash2,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Building,
  User,
  Calendar,
  TrendingUp,
  Server,
  Zap
} from "lucide-react";

interface SISIntegration {
  id: string;
  principalName: string;
  municipality: string;
  systemType: 'ist-administration' | 'tieto' | 'procapita' | 'other';
  systemName: string;
  status: 'active' | 'inactive' | 'error' | 'pending';
  lastSync: string;
  nextSync: string;
  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;
  apiEndpoint: string;
  authMethod: 'api-key' | 'oauth' | 'basic-auth';
  createdDate: string;
  lastModified: string;
  syncFrequency: 'daily' | 'weekly' | 'monthly' | 'manual';
  dataTypes: string[];
  errors: {
    id: string;
    timestamp: string;
    error: string;
    severity: 'low' | 'medium' | 'high';
  }[];
}

const mockIntegrations: SISIntegration[] = [
  {
    id: "1",
    principalName: "Anna Andersson",
    municipality: "Stockholm",
    systemType: "ist-administration",
    systemName: "IST Administration v2.4",
    status: "active",
    lastSync: "2024-01-15 08:30",
    nextSync: "2024-01-16 08:00",
    totalRuns: 245,
    successfulRuns: 238,
    failedRuns: 7,
    apiEndpoint: "https://ist.stockholm.se/api/v2",
    authMethod: "api-key",
    createdDate: "2023-08-15",
    lastModified: "2024-01-10",
    syncFrequency: "daily",
    dataTypes: ["Students", "Classes", "Enrollments", "Grades"],
    errors: [
      {
        id: "1",
        timestamp: "2024-01-14 08:35",
        error: "Student ID mismatch in record 1247",
        severity: "medium"
      }
    ]
  },
  {
    id: "2",
    principalName: "Erik Johansson",
    municipality: "Göteborg",
    systemType: "tieto",
    systemName: "Tieto Education Cloud",
    status: "error",
    lastSync: "2024-01-14 10:15",
    nextSync: "2024-01-16 10:00",
    totalRuns: 189,
    successfulRuns: 175,
    failedRuns: 14,
    apiEndpoint: "https://tieto-edu.goteborg.se/api",
    authMethod: "oauth",
    createdDate: "2023-09-20",
    lastModified: "2024-01-12",
    syncFrequency: "daily",
    dataTypes: ["Students", "Teachers", "Schedules"],
    errors: [
      {
        id: "2",
        timestamp: "2024-01-14 10:20",
        error: "Authentication token expired",
        severity: "high"
      },
      {
        id: "3",
        timestamp: "2024-01-13 10:15",
        error: "Rate limit exceeded",
        severity: "medium"
      }
    ]
  },
  {
    id: "3",
    principalName: "Maria Larsson",
    municipality: "Malmö",
    systemType: "procapita",
    systemName: "ProCapita SchoolSoft",
    status: "active",
    lastSync: "2024-01-15 09:45",
    nextSync: "2024-01-22 09:00",
    totalRuns: 34,
    successfulRuns: 34,
    failedRuns: 0,
    apiEndpoint: "https://procapita.malmo.se/api/v1",
    authMethod: "basic-auth",
    createdDate: "2023-12-01",
    lastModified: "2024-01-05",
    syncFrequency: "weekly",
    dataTypes: ["Students", "Attendance"],
    errors: []
  }
];

export default function SISIntegrationsManagement() {
  const [integrations, setIntegrations] = useState<SISIntegration[]>(mockIntegrations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [systemFilter, setSystemFilter] = useState<string>("all");
  const [selectedIntegration, setSelectedIntegration] = useState<SISIntegration | null>(null);
  const [showDetailsSheet, setShowDetailsSheet] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState<SISIntegration | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [integrationToDelete, setIntegrationToDelete] = useState<SISIntegration | null>(null);

  const [newIntegration, setNewIntegration] = useState({
    principalName: "",
    municipality: "",
    systemType: "",
    systemName: "",
    apiEndpoint: "",
    authMethod: "",
    syncFrequency: "",
    dataTypes: [] as string[]
  });

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = 
      integration.principalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.municipality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.systemName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || integration.status === statusFilter;
    const matchesSystem = systemFilter === "all" || integration.systemType === systemFilter;
    
    return matchesSearch && matchesStatus && matchesSystem;
  });

  const getStatusBadge = (status: SISIntegration['status']) => {
    const variants = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
      error: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200"
    };
    return variants[status] || variants.active;
  };

  const getSystemTypeBadge = (systemType: SISIntegration['systemType']) => {
    const variants = {
      'ist-administration': "bg-blue-100 text-blue-800 border-blue-200",
      'tieto': "bg-purple-100 text-purple-800 border-purple-200",
      'procapita': "bg-orange-100 text-orange-800 border-orange-200",
      'other': "bg-gray-100 text-gray-800 border-gray-200"
    };
    return variants[systemType] || variants.other;
  };

  const handleViewDetails = (integration: SISIntegration) => {
    setSelectedIntegration(integration);
    setShowDetailsSheet(true);
  };

  const handleEditIntegration = (integration: SISIntegration) => {
    setEditingIntegration(integration);
    setShowEditDialog(true);
  };

  const handleDeleteIntegration = (integration: SISIntegration) => {
    setIntegrationToDelete(integration);
    setShowDeleteDialog(true);
  };

  const confirmDeleteIntegration = () => {
    if (integrationToDelete) {
      setIntegrations(prev => prev.filter(i => i.id !== integrationToDelete.id));
      setIntegrationToDelete(null);
      setShowDeleteDialog(false);
    }
  };

  const handleAddIntegration = () => {
    const newId = (integrations.length + 1).toString();
    const integration: SISIntegration = {
      id: newId,
      principalName: newIntegration.principalName,
      municipality: newIntegration.municipality,
      systemType: newIntegration.systemType as SISIntegration['systemType'],
      systemName: newIntegration.systemName,
      status: "pending",
      lastSync: "Never",
      nextSync: "Pending setup",
      totalRuns: 0,
      successfulRuns: 0,
      failedRuns: 0,
      apiEndpoint: newIntegration.apiEndpoint,
      authMethod: newIntegration.authMethod as SISIntegration['authMethod'],
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      syncFrequency: newIntegration.syncFrequency as SISIntegration['syncFrequency'],
      dataTypes: newIntegration.dataTypes,
      errors: []
    };

    setIntegrations(prev => [...prev, integration]);
    setNewIntegration({
      principalName: "",
      municipality: "",
      systemType: "",
      systemName: "",
      apiEndpoint: "",
      authMethod: "",
      syncFrequency: "",
      dataTypes: []
    });
    setShowAddDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ike-neutral-dark">SIS Integrations Management</h1>
          <p className="text-ike-neutral mt-1">
            Manage Student Information System integrations for different municipalities and principals
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm" 
            className="bg-ike-primary hover:bg-ike-primary-dark"
            onClick={() => setShowAddDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-ike-primary" />
              <div>
                <p className="text-sm text-ike-neutral">Total Integrations</p>
                <p className="text-xl font-semibold text-ike-neutral-dark">{integrations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-ike-neutral">Active</p>
                <p className="text-xl font-semibold text-ike-neutral-dark">
                  {integrations.filter(i => i.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-ike-neutral">With Errors</p>
                <p className="text-xl font-semibold text-ike-neutral-dark">
                  {integrations.filter(i => i.status === 'error').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-ike-primary" />
              <div>
                <p className="text-sm text-ike-neutral">Success Rate</p>
                <p className="text-xl font-semibold text-ike-neutral-dark">
                  {Math.round((integrations.reduce((acc, i) => acc + i.successfulRuns, 0) / 
                  Math.max(integrations.reduce((acc, i) => acc + i.totalRuns, 0), 1)) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ike-neutral w-4 h-4" />
              <Input
                placeholder="Search by principal, municipality, or system..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={systemFilter} onValueChange={setSystemFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Systems</SelectItem>
                <SelectItem value="ist-administration">IST Administration</SelectItem>
                <SelectItem value="tieto">Tieto</SelectItem>
                <SelectItem value="procapita">ProCapita</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Integrations Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            SIS Integrations ({filteredIntegrations.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Principal / Municipality</TableHead>
                  <TableHead>System</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Sync</TableHead>
                  <TableHead>Success Rate</TableHead>
                  <TableHead>Sync Frequency</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIntegrations.map((integration) => (
                  <TableRow key={integration.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {integration.principalName}
                        </div>
                        <div className="text-sm text-ike-neutral flex items-center gap-2">
                          <Building className="w-3 h-3" />
                          {integration.municipality}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge className={getSystemTypeBadge(integration.systemType)}>
                          {integration.systemType.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <div className="text-sm text-ike-neutral">
                          {integration.systemName}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(integration.status)}>
                        {integration.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {integration.lastSync}
                        </div>
                        <div className="text-ike-neutral">
                          Next: {integration.nextSync}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {integration.totalRuns > 0 ? 
                            Math.round((integration.successfulRuns / integration.totalRuns) * 100) : 0}%
                        </div>
                        <div className="text-ike-neutral">
                          {integration.successfulRuns}/{integration.totalRuns} runs
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {integration.syncFrequency}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(integration)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditIntegration(integration)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteIntegration(integration)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Details Sheet */}
      <Sheet open={showDetailsSheet} onOpenChange={setShowDetailsSheet}>
        <SheetContent className="sm:max-w-[700px]">
          <SheetHeader>
            <SheetTitle>Integration Details</SheetTitle>
            <SheetDescription>
              Complete information and statistics for this SIS integration
            </SheetDescription>
          </SheetHeader>
          {selectedIntegration && (
            <div className="space-y-6 mt-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-ike-neutral-dark flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Principal & Municipality
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Principal:</span> {selectedIntegration.principalName}</p>
                    <p><span className="font-medium">Municipality:</span> {selectedIntegration.municipality}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-ike-neutral-dark flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    System Information
                  </h3>
                  <div className="space-y-2">
                    <Badge className={getSystemTypeBadge(selectedIntegration.systemType)}>
                      {selectedIntegration.systemType.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <p className="text-sm">{selectedIntegration.systemName}</p>
                  </div>
                </div>
              </div>

              {/* Status & Performance */}
              <div className="space-y-2">
                <h3 className="font-semibold text-ike-neutral-dark flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Status & Performance
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-ike-neutral-light/20 rounded">
                    <p className="text-2xl font-bold text-ike-neutral-dark">{selectedIntegration.totalRuns}</p>
                    <p className="text-sm text-ike-neutral">Total Runs</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded">
                    <p className="text-2xl font-bold text-green-600">{selectedIntegration.successfulRuns}</p>
                    <p className="text-sm text-green-600">Successful</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded">
                    <p className="text-2xl font-bold text-red-600">{selectedIntegration.failedRuns}</p>
                    <p className="text-sm text-red-600">Failed</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedIntegration.totalRuns > 0 ? 
                        Math.round((selectedIntegration.successfulRuns / selectedIntegration.totalRuns) * 100) : 0}%
                    </p>
                    <p className="text-sm text-blue-600">Success Rate</p>
                  </div>
                </div>
              </div>

              {/* Sync Information */}
              <div className="space-y-2">
                <h3 className="font-semibold text-ike-neutral-dark flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Synchronization
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><span className="font-medium">Frequency:</span> {selectedIntegration.syncFrequency}</p>
                    <p><span className="font-medium">Last Sync:</span> {selectedIntegration.lastSync}</p>
                    <p><span className="font-medium">Next Sync:</span> {selectedIntegration.nextSync}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Data Types:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedIntegration.dataTypes.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="space-y-2">
                <h3 className="font-semibold text-ike-neutral-dark flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Technical Configuration
                </h3>
                <div className="text-sm space-y-1 bg-gray-50 p-3 rounded">
                  <p><span className="font-medium">API Endpoint:</span> {selectedIntegration.apiEndpoint}</p>
                  <p><span className="font-medium">Authentication:</span> {selectedIntegration.authMethod}</p>
                  <p><span className="font-medium">Created:</span> {selectedIntegration.createdDate}</p>
                  <p><span className="font-medium">Last Modified:</span> {selectedIntegration.lastModified}</p>
                </div>
              </div>

              {/* Recent Errors */}
              {selectedIntegration.errors.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-ike-neutral-dark flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Recent Errors
                  </h3>
                  <div className="space-y-2">
                    {selectedIntegration.errors.map((error) => (
                      <div key={error.id} className="p-3 border border-red-200 bg-red-50 rounded text-sm">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-red-800">{error.error}</p>
                            <p className="text-red-600 text-xs mt-1">{error.timestamp}</p>
                          </div>
                          <Badge 
                            className={
                              error.severity === 'high' ? "bg-red-100 text-red-800" :
                              error.severity === 'medium' ? "bg-yellow-100 text-yellow-800" :
                              "bg-blue-100 text-blue-800"
                            }
                          >
                            {error.severity}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Add Integration Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New SIS Integration</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium mb-1">Principal Name</Label>
                <Input 
                  placeholder="Enter principal name"
                  value={newIntegration.principalName}
                  onChange={(e) => setNewIntegration(prev => ({...prev, principalName: e.target.value}))}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">Municipality</Label>
                <Input 
                  placeholder="Enter municipality"
                  value={newIntegration.municipality}
                  onChange={(e) => setNewIntegration(prev => ({...prev, municipality: e.target.value}))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium mb-1">System Type</Label>
                <Select value={newIntegration.systemType} onValueChange={(value) => setNewIntegration(prev => ({...prev, systemType: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select system type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist-administration">IST Administration</SelectItem>
                    <SelectItem value="tieto">Tieto</SelectItem>
                    <SelectItem value="procapita">ProCapita</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">System Name</Label>
                <Input 
                  placeholder="Enter system name/version"
                  value={newIntegration.systemName}
                  onChange={(e) => setNewIntegration(prev => ({...prev, systemName: e.target.value}))}
                />
              </div>
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">API Endpoint</Label>
              <Input 
                placeholder="https://api.example.com/v1"
                value={newIntegration.apiEndpoint}
                onChange={(e) => setNewIntegration(prev => ({...prev, apiEndpoint: e.target.value}))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium mb-1">Authentication Method</Label>
                <Select value={newIntegration.authMethod} onValueChange={(value) => setNewIntegration(prev => ({...prev, authMethod: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select auth method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api-key">API Key</SelectItem>
                    <SelectItem value="oauth">OAuth</SelectItem>
                    <SelectItem value="basic-auth">Basic Auth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">Sync Frequency</Label>
                <Select value={newIntegration.syncFrequency} onValueChange={(value) => setNewIntegration(prev => ({...prev, syncFrequency: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary-dark"
              onClick={handleAddIntegration}
            >
              Add Integration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Integration Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit SIS Integration</DialogTitle>
          </DialogHeader>
          {editingIntegration && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium mb-1">Principal Name</Label>
                  <Input defaultValue={editingIntegration.principalName} />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Municipality</Label>
                  <Input defaultValue={editingIntegration.municipality} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium mb-1">System Type</Label>
                  <Select defaultValue={editingIntegration.systemType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ist-administration">IST Administration</SelectItem>
                      <SelectItem value="tieto">Tieto</SelectItem>
                      <SelectItem value="procapita">ProCapita</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">System Name</Label>
                  <Input defaultValue={editingIntegration.systemName} />
                </div>
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">API Endpoint</Label>
                <Input defaultValue={editingIntegration.apiEndpoint} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium mb-1">Authentication Method</Label>
                  <Select defaultValue={editingIntegration.authMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="api-key">API Key</SelectItem>
                      <SelectItem value="oauth">OAuth</SelectItem>
                      <SelectItem value="basic-auth">Basic Auth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Sync Frequency</Label>
                  <Select defaultValue={editingIntegration.syncFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-ike-primary hover:bg-ike-primary-dark">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Integration</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this SIS integration? This action cannot be undone and will stop all data synchronization.
              {integrationToDelete && (
                <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                  <strong>{integrationToDelete.principalName}</strong> - {integrationToDelete.municipality} ({integrationToDelete.systemName})
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteIntegration}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Integration
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
