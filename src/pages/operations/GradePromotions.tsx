
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Upload, Download, Search } from "lucide-react";

export default function GradePromotions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Grade Promotions</h1>
          <p className="text-ike-neutral mt-2">
            Manage student grade promotions across the region
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Promotions
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-primary">
              <TrendingUp className="w-5 h-5 mr-2" />
              Promotion Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Students:</span>
                <span className="font-semibold">12,450</span>
              </div>
              <div className="flex justify-between">
                <span>Promoted:</span>
                <span className="font-semibold text-green-600">11,890</span>
              </div>
              <div className="flex justify-between">
                <span>Held Back:</span>
                <span className="font-semibold text-orange-600">560</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Promotion Filters</CardTitle>
            <CardDescription>
              Filter and search for specific promotion records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="school-year">School Year</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="municipality">Municipality</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All municipalities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Municipalities</SelectItem>
                    <SelectItem value="athens">Athens</SelectItem>
                    <SelectItem value="thessaloniki">Thessaloniki</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="search">Search Student</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-ike-neutral" />
                  <Input placeholder="Student name or ID" className="pl-10" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Promotion Activities</CardTitle>
          <CardDescription>
            Latest grade promotion updates and changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-ike-neutral">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Promotion data will be displayed here</p>
            <p className="text-sm">Use the filters above to load promotion records</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
