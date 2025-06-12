
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Upload, Download, CheckCircle, AlertCircle, Clock } from "lucide-react";

export default function AddressUpdates() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Address Updates</h1>
          <p className="text-ike-neutral mt-2">
            Manage student address changes and verification
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Import
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-ike-neutral">Pending Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">127</div>
            <p className="text-xs text-ike-neutral">Awaiting verification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-ike-neutral">Verified Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">45</div>
            <p className="text-xs text-ike-neutral">Approved changes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-ike-neutral">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">8</div>
            <p className="text-xs text-ike-neutral">Invalid addresses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-ike-neutral">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">1,234</div>
            <p className="text-xs text-ike-neutral">Total processed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-primary">
            <MapPin className="w-5 h-5 mr-2" />
            Address Update Queue
          </CardTitle>
          <CardDescription>
            Review and approve pending address changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label>Search Student</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-ike-neutral" />
                <Input placeholder="Name, ID, or address" className="pl-10" />
              </div>
            </div>
            <div className="md:w-48">
              <Label>Status Filter</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:w-48">
              <Label>Municipality</Label>
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
          </div>

          <div className="space-y-4">
            {/* Sample pending updates */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="font-medium">Maria Papadopoulos</div>
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                </div>
                <div className="text-sm text-ike-neutral">ID: 12345678</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-ike-neutral-dark">Old Address:</div>
                  <div>Panepistimiou 15, Athens 10564</div>
                </div>
                <div>
                  <div className="font-medium text-ike-neutral-dark">New Address:</div>
                  <div>Vasilissis Sofias 23, Athens 10674</div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approve
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="font-medium">Dimitris Kostas</div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="text-sm text-ike-neutral">ID: 87654321</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-ike-neutral-dark">Old Address:</div>
                  <div>Ermou 45, Thessaloniki 54624</div>
                </div>
                <div>
                  <div className="font-medium text-ike-neutral-dark">New Address:</div>
                  <div>Tsimiski 12, Thessaloniki 54623</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
