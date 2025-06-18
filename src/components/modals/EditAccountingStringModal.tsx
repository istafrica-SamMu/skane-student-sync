
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AccountingString, AccountingStringFormData } from "@/types/accounting";

interface EditAccountingStringModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AccountingStringFormData) => void;
  accountingString: AccountingString | null;
}

const EditAccountingStringModal = ({ isOpen, onClose, onSubmit, accountingString }: EditAccountingStringModalProps) => {
  const form = useForm<AccountingStringFormData>({
    defaultValues: {
      counterpartyId: "",
      counterpartyName: "",
      priceCodeGroup: "university_prep",
      priceCodes: "",
      schoolType: "upper_secondary",
      accountingCode: "",
      costCenter: "",
      project: "",
      startDate: "",
      endDate: "",
    },
  });

  useEffect(() => {
    if (accountingString && isOpen) {
      form.reset({
        counterpartyId: accountingString.counterpartyId,
        counterpartyName: accountingString.counterpartyName,
        priceCodeGroup: accountingString.priceCodeGroup,
        priceCodes: Array.isArray(accountingString.priceCodes) ? accountingString.priceCodes.join(', ') : "",
        schoolType: accountingString.schoolType,
        accountingCode: accountingString.accountingCode,
        costCenter: accountingString.costCenter,
        project: accountingString.project || "",
        startDate: accountingString.startDate,
        endDate: accountingString.endDate || "",
      });
    }
  }, [accountingString, isOpen, form]);

  const handleSubmit = (data: AccountingStringFormData) => {
    // Parse price codes from comma-separated string to array
    const priceCodesArray = data.priceCodes 
      ? (data.priceCodes as string).split(',').map(code => code.trim()).filter(code => code)
      : [];
    
    onSubmit({
      ...data,
      priceCodes: priceCodesArray
    });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-ike-neutral-dark">Edit Accounting String</DialogTitle>
          <DialogDescription>
            Update accounting configuration details and validity periods.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="counterpartyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Counterparty ID</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter counterparty ID" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="counterpartyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Counterparty Name *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter counterparty name" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priceCodeGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Code Group *</FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        required
                      >
                        <option value="university_prep">University Preparatory Programs</option>
                        <option value="vocational_prep">Vocational Preparatory Programs</option>
                        <option value="introductory">Introductory Programs</option>
                        <option value="individual">Individual Price Codes</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="schoolType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Type *</FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        required
                      >
                        <option value="upper_secondary">Upper Secondary School</option>
                        <option value="adapted_upper_secondary">Adapted Upper Secondary School</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="priceCodes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Codes</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter price codes separated by commas (e.g., NA01, NA02, NA03)"
                      value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="accountingCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accounting Code *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter accounting code" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="costCenter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost Center *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter cost center" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter project code" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date *</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                Update Accounting String
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccountingStringModal;
