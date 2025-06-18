
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Map as MapIcon, 
  Download, 
  Filter,
  Users,
  School,
  MapPin,
  Layers
} from "lucide-react";
import InteractiveMap from "@/components/analysis/InteractiveMap";
import { useToast } from "@/hooks/use-toast";

const GeographicalAnalysis = () => {
  const [mapboxToken, setMapboxToken] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { toast } = useToast();

  // Mock geographical data for students and schools
  const studentLocations = [
    { id: 1, name: "Anna Johansson", lat: 55.6059, lng: 13.0007, municipality: "Malmö", schoolUnit: "Malmö Gymnasium" },
    { id: 2, name: "Erik Lindqvist", lat: 57.7089, lng: 11.9746, municipality: "Göteborg", schoolUnit: "Göteborg Tekniska" },
    { id: 3, name: "Sofia Andersson", lat: 55.7047, lng: 13.1910, municipality: "Lund", schoolUnit: "Lund Gymnasium" },
    { id: 4, name: "Maria Svensson", lat: 55.4295, lng: 13.8218, municipality: "Ystad", schoolUnit: "Ystad Gymnasium" },
    { id: 5, name: "Johan Berg", lat: 56.0465, lng: 12.6945, municipality: "Helsingborg", schoolUnit: "Helsingborg Gymnasium" }
  ];

  const schoolLocations = [
    { id: 1, name: "Malmö Gymnasium", lat: 55.6050, lng: 13.0038, students: 950, type: "Municipal" },
    { id: 2, name: "Göteborg Tekniska", lat: 57.7089, lng: 11.9746, students: 620, type: "Technical" },
    { id: 3, name: "Lund Gymnasium", lat: 55.7058, lng: 13.1932, students: 750, type: "Municipal" },
    { id: 4, name: "Ystad Gymnasium", lat: 55.4305, lng: 13.8240, students: 170, type: "Municipal" },
    { id: 5, name: "Helsingborg Gymnasium", lat: 56.0485, lng: 12.6965, students: 480, type: "Municipal" }
  ];

  const handleExportMap = () => {
    toast({
      title: "Map Exported",
      description: "Geographical analysis has been exported successfully",
    });
  };

  const getFilteredData = () => {
    switch (selectedFilter) {
      case "municipal":
        return {
          students: studentLocations.filter(s => schoolLocations.find(sc => sc.name === s.schoolUnit)?.type === "Municipal"),
          schools: schoolLocations.filter(s => s.type === "Municipal")
        };
      case "technical":
        return {
          students: studentLocations.filter(s => schoolLocations.find(sc => sc.name === s.schoolUnit)?.type === "Technical"),
          schools: schoolLocations.filter(s => s.type === "Technical")
        };
      default:
        return { students: studentLocations, schools: schoolLocations };
    }
  };

  const filteredData = getFilteredData();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Geographical Analysis</h1>
          <p className="text-ike-neutral mt-2">
            Visual analysis of student locations and school unit placements
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
          <Button 
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            onClick={handleExportMap}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Map
          </Button>
        </div>
      </div>

      {/* Mapbox Token Input (temporary) */}
      {!mapboxToken && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-800">Mapbox Configuration Required</CardTitle>
            <CardDescription className="text-amber-700">
              Please enter your Mapbox public token to enable interactive mapping features.
              Get your token from <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter your Mapbox public token..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button onClick={() => mapboxToken && toast({ title: "Token Set", description: "Mapbox token configured successfully" })}>
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{filteredData.students.length}</div>
            <p className="text-xs text-ike-neutral">Mapped locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">School Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">{filteredData.schools.length}</div>
            <p className="text-xs text-ike-neutral">Active locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Municipalities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">5</div>
            <p className="text-xs text-ike-neutral">Covered regions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Avg Distance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-warning">12.5 km</div>
            <p className="text-xs text-ike-neutral">Student to school</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Layers className="w-5 h-5 mr-2 text-ike-primary" />
            Map Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              variant={selectedFilter === "all" ? "default" : "outline"}
              onClick={() => setSelectedFilter("all")}
              className={selectedFilter === "all" ? "bg-ike-primary" : ""}
            >
              All Students
            </Button>
            <Button 
              variant={selectedFilter === "municipal" ? "default" : "outline"}
              onClick={() => setSelectedFilter("municipal")}
              className={selectedFilter === "municipal" ? "bg-ike-primary" : ""}
            >
              Municipal Schools
            </Button>
            <Button 
              variant={selectedFilter === "technical" ? "default" : "outline"}
              onClick={() => setSelectedFilter("technical")}
              className={selectedFilter === "technical" ? "bg-ike-primary" : ""}
            >
              Technical Schools
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <MapIcon className="w-5 h-5 mr-2 text-ike-primary" />
            Interactive Geographical Map
          </CardTitle>
          <CardDescription>
            Visual representation of student locations and school unit placements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[600px] border rounded-lg overflow-hidden">
            {mapboxToken ? (
              <InteractiveMap 
                mapboxToken={mapboxToken}
                students={filteredData.students}
                schools={filteredData.schools}
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-50">
                <div className="text-center text-ike-neutral">
                  <MapIcon className="w-16 h-16 mx-auto mb-4 text-ike-primary" />
                  <p className="text-lg font-medium">Interactive Map View</p>
                  <p className="text-sm">Configure Mapbox token to enable geographical analysis</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Location Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Users className="w-5 h-5 mr-2 text-ike-primary" />
              Student Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredData.students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-ike-primary" />
                    <div>
                      <p className="font-medium text-ike-neutral-dark">{student.name}</p>
                      <p className="text-sm text-ike-neutral">{student.municipality}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{student.schoolUnit}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <School className="w-5 h-5 mr-2 text-ike-primary" />
              School Unit Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredData.schools.map((school) => (
                <div key={school.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <School className="w-4 h-4 text-ike-success" />
                    <div>
                      <p className="font-medium text-ike-neutral-dark">{school.name}</p>
                      <p className="text-sm text-ike-neutral">{school.students} students</p>
                    </div>
                  </div>
                  <Badge 
                    className={school.type === "Municipal" ? "bg-ike-primary text-white" : "bg-ike-success text-white"}
                  >
                    {school.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeographicalAnalysis;
