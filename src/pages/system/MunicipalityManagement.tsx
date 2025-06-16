import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Plus, Users, School, Edit, Trash2, MoreVertical } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const MunicipalityManagement = () => {
  const { toast } = useToast();
  const [isAddMunicipalityOpen, setIsAddMunicipalityOpen] = useState(false);
  const [isEditMunicipalityOpen, setIsEditMunicipalityOpen] = useState(false);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);

  const [municipalities, setMunicipalities] = useState([
    {
      id: 1,
      name: "Malmö Municipality",
      code: "MAL",
      schools: 45,
      students: 12500,
      administrators: 8,
      status: "Active"
    },
    {
      id: 2,
      name: "Lund Municipality",
      code: "LUN",
      schools: 28,
      students: 8200,
      administrators: 5,
      status: "Active"
    },
    {
      id: 3,
      name: "Helsingborg Municipality",
      code: "HEL",
      schools: 38,
      students: 11000,
      administrators: 7,
      status: "Active"
    }
  ]);

  const handleAddMunicipality = () => {
    toast({
      title: "Municipality Added",
      description: "New municipality has been successfully added to the system.",
    });
    setIsAddMunicipalityOpen(false);
  };

  const handleEditMunicipality = (municipality) => {
    setSelectedMunicipality(municipality);
    setIsEditMunicipalityOpen(true);
  };

  const handleUpdateMunicipality = () => {
    toast({
      title: "Municipality Updated",
      description: "Municipality information has been successfully updated.",
    });
    setIsEditMunicipalityOpen(false);
    setSelectedMunicipality(null);
  };

  const handleDeleteMunicipality = (municipalityId) => {
    setMunicipalities(municipalities.filter(municipality => municipality.id !== municipalityId));
    toast({
      title: "Municipality Deleted",
      description: "Municipality has been successfully removed from the system.",
      variant: "destructive",
    });
  };

  const handleManageMunicipality = (municipality) => {
    setSelectedMunicipality(municipality);
    setIsEditMunicipalityOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Municipality Management</h1>
          <p className="text-ike-neutral">Manage municipalities in the regional system</p>
        </div>
        
        <Dialog open={isAddMunicipalityOpen} onOpenChange={setIsAddMunicipalityOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ike-primary hover:bg-ike-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Municipality
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Municipality</DialogTitle>
              <DialogDescription>
                Add a new municipality to the regional system. Fill in all the required information.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" placeholder="Enter municipality name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Code
                </Label>
                <Input id="code" placeholder="Enter municipality code" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="schools" className="text-right">
                  Schools
                </Label>
                <Input id="schools" type="number" placeholder="Number of schools" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="students" className="text-right">
                  Students
                </Label>
                <Input id="students" type="number" placeholder="Number of students" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="administrators" className="text-right">
                  Administrators
                </Label>
                <Input id="administrators" type="number" placeholder="Number of administrators" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddMunicipality}>Add Municipality</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {municipalities.map((municipality) => (
          <Card key={municipality.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-ike-primary" />
                  {municipality.name}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white" align="end">
                    <DropdownMenuItem onClick={() => handleEditMunicipality(municipality)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleManageMunicipality(municipality)}>
                      <Building className="w-4 h-4 mr-2" />
                      Manage
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the municipality
                            "{municipality.name}" and remove all associated data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteMunicipality(municipality.id)}>
                            Delete Municipality
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>Code: {municipality.code}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ike-neutral">Status</span>
                  <Badge className="bg-green-100 text-green-800">{municipality.status}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <School className="w-4 h-4 text-ike-neutral" />
                      <span className="text-sm">Schools</span>
                    </div>
                    <span className="font-medium">{municipality.schools}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-ike-neutral" />
                      <span className="text-sm">Students</span>
                    </div>
                    <span className="font-medium">{municipality.students.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-ike-neutral" />
                      <span className="text-sm">Administrators</span>
                    </div>
                    <span className="font-medium">{municipality.administrators}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleManageMunicipality(municipality)}
                  >
                    Manage Municipality
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Municipality Dialog */}
      <Dialog open={isEditMunicipalityOpen} onOpenChange={setIsEditMunicipalityOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Municipality</DialogTitle>
            <DialogDescription>
              Update municipality information and details.
            </DialogDescription>
          </DialogHeader>
          {selectedMunicipality && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input 
                  id="edit-name" 
                  defaultValue={selectedMunicipality.name} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-code" className="text-right">
                  Code
                </Label>
                <Input 
                  id="edit-code" 
                  defaultValue={selectedMunicipality.code} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-schools" className="text-right">
                  Schools
                </Label>
                <Input 
                  id="edit-schools" 
                  type="number" 
                  defaultValue={selectedMunicipality.schools} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-students" className="text-right">
                  Students
                </Label>
                <Input 
                  id="edit-students" 
                  type="number" 
                  defaultValue={selectedMunicipality.students} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-administrators" className="text-right">
                  Administrators
                </Label>
                <Input 
                  id="edit-administrators" 
                  type="number" 
                  defaultValue={selectedMunicipality.administrators} 
                  className="col-span-3" 
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateMunicipality}>Update Municipality</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MunicipalityManagement;
