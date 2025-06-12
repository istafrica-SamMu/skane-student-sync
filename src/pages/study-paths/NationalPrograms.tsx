
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Plus, Download, Upload } from "lucide-react";

export default function NationalPrograms() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">National Programs</h1>
          <p className="text-ike-neutral mt-2">
            Manage national programs and specialization codes from Swedish national school database
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Import from Database
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Program
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-ike-primary" />
              National Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">18</div>
            <p className="text-ike-neutral text-sm">Available programs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-ike-primary" />
              Specializations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">156</div>
            <p className="text-ike-neutral text-sm">Specialization codes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-ike-primary" />
              Last Import
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">Dec 15</div>
            <p className="text-ike-neutral text-sm">2024 database update</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>National Programs Overview</CardTitle>
          <CardDescription>Programs imported from Swedish national school database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                code: "NA", 
                name: "Naturvetenskapsprogrammet", 
                english: "Natural Science Programme",
                specializations: 8,
                students: 1245,
                status: "Active"
              },
              { 
                code: "SA", 
                name: "Samhällsvetenskapsprogrammet", 
                english: "Social Science Programme",
                specializations: 12,
                students: 2156,
                status: "Active"
              },
              { 
                code: "TE", 
                name: "Teknikprogrammet", 
                english: "Technology Programme",
                specializations: 15,
                students: 1876,
                status: "Updated"
              },
              { 
                code: "ES", 
                name: "Estetiska programmet", 
                english: "Arts Programme",
                specializations: 9,
                students: 892,
                status: "Active"
              },
            ].map((program, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{program.name}</h3>
                  <p className="text-sm text-ike-neutral">
                    {program.code} • {program.english} • {program.specializations} specializations • {program.students} students
                  </p>
                </div>
                <Badge variant={program.status === "Updated" ? "secondary" : "default"}>
                  {program.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
