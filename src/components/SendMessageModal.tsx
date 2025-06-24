
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Send,
  Paperclip,
  X,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: number;
  name: string;
  role: string;
  organization: string;
  email: string;
  avatar: string;
}

interface SendMessageModalProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SendMessageModal = ({ 
  contact, 
  isOpen, 
  onClose 
}: SendMessageModalProps) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sendToEmail, setSendToEmail] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  if (!contact) return null;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = async () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both subject and message fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate sending message
    setTimeout(() => {
      toast({
        title: "Message sent successfully",
        description: `Your message has been sent to ${contact.name}${sendToEmail ? ' via email and system notification' : ' via system notification'}.`,
      });
      
      // Reset form
      setSubject("");
      setMessage("");
      setSendToEmail(false);
      setAttachments([]);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <Send className="w-5 h-5 text-ike-primary" />
            Send Message
          </SheetTitle>
          <SheetDescription>
            Send a message to the selected contact
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Recipient */}
          <div className="p-3 bg-ike-neutral-light rounded-lg">
            <Label className="text-sm font-medium text-ike-neutral-dark">To:</Label>
            <div className="flex items-center gap-3 mt-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-ike-primary text-white text-sm">
                  {contact.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-ike-neutral-dark">{contact.name}</p>
                <p className="text-sm text-ike-neutral">{contact.role} - {contact.organization}</p>
              </div>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Enter message subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border-ike-primary/20 focus:border-ike-primary"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="border-ike-primary/20 focus:border-ike-primary resize-none"
            />
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <Label>Attachments</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach Files
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
              
              {attachments.length > 0 && (
                <div className="space-y-1">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-ike-neutral-light rounded text-sm">
                      <span className="truncate">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Send to Email Option */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="send-email"
              checked={sendToEmail}
              onCheckedChange={(checked) => setSendToEmail(checked === true)}
            />
            <Label htmlFor="send-email" className="text-sm">
              Also send to recipient's email address ({contact.email})
            </Label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendMessage}
              className="flex-1 bg-ike-primary hover:bg-ike-primary-dark text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>Sending...</>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
