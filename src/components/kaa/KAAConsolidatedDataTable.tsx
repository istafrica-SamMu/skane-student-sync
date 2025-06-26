
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Download, 
  Filter,
  Calendar,
  MapPin,
  ClipboardList
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const KAAConsolidatedDataTable = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const kaaConsolidatedData = [
    {
      id: 'KAA001',
      personalNumber: '200701011234',
      name: 'Anna Andersson',
      municipality: 'Stockholm',
      registrationDate: '2024-01-15',
      status: 'Active',
      category: 'School Absence',
      actions: 3,
      contacts: 5,
      lastContact: '2024-09-10',
      period: '2024-09'
    },
    {
      id: 'KAA002',
      personalNumber: '200505051234',
      name: 'Erik Eriksson',
      municipality: 'Göteborg',
      registrationDate: '2024-02-20',
      status: 'Completed',
      category: 'Work Training',
      actions: 5,
      contacts: 8,
      lastContact: '2024-08-15',
      period: '2024-08'
    },
    {
      id: 'KAA003',
      personalNumber: '200603031234',
      name: 'Maria Martinson',
      municipality: 'Malmö',
      registrationDate: '2024-03-10',
      status: 'Active',
      category: 'Study Support',
      actions: 2,
      contacts: 4,
      lastContact: '2024-09-05',
      period: '2024-09'
    },
    {
      id: 'KAA004',
      personalNumber: '200808081234',
      name: 'Johan Johansson',
      municipality: 'Uppsala',
      registrationDate: '2024-04-05',
      status: 'On Hold',
      category: 'Behavioral Issues',
      actions: 1,
      contacts: 2,
      lastContact: '2024-07-20',
      period: '2024-07'
    }
  ];

  const filteredData = kaaConsolidatedData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.municipality.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesPeriod = selectedPeriod === 'all' || item.period === selectedPeriod;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesPeriod && matchesCategory;
  });

  const handleExportData = () => {
    toast({
      title: "Data Exported",
      description: "All KAA data has been exported successfully",
    });
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Completed': 'bg-blue-100 text-blue-800',
      'On Hold': 'bg-yellow-100 text-yellow-800',
      'Inactive': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors.Active;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <ClipboardList className="w-5 h-5 mr-2 text-ike-primary" />
            All KAA Data - Consolidated View
          </CardTitle>
          <CardDescription>
            Complete overview of all KAA registrations and data across all periods
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search by name, ID, municipality, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Periods</SelectItem>
                <SelectItem value="2024-09">2024-09</SelectItem>
                <SelectItem value="2024-08">2024-08</SelectItem>
                <SelectItem value="2024-07">2024-07</SelectItem>
                <SelectItem value="2024-06">2024-06</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="School Absence">School Absence</SelectItem>
                <SelectItem value="Work Training">Work Training</SelectItem>
                <SelectItem value="Study Support">Study Support</SelectItem>
                <SelectItem value="Behavioral Issues">Behavioral Issues</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={handleExportData}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-ike-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-ike-primary">{filteredData.length}</div>
              <p className="text-sm text-ike-neutral">Total Records</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {filteredData.filter(item => item.status === 'Active').length}
              </div>
              <p className="text-sm text-ike-neutral">Active Cases</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {filteredData.reduce((sum, item) => sum + item.actions, 0)}
              </div>
              <p className="text-sm text-ike-neutral">Total Actions</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {filteredData.reduce((sum, item) => sum + item.contacts, 0)}
              </div>
              <p className="text-sm text-ike-neutral">Total Contacts</p>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>KAA ID</TableHead>
                  <TableHead>Personal Number</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Municipality</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Actions</TableHead>
                  <TableHead>Contacts</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Period</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium text-ike-primary">{item.id}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">{item.personalNumber}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-ike-neutral" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-ike-neutral">
                        <MapPin className="w-4 h-4 mr-1" />
                        {item.municipality}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-ike-neutral">
                        <Calendar className="w-4 h-4 mr-1" />
                        {item.registrationDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-ike-neutral">{item.category}</TableCell>
                    <TableCell>
                      <div className="text-center font-medium text-ike-primary">{item.actions}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center font-medium text-purple-600">{item.contacts}</div>
                    </TableCell>
                    <TableCell className="text-ike-neutral">{item.lastContact}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-ike-primary text-ike-primary">
                        {item.period}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
