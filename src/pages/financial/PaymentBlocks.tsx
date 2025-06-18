
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useToast } from "@/hooks/use-toast";
import { Ban, Search, Edit, User, School, Trash2, Users, Calendar } from "lucide-react";
import type { PaymentBlock, PaymentBlockFormData } from "@/types/paymentBlocks";
import AddPaymentBlockModal from "@/components/modals/AddPaymentBlockModal";
import EditPaymentBlockModal from "@/components/modals/EditPaymentBlockModal";

const PaymentBlocks = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<PaymentBlock | null>(null);

  const [paymentBlocks, setPaymentBlocks] = useState<PaymentBlock[]>([
    {
      id: "1",
      type: "Student",
      targetId: "student-001",
      targetName: "Anna Andersson",
      school: "Malmö Gymnasium",
      principal: "Lars Larsson",
      program: "Naturvetenskapsprogrammet",
      reason: "Outstanding documentation issues",
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      isActive: true,
      createdBy: "Admin User",
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z"
    },
    {
      id: "2",
      type: "School",
      targetId: "school-001",
      targetName: "Malmö Technical School",
      school: "Malmö Technical School",
      principal: "Erik Eriksson",
      program: "All programs",
      reason: "Administrative review pending",
      startDate: "2024-02-01",
      endDate: "",
      isActive: true,
      createdBy: "Municipal Admin",
      createdAt: "2024-01-25T14:30:00Z",
      updatedAt: "2024-01-25T14:30:00Z"
    },
    {
      id: "3",
      type: "Principal",
      targetId: "principal-001",
      targetName: "Maria Svensson",
      school: "Lund High School",
      principal: "Maria Svensson",
      program: "All programs",
      reason: "Contract renegotiation in progress",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      isActive: false,
      createdBy: "Finance Manager",
      createdAt: "2023-12-20T09:15:00Z",
      updatedAt: "2024-03-31T16:00:00Z"
    }
  ]);

  const filteredBlocks = paymentBlocks.filter(block =>
    block.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    block.school?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    block.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    block.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeBlocks = paymentBlocks.filter(block => block.isActive);
  const expiredBlocks = paymentBlocks.filter(block => !block.isActive);

  const handleAddBlock = (data: PaymentBlockFormData) => {
    const now = new Date().toISOString();
    const endDate = data.endDate ? new Date(data.endDate) : null;
    const isActive = !endDate || endDate > new Date();

    const newBlock: PaymentBlock = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      isActive,
      createdBy: "Current User",
      createdAt: now,
      updatedAt: now
    };
    
    setPaymentBlocks([...paymentBlocks, newBlock]);
    setIsAddModalOpen(false);
    
    toast({
      title: "Payment Block Added",
      description: `Payment blocked for ${data.type.toLowerCase()}: ${data.targetName}`,
      variant: "destructive",
    });
  };

  const handleEditBlock = (data: PaymentBlockFormData) => {
    if (!selectedBlock) return;
    
    const endDate = data.endDate ? new Date(data.endDate) : null;
    const isActive = !endDate || endDate > new Date();
    
    const updatedBlocks = paymentBlocks.map(block =>
      block.id === selectedBlock.id
        ? { ...block, ...data, isActive, updatedAt: new Date().toISOString() }
        : block
    );
    
    setPaymentBlocks(updatedBlocks);
    setIsEditModalOpen(false);
    setSelectedBlock(null);
    
    toast({
      title: "Payment Block Updated",
      description: `Updated payment block for ${data.targetName}`,
    });
  };

  const handleDeleteBlock = () => {
    if (!selectedBlock) return;
    
    const updatedBlocks = paymentBlocks.filter(block => block.id !== selectedBlock.id);
    setPaymentBlocks(updatedBlocks);
    setIsDeleteDialogOpen(false);
    setSelectedBlock(null);
    
    toast({
      title: "Payment Block Removed",
      description: `Payment block removed for ${selectedBlock.targetName}`,
    });
  };

  const openEditModal = (block: PaymentBlock) => {
    setSelectedBlock(block);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (block: PaymentBlock) => {
    setSelectedBlock(block);
    setIsDeleteDialogOpen(true);
  };

  const getStatusBadge = (block: PaymentBlock) => {
    if (block.isActive) {
      return <Badge className="bg-ike-error text-white">Blocked</Badge>;
    } else {
      return <Badge className="bg-ike-neutral text-white">Expired</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Student":
        return <User className="w-4 h-4 mr-2 text-ike-error" />;
      case "School":
        return <School className="w-4 h-4 mr-2 text-ike-error" />;
      case "Principal":
        return <Users className="w-4 h-4 mr-2 text-ike-error" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Payment Blocks</h1>
          <p className="text-ike-neutral mt-2">
            Manage payment blocks for students, schools, and principals
          </p>
        </div>
        <Button 
          className="bg-ike-error hover:bg-ike-error/90 text-white"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Ban className="w-4 h-4 mr-2" />
          Block Payment
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Active Blocks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-error">{activeBlocks.length}</div>
            <div className="text-xs text-ike-neutral">Currently blocking payments</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-neutral">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Expired Blocks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{expiredBlocks.length}</div>
            <div className="text-xs text-ike-neutral">No longer active</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Blocks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{paymentBlocks.length}</div>
            <div className="text-xs text-ike-neutral">All time</div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Blocks Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Ban className="w-5 h-5 mr-2 text-ike-error" />
            Payment Blocks
          </CardTitle>
          <CardDescription>
            Active and expired payment blocks for financial control
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search by name, school, reason, or type..."
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
                  <TableHead className="font-medium">Reason</TableHead>
                  <TableHead className="font-medium">Block Period</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlocks.map((block) => (
                  <TableRow key={block.id} className="hover:bg-ike-neutral-light/50">
                    <TableCell>
                      <div className="flex items-center">
                        {getTypeIcon(block.type)}
                        {block.type}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-ike-neutral-dark">
                      <div>
                        <div>{block.targetName}</div>
                        {block.school && (
                          <div className="text-xs text-ike-neutral">{block.school}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={block.reason}>
                        {block.reason}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm flex items-center">
                        <Calendar className="w-3 h-3 mr-1 text-ike-neutral" />
                        <div>
                          <div>{block.startDate}</div>
                          <div className="text-ike-neutral">
                            {block.endDate ? `to ${block.endDate}` : "Ongoing"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(block)}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-ike-neutral hover:text-ike-primary"
                          onClick={() => openEditModal(block)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-ike-neutral hover:text-ike-error"
                          onClick={() => openDeleteDialog(block)}
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

      {/* Modals */}
      <AddPaymentBlockModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddBlock}
      />
      
      <EditPaymentBlockModal 
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedBlock(null);
        }}
        onSubmit={handleEditBlock}
        block={selectedBlock}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Payment Block</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove the payment block for {selectedBlock?.targetName}? 
              This will allow payments to resume immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBlock}
              className="bg-ike-error hover:bg-ike-error/90 text-white"
            >
              Remove Block
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PaymentBlocks;
