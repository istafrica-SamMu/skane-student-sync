
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin,
  Download,
  Filter,
  Search,
  School,
  Users,
  TrendingUp
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import InteractiveMap from "@/components/analysis/InteractiveMap";

const GeographicalAnalysis = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [mapboxToken, setMapboxToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const locationData = {
    totalStudents: 2847,
    schoolUnits: 12,
    averageDistance: 8.5,
    transportCoverage: 89.2
  };

  const schoolLocations = [
    {
      id: 1,
      name: "Municipal Gymnasium A",
      students: 450,
      address: "Storgatan 15, Malmö",
      coordinates: [13.0038, 55.6050] as [number, number],
      programs: ["Naturvetenskap", "Teknik"]
    },
    {
      id: 2,
      name: "Technical School Central",
      students: 380,
      address: "Industrigatan 22, Malmö",
      coordinates: [12.9944, 55.5950] as [number, number],
      programs: ["Teknik", "Hantverksprogram"]
    },
    {
      id: 3,
      name: "Social Sciences High",
      students: 520,
      address: "Kungsgatan 8, Malmö",
      coordinates: [13.0110, 55.6080] as [number, number],
      programs: ["Samhällsvetenskap", "Ekonomi"]
    }
  ];

  const handleExportData = () => {
    console.log('Export data clicked');
    toast({
      title: "Export Initiated",
      description: "Geographical data is being prepared for download",
    });
  };

  const handleSearch = () => {
    console.log('Search clicked with term:', searchTerm);
    toast({
      title: "Search Updated",
      description: `Filtering locations for: ${searchTerm}`,
    });
  };

  const handleFilter = () => {
    console.log('Filter clicked');
    toast({ 
      title: "Filter Applied", 
      description: "Location filters updated" 
    });
  };

  const handleViewOnMap = (schoolId: number) => {
    console.log('View on map clicked for school:', schoolId);
    const school = schoolLocations.find(s => s.id === schoolId);
    if (school) {
      toast({
        title: "Focusing on School",
        description: `Centering map on ${school.name}`,
      });
    }
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Token changed:', value.substring(0, 20) + '...');
    setMapboxToken(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Search term changed:', value);
    setSearchTerm(value);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">
            Geographical Analysis
          </h1>
          <p className="text-ike-neutral mt-2">
            Interactive map analysis of student and school distributions
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="border-ike-primary text-ike-primary hover:bg-ike-primary/10"
            onClick={handleFilter}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            onClick={handleExportData}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Map Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {locationData.totalStudents.toLocaleString()}
            </div>
            <p className="text-xs text-ike-neutral">Across all locations</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              School Units
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">
              {locationData.schoolUnits}
            </div>
            <p className="text-xs text-ike-neutral">Active locations</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Avg Distance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-warning">
              {locationData.averageDistance} km
            </div>
            <p className="text-xs text-ike-neutral">Student to school</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Transport Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {locationData.transportCoverage}%
            </div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2.1% this year
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mapbox Token Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <MapPin className="w-5 h-5 mr-2 text-ike-primary" />
            Map Configuration
          </CardTitle>
          <CardDescription>
            Enter your Mapbox public token to enable interactive map features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter Mapbox public token (pk.eyJ1...)"
                value={mapboxToken}
                onChange={handleTokenChange}
                className="border-ike-primary/20 focus:border-ike-primary"
              />
              <p className="text-xs text-ike-neutral mt-1">
                Get your token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-ike-primary hover:underline">mapbox.com</a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Interactive School Map</CardTitle>
          <CardDescription>
            Geographic distribution of schools and student populations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InteractiveMap 
            mapboxToken={mapboxToken}
            schoolLocations={schoolLocations}
          />
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Search className="w-5 h-5 mr-2 text-ike-primary" />
            Location Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by school name, address, or program..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
            <Button 
              variant="outline"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* School Locations List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <School className="w-5 h-5 mr-2 text-ike-primary" />
            School Locations
          </CardTitle>
          <CardDescription>
            Detailed view of all school units and their statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schoolLocations.map((school) => (
              <div key={school.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-ike-primary/10 rounded-lg flex items-center justify-center">
                    <School className="w-6 h-6 text-ike-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ike-neutral-dark">{school.name}</h3>
                    <p className="text-sm text-ike-neutral">{school.address}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Users className="w-3 h-3 text-ike-neutral" />
                      <span className="text-xs text-ike-neutral">{school.students} students</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex space-x-1">
                    {school.programs.map((program, index) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className="text-xs text-ike-primary border-ike-primary"
                      >
                        {program}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewOnMap(school.id)}
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    View on Map
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeographicalAnalysis;
