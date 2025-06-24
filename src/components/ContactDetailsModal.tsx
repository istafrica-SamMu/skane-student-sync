
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Building,
  MessageSquare,
  Copy,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: number;
  name: string;
  role: string;
  organization: string;
  type: string;
  region: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  isOnline: boolean;
}

interface ContactDetailsModalProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (contact: Contact) => void;
}

export const ContactDetailsModal = ({ 
  contact, 
  isOpen, 
  onClose, 
  onSendMessage 
}: ContactDetailsModalProps) => {
  const { toast } = useToast();

  if (!contact) return null;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${type} has been copied to your clipboard.`,
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "municipality":
        return <Building className="w-4 h-4" />;
      case "principal":
        return <Building className="w-4 h-4" />;
      case "regional":
        return <MapPin className="w-4 h-4" />;
      default:
        return <Building className="w-4 h-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "municipality":
        return "bg-ike-primary text-white";
      case "principal":
        return "bg-ike-success text-white";
      case "regional":
        return "bg-ike-warning text-white";
      default:
        return "bg-ike-neutral text-white";
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src="" />
                <AvatarFallback className="bg-ike-primary text-white font-medium">
                  {contact.avatar}
                </AvatarFallback>
              </Avatar>
              {contact.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-ike-success rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-ike-neutral-dark">
                {contact.name}
              </h3>
              <p className="text-sm text-ike-neutral">
                {contact.role}
              </p>
            </div>
          </SheetTitle>
          <SheetDescription>
            Contact details and information
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Organization */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-ike-neutral" />
                <span className="font-medium text-ike-neutral-dark">Organization</span>
              </div>
              <Badge className={`text-xs ${getTypeBadgeColor(contact.type)}`}>
                <span className="flex items-center gap-1">
                  {getTypeIcon(contact.type)}
                  {contact.type}
                </span>
              </Badge>
            </div>
            <p className="text-sm text-ike-neutral ml-6">{contact.organization}</p>
            <p className="text-xs text-ike-neutral ml-6">Region: {contact.region}</p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-ike-neutral-dark">Contact Information</h4>
            
            {/* Email */}
            <div className="flex items-center justify-between p-3 bg-ike-neutral-light rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-ike-primary" />
                <div>
                  <p className="text-sm font-medium text-ike-neutral-dark">Email</p>
                  <p className="text-sm text-ike-neutral">{contact.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(contact.email, "Email")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`mailto:${contact.email}`)}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between p-3 bg-ike-neutral-light rounded-lg">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-ike-primary" />
                <div>
                  <p className="text-sm font-medium text-ike-neutral-dark">Phone</p>
                  <p className="text-sm text-ike-neutral">{contact.phone}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(contact.phone, "Phone number")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`tel:${contact.phone}`)}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Address */}
            <div className="p-3 bg-ike-neutral-light rounded-lg">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-ike-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-ike-neutral-dark">Address</p>
                  <p className="text-sm text-ike-neutral">{contact.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t">
            <Button 
              className="w-full bg-ike-primary hover:bg-ike-primary-dark text-white"
              onClick={() => onSendMessage(contact)}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
