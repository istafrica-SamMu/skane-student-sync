import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  User, 
  Filter,
  Download,
  MessageSquare
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ContactDetailsModal } from "@/components/ContactDetailsModal";
import { SendMessageModal } from "@/components/SendMessageModal";

const ContactDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterRegion, setFilterRegion] = useState("all");
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const { user } = useAuth();

  // Mock contact data
  const contacts = [
    {
      id: 1,
      name: "Anna Lindberg",
      role: "Municipal Administrator",
      organization: "Malmö Municipality",
      type: "municipality",
      region: "Skåne",
      email: "anna.lindberg@malmo.se",
      phone: "+46 40 34 10 00",
      address: "Stortorget 1, 211 34 Malmö",
      avatar: "AL",
      isOnline: true
    },
    {
      id: 2,
      name: "Erik Svensson",
      role: "School Principal",
      organization: "Lund High School",
      type: "principal",
      region: "Skåne",
      email: "erik.svensson@lund.se",
      phone: "+46 46 35 10 00",
      address: "Kiliansgatan 12, 223 50 Lund",
      avatar: "ES",
      isOnline: false
    },
    {
      id: 3,
      name: "Maria Johansson",
      role: "Regional Administrator",
      organization: "Region Skåne",
      type: "regional",
      region: "Skåne",
      email: "maria.johansson@skane.se",
      phone: "+46 40 68 10 00",
      address: "Skånes hus, 205 25 Malmö",
      avatar: "MJ",
      isOnline: true
    },
    {
      id: 4,
      name: "Lars Petersson",
      role: "School Principal",
      organization: "Helsingborg Elementary School",
      type: "principal",
      region: "Skåne",
      email: "lars.petersson@helsingborg.se",
      phone: "+46 42 10 50 00",
      address: "Drottninggatan 1, 252 21 Helsingborg",
      avatar: "LP",
      isOnline: true
    },
    {
      id: 5,
      name: "Sofia Andersson",
      role: "Municipal Administrator",
      organization: "Kristianstad Municipality",
      type: "municipality",
      region: "Skåne",
      email: "sofia.andersson@kristianstad.se",
      phone: "+46 44 20 10 00",
      address: "Västra Storgatan 15, 291 80 Kristianstad",
      avatar: "SA",
      isOnline: false
    },
    {
      id: 6,
      name: "Johan Nilsson",
      role: "School Principal",
      organization: "Ystad Middle School",
      type: "principal",
      region: "Skåne",
      email: "johan.nilsson@ystad.se",
      phone: "+46 411 57 70 00",
      address: "St Knuts torg 2, 271 80 Ystad",
      avatar: "JN",
      isOnline: true
    }
  ];

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "municipality", label: "Municipalities" },
    { value: "principal", label: "Principals" },
    { value: "regional", label: "Regional" }
  ];

  const regionOptions = [
    { value: "all", label: "All Regions" },
    { value: "Skåne", label: "Skåne" },
    { value: "Blekinge", label: "Blekinge" }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || contact.type === filterType;
    const matchesRegion = filterRegion === "all" || contact.region === filterRegion;
    
    return matchesSearch && matchesType && matchesRegion;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "municipality":
        return <Building className="w-4 h-4" />;
      case "principal":
        return <User className="w-4 h-4" />;
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

  const handleContactClick = (contact: any) => {
    setSelectedContact(contact);
    setIsContactModalOpen(true);
  };

  const handleSendMessage = (contact: any) => {
    setSelectedContact(contact);
    setIsContactModalOpen(false);
    setIsMessageModalOpen(true);
  };

  const handleExportContacts = () => {
    // Simulate export functionality
    const csvContent = filteredContacts.map(contact => 
      `${contact.name},${contact.role},${contact.organization},${contact.email},${contact.phone}`
    ).join('\n');
    
    const blob = new Blob([`Name,Role,Organization,Email,Phone\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Contact Directory</h1>
          <p className="text-ike-neutral mt-1">
            Access contact information for municipalities and principals in the system
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={handleExportContacts}>
          <Download className="w-4 h-4" />
          Export Contacts
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search & Filter Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search by name, organization, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="border-ike-primary/20">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterRegion} onValueChange={setFilterRegion}>
              <SelectTrigger className="border-ike-primary/20">
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                {regionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-ike-neutral">
          Showing {filteredContacts.length} of {contacts.length} contacts
        </p>
        <div className="flex items-center gap-2 text-sm text-ike-neutral">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-ike-success rounded-full"></div>
            Online
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-ike-neutral rounded-full"></div>
            Offline
          </div>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <Card 
            key={contact.id} 
            className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={() => handleContactClick(contact)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
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
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-ike-neutral-dark truncate">
                      {contact.name}
                    </h3>
                    <p className="text-sm text-ike-neutral truncate">
                      {contact.role}
                    </p>
                  </div>
                </div>
                <Badge className={`text-xs ${getTypeBadgeColor(contact.type)}`}>
                  <span className="flex items-center gap-1">
                    {getTypeIcon(contact.type)}
                    {contact.type}
                  </span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-ike-neutral-dark">
                  <Building className="w-4 h-4 text-ike-neutral" />
                  <span className="truncate">{contact.organization}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-ike-neutral" />
                  <span className="text-ike-primary truncate">
                    {contact.email}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-ike-neutral" />
                  <span className="text-ike-primary">
                    {contact.phone}
                  </span>
                </div>
                
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-ike-neutral mt-0.5" />
                  <span className="text-ike-neutral text-xs leading-relaxed">
                    {contact.address}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  size="sm" 
                  className="bg-ike-primary hover:bg-ike-primary-dark text-white w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSendMessage(contact);
                  }}
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results Message */}
      {filteredContacts.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-ike-neutral-light rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-ike-neutral" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ike-neutral-dark">No contacts found</h3>
                <p className="text-ike-neutral">
                  Try adjusting your search terms or filters to find the contact you're looking for.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContactDirectory;
