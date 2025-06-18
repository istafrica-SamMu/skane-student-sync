
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Search, Plus, Edit, User, School, Trash2, Users } from "lucide-react";
import { CategoryManagement } from "@/components/CategoryManagement";
import type { AdditionalAmount, AmountCategory, AmountFormData } from "@/types/additionalAmounts";

const AdditionalAmounts = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<AdditionalAmount | null>(null);
  const [activeTab, setActiveTab] = useState("amounts");

  const form = useForm<AmountFormData>({
    defaultValues: {
      type: "Student",
      targetId: "",
      targetName: "",
      school: "",
      principal: "",
      program: "",
      category: "Basic amount",
      title: "",
      amount: 0,
      multiplier: 1,
      note: "",
      validFrom: "",
      validTo: "",
    },
  });

  const [categories, setCategories] = useState<AmountCategory[]>([
    { id: "1", name: "Basic amount", isDefault: true, canDelete: false },
    { id: "2", name: "Mother tongue", isDefault: true, canDelete: false },
    { id: "3", name: "NIU", isDefault: true, canDelete: false },
    { id: "4", name: "Special support", isDefault: true, canDelete: false },
    { id: "5", name: "Supplement IMV", isDefault: true, canDelete: false },
    { id: "6", name: "Other amount", isDefault: true, canDelete: false },
  ]);

  const [additionalAmounts, setAdditionalAmounts] = useState<AdditionalAmount[]>([
    {
      id: 1,
      type: "Student",
      targetId: "student-001",
      targetName: "Anna Andersson",
      school: "Malmö Gymnasium",
      principal: "Lars Larsson",
      program: "Naturvetenskapsprogrammet",
      category: "Special support",
      title: "Learning support",
      amount: 5000,
      multiplier: 1,
      note: "Additional support for mathematics",
      status: "active",
      validFrom: "2024-01-15",
      validTo: "2024-06-30",
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z"
    },
    {
      id: 2,
      type: "School",
      targetId: "school-001",
      targetName: "Malmö Technical School",
      school: "Malmö Technical School",
      principal: "Erik Eriksson",
      program: "All programs",
      category: "Basic amount",
      title: "Administrative efficiency",
      amount: -2000,
      multiplier: 1,
      note: "Efficiency discount for large school",
      status: "active",
      validFrom: "2024-07-01",
      validTo: "2025-06-30",
      createdAt: "2024-06-15T14:30:00Z",
      updatedAt: "2024-06-15T14:30:00Z"
    },
    {
      id: 3,
      type: "Principal",
      targetId: "principal-001",
      targetName: "Maria Svensson",
      school: "Lund High School",
      principal: "Maria Svensson",
      program: "All programs",
      category: "Other amount",
      title: "Leadership bonus",
      amount: 3000,
      multiplier: 2,
      note: "Monthly leadership performance bonus",
      status: "pending",
      validFrom: "2024-02-01",
      validTo: "2024-12-31",
      createdAt: "2024-01-25T09:15:00Z",
      updatedAt: "2024-01-25T09:15:00Z"
    }
  ]);

  const filteredAmounts = additionalAmounts.filter(amount =>
    amount.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    amount.school?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    amount.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    amount.note.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAmount = (data: AmountFormData) => {
    const newAmount: AdditionalAmount = {
      id: Math.max(...additionalAmounts.map(a => a.id)) + 1,
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setAdditionalAmounts([...additionalAmounts, newAmount]);
    setIsAddModalOpen(false);
    form.reset();
    
    toast({
      title: "Additional Amount Added",
      description: `Successfully added ${data.type.toLowerCase()} amount for ${data.targetName}`,
    });
  };

  const handleEditAmount = (data: AmountFormData) => {
    if (!selectedAmount) return;
    
    const updatedAmounts = additionalAmounts.map(amount =>
      amount.id === selectedAmount.id
        ? { ...amount, ...data, updatedAt: new Date().toISOString() }
        : amount
    );
    
    setAdditionalAmounts(updatedAmounts);
    setIsEditModalOpen(false);
    setSelectedAmount(null);
    form.reset();
    
    toast({
      title: "Amount Updated",
      description: `Successfully updated amount for ${data.targetName}`,
    });
  };

  const handleDeleteAmount = () => {
    if (!selectedAmount) return;
    
    const updatedAmounts = additionalAmounts.filter(amount => amount.id !== selectedAmount.id);
    setAdditionalAmounts(updatedAmounts);
    setIsDeleteDialogOpen(false);
    setSelectedAmount(null);
    
    toast({
      title: "Amount Deleted",
      description: `Successfully deleted amount for ${selectedAmount.targetName}`,
      variant: "destructive",
    });
  };

  const openEditModal = (amount: AdditionalAmount) => {
    setSelectedAmount(amount);
    form.reset({
      type: amount.type,
      targetId: amount.targetId,
      targetName: amount.targetName,
      school: amount.school || "",
      principal: amount.principal || "",
      program: amount.program || "",
      category: amount.category,
      title: amount.title,
      amount: amount.amount,
      multiplier: amount.multiplier,
      note: amount.note,
      validFrom: amount.validFrom,
      validTo: amount.validTo || "",
    });
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (amount: AdditionalAmount) => {
    setSelectedAmount(amount);
    setIsDeleteDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-ike-success text-white">Active</Badge>;
      case "pending":
        return <Badge className="bg-ike-warning text-white">Pending</Badge>;
      case "expired":
        return <Badge className="bg-ike-error text-white">Expired</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getAmountDisplay = (amount: number, multiplier: number) => {
    const totalAmount = amount * multiplier;
    const isDeduction = totalAmount < 0;
    return (
      <span className={isDeduction ? "text-ike-error" : "text-ike-success"}>
        {isDeduction ? "-" : "+"}{Math.abs(totalAmount).toLocaleString('sv-SE')} SEK
        {multiplier > 1 && <span className="text-ike-neutral text-xs ml-1">({amount} × {multiplier})</span>}
      </span>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Student":
        return <User className="w-4 h-4 mr-2 text-ike-primary" />;
      case "School":
        return <School className="w-4 h-4 mr-2 text-ike-primary" />;
      case "Principal":
        return <Users className="w-4 h-4 mr-2 text-ike-primary" />;
      default:
        return null;
    }
  };

  const AmountModal = ({ isOpen, onClose, onSubmit, title, submitText }: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: AmountFormData) => void;
    title: string;
    submitText: string;
  }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-ike-neutral-dark">{title}</DialogTitle>
          <DialogDescription>
            Add financial adjustments for students, schools, or principals with specific validity periods.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="Student">Student</option>
                        <option value="School">School Unit</option>
                        <option value="Principal">Principal</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="targetName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter school name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="principal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Principal</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter principal name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="program"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter program name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (SEK)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number" 
                        placeholder="Enter amount (negative for deductions)"
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="multiplier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Multiplier</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number" 
                        min="1"
                        placeholder="Number of times to multiply"
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter additional notes" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="validFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valid From *</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="validTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valid To (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                {submitText}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Additional Amounts</h1>
          <p className="text-ike-neutral mt-2">
            Manage additional amounts and deductions for students, schools, and principals
          </p>
        </div>
        <Button 
          className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Amount
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Additional Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">+125,000 SEK</div>
            <div className="text-xs text-ike-neutral">This month</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Deductions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-error">-35,000 SEK</div>
            <div className="text-xs text-ike-neutral">This month</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Active Adjustments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{additionalAmounts.filter(a => a.status === 'active').length}</div>
            <div className="text-xs text-ike-neutral">Currently active</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{additionalAmounts.filter(a => a.status === 'pending').length}</div>
            <div className="text-xs text-ike-neutral">Awaiting approval</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="amounts">Additional Amounts</TabsTrigger>
          <TabsTrigger value="categories">Manage Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="amounts" className="space-y-4">
          {/* Additional Amounts Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <DollarSign className="w-5 h-5 mr-2 text-ike-primary" />
                Additional Amounts & Deductions
              </CardTitle>
              <CardDescription>
                Manage special amounts for students, schools, and principals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
                  <Input
                    placeholder="Search by name, school, title, or notes..."
                    className="pl-10 border-ike-primary/20 focus:border-ike-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-medium">Type</TableHead>
                      <TableHead className="font-medium">Name</TableHead>
                      <TableHead className="font-medium">Category</TableHead>
                      <TableHead className="font-medium">Title</TableHead>
                      <TableHead className="font-medium">Amount</TableHead>
                      <TableHead className="font-medium">Valid Period</TableHead>
                      <TableHead className="font-medium">Status</TableHead>
                      <TableHead className="font-medium text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAmounts.map((amount) => (
                      <TableRow key={amount.id} className="hover:bg-ike-neutral-light/50">
                        <TableCell>
                          <div className="flex items-center">
                            {getTypeIcon(amount.type)}
                            {amount.type}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-ike-neutral-dark">
                          <div>
                            <div>{amount.targetName}</div>
                            {amount.school && (
                              <div className="text-xs text-ike-neutral">{amount.school}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{amount.category}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={amount.title}>
                          {amount.title}
                        </TableCell>
                        <TableCell className="font-medium">
                          {getAmountDisplay(amount.amount, amount.multiplier)}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{amount.validFrom}</div>
                            <div className="text-ike-neutral">
                              {amount.validTo ? `to ${amount.validTo}` : "Ongoing"}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(amount.status)}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-ike-neutral hover:text-ike-primary"
                              onClick={() => openEditModal(amount)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-ike-neutral hover:text-ike-error"
                              onClick={() => openDeleteDialog(amount)}
                            >
                              <Trash2 className="h-4 w-4" />
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
        </TabsContent>

        <TabsContent value="categories">
          <CategoryManagement 
            categories={categories} 
            onUpdateCategories={setCategories} 
          />
        </TabsContent>
      </Tabs>

      {/* Add Amount Modal */}
      <AmountModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddAmount}
        title="Add New Additional Amount"
        submitText="Add Amount"
      />

      {/* Edit Amount Modal */}
      <AmountModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedAmount(null);
          form.reset();
        }}
        onSubmit={handleEditAmount}
        title="Edit Additional Amount"
        submitText="Update Amount"
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Additional Amount</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the additional amount for {selectedAmount?.targetName}? 
              This action cannot be undone and will permanently remove the {selectedAmount && getAmountDisplay(selectedAmount.amount, selectedAmount.multiplier)} adjustment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAmount}
              className="bg-ike-error hover:bg-ike-error/90 text-white"
            >
              Delete Amount
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogFooter>
      </AlertDialog>
    </div>
  );
};

export default AdditionalAmounts;
