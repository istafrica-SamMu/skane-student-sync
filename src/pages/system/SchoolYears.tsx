
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Plus, Check, Clock, Settings, Users, GraduationCap, Archive } from "lucide-react";

interface SchoolYear {
  id: number;
  year: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Completed" | "Planning";
  studentsEnrolled: number;
  schoolsParticipating: number;
}

const SchoolYears = () => {
  const { toast } = useToast();
  const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([
    {
      id: 1,
      year: "2024/2025",
      startDate: "2024-08-19",
      endDate: "2025-06-13",
      status: "Active",
      studentsEnrolled: 45680,
      schoolsParticipating: 156
    },
    {
      id: 2,
      year: "2023/2024",
      startDate: "2023-08-21",
      endDate: "2024-06-14",
      status: "Completed",
      studentsEnrolled: 44320,
      schoolsParticipating: 152
    },
    {
      id: 3,
      year: "2025/2026",
      startDate: "2025-08-18",
      endDate: "2026-06-12",
      status: "Planning",
      studentsEnrolled: 0,
      schoolsParticipating: 0
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<SchoolYear | null>(null);
  const [formData, setFormData] = useState({
    year: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <Check className="w-4 h-4" />;
      case 'Planning':
        return <Clock className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Planning':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateSchoolYear = () => {
    if (!formData.year || !formData.startDate || !formData.endDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newYear: SchoolYear = {
      id: Math.max(...schoolYears.map(y => y.id)) + 1,
      year: formData.year,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: "Planning",
      studentsEnrolled: 0,
      schoolsParticipating: 0
    };

    setSchoolYears([...schoolYears, newYear]);
    setIsCreateDialogOpen(false);
    setFormData({ year: "", startDate: "", endDate: "", description: "" });
    
    toast({
      title: "Success",
      description: `School year ${formData.year} has been created successfully.`
    });
  };

  const handleEditSchoolYear = () => {
    if (!selectedYear || !formData.year || !formData.startDate || !formData.endDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setSchoolYears(schoolYears.map(year => 
      year.id === selectedYear.id 
        ? { ...year, year: formData.year, startDate: formData.startDate, endDate: formData.endDate }
        : year
    ));

    setIsEditDialogOpen(false);
    setSelectedYear(null);
    setFormData({ year: "", startDate: "", endDate: "", description: "" });
    
    toast({
      title: "Success",
      description: `School year has been updated successfully.`
    });
  };

  const handleManageYear = (year: SchoolYear) => {
    setSelectedYear(year);
    setFormData({
      year: year.year,
      startDate: year.startDate,
      endDate: year.endDate,
      description: ""
    });
    setIsEditDialogOpen(true);
  };

  const handlePromoteStudents = (year: SchoolYear) => {
    toast({
      title: "Students Promoted",
      description: `All students in ${year.year} have been promoted to the next grade level.`
    });
  };

  const handleCompleteYear = (year: SchoolYear) => {
    setSchoolYears(schoolYears.map(y => 
      y.id === year.id ? { ...y, status: "Completed" as const } : y
    ));
    
    toast({
      title: "School Year Completed",
      description: `School year ${year.year} has been marked as completed.`
    });
  };

  const handleAnnualPromotion = () => {
    toast({
      title: "Annual Promotion Started",
      description: "The annual grade promotion process has been initiated for all students."
    });
  };

  const handleCompleteCurrentYear = () => {
    const activeYear = schoolYears.find(year => year.status === "Active");
    if (activeYear) {
      handleCompleteYear(activeYear);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">School Years</h1>
          <p className="text-ike-neutral">Manage academic years across the regional system</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ike-primary hover:bg-ike-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create New School Year
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New School Year</DialogTitle>
              <DialogDescription>
                Add a new academic year to the system. This will be available for planning and enrollment.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">Academic Year*</Label>
                <Input
                  id="year"
                  placeholder="e.g., 2025/2026"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">Start Date*</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">End Date*</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Notes</Label>
                <Textarea
                  id="description"
                  placeholder="Optional notes about this academic year..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateSchoolYear} className="bg-ike-primary hover:bg-ike-primary/90">
                Create School Year
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schoolYears.map((year) => (
          <Card key={year.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-ike-primary" />
                  {year.year}
                </CardTitle>
                <Badge className={`${getStatusColor(year.status)} flex items-center gap-1`}>
                  {getStatusIcon(year.status)}
                  {year.status}
                </Badge>
              </div>
              <CardDescription>
                {new Date(year.startDate).toLocaleDateString('sv-SE')} - {new Date(year.endDate).toLocaleDateString('sv-SE')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-ike-neutral-light rounded-lg">
                    <div className="text-2xl font-bold text-ike-primary">
                      {year.studentsEnrolled.toLocaleString()}
                    </div>
                    <div className="text-sm text-ike-neutral">Students</div>
                  </div>
                  <div className="text-center p-3 bg-ike-neutral-light rounded-lg">
                    <div className="text-2xl font-bold text-ike-primary">
                      {year.schoolsParticipating}
                    </div>
                    <div className="text-sm text-ike-neutral">Schools</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleManageYear(year)}
                    disabled={year.status === 'Completed'}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Year Settings
                  </Button>
                  {year.status === 'Active' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full text-blue-600 hover:text-blue-700"
                        >
                          <GraduationCap className="w-4 h-4 mr-2" />
                          Promote All Students
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Promote All Students?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will promote all students in {year.year} to the next grade level. 
                            This action cannot be undone easily. Are you sure you want to continue?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handlePromoteStudents(year)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Promote Students
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit School Year Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit School Year</DialogTitle>
            <DialogDescription>
              Update the details for the selected academic year.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editYear" className="text-right">Academic Year*</Label>
              <Input
                id="editYear"
                placeholder="e.g., 2025/2026"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editStartDate" className="text-right">Start Date*</Label>
              <Input
                id="editStartDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editEndDate" className="text-right">End Date*</Label>
              <Input
                id="editEndDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editDescription" className="text-right">Notes</Label>
              <Textarea
                id="editDescription"
                placeholder="Optional notes about this academic year..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSchoolYear} className="bg-ike-primary hover:bg-ike-primary/90">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>School Year Operations</CardTitle>
          <CardDescription>
            Annual operations and transitions between school years
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="p-6 h-auto flex-col gap-2">
                  <Users className="w-8 h-8 text-ike-primary" />
                  <span className="font-medium">Annual Grade Promotion</span>
                  <span className="text-sm text-ike-neutral text-center">
                    Promote all students to next grade level
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Start Annual Grade Promotion?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will initiate the annual grade promotion process for all students across the region. 
                    This is a major operation that affects all schools. Are you sure you want to proceed?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleAnnualPromotion}
                    className="bg-ike-primary hover:bg-ike-primary/90"
                  >
                    Start Promotion
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="p-6 h-auto flex-col gap-2">
                  <Archive className="w-8 h-8 text-ike-primary" />
                  <span className="font-medium">Complete School Year</span>
                  <span className="text-sm text-ike-neutral text-center">
                    Finalize current academic year
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Complete Current School Year?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will mark the current active school year as completed and finalize all records. 
                    This action cannot be easily undone. Are you sure you want to proceed?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleCompleteCurrentYear}
                    className="bg-ike-primary hover:bg-ike-primary/90"
                  >
                    Complete Year
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolYears;
