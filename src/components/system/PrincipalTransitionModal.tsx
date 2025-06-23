
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  GraduationCap, 
  Calendar, 
  User, 
  Clock,
  ArrowRight,
  UserCheck,
  UserX
} from "lucide-react";

interface Principal {
  id: string;
  name: string;
  email: string;
}

interface PrincipalAssignment {
  id: string;
  principalId: string;
  principalName: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  notes?: string;
}

interface SchoolUnit {
  id: string;
  name: string;
  code: string;
  principalId?: string;
  principalName?: string;
  principalAssignments?: PrincipalAssignment[];
}

interface PrincipalTransitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolUnit: SchoolUnit | null;
  availablePrincipals: Principal[];
  onTransition: (schoolUnitId: string, currentPrincipalEndDate: string, newPrincipalId: string, newPrincipalStartDate: string, notes: string) => void;
}

const PrincipalTransitionModal: React.FC<PrincipalTransitionModalProps> = ({
  isOpen,
  onClose,
  schoolUnit,
  availablePrincipals,
  onTransition
}) => {
  const { toast } = useToast();
  const [currentPrincipalEndDate, setCurrentPrincipalEndDate] = useState('');
  const [newPrincipalId, setNewPrincipalId] = useState('');
  const [newPrincipalStartDate, setNewPrincipalStartDate] = useState('');
  const [notes, setNotes] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const resetForm = () => {
    setCurrentPrincipalEndDate('');
    setNewPrincipalId('');
    setNewPrincipalStartDate('');
    setNotes('');
  };

  const handleTransition = () => {
    if (!schoolUnit) return;

    if (!currentPrincipalEndDate) {
      toast({
        title: "Missing Information",
        description: "Please enter an end date for the current principal.",
        variant: "destructive"
      });
      return;
    }

    if (!newPrincipalId) {
      toast({
        title: "Missing Information", 
        description: "Please select a new principal.",
        variant: "destructive"
      });
      return;
    }

    if (!newPrincipalStartDate) {
      toast({
        title: "Missing Information",
        description: "Please enter a start date for the new principal.",
        variant: "destructive"
      });
      return;
    }

    // Validate that end date is before start date
    if (new Date(currentPrincipalEndDate) >= new Date(newPrincipalStartDate)) {
      toast({
        title: "Invalid Dates",
        description: "The end date must be before the new principal's start date.",
        variant: "destructive"
      });
      return;
    }

    onTransition(schoolUnit.id, currentPrincipalEndDate, newPrincipalId, newPrincipalStartDate, notes);
    resetForm();
    onClose();
  };

  const mockPrincipalHistory: PrincipalAssignment[] = schoolUnit ? [
    {
      id: '1',
      principalId: '1',
      principalName: 'Anna Andersson',
      startDate: '2020-08-15',
      endDate: '2023-06-30',
      isActive: false,
      notes: 'Promoted to regional education director'
    },
    {
      id: '2', 
      principalId: schoolUnit.principalId || '2',
      principalName: schoolUnit.principalName || 'Current Principal',
      startDate: '2023-08-15',
      isActive: true,
      notes: 'Appointed as new principal'
    }
  ] : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-ike-primary">
            <GraduationCap className="w-5 h-5 mr-2" />
            Principal Transition - {schoolUnit?.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Principal Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-primary">
                <User className="w-4 h-4 mr-2" />
                Current Principal
              </CardTitle>
            </CardHeader>
            <CardContent>
              {schoolUnit?.principalName ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-ike-neutral-dark">{schoolUnit.principalName}</p>
                    <p className="text-sm text-ike-neutral">Currently assigned</p>
                  </div>
                  <Badge className="bg-ike-success text-white">Active</Badge>
                </div>
              ) : (
                <p className="text-ike-neutral italic">No principal currently assigned</p>
              )}
            </CardContent>
          </Card>

          {/* Principal History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center text-ike-primary">
                  <Clock className="w-4 h-4 mr-2" />
                  Principal History
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  {showHistory ? 'Hide' : 'Show'} History
                </Button>
              </CardTitle>
            </CardHeader>
            {showHistory && (
              <CardContent>
                <div className="space-y-3">
                  {mockPrincipalHistory.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 bg-ike-neutral-light rounded">
                      <div>
                        <p className="font-medium">{assignment.principalName}</p>
                        <p className="text-sm text-ike-neutral">
                          {assignment.startDate} - {assignment.endDate || 'Present'}
                        </p>
                        {assignment.notes && (
                          <p className="text-xs text-ike-neutral mt-1">{assignment.notes}</p>
                        )}
                      </div>
                      <Badge variant={assignment.isActive ? 'default' : 'secondary'}>
                        {assignment.isActive ? 'Active' : 'Ended'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Transition Form */}
          {schoolUnit?.principalName && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-ike-primary flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Principal Transition
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="endDate" className="flex items-center">
                      <UserX className="w-4 h-4 mr-2 text-ike-error" />
                      Current Principal End Date
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={currentPrincipalEndDate}
                      onChange={(e) => setCurrentPrincipalEndDate(e.target.value)}
                      className="border-ike-primary/20 focus:border-ike-primary"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="startDate" className="flex items-center">
                      <UserCheck className="w-4 h-4 mr-2 text-ike-success" />
                      New Principal Start Date
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newPrincipalStartDate}
                      onChange={(e) => setNewPrincipalStartDate(e.target.value)}
                      className="border-ike-primary/20 focus:border-ike-primary"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="newPrincipal">New Principal</Label>
                  <Select value={newPrincipalId} onValueChange={setNewPrincipalId}>
                    <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                      <SelectValue placeholder="Select new principal" />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePrincipals
                        .filter(principal => principal.id !== schoolUnit?.principalId)
                        .map((principal) => (
                          <SelectItem key={principal.id} value={principal.id}>
                            {principal.name} ({principal.email})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Transition Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter any notes about this transition..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="border-ike-primary/20 focus:border-ike-primary"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {schoolUnit?.principalName && (
            <Button 
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
              onClick={handleTransition}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Execute Transition
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrincipalTransitionModal;
