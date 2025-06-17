
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Plus,
  BookOpen,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Code,
  DollarSign,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

interface StudyPath {
  id: number;
  name: string;
  studyPathCode: string;
  priceCode: string;
  priceCodeName: string;
  startDate: string;
  endDate?: string;
  description?: string;
  isActive: boolean;
  createdDate: string;
  lastModified: string;
}

interface PriceCode {
  code: string;
  name: string;
  description: string;
  amount: number;
}

const priceCodes: PriceCode[] = [
  { code: "NATUR", name: "Naturvetenskapsprogrammet", description: "Natural Science Programme", amount: 85000 },
  { code: "SAMHALL", name: "Samhällsvetenskapsprogrammet", description: "Social Science Programme", amount: 75000 },
  { code: "EKONOMI", name: "Ekonomiprogrammet", description: "Economics Programme", amount: 78000 },
  { code: "TEKNIK", name: "Teknikprogrammet", description: "Technology Programme", amount: 95000 },
  { code: "ESTET", name: "Estetiska programmet", description: "Aesthetic Programme", amount: 82000 },
];

const getStatusBadge = (isActive: boolean, endDate?: string) => {
  if (!isActive) {
    return <Badge variant="secondary">Inactive</Badge>;
  }
  
  if (endDate && new Date(endDate) < new Date()) {
    return <Badge className="bg-ike-neutral text-white">Expired</Badge>;
  }
  
  return <Badge className="bg-ike-success text-white">Active</Badge>;
};

const StudyPathForm = ({
  formData,
  setFormData,
  priceCodes,
  editingStudyPath,
  handleSubmit,
  resetForm,
}: {
  formData: StudyPath;
  setFormData: React.Dispatch<React.SetStateAction<StudyPath>>;
  priceCodes: PriceCode[];
  editingStudyPath: StudyPath | null;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
}) => {
  const handlePriceCodeChange = (value: string) => {
    const priceCode = priceCodes.find((pc) => pc.code === value);
    setFormData((prev) => ({
      ...prev,
      priceCode: value,
      priceCodeName: priceCode ? priceCode.name : "",
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Basic Information</h3>
          <div>
            <Label htmlFor="name" className="text-ike-neutral">Study Path Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="border-ike-primary/20 focus:border-ike-primary"
              placeholder="e.g., Naturvetenskapsprogrammet"
              required
            />
          </div>
          <div>
            <Label htmlFor="studyPathCode" className="text-ike-neutral">Study Path Code *</Label>
            <Input
              id="studyPathCode"
              type="text"
              value={formData.studyPathCode}
              onChange={(e) => setFormData({...formData, studyPathCode: e.target.value.toUpperCase()})}
              className="border-ike-primary/20 focus:border-ike-primary"
              placeholder="e.g., NA"
              required
              maxLength={10}
            />
            <p className="text-sm text-ike-neutral mt-1">
              Unique code identifying this study path
            </p>
          </div>
          <div>
            <Label htmlFor="priceCode" className="text-ike-neutral">Linked Price Code *</Label>
            <Select value={formData.priceCode} onValueChange={handlePriceCodeChange} required>
              <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                <SelectValue placeholder="Select price code" />
              </SelectTrigger>
              <SelectContent>
                {priceCodes.map((priceCode) => (
                  <SelectItem key={priceCode.code} value={priceCode.code}>
                    <div className="flex flex-col">
                      <span className="font-medium">{priceCode.code} - {priceCode.name}</span>
                      <span className="text-sm text-ike-neutral">{priceCode.amount.toLocaleString()} SEK</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description" className="text-ike-neutral">Description</Label>
            <textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full min-h-[80px] px-3 py-2 border border-ike-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ike-primary focus:border-transparent resize-vertical"
              placeholder="Optional description of the study path..."
              rows={3}
            />
          </div>
        </div>

        {/* Validity Period */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Validity Period</h3>
          <div>
            <Label htmlFor="startDate" className="text-ike-neutral">Start Date *</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              className="border-ike-primary/20 focus:border-ike-primary"
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate" className="text-ike-neutral">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate || ""}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              className="border-ike-primary/20 focus:border-ike-primary"
              min={formData.startDate}
            />
            <p className="text-sm text-ike-neutral mt-1">
              Leave empty if the study path has no end date
            </p>
            {formData.startDate && formData.endDate && formData.endDate <= formData.startDate && (
              <p className="text-red-500 text-sm mt-1">End date must be after start date</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              className="w-4 h-4 text-ike-primary bg-gray-100 border-gray-300 rounded focus:ring-ike-primary focus:ring-2"
            />
            <Label htmlFor="isActive" className="text-ike-neutral cursor-pointer">
              Study path is currently active
            </Label>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={resetForm}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          disabled={!formData.name || !formData.studyPathCode || !formData.priceCode || !formData.startDate || (formData.endDate && formData.endDate <= formData.startDate)}
        >
          {editingStudyPath ? "Update Study Path" : "Create Study Path"}
        </Button>
      </DialogFooter>
    </form>
  );
};

const StudyPathTable = ({
  filteredStudyPaths,
  handleViewDetails,
  handleEdit,
  handleDelete,
  priceCodes,
}: {
  filteredStudyPaths: StudyPath[];
  handleViewDetails: (studyPath: StudyPath) => void;
  handleEdit: (studyPath: StudyPath) => void;
  handleDelete: (id: number) => void;
  priceCodes: PriceCode[];
}) => {
  const getPriceAmount = (priceCode: string) => {
    const price = priceCodes.find(pc => pc.code === priceCode);
    return price ? price.amount.toLocaleString() + " SEK" : "N/A";
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-medium">Study Path Name</TableHead>
          <TableHead className="font-medium">Code</TableHead>
          <TableHead className="font-medium">Price Code</TableHead>
          <TableHead className="font-medium">Amount</TableHead>
          <TableHead className="font-medium">Valid Period</TableHead>
          <TableHead className="font-medium">Status</TableHead>
          <TableHead className="font-medium text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredStudyPaths.map((studyPath) => (
          <TableRow key={studyPath.id} className="hover:bg-ike-neutral-light/50">
            <TableCell className="font-medium text-ike-neutral-dark">
              {studyPath.name}
            </TableCell>
            <TableCell className="font-mono text-sm bg-ike-neutral-light/30 rounded px-2 py-1 inline-block">
              {studyPath.studyPathCode}
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Code className="w-4 h-4 mr-1 text-ike-neutral" />
                {studyPath.priceCode}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1 text-ike-success" />
                {getPriceAmount(studyPath.priceCode)}
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1 text-ike-neutral" />
                  {studyPath.startDate}
                </div>
                {studyPath.endDate && (
                  <div className="text-ike-neutral text-xs mt-1">
                    to {studyPath.endDate}
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>{getStatusBadge(studyPath.isActive, studyPath.endDate)}</TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
                  <DropdownMenuItem onClick={() => handleViewDetails(studyPath)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleEdit(studyPath)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Study Path
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(studyPath.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Study Path
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const StudyPathDetailsModal = ({
  selectedStudyPath,
  showStudyPathDetails,
  setShowStudyPathDetails,
  getStatusBadge,
  priceCodes,
}: {
  selectedStudyPath: StudyPath | null;
  showStudyPathDetails: boolean;
  setShowStudyPathDetails: React.Dispatch<React.SetStateAction<boolean>>;
  getStatusBadge: (isActive: boolean, endDate?: string) => JSX.Element;
  priceCodes: PriceCode[];
}) => {
  const getPriceCodeDetails = (priceCode: string) => {
    return priceCodes.find(pc => pc.code === priceCode);
  };

  return (
    <Dialog open={showStudyPathDetails} onOpenChange={setShowStudyPathDetails}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-ike-neutral-dark">
            <BookOpen className="w-5 h-5 mr-2 text-ike-primary" />
            Study Path Details
          </DialogTitle>
          <DialogDescription>
            Complete information about the selected study path
          </DialogDescription>
        </DialogHeader>
        {selectedStudyPath && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Basic Information</h3>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Study Path Name</label>
                  <p className="text-ike-neutral-dark font-medium">{selectedStudyPath.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Study Path Code</label>
                  <p className="text-ike-neutral-dark font-mono bg-ike-neutral-light/30 rounded px-2 py-1 inline-block">
                    {selectedStudyPath.studyPathCode}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedStudyPath.isActive, selectedStudyPath.endDate)}</div>
                </div>
                {selectedStudyPath.description && (
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Description</label>
                    <p className="text-ike-neutral-dark mt-1">{selectedStudyPath.description}</p>
                  </div>
                )}
              </div>

              {/* Price Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Price Information</h3>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Price Code</label>
                  <p className="text-ike-neutral-dark font-mono">{selectedStudyPath.priceCode}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Price Code Name</label>
                  <p className="text-ike-neutral-dark">{selectedStudyPath.priceCodeName}</p>
                </div>
                {getPriceCodeDetails(selectedStudyPath.priceCode) && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-ike-neutral">Annual Amount</label>
                      <p className="text-ike-neutral-dark font-semibold text-lg text-ike-success">
                        {getPriceCodeDetails(selectedStudyPath.priceCode)!.amount.toLocaleString()} SEK
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-ike-neutral">Description</label>
                      <p className="text-ike-neutral-dark">{getPriceCodeDetails(selectedStudyPath.priceCode)!.description}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Validity Period */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Validity Period</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Start Date</label>
                  <p className="text-ike-neutral-dark">{selectedStudyPath.startDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">End Date</label>
                  <p className="text-ike-neutral-dark">{selectedStudyPath.endDate || "No end date"}</p>
                </div>
              </div>
            </div>

            {/* System Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">System Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Created Date</label>
                  <p className="text-ike-neutral-dark">{selectedStudyPath.createdDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Last Modified</label>
                  <p className="text-ike-neutral-dark">{selectedStudyPath.lastModified}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowStudyPathDetails(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const StudyPaths = () => {
  const { toast } = useToast();
  const [studyPaths, setStudyPaths] = useState<StudyPath[]>([
    {
      id: 1,
      name: "Naturvetenskapsprogrammet",
      studyPathCode: "NA",
      priceCode: "NATUR",
      priceCodeName: "Naturvetenskapsprogrammet",
      startDate: "2024-08-01",
      endDate: "2027-06-30",
      description: "Program focusing on natural sciences with emphasis on mathematics, physics, chemistry, and biology.",
      isActive: true,
      createdDate: "2024-01-15",
      lastModified: "2024-02-10"
    },
    {
      id: 2,
      name: "Samhällsvetenskapsprogrammet",
      studyPathCode: "SA",
      priceCode: "SAMHALL",
      priceCodeName: "Samhällsvetenskapsprogrammet",
      startDate: "2024-08-01",
      endDate: "2027-06-30",
      description: "Program focusing on social sciences including history, geography, civics, and languages.",
      isActive: true,
      createdDate: "2024-01-15",
      lastModified: "2024-02-10"
    },
    {
      id: 3,
      name: "Ekonomiprogrammet",
      studyPathCode: "EK",
      priceCode: "EKONOMI",
      priceCodeName: "Ekonomiprogrammet",
      startDate: "2024-08-01",
      description: "Program focusing on economics, business administration, and entrepreneurship.",
      isActive: true,
      createdDate: "2024-01-15",
      lastModified: "2024-03-05"
    }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStudyPath, setSelectedStudyPath] = useState<StudyPath | null>(null);
  const [showStudyPathDetails, setShowStudyPathDetails] = useState(false);
  const [showStudyPathForm, setShowStudyPathForm] = useState(false);
  const [editingStudyPath, setEditingStudyPath] = useState<StudyPath | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [studyPathToDelete, setStudyPathToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<StudyPath>({
    id: 0,
    name: "",
    studyPathCode: "",
    priceCode: "",
    priceCodeName: "",
    startDate: "",
    endDate: "",
    description: "",
    isActive: true,
    createdDate: "",
    lastModified: ""
  });

  const filteredStudyPaths = studyPaths.filter(studyPath => {
    const matchesSearch = studyPath.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         studyPath.studyPathCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         studyPath.priceCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && studyPath.isActive) ||
                         (statusFilter === "inactive" && !studyPath.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (studyPath: StudyPath) => {
    setSelectedStudyPath(studyPath);
    setShowStudyPathDetails(true);
  };

  const handleEdit = (studyPath: StudyPath) => {
    setFormData({ ...studyPath });
    setEditingStudyPath(studyPath);
    setShowStudyPathForm(true);
  };

  const handleDelete = (id: number) => {
    setStudyPathToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (studyPathToDelete !== null) {
      setStudyPaths(studyPaths.filter(sp => sp.id !== studyPathToDelete));
      toast({
        title: "Study Path Deleted",
        description: "The study path has been deleted successfully.",
      });
      setShowDeleteDialog(false);
      setStudyPathToDelete(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString().split('T')[0];
    const studyPathData = {
      ...formData,
      id: editingStudyPath ? editingStudyPath.id : Date.now(),
      createdDate: editingStudyPath ? editingStudyPath.createdDate : now,
      lastModified: now
    };

    if (editingStudyPath) {
      setStudyPaths(studyPaths.map(sp => sp.id === editingStudyPath.id ? studyPathData : sp));
      toast({
        title: "Study Path Updated",
        description: `${studyPathData.name} has been updated successfully.`,
      });
    } else {
      setStudyPaths([...studyPaths, studyPathData]);
      toast({
        title: "Study Path Created",
        description: `${studyPathData.name} has been created successfully.`,
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      name: "",
      studyPathCode: "",
      priceCode: "",
      priceCodeName: "",
      startDate: "",
      endDate: "",
      description: "",
      isActive: true,
      createdDate: "",
      lastModified: ""
    });
    setEditingStudyPath(null);
    setShowStudyPathForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Study Paths Register</h1>
          <p className="text-ike-neutral mt-2">
            Manage study paths with codes, price codes, and validity periods
          </p>
        </div>
        <Button 
          className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          onClick={() => setShowStudyPathForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Study Path
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Study Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{studyPaths.length}</div>
            <div className="text-xs text-ike-neutral">Registered paths</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Active Study Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {studyPaths.filter(sp => sp.isActive).length}
            </div>
            <div className="text-xs text-ike-neutral">Currently available</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-neutral">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Inactive Study Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {studyPaths.filter(sp => !sp.isActive).length}
            </div>
            <div className="text-xs text-ike-neutral">Not available</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Price Codes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{priceCodes.length}</div>
            <div className="text-xs text-ike-neutral">Available codes</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search by name, code, or price code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Study Paths Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <BookOpen className="w-5 h-5 mr-2 text-ike-primary" />
            Study Paths ({filteredStudyPaths.length})
          </CardTitle>
          <CardDescription>
            Manage study path information including codes and price links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StudyPathTable 
            filteredStudyPaths={filteredStudyPaths} 
            handleViewDetails={handleViewDetails} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete}
            priceCodes={priceCodes}
          />
        </CardContent>
      </Card>

      {/* Study Path Form Modal */}
      <Dialog open={showStudyPathForm} onOpenChange={setShowStudyPathForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <BookOpen className="w-5 h-5 mr-2 text-ike-primary" />
              {editingStudyPath ? "Edit Study Path" : "Create New Study Path"}
            </DialogTitle>
            <DialogDescription>
              {editingStudyPath ? "Update study path information" : "Enter study path details to create a new record"}
            </DialogDescription>
          </DialogHeader>
          <StudyPathForm 
            formData={formData} 
            setFormData={setFormData} 
            priceCodes={priceCodes} 
            editingStudyPath={editingStudyPath} 
            handleSubmit={handleSubmit} 
            resetForm={resetForm} 
          />
        </DialogContent>
      </Dialog>

      {/* Study Path Details Modal */}
      <StudyPathDetailsModal 
        selectedStudyPath={selectedStudyPath} 
        showStudyPathDetails={showStudyPathDetails} 
        setShowStudyPathDetails={setShowStudyPathDetails} 
        getStatusBadge={getStatusBadge} 
        priceCodes={priceCodes}
      />

      {/* Delete Confirmation Modal */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-ike-neutral-dark">
              <Trash2 className="w-5 h-5 mr-2 text-red-500" />
              Delete Study Path
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this study path? This action cannot be undone and may affect 
              students currently enrolled in this path.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Study Path
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StudyPaths;
