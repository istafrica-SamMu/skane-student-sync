
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book, Plus, Search, Filter } from "lucide-react";

export default function StudyPaths() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Study Paths</h1>
          <p className="text-ike-neutral mt-2">
            Manage study paths connected to price codes and national programs
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Study Path
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5 text-ike-primary" />
              Total Study Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">142</div>
            <p className="text-ike-neutral text-sm">Across all municipalities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-ike-primary" />
              Active Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">89</div>
            <p className="text-ike-neutral text-sm">Currently available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-ike-primary" />
              Price Codes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">34</div>
            <p className="text-ike-neutral text-sm">Connected price codes</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Study Paths</CardTitle>
          <CardDescription>Latest study paths added to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Natural Science", code: "NA001", status: "Active", municipality: "Malmö" },
              { name: "Social Science", code: "SA002", status: "Active", municipality: "Lund" },
              { name: "Technology", code: "TE003", status: "Pending", municipality: "Helsingborg" },
            ].map((path, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{path.name}</h3>
                  <p className="text-sm text-ike-neutral">Code: {path.code} • {path.municipality}</p>
                </div>
                <Badge variant={path.status === "Active" ? "default" : "secondary"}>
                  {path.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
