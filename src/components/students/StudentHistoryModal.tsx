
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  History, 
  Calendar, 
  User, 
  School, 
  FileText,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

interface HistoryEntry {
  id: number;
  date: string;
  type: 'enrollment' | 'status_change' | 'program_change' | 'school_change' | 'contact_update' | 'principal_change';
  description: string;
  oldValue?: string;
  newValue?: string;
  changedBy: string;
  notes?: string;
}

interface StudentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentId: number;
  history: HistoryEntry[];
}

const getHistoryTypeIcon = (type: string) => {
  switch (type) {
    case 'enrollment':
      return <School className="w-4 h-4 text-ike-primary" />;
    case 'status_change':
      return <User className="w-4 h-4 text-ike-warning" />;
    case 'program_change':
      return <FileText className="w-4 h-4 text-ike-success" />;
    case 'school_change':
      return <MapPin className="w-4 h-4 text-blue-500" />;
    case 'contact_update':
      return <Phone className="w-4 h-4 text-purple-500" />;
    case 'principal_change':
      return <Mail className="w-4 h-4 text-orange-500" />;
    default:
      return <History className="w-4 h-4 text-ike-neutral" />;
  }
};

const getHistoryTypeBadge = (type: string) => {
  switch (type) {
    case 'enrollment':
      return <Badge className="bg-ike-primary text-white">Enrollment</Badge>;
    case 'status_change':
      return <Badge className="bg-ike-warning text-white">Status Change</Badge>;
    case 'program_change':
      return <Badge className="bg-ike-success text-white">Program Change</Badge>;
    case 'school_change':
      return <Badge className="bg-blue-500 text-white">School Change</Badge>;
    case 'contact_update':
      return <Badge className="bg-purple-500 text-white">Contact Update</Badge>;
    case 'principal_change':
      return <Badge className="bg-orange-500 text-white">Principal Change</Badge>;
    default:
      return <Badge variant="secondary">Other</Badge>;
  }
};

export const StudentHistoryModal: React.FC<StudentHistoryModalProps> = ({
  isOpen,
  onClose,
  studentName,
  studentId,
  history
}) => {
  const sortedHistory = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center text-ike-neutral-dark">
            <History className="w-5 h-5 mr-2 text-ike-primary" />
            Student History - {studentName}
          </DialogTitle>
          <DialogDescription>
            Complete history of changes and events for this student
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[70vh]">
          <div className="space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-ike-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-ike-neutral">
                    Total Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-ike-neutral-dark">{history.length}</div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-ike-success">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-ike-neutral">
                    Enrollment Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-ike-neutral-dark">
                    {history.filter(h => h.type === 'enrollment').length}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-ike-warning">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-ike-neutral">
                    Status Changes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-ike-neutral-dark">
                    {history.filter(h => h.type === 'status_change').length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* History Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-ike-neutral-dark">History Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-medium">Date</TableHead>
                      <TableHead className="font-medium">Type</TableHead>
                      <TableHead className="font-medium">Description</TableHead>
                      <TableHead className="font-medium">Changed By</TableHead>
                      <TableHead className="font-medium">Changes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedHistory.map((entry) => (
                      <TableRow key={entry.id} className="hover:bg-ike-neutral-light/50">
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-ike-neutral" />
                            <span className="font-mono text-sm">
                              {new Date(entry.date).toLocaleDateString('sv-SE')}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getHistoryTypeIcon(entry.type)}
                            {getHistoryTypeBadge(entry.type)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-ike-neutral-dark">
                              {entry.description}
                            </div>
                            {entry.notes && (
                              <div className="text-sm text-ike-neutral mt-1">
                                {entry.notes}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1 text-ike-neutral" />
                            <span className="text-sm">{entry.changedBy}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {entry.oldValue && entry.newValue && (
                            <div className="space-y-1">
                              <div className="text-sm">
                                <span className="text-red-600">From: </span>
                                <span className="font-mono">{entry.oldValue}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-green-600">To: </span>
                                <span className="font-mono">{entry.newValue}</span>
                              </div>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <FileText className="w-4 h-4 mr-2" />
            Export History
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
