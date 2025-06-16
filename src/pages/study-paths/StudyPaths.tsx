
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Book, Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface StudyPath {
  id: string;
  name: string;
  code: string;
  status: "Active" | "Pending" | "Inactive";
  municipality: string;
  priceCode?: string;
  students: number;
}

export default function StudyPaths() {
  const { toast } = useToast();
  const [studyPaths, setStudyPaths] = useState<StudyPath[]>([
    { id: "1", name: "Natural Science", code: "NA001", status: "Active", municipality: "Malmö", priceCode: "PC001", students: 120 },
    { id: "2", name: "Social Science", code: "SA002", status: "Active", municipality: "Lund", priceCode: "PC002", students: 85 },
    { id: "3", name: "Technology", code: "TE003", status: "Pending", municipality: "Helsingborg", priceCode: "PC003", students: 67 },
    { id: "4", name: "Arts", code: "AR004", status: "Active", municipality: "Malmö", priceCode: "PC004", students: 45 },
    { id: "5", name: "Business", code: "BU005", status: "Inactive", municipality: "Lund", students: 0 },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPath, setEditingPath] = useState<StudyPath | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    municipality: "",
    priceCode: "",
    status: "Active" as StudyPath["status"]
  });

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      municipality: "",
      priceCode: "",
      status: "Active"
    });
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

    const newPath: StudyPath = {
      id: Date.now().toString(),
      name: formData.name,
      code: formData.code,
      status: formData.status,
      municipality: formData.municipality,
      priceCode: formData.priceCode || undefined,
      students: 0
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
      status: path.status
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

    const updatedPaths = studyPaths.map(path =>
      path.id === editingPath.id
        ? {
            ...path,
            name: formData.name,
            code: formData.code,
            municipality: formData.municipality,
            priceCode: formData.priceCode || undefined,
            status: formData.status
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

  const filteredPaths = studyPaths.filter(path =>
    path.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    path.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    path.municipality.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ike-primary hover:bg-ike-primary/90">
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
                <Input
                  id="municipality"
                  value={formData.municipality}
                  onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                  placeholder="e.g., Malmö"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priceCode">Price Code</Label>
                <Input
                  id="priceCode"
                  value={formData.priceCode}
                  onChange={(e) => setFormData({ ...formData, priceCode: e.target.value })}
                  placeholder="e.g., PC001"
                />
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
              <CardDescription>Manage all study paths in the region</CardDescription>
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
            {filteredPaths.map((path) => (
              <div key={path.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium">{path.name}</h3>
                  <p className="text-sm text-ike-neutral">
                    Code: {path.code} • {path.municipality} • {path.students} students
                    {path.priceCode && ` • Price Code: ${path.priceCode}`}
                  </p>
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
            ))}
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
              <Input
                id="edit-municipality"
                value={formData.municipality}
                onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                placeholder="e.g., Malmö"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-priceCode">Price Code</Label>
              <Input
                id="edit-priceCode"
                value={formData.priceCode}
                onChange={(e) => setFormData({ ...formData, priceCode: e.target.value })}
                placeholder="e.g., PC001"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <select
                id="edit-status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as StudyPath["status"] })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
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
