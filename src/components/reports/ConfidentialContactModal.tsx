
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { AlertTriangle, Mail, Phone, User, Send } from "lucide-react";

interface ConfidentialContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordId: string;
}

export const ConfidentialContactModal = ({ isOpen, onClose, recordId }: ConfidentialContactModalProps) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<"normal" | "urgent">("normal");
  const [isSending, setIsSending] = useState(false);

  const handleSendRequest = async () => {
    if (!subject.trim() || !message.trim()) {
      alert("Please fill in both subject and message fields.");
      return;
    }

    setIsSending(true);
    
    // Simulate sending request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Confidential record access request:", {
      recordId,
      subject,
      message,
      priority,
      timestamp: new Date().toISOString()
    });
    
    setIsSending(false);
    onClose();
    
    // Reset form
    setSubject("");
    setMessage("");
    setPriority("normal");
    
    alert("Your request has been sent to the system administrator. You will receive a response within 24 hours.");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-ike-neutral-dark">
            <AlertTriangle className="w-5 h-5 text-ike-warning" />
            Access Confidential Record
          </DialogTitle>
          <DialogDescription>
            Request access to confidential student record {recordId}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Warning Notice */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 mb-1">Confidential Student Record</p>
                <p className="text-yellow-700">
                  This record contains sensitive information. Access requires administrator approval and must comply with data protection regulations.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-4 bg-ike-neutral-light/30 rounded-lg">
            <h4 className="font-medium text-ike-neutral-dark mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              System Administrator Contact
            </h4>
            <div className="space-y-2 text-sm text-ike-neutral">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span>admin@skane-municipality.se</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <span>+46 (0)40 123 456</span>
              </div>
            </div>
          </div>

          {/* Request Form */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-ike-neutral-dark mb-2 block">
                Request Subject
              </label>
              <Input
                placeholder="e.g., Access request for student record review"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-ike-neutral-dark mb-2 block">
                Reason for Access
              </label>
              <Textarea
                placeholder="Please explain why you need access to this confidential record..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-ike-neutral-dark mb-2 block">
                Priority Level
              </label>
              <div className="flex gap-2">
                <Button
                  variant={priority === "normal" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPriority("normal")}
                >
                  Normal
                </Button>
                <Button
                  variant={priority === "urgent" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPriority("urgent")}
                >
                  <Badge variant="destructive" className="mr-1">Urgent</Badge>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={onClose} variant="outline" disabled={isSending}>
            Cancel
          </Button>
          <Button 
            onClick={handleSendRequest}
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            disabled={isSending || !subject.trim() || !message.trim()}
          >
            {isSending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send Request
              </div>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
