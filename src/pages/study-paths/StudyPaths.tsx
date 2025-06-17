import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Book, Plus, Search, Filter, Edit, Trash2, Eye, Download, CalendarIcon, Euro, DollarSign } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface StudyPath {
  id: string;
  name: string;
  code: string;
  status: "Active" | "Pending" | "Inactive";
  municipality: string;
  priceCode?: string;
  students: number;
  startDate?: Date;
  endDate?: Date;
}

interface PriceCode {
  id: number;
  code: string;
  name: string;
  specialization: string;
  normalPrice: number;
  internalPrice: number;
  status: "active" | "inactive";
  lastUpdated: string;
}

export default function StudyPaths() {
  const { toast } = useToast();
  const [studyPaths, setStudyPaths] = useState<StudyPath[]>([
    { 
      id: "1", 
      name: "Natural Science", 
      code: "NA001", 
      status: "Active", 
      municipality: "Malmö", 
      priceCode: "NA", 
      students: 120,
      startDate: new Date("2024-08-15"),
      endDate: new Date("2027-06-15")
    },
    { 
      id: "2", 
      name: "Social Science", 
      code: "SA002", 
      status: "Active", 
      municipality: "Lund", 
      priceCode: "SA", 
      students: 85,
      startDate: new Date("2024-08-15"),
      endDate: new Date("2027-06-15")
    },
    { 
      id: "3", 
      name: "Technology", 
      code: "TE003", 
      status: "Pending", 
      municipality: "Helsingborg", 
      priceCode: "TE", 
      students: 67,
      startDate: new Date("2025-08-15"),
      endDate: new Date("2028-06-15")
    },
    { 
      id: "4", 
      name: "Arts", 
      code: "AR004", 
      status: "Active", 
      municipality: "Malmö", 
      priceCode: "ES", 
      students: 45,
      startDate: new Date("2024-08-15"),
      endDate: new Date("2027-06-15")
    },
    { 
      id: "5", 
      name: "Business", 
      code: "BU005", 
      status: "Inactive", 
      municipality: "Lund", 
      students: 0,
      startDate: new Date("2023-08-15"),
      endDate: new Date("2024-06-15")
    },
  ]);

  // Price codes from the financial module
  const [priceCodes] = useState<PriceCode[]>([
    {
      id: 1,
      code: "NA",
      name: "Naturvetenskapsprogrammet",
      specialization: "Naturvetenskap och samhälle",
      normalPrice: 125000,
      internalPrice: 118000,
      status: "active",
      lastUpdated: "2024-06-15"
    },
    {
      id: 2,
      code: "SA",
      name: "Samhällsvetenskapsprogrammet",
      specialization: "Samhällsvetenskap",
      normalPrice: 122000,
      internalPrice: 115000,
      status: "active",
      lastUpdated: "2024-06-15"
    },
    {
      id: 3,
      code: "TE",
      name: "Teknikprogrammet",
      specialization: "Teknik",
      normalPrice: 135000,
      internalPrice: 128000,
      status: "active",
      lastUpdated: "2024-06-15"
    },
    {
      id: 4,
      code: "EK",
      name: "Ekonomiprogrammet",
      specialization: "Ekonomi",
      normalPrice: 120000,
      internalPrice: 113000,
      status: "active",
      lastUpdated: "2024-05-20"
    },
    {
      id: 5,
      code: "ES",
      name: "Estetiska programmet",
      specialization: "Estetik",
      normalPrice: 130000,
      internalPrice: 123000,
      status: "active",
      lastUpdated: "2024-06-15"
    }
  ]);

  // Predefined options for dropdowns
  const municipalities = ["Malmö", "Lund", "Helsingborg", "Kristianstad", "Växjö"];

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [editingPath, setEditingPath] = useState<StudyPath | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    municipality: "",
    priceCode: "",
    status: "Active" as StudyPath["status"],
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined
  });

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      municipality: "",
      priceCode: "",
      status: "Active",
      startDate: undefined,
      endDate: undefined
    });
  };

  const validateDates = (startDate?: Date, endDate?: Date): string | null => {
    if (!startDate || !endDate) return null;
    if (endDate <= startDate) {
      return "End date must be after start date";
    }
    return null;
  };

  const handleAdd = () => {
    if (!formData.name || !formData.code || !formData.municipality) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const dateError = validateDates(formData.startDate, formData.endDate);
    if (dateError) {
      toast({
        title: "Error",
        description: dateError,
        variant: "destructive",
      });
      return;
    }

    const newPath: StudyPath = {
      id: Date.now().toString(),
      name: formData.name,
      code: formData.code,
      status: formData.status,
      municipality: formData.municipality,
      priceCode: formData.priceCode || undefined,
      students: 0,
      startDate: formData.startDate,
      endDate: formData.endDate
    };

    setStudyPaths([...studyPaths, newPath]);
    setIsAddDialogOpen(false);
    resetForm();
    
    toast({
      title: "Success",
      description: "Study path added successfully.",
    });
  };

  const handleEdit = (path: StudyPath) => {
    setEditingPath(path);
    setFormData({
      name: path.name,
      code: path.code,
      municipality: path.municipality,
      priceCode: path.priceCode || "",
      status: path.status,
      startDate: path.startDate,
      endDate: path.endDate
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.code || !formData.municipality || !editingPath) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const dateError = validateDates(formData.startDate, formData.endDate);
    if (dateError) {
      toast({
        title: "Error",
        description: dateError,
        variant: "destructive",
      });
      return;
    }

    const updatedPaths = studyPaths.map(path =>
      path.id === editingPath.id
        ? {
            ...path,
            name: formData.name,
            code: formData.code,
            municipality: formData.municipality,
            priceCode: formData.priceCode || undefined,
            status: formData.status,
            startDate: formData.startDate,
            endDate: formData.endDate
          }
        : path
    );

    setStudyPaths(updatedPaths);
    setIsEditDialogOpen(false);
    setEditingPath(null);
    resetForm();
    
    toast({
      title: "Success",
      description: "Study path updated successfully.",
    });
  };

  const handleDelete = (id: string) => {
    setStudyPaths(studyPaths.filter(path => path.id !== id));
    toast({
      title: "Success",
      description: "Study path deleted successfully.",
    });
  };

  const handleImport = () => {
    toast({
      title: "Import Started",
      description: "Importing study paths from Swedish national database...",
    });
    setIsImportDialogOpen(false);
  };

  const handleAddDialogOpen = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  const filteredPaths = studyPaths.filter(path =>
    path.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    path.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    path.municipality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriceCodeDetails = (priceCodeValue?: string) => {
    if (!priceCodeValue) return null;
    return priceCodes.find(pc => pc.code === priceCodeValue);
  };

  const DatePicker = ({ date, onDateChange, placeholder }: { 
    date?: Date; 
    onDateChange: (date: Date | undefined) => void; 
    placeholder: string;
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
          className={cn("p-3 pointer-events-auto")}
        />
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Study Paths</h1>
          <p className="text-ike-neutral mt-2">
            Manage study paths connected to price codes and national programs
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Import from Database
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import from Swedish National Database</DialogTitle>
                <DialogDescription>
                  This will import the latest study paths and their connections to national programs from the Swedish national school database.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 bg-ike-neutral-light rounded-lg">
                  <h4 className="font-medium mb-2">Import Options:</h4>
                  <ul className="text-sm text-ike-neutral space-y-1">
                    <li>• Study paths from national programs</li>
                    <li>• Municipal study path configurations</li>
                    <li>• Price code connections</li>
                    <li>• Student enrollment data</li>
                  </ul>
                </div>
                <p className="text-sm text-ike-neutral">
                  Last import: December 15, 2024. This operation may take a few minutes and will update existing study paths with new data.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleImport} className="bg-ike-primary hover:bg-ike-primary/90">
                  Start Import
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-ike-primary hover:bg-ike-primary/90" onClick={handleAddDialogOpen}>
                <Plus className="w-4 h-4 mr-2" />
                Add Study Path
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Study Path</DialogTitle>
                <DialogDescription>
                  Create a new study path for the regional education system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Study Path Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Natural Science"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="code">Study Path Code *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g., NA001"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="municipality">Municipality *</Label>
                  <Select value={formData.municipality} onValueChange={(value) => setFormData({ ...formData, municipality: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select municipality" />
                    </SelectTrigger>
                    <SelectContent>
                      {municipalities.map((municipality) => (
                        <SelectItem key={municipality} value={municipality}>
                          {municipality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priceCode">Price Code *</Label>
                  <Select value={formData.priceCode} onValueChange={(value) => setFormData({ ...formData, priceCode: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price code" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceCodes.filter(pc => pc.status === "active").map((priceCode) => (
                        <SelectItem key={priceCode.code} value={priceCode.code}>
                          <div className="flex items-center justify-between w-full">
                            <span>{priceCode.code} - {priceCode.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {priceCode.normalPrice.toLocaleString('sv-SE')} SEK
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.priceCode && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {(() => {
                        const selectedPrice = priceCodes.find(pc => pc.code === formData.priceCode);
                        return selectedPrice ? (
                          <div className="flex gap-4">
                            <span>Normal: {selectedPrice.normalPrice.toLocaleString('sv-SE')} SEK</span>
                            <span>Internal: {selectedPrice.internalPrice.toLocaleString('sv-SE')} SEK</span>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Start Date</Label>
                    <DatePicker
                      date={formData.startDate}
                      onDateChange={(date) => setFormData({ ...formData, startDate: date })}
                      placeholder="Select start date"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>End Date</Label>
                    <DatePicker
                      date={formData.endDate}
                      onDateChange={(date) => setFormData({ ...formData, endDate: date })}
                      placeholder="Select end date"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd} className="bg-ike-primary hover:bg-ike-primary/90">
                  Add Study Path
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5 text-ike-primary" />
              Total Study Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{studyPaths.length}</div>
            <p className="text-ike-neutral text-sm">Across all municipalities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-ike-primary" />
              Active Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">
              {studyPaths.filter(p => p.status === "Active").length}
            </div>
            <p className="text-ike-neutral text-sm">Currently available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-ike-primary" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">
              {studyPaths.reduce((sum, path) => sum + path.students, 0)}
            </div>
            <p className="text-ike-neutral text-sm">Enrolled students</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Study Paths Management</CardTitle>
              <CardDescription>Manage all study paths in the region with linked price codes</CardDescription>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Search study paths..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPaths.map((path) => {
              const priceCodeDetails = getPriceCodeDetails(path.priceCode);
              
              return (
                <div key={path.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{path.name}</h3>
                      {priceCodeDetails && (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-ike-primary border-ike-primary">
                            <Euro className="w-3 h-3 mr-1" />
                            {priceCodeDetails.code}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-ike-neutral">
                      Code: {path.code} • {path.municipality} • {path.students} students
                    </p>
                    {priceCodeDetails && (
                      <div className="flex items-center gap-4 mt-1 text-sm text-ike-neutral">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          Normal: {priceCodeDetails.normalPrice.toLocaleString('sv-SE')} SEK
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          Internal: {priceCodeDetails.internalPrice.toLocaleString('sv-SE')} SEK
                        </span>
                      </div>
                    )}
                    {(path.startDate || path.endDate) && (
                      <p className="text-sm text-ike-neutral mt-1">
                        {path.startDate && `Start: ${format(path.startDate, "MMM dd, yyyy")}`}
                        {path.startDate && path.endDate && " • "}
                        {path.endDate && `End: ${format(path.endDate, "MMM dd, yyyy")}`}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      path.status === "Active" ? "default" : 
                      path.status === "Pending" ? "secondary" : 
                      "outline"
                    }>
                      {path.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(path)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Study Path</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{path.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(path.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              );
            })}
            {filteredPaths.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? "No study paths found matching your search." : "No study paths available."}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Study Path</DialogTitle>
            <DialogDescription>
              Update the study path information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Study Path Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Natural Science"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-code">Study Path Code *</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., NA001"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-municipality">Municipality *</Label>
              <Select value={formData.municipality} onValueChange={(value) => setFormData({ ...formData, municipality: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select municipality" />
                </SelectTrigger>
                <SelectContent>
                  {municipalities.map((municipality) => (
                    <SelectItem key={municipality} value={municipality}>
                      {municipality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-priceCode">Price Code *</Label>
              <Select value={formData.priceCode} onValueChange={(value) => setFormData({ ...formData, priceCode: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select price code" />
                </SelectTrigger>
                <SelectContent>
                  {priceCodes.filter(pc => pc.status === "active").map((priceCode) => (
                    <SelectItem key={priceCode.code} value={priceCode.code}>
                      <div className="flex items-center justify-between w-full">
                        <span>{priceCode.code} - {priceCode.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {priceCode.normalPrice.toLocaleString('sv-SE')} SEK
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.priceCode && (
                <div className="text-xs text-muted-foreground mt-1">
                  {(() => {
                    const selectedPrice = priceCodes.find(pc => pc.code === formData.priceCode);
                    return selectedPrice ? (
                      <div className="flex gap-4">
                        <span>Normal: {selectedPrice.normalPrice.toLocaleString('sv-SE')} SEK</span>
                        <span>Internal: {selectedPrice.internalPrice.toLocaleString('sv-SE')} SEK</span>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as StudyPath["status"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Start Date</Label>
                <DatePicker
                  date={formData.startDate}
                  onDateChange={(date) => setFormData({ ...formData, startDate: date })}
                  placeholder="Select start date"
                />
              </div>
              <div className="grid gap-2">
                <Label>End Date</Label>
                <DatePicker
                  date={formData.endDate}
                  onDateChange={(date) => setFormData({ ...formData, endDate: date })}
                  placeholder="Select end date"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false);
              setEditingPath(null);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} className="bg-ike-primary hover:bg-ike-primary/90">
              Update Study Path
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
