
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { DollarSign, Search, Plus, Edit, User, School, Trash2, Calendar } from "lucide-react";

interface AdditionalAmount {
  id: number;
  type: "Student" | "School";
  name: string;
  school: string;
  program: string;
  amount: number;
  reason: string;
  status: "active" | "pending" | "expired";
  validFrom: string;
  validTo: string;
}

interface AmountFormData {
  type: "Student" | "School";
  name: string;
  school: string;
  program: string;
  amount: number;
  reason: string;
  validFrom: string;
  validTo: string;
}

const AdditionalAmounts = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<AdditionalAmount | null>(null);

  const form = useForm<AmountFormData>({
    defaultValues: {
      type: "Student",
      name: "",
      school: "",
      program: "",
      amount: 0,
      reason: "",
      validFrom: "",
      validTo: "",
    },
  });

  const [additionalAmounts, setAdditionalAmounts] = useState<AdditionalAmount[]>([
    {
      id: 1,
      type: "Student",
      name: "Anna Andersson",
      school: "Malmö Gymnasium",
      program: "Naturvetenskapsprogrammet",
      amount: 5000,
      reason: "Special needs support",
      status: "active",
      validFrom: "2024-01-15",
      validTo: "2024-06-30"
    },
    {
      id: 2,
      type: "School",
      name: "Malmö Technical School",
      school: "Malmö Technical School",
      program: "All programs",
      amount: -2000,
      reason: "Administrative efficiency discount",
      status: "active",
      validFrom: "2024-07-01",
      validTo: "2025-06-30"
    },
    {
      id: 3,
      type: "Student",
      name: "Erik Eriksson",
      school: "Lund High School",
      program: "Teknikprogrammet",
      amount: 3000,
      reason: "Transport allowance",
      status: "pending",
      validFrom: "2024-02-01",
      validTo: "2024-12-31"
    }
  ]);

  const filteredAmounts = additionalAmounts.filter(amount =>
    amount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    amount.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
    amount.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAmount = (data: AmountFormData) => {
    const newAmount: AdditionalAmount = {
      id: Math.max(...additionalAmounts.map(a => a.id)) + 1,
      ...data,
      status: "pending"
    };
    
    setAdditionalAmounts([...additionalAmounts, newAmount]);
    setIsAddModalOpen(false);
    form.reset();
    
    toast({
      title: "Additional Amount Added",
      description: `Successfully added ${data.type === "Student" ? "student" : "school"} amount for ${data.name}`,
    });
  };

  const handleEditAmount = (data: AmountFormData) => {
    if (!selectedAmount) return;
    
    const updatedAmounts = additionalAmounts.map(amount =>
      amount.id === selectedAmount.id
        ? { ...amount, ...data }
        : amount
    );
    
    setAdditionalAmounts(updatedAmounts);
    setIsEditModalOpen(false);
    setSelectedAmount(null);
    form.reset();
    
    toast({
      title: "Amount Updated",
      description: `Successfully updated amount for ${data.name}`,
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
      description: `Successfully deleted amount for ${selectedAmount.name}`,
      variant: "destructive",
    });
  };

  const openEditModal = (amount: AdditionalAmount) => {
    setSelectedAmount(amount);
    form.reset({
      type: amount.type,
      name: amount.name,
      school: amount.school,
      program: amount.program,
      amount: amount.amount,
      reason: amount.reason,
      validFrom: amount.validFrom,
      validTo: amount.validTo,
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

  const getAmountDisplay = (amount: number) => {
    const isDeduction = amount < 0;
    return (
      <span className={isDeduction ? "text-ike-error" : "text-ike-success"}>
        {isDeduction ? "-" : "+"}{Math.abs(amount).toLocaleString('sv-SE')} SEK
      </span>
    );
  };

  const AmountModal = ({ isOpen, onClose, onSubmit, title, submitText }: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: AmountFormData) => void;
    title: string;
    submitText: string;
  }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-ike-neutral-dark">{title}</DialogTitle>
          <DialogDescription>
            Add financial adjustments for students or schools with specific validity periods.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <option value="School">School</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter student or school name" />
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
            </div>

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
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter reason for adjustment" />
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
                    <FormLabel>Valid From</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
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
                    <FormLabel>Valid To</FormLabel>
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
            Manage additional amounts and deductions for students or schools
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

      {/* Additional Amounts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <DollarSign className="w-5 h-5 mr-2 text-ike-primary" />
            Additional Amounts & Deductions
          </CardTitle>
          <CardDescription>
            Manage special amounts for students and schools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search by student name, school, or reason..."
                className="pl-10 border-ike-primary/20 focus:border-ike-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Name/School</TableHead>
                  <TableHead className="font-medium">Program</TableHead>
                  <TableHead className="font-medium">Amount</TableHead>
                  <TableHead className="font-medium">Reason</TableHead>
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
                        {amount.type === "Student" ? (
                          <User className="w-4 h-4 mr-2 text-ike-primary" />
                        ) : (
                          <School className="w-4 h-4 mr-2 text-ike-primary" />
                        )}
                        {amount.type}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-ike-neutral-dark">
                      {amount.name}
                    </TableCell>
                    <TableCell>{amount.program}</TableCell>
                    <TableCell className="font-medium">
                      {getAmountDisplay(amount.amount)}
                    </TableCell>
                    <TableCell className="max-w-xs truncate" title={amount.reason}>
                      {amount.reason}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{amount.validFrom}</div>
                        <div className="text-ike-neutral">to {amount.validTo}</div>
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
              Are you sure you want to delete the additional amount for {selectedAmount?.name}? 
              This action cannot be undone and will permanently remove the {getAmountDisplay(selectedAmount?.amount || 0)} adjustment.
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
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdditionalAmounts;
