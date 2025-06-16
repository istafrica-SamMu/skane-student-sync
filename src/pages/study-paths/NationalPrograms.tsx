import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { GraduationCap, Plus, Download, Upload, Edit, Trash2, Eye, Calendar } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const programFormSchema = z.object({
  code: z.string().min(1, "Program code is required").max(5, "Code must be 5 characters or less"),
  name: z.string().min(1, "Program name is required"),
  englishName: z.string().min(1, "English name is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  duration: z.string().min(1, "Duration is required"),
  status: z.enum(["Active", "Inactive", "Draft"]),
});

type ProgramFormValues = z.infer<typeof programFormSchema>;

interface Program {
  code: string;
  name: string;
  english: string;
  specializations: number;
  students: number;
  status: "Active" | "Updated" | "Inactive";
  category?: string;
  duration?: string;
  description?: string;
}

export default function NationalPrograms() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const form = useForm<ProgramFormValues>({
    resolver: zodResolver(programFormSchema),
    defaultValues: {
      code: "",
      name: "",
      englishName: "",
      description: "",
      category: "",
      duration: "",
      status: "Active",
    },
  });

  const programs: Program[] = [
    { 
      code: "NA", 
      name: "Naturvetenskapsprogrammet", 
      english: "Natural Science Programme",
      specializations: 8,
      students: 1245,
      status: "Active",
      category: "Academic",
      duration: "3 years"
    },
    { 
      code: "SA", 
      name: "Samhällsvetenskapsprogrammet", 
      english: "Social Science Programme",
      specializations: 12,
      students: 2156,
      status: "Active",
      category: "Academic",
      duration: "3 years"
    },
    { 
      code: "TE", 
      name: "Teknikprogrammet", 
      english: "Technology Programme",
      specializations: 15,
      students: 1876,
      status: "Updated",
      category: "Vocational",
      duration: "3 years"
    },
    { 
      code: "ES", 
      name: "Estetiska programmet", 
      english: "Arts Programme",
      specializations: 9,
      students: 892,
      status: "Active",
      category: "Arts",
      duration: "3 years"
    },
  ];

  const onSubmit = (values: ProgramFormValues) => {
    console.log('Form submitted:', values);
    toast({
      title: selectedProgram ? "Program Updated" : "Program Added",
      description: `${values.name} has been ${selectedProgram ? 'updated' : 'added'} successfully.`,
    });
    form.reset();
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedProgram(null);
  };

  const handleEdit = (program: Program) => {
    setSelectedProgram(program);
    form.reset({
      code: program.code,
      name: program.name,
      englishName: program.english,
      description: program.description || "",
      category: program.category || "",
      duration: program.duration || "",
      status: program.status === "Updated" ? "Active" : program.status as "Active" | "Inactive" | "Draft",
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (program: Program) => {
    toast({
      title: "Program Deleted",
      description: `${program.name} has been deleted successfully.`,
      variant: "destructive",
    });
  };

  const handleImport = () => {
    toast({
      title: "Import Started",
      description: "Importing programs from Swedish national database...",
    });
    setIsImportDialogOpen(false);
  };

  const handleViewHistory = (program: Program) => {
    setSelectedProgram(program);
    setIsHistoryDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">National Programs</h1>
          <p className="text-ike-neutral mt-2">
            Manage national programs and specialization codes from Swedish national school database
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
                  This will import the latest national programs and specialization codes from the Swedish national school database.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 bg-ike-neutral-light rounded-lg">
                  <h4 className="font-medium mb-2">Import Options:</h4>
                  <ul className="text-sm text-ike-neutral space-y-1">
                    <li>• National programs (18 programs)</li>
                    <li>• Specialization codes (156 codes)</li>
                    <li>• Program descriptions and requirements</li>
                    <li>• Updated classification codes</li>
                  </ul>
                </div>
                <p className="text-sm text-ike-neutral">
                  Last import: December 15, 2024. This operation may take a few minutes.
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
              <Button className="bg-ike-primary hover:bg-ike-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Program
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New National Program</DialogTitle>
                <DialogDescription>
                  Add a new national program to the system.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Program Code</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., NA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Inactive">Inactive</SelectItem>
                              <SelectItem value="Draft">Draft</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Name (Swedish)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Naturvetenskapsprogrammet" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="englishName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Name (English)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Natural Science Programme" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Academic">Academic</SelectItem>
                              <SelectItem value="Vocational">Vocational</SelectItem>
                              <SelectItem value="Arts">Arts</SelectItem>
                              <SelectItem value="Special">Special</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="2 years">2 years</SelectItem>
                              <SelectItem value="3 years">3 years</SelectItem>
                              <SelectItem value="4 years">4 years</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter program description..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-ike-primary hover:bg-ike-primary/90">
                      Add Program
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-ike-primary" />
              National Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">18</div>
            <p className="text-ike-neutral text-sm">Available programs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-ike-primary" />
              Specializations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">156</div>
            <p className="text-ike-neutral text-sm">Specialization codes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-ike-primary" />
              Last Import
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">Dec 15</div>
            <p className="text-ike-neutral text-sm">2024 database update</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>National Programs Overview</CardTitle>
          <CardDescription>Programs imported from Swedish national school database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {programs.map((program, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{program.name}</h3>
                  <p className="text-sm text-ike-neutral">
                    {program.code} • {program.english} • {program.specializations} specializations • {program.students} students
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={program.status === "Updated" ? "secondary" : "default"}>
                    {program.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewHistory(program)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(program)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Program</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{program.name}"? This action cannot be undone and will affect {program.students} students.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDelete(program)}
                            className="bg-red-500 hover:bg-red-600"
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
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit National Program</DialogTitle>
            <DialogDescription>
              Edit the details of the selected national program.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program Code</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Name (Swedish)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="englishName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Name (English)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Academic">Academic</SelectItem>
                          <SelectItem value="Vocational">Vocational</SelectItem>
                          <SelectItem value="Arts">Arts</SelectItem>
                          <SelectItem value="Special">Special</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2 years">2 years</SelectItem>
                          <SelectItem value="3 years">3 years</SelectItem>
                          <SelectItem value="4 years">4 years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-ike-primary hover:bg-ike-primary/90">
                  Update Program
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Program History - {selectedProgram?.name}</DialogTitle>
            <DialogDescription>
              View the change history for this national program.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {[
              {
                date: "2024-12-15",
                action: "Database Import",
                user: "System",
                changes: "Updated specialization count from 7 to 8"
              },
              {
                date: "2024-11-20",
                action: "Manual Update",
                user: "Admin User",
                changes: "Updated English name translation"
              },
              {
                date: "2024-10-01",
                action: "Status Change",
                user: "Regional Admin",
                changes: "Changed status from Draft to Active"
              },
              {
                date: "2024-09-15",
                action: "Created",
                user: "System",
                changes: "Program imported from national database"
              }
            ].map((entry, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <Calendar className="w-5 h-5 text-ike-primary mt-0.5" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{entry.action}</h4>
                    <span className="text-sm text-ike-neutral">{entry.date}</span>
                  </div>
                  <p className="text-sm text-ike-neutral mb-1">{entry.changes}</p>
                  <p className="text-xs text-ike-neutral">by {entry.user}</p>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsHistoryDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
