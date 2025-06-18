
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
import type { PaymentBlock, PaymentBlockFormData } from "@/types/paymentBlocks";

interface EditPaymentBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PaymentBlockFormData) => void;
  block: PaymentBlock | null;
}

const EditPaymentBlockModal = ({ isOpen, onClose, onSubmit, block }: EditPaymentBlockModalProps) => {
  const form = useForm<PaymentBlockFormData>({
    defaultValues: {
      type: "Student",
      targetId: "",
      targetName: "",
      school: "",
      principal: "",
      program: "",
      reason: "",
      startDate: "",
      endDate: "",
    },
  });

  const selectedType = form.watch("type");

  useEffect(() => {
    if (block && isOpen) {
      form.reset({
        type: block.type,
        targetId: block.targetId,
        targetName: block.targetName,
        school: block.school || "",
        principal: block.principal || "",
        program: block.program || "",
        reason: block.reason,
        startDate: block.startDate,
        endDate: block.endDate || "",
      });
    }
  }, [block, isOpen, form]);

  const handleSubmit = (data: PaymentBlockFormData) => {
    onSubmit(data);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-ike-neutral-dark">Edit Payment Block</DialogTitle>
          <DialogDescription>
            Update payment block details and validity periods.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                name="targetName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {selectedType === "Student" ? "Student Name" : 
                       selectedType === "School" ? "School Name" : "Principal Name"}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={`Enter ${selectedType.toLowerCase()} name`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {selectedType === "Student" && (
              <>
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
              </>
            )}

            {selectedType === "School" && (
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
            )}

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Block *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter reason for payment block" required />
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
                    <FormLabel>Block Start Date *</FormLabel>
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
                    <FormLabel>Block End Date (Optional)</FormLabel>
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
              <Button type="submit" className="bg-ike-error hover:bg-ike-error/90 text-white">
                Update Block
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPaymentBlockModal;
