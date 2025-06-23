
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, Send, CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import type { PostingEntry, PostingTemplate } from "@/types/posting";

interface PostingManagementProps {
  postingEntries: PostingEntry[];
  templates: PostingTemplate[];
  onUpdatePostingEntries: (entries: PostingEntry[]) => void;
}

const PostingManagement: React.FC<PostingManagementProps> = ({
  postingEntries,
  templates,
  onUpdatePostingEntries
}) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isPostingModalOpen, setIsPostingModalOpen] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);

  const filteredEntries = postingEntries.filter(entry =>
    entry.templateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.accountingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "posted":
        return <Badge className="bg-ike-success text-white">Posted</Badge>;
      case "pending":
        return <Badge className="bg-ike-warning text-white">Pending</Badge>;
      case "failed":
        return <Badge className="bg-ike-error text-white">Failed</Badge>;
      case "cancelled":
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "posted":
        return <CheckCircle className="w-4 h-4 text-ike-success" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-ike-error" />;
      case "pending":
        return <Clock className="w-4 h-4 text-ike-warning" />;
      default:
        return <FileText className="w-4 h-4 text-ike-neutral" />;
    }
  };

  const handleBulkPosting = () => {
    const entriesToPost = postingEntries.filter(entry => 
      selectedEntries.includes(entry.id) && entry.status === "pending"
    );

    if (entriesToPost.length === 0) {
      toast({
        title: "No Entries Selected",
        description: "Please select pending entries to post.",
        variant: "destructive"
      });
      return;
    }

    // Simulate posting process
    const updatedEntries = postingEntries.map(entry => {
      if (selectedEntries.includes(entry.id) && entry.status === "pending") {
        return {
          ...entry,
          status: "posted" as const,
          postedAt: new Date().toISOString(),
          postedBy: "current-user"
        };
      }
      return entry;
    });

    onUpdatePostingEntries(updatedEntries);
    setSelectedEntries([]);
    setIsPostingModalOpen(false);

    toast({
      title: "Posting Completed",
      description: `Successfully posted ${entriesToPost.length} entries.`,
    });
  };

  const pendingCount = postingEntries.filter(entry => entry.status === "pending").length;
  const postedCount = postingEntries.filter(entry => entry.status === "posted").length;
  const failedCount = postingEntries.filter(entry => entry.status === "failed").length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Send className="w-5 h-5 mr-2 text-ike-primary" />
              Posting Management
            </CardTitle>
            <CardDescription>
              Monitor and manage financial postings for additional amounts
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={() => setIsPostingModalOpen(true)}
              disabled={pendingCount === 0}
            >
              <Send className="w-4 h-4 mr-2" />
              Bulk Post ({pendingCount})
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-ike-warning/10 rounded-lg">
              <div className="text-2xl font-bold text-ike-warning">{pendingCount}</div>
              <div className="text-sm text-ike-neutral">Pending</div>
            </div>
            <div className="text-center p-3 bg-ike-success/10 rounded-lg">
              <div className="text-2xl font-bold text-ike-success">{postedCount}</div>
              <div className="text-sm text-ike-neutral">Posted</div>
            </div>
            <div className="text-center p-3 bg-ike-error/10 rounded-lg">
              <div className="text-2xl font-bold text-ike-error">{failedCount}</div>
              <div className="text-sm text-ike-neutral">Failed</div>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
            <Input
              placeholder="Search posting entries..."
              className="pl-10 border-ike-primary/20 focus:border-ike-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input 
                    type="checkbox" 
                    className="rounded border-ike-primary"
                    checked={selectedEntries.length === filteredEntries.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedEntries(filteredEntries.map(entry => entry.id));
                      } else {
                        setSelectedEntries([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Amount ID</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Accounting Code</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <input 
                      type="checkbox" 
                      className="rounded border-ike-primary"
                      checked={selectedEntries.includes(entry.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEntries([...selectedEntries, entry.id]);
                        } else {
                          setSelectedEntries(selectedEntries.filter(id => id !== entry.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell className="font-mono">#{entry.additionalAmountId}</TableCell>
                  <TableCell>{entry.templateName}</TableCell>
                  <TableCell className="font-mono">{entry.accountingCode}</TableCell>
                  <TableCell className="font-medium">
                    {entry.amount.toLocaleString('sv-SE')} SEK
                  </TableCell>
                  <TableCell>{entry.postingDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(entry.status)}
                      {getStatusBadge(entry.status)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Bulk Posting Confirmation Modal */}
      <Dialog open={isPostingModalOpen} onOpenChange={setIsPostingModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Bulk Posting</DialogTitle>
            <DialogDescription>
              Are you sure you want to post {selectedEntries.length} entries to the financial system?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPostingModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
              onClick={handleBulkPosting}
            >
              <Send className="w-4 h-4 mr-2" />
              Post Entries
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PostingManagement;
