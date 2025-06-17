
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCheck, Plus, Search, Calendar, FileText, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const KAAManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddKAAOpen, setIsAddKAAOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedKAA, setSelectedKAA] = useState(null);
  
  const [kaaRecords, setKaaRecords] = useState([
    {
      id: 1,
      personalId: "200101-1234",
      firstName: "Emma",
      lastName: "Andersson",
      municipalityCode: "1280",
      municipalityName: "Malmö",
      registrationDate: "2024-01-15",
      deregistrationDate: null,
      category: "Not started upper secondary school",
      status: "Active",
      lastContact: "2024-06-10",
      measures: 3,
      eligibility: "Eligible",
      meritValue: 185.5
    },
    {
      id: 2,
      personalId: "200205-5678",
      firstName: "Oscar",
      lastName: "Nilsson",
      municipalityCode: "1281",
      municipalityName: "Lund",
      registrationDate: "2024-02-20",
      deregistrationDate: null,
      category: "Dropped out from upper secondary school",
      status: "Active",
      lastContact: "2024-06-08",
      measures: 1,
      eligibility: "Not eligible",
      meritValue: 142.0
    }
  ]);

  const [newKAA, setNewKAA] = useState({
    personalId: "",
    firstName: "",
    lastName: "",
    municipalityCode: "",
    municipalityName: "",
    registrationDate: "",
    category: "",
    eligibility: "",
    meritValue: ""
  });

  const [contactOccasion, setContactOccasion] = useState({
    date: "",
    type: "",
    description: "",
    followUpDate: ""
  });

  const categories = [
    "Not started upper secondary school",
    "Dropped out from upper secondary school",
    "Completed upper secondary school but unemployed",
    "Other activity responsibility"
  ];

  const contactTypes = [
    "Phone contact",
    "Meeting",
    "Email contact",
    "Home visit",
    "Office visit"
  ];

  const filteredKAA = kaaRecords.filter(record =>
    record.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.personalId.includes(searchTerm)
  );

  const handleAddKAA = () => {
    const kaaToAdd = {
      ...newKAA,
      id: kaaRecords.length + 1,
      deregistrationDate: null,
      status: "Active",
      lastContact: null,
      measures: 0,
      meritValue: parseFloat(newKAA.meritValue) || 0
    };
    setKaaRecords([...kaaRecords, kaaToAdd]);
    setNewKAA({
      personalId: "",
      firstName: "",
      lastName: "",
      municipalityCode: "",
      municipalityName: "",
      registrationDate: "",
      category: "",
      eligibility: "",
      meritValue: ""
    });
    setIsAddKAAOpen(false);
    toast({
      title: "KAA Record Added",
      description: `${newKAA.firstName} ${newKAA.lastName} has been registered for Municipal Activity Responsibility.`,
    });
  };

  const handleAddContact = () => {
    toast({
      title: "Contact Occasion Added",
      description: `Contact occasion recorded for ${selectedKAA?.firstName} ${selectedKAA?.lastName}.`,
    });
    setIsContactOpen(false);
    setContactOccasion({
      date: "",
      type: "",
      description: "",
      followUpDate: ""
    });
  };

  const handleExportStatistics = () => {
    toast({
      title: "Export Started",
      description: "Statistics Sweden file is being prepared for download.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">KAA Management</h1>
          <p className="text-ike-neutral">Municipal Activity Responsibility - Young People Management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportStatistics}>
            <Download className="w-4 h-4 mr-2" />
            Export to Statistics Sweden
          </Button>
          <Dialog open={isAddKAAOpen} onOpenChange={setIsAddKAAOpen}>
            <DialogTrigger asChild>
              <Button className="bg-ike-primary hover:bg-ike-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add KAA Record
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New KAA Record</DialogTitle>
                <DialogDescription>
                  Register a young person for Municipal Activity Responsibility
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <Label htmlFor="personalId">Personal ID Number</Label>
                  <Input
                    id="personalId"
                    value={newKAA.personalId}
                    onChange={(e) => setNewKAA({...newKAA, personalId: e.target.value})}
                    placeholder="YYYYMMDD-XXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="registrationDate">Registration Date</Label>
                  <Input
                    id="registrationDate"
                    type="date"
                    value={newKAA.registrationDate}
                    onChange={(e) => setNewKAA({...newKAA, registrationDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={newKAA.firstName}
                    onChange={(e) => setNewKAA({...newKAA, firstName: e.target.value})}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={newKAA.lastName}
                    onChange={(e) => setNewKAA({...newKAA, lastName: e.target.value})}
                    placeholder="Enter last name"
                  />
                </div>
                <div>
                  <Label htmlFor="municipalityCode">Municipality Code</Label>
                  <Input
                    id="municipalityCode"
                    value={newKAA.municipalityCode}
                    onChange={(e) => setNewKAA({...newKAA, municipalityCode: e.target.value})}
                    placeholder="1280"
                  />
                </div>
                <div>
                  <Label htmlFor="municipalityName">Municipality Name</Label>
                  <Input
                    id="municipalityName"
                    value={newKAA.municipalityName}
                    onChange={(e) => setNewKAA({...newKAA, municipalityName: e.target.value})}
                    placeholder="Malmö"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="category">KAA Category</Label>
                  <Select value={newKAA.category} onValueChange={(value) => setNewKAA({...newKAA, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="eligibility">Eligibility Status</Label>
                  <Select value={newKAA.eligibility} onValueChange={(value) => setNewKAA({...newKAA, eligibility: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select eligibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Eligible">Eligible</SelectItem>
                      <SelectItem value="Not eligible">Not eligible</SelectItem>
                      <SelectItem value="Partially eligible">Partially eligible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="meritValue">Merit Value</Label>
                  <Input
                    id="meritValue"
                    type="number"
                    step="0.1"
                    value={newKAA.meritValue}
                    onChange={(e) => setNewKAA({...newKAA, meritValue: e.target.value})}
                    placeholder="185.5"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddKAAOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddKAA} className="bg-ike-primary hover:bg-ike-primary/90">
                  Add KAA Record
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total KAA Records</CardTitle>
            <UserCheck className="h-4 w-4 text-ike-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kaaRecords.length}</div>
            <p className="text-xs text-ike-neutral">Active registrations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eligible for Upper Secondary</CardTitle>
            <FileText className="h-4 w-4 text-ike-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kaaRecords.filter(r => r.eligibility === "Eligible").length}</div>
            <p className="text-xs text-ike-neutral">Meeting requirements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Follow-up</CardTitle>
            <Calendar className="h-4 w-4 text-ike-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-ike-neutral">Require contact</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Merit Value</CardTitle>
            <FileText className="h-4 w-4 text-ike-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">163.8</div>
            <p className="text-xs text-ike-neutral">Across all records</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-ike-primary" />
            KAA Records
          </CardTitle>
          <CardDescription>
            Municipal Activity Responsibility registrations and follow-up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
            <Input
              placeholder="Search KAA records..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Personal Details</TableHead>
                <TableHead>Municipality</TableHead>
                <TableHead>Registration Period</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Eligibility</TableHead>
                <TableHead>Merit Value</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKAA.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.firstName} {record.lastName}</div>
                      <div className="text-sm text-ike-neutral">{record.personalId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.municipalityName}</div>
                      <div className="text-sm text-ike-neutral">Code: {record.municipalityCode}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>From: {record.registrationDate}</div>
                      <div>To: {record.deregistrationDate || 'Active'}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {record.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        record.eligibility === "Eligible" 
                          ? "bg-green-100 text-green-800" 
                          : record.eligibility === "Not eligible"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {record.eligibility}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{record.meritValue}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{record.lastContact || 'No contact'}</span>
                  </TableCell>
                  <TableCell>
                    <Dialog open={isContactOpen && selectedKAA?.id === record.id} onOpenChange={setIsContactOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedKAA(record)}
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          Contact
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Contact Occasion</DialogTitle>
                          <DialogDescription>
                            Record contact with {record.firstName} {record.lastName}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="contactDate">Contact Date</Label>
                              <Input
                                id="contactDate"
                                type="date"
                                value={contactOccasion.date}
                                onChange={(e) => setContactOccasion({...contactOccasion, date: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="contactType">Contact Type</Label>
                              <Select value={contactOccasion.type} onValueChange={(value) => setContactOccasion({...contactOccasion, type: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {contactTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={contactOccasion.description}
                              onChange={(e) => setContactOccasion({...contactOccasion, description: e.target.value})}
                              placeholder="Describe the contact and outcomes..."
                            />
                          </div>
                          <div>
                            <Label htmlFor="followUpDate">Follow-up Date (Optional)</Label>
                            <Input
                              id="followUpDate"
                              type="date"
                              value={contactOccasion.followUpDate}
                              onChange={(e) => setContactOccasion({...contactOccasion, followUpDate: e.target.value})}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsContactOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddContact} className="bg-ike-primary hover:bg-ike-primary/90">
                            Save Contact
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default KAAManagement;
