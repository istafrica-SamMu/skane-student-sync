
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { Building, School, Users, MapPin, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Municipality, SchoolUnit, Principal, Group } from "@/types/organizationalHierarchy";

interface OrganizationalHierarchyProps {
  municipalities: Municipality[];
  schoolUnits: SchoolUnit[];
  principals: Principal[];
  groups: Group[];
  onUpdateHierarchy: (type: string, data: any) => void;
}

export function OrganizationalHierarchy({
  municipalities,
  schoolUnits,
  principals,
  groups,
  onUpdateHierarchy
}: OrganizationalHierarchyProps) {
  const { toast } = useToast();
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("");
  const [selectedSchoolUnit, setSelectedSchoolUnit] = useState<string>("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'municipality' | 'school' | 'principal' | 'group'>('municipality');

  const [newItem, setNewItem] = useState({
    name: "",
    code: "",
    type: "",
    address: "",
    grade: "",
    academicYear: "",
    municipalityId: "",
    schoolUnitId: "",
    principalId: ""
  });

  const filteredSchoolUnits = selectedMunicipality
    ? schoolUnits.filter(unit => unit.municipalityId === selectedMunicipality)
    : schoolUnits;

  const filteredGroups = selectedSchoolUnit
    ? groups.filter(group => group.schoolUnitId === selectedSchoolUnit)
    : groups;

  const handleAddItem = () => {
    if (!newItem.name) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }

    onUpdateHierarchy(dialogType, newItem);
    setNewItem({
      name: "",
      code: "",
      type: "",
      address: "",
      grade: "",
      academicYear: "",
      municipalityId: "",
      schoolUnitId: "",
      principalId: ""
    });
    setShowAddDialog(false);

    toast({
      title: "Success",
      description: `${dialogType} added successfully`,
    });
  };

  const openAddDialog = (type: 'municipality' | 'school' | 'principal' | 'group') => {
    setDialogType(type);
    setShowAddDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-ike-primary">Organizational Hierarchy</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => openAddDialog('municipality')}>
            <Building className="w-4 h-4 mr-2" />
            Add Municipality
          </Button>
          <Button variant="outline" onClick={() => openAddDialog('school')}>
            <School className="w-4 h-4 mr-2" />
            Add School Unit
          </Button>
          <Button variant="outline" onClick={() => openAddDialog('principal')}>
            <Users className="w-4 h-4 mr-2" />
            Add Principal
          </Button>
          <Button variant="outline" onClick={() => openAddDialog('group')}>
            <MapPin className="w-4 h-4 mr-2" />
            Add Group
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Hierarchy</CardTitle>
          <CardDescription>Select municipality and school unit to filter the organizational structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="municipality-filter">Municipality</Label>
              <Select value={selectedMunicipality} onValueChange={setSelectedMunicipality}>
                <SelectTrigger>
                  <SelectValue placeholder="All municipalities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All municipalities</SelectItem>
                  {municipalities.map((municipality) => (
                    <SelectItem key={municipality.id} value={municipality.id}>
                      {municipality.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="school-filter">School Unit</Label>
              <Select value={selectedSchoolUnit} onValueChange={setSelectedSchoolUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="All school units" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All school units</SelectItem>
                  {filteredSchoolUnits.map((school) => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hierarchy Display */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Municipalities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-ike-primary" />
              Municipalities ({municipalities.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {municipalities.map((municipality) => (
                <div key={municipality.id} className="p-2 border rounded flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{municipality.name}</p>
                    <p className="text-xs text-ike-neutral">{municipality.code}</p>
                  </div>
                  <Badge variant={municipality.isActive ? "default" : "secondary"}>
                    {municipality.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* School Units */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="w-5 h-5 text-ike-primary" />
              School Units ({filteredSchoolUnits.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredSchoolUnits.map((school) => (
                <div key={school.id} className="p-2 border rounded">
                  <p className="font-medium text-sm">{school.name}</p>
                  <p className="text-xs text-ike-neutral">{school.type}</p>
                  <p className="text-xs text-ike-neutral">{school.municipality.name}</p>
                  {school.principal && (
                    <p className="text-xs text-ike-primary">Principal: {school.principal.name}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Principals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-ike-primary" />
              Principals ({principals.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {principals.map((principal) => (
                <div key={principal.id} className="p-2 border rounded">
                  <p className="font-medium text-sm">{principal.name}</p>
                  <p className="text-xs text-ike-neutral">{principal.email}</p>
                  <p className="text-xs text-ike-neutral">
                    Schools: {principal.schoolUnits.length}
                  </p>
                  <Badge variant={principal.isActive ? "default" : "secondary"}>
                    {principal.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Groups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-ike-primary" />
              Groups ({filteredGroups.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredGroups.map((group) => (
                <div key={group.id} className="p-2 border rounded">
                  <p className="font-medium text-sm">{group.name}</p>
                  <p className="text-xs text-ike-neutral">Grade: {group.grade}</p>
                  <p className="text-xs text-ike-neutral">{group.academicYear}</p>
                  <p className="text-xs text-ike-neutral">{group.schoolUnit.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Item Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New {dialogType}</DialogTitle>
            <DialogDescription>
              Create a new {dialogType} in the organizational hierarchy.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                className="col-span-3"
              />
            </div>

            {(dialogType === 'municipality' || dialogType === 'school') && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">Code</Label>
                <Input
                  id="code"
                  value={newItem.code}
                  onChange={(e) => setNewItem(prev => ({ ...prev, code: e.target.value }))}
                  className="col-span-3"
                />
              </div>
            )}

            {dialogType === 'school' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="municipality" className="text-right">Municipality</Label>
                  <Select value={newItem.municipalityId} onValueChange={(value) => setNewItem(prev => ({ ...prev, municipalityId: value }))}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select municipality" />
                    </SelectTrigger>
                    <SelectContent>
                      {municipalities.map((municipality) => (
                        <SelectItem key={municipality.id} value={municipality.id}>
                          {municipality.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">Type</Label>
                  <Select value={newItem.type} onValueChange={(value) => setNewItem(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elementary">Elementary</SelectItem>
                      <SelectItem value="middle">Middle</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="special">Special</SelectItem>
                      <SelectItem value="adult_education">Adult Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">Address</Label>
                  <Input
                    id="address"
                    value={newItem.address}
                    onChange={(e) => setNewItem(prev => ({ ...prev, address: e.target.value }))}
                    className="col-span-3"
                  />
                </div>
              </>
            )}

            {dialogType === 'group' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="schoolUnit" className="text-right">School Unit</Label>
                  <Select value={newItem.schoolUnitId} onValueChange={(value) => setNewItem(prev => ({ ...prev, schoolUnitId: value }))}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select school unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {schoolUnits.map((school) => (
                        <SelectItem key={school.id} value={school.id}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="grade" className="text-right">Grade</Label>
                  <Input
                    id="grade"
                    value={newItem.grade}
                    onChange={(e) => setNewItem(prev => ({ ...prev, grade: e.target.value }))}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="academicYear" className="text-right">Academic Year</Label>
                  <Input
                    id="academicYear"
                    value={newItem.academicYear}
                    onChange={(e) => setNewItem(prev => ({ ...prev, academicYear: e.target.value }))}
                    className="col-span-3"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddItem}>Add {dialogType}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
