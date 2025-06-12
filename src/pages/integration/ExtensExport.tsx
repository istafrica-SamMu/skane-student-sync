
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileSpreadsheet, Download, Upload, Settings, CheckCircle, XCircle, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ExtensExport = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Extens IKE Export</h1>
          <p className="text-ike-neutral mt-2">
            Export IKE data to Extens format for regional reporting
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Generate Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Last Export</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">2024-11-15</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <CheckCircle className="w-3 h-3 mr-1" />
              Successful
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Records Exported</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">12,847</div>
            <div className="text-xs text-ike-neutral mt-1">Student records</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Next Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">Nov 30</div>
            <div className="flex items-center text-xs text-ike-neutral mt-1">
              <Clock className="w-3 h-3 mr-1" />
              Monthly export
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <FileSpreadsheet className="w-5 h-5 mr-2 text-ike-primary" />
            Export Configuration
          </CardTitle>
          <CardDescription>
            Configure Extens export settings and data mapping
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Student Data Export</h3>
                <p className="text-sm text-ike-neutral">Export student enrollment and placement data</p>
              </div>
              <Badge className="bg-ike-success text-white">Enabled</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Financial Data Export</h3>
                <p className="text-sm text-ike-neutral">Export IKE calculations and financial data</p>
              </div>
              <Badge className="bg-ike-success text-white">Enabled</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Statistical Export</h3>
                <p className="text-sm text-ike-neutral">Export aggregated statistics and reports</p>
              </div>
              <Badge variant="secondary">Disabled</Badge>
            </div>
          </div>

          <div className="flex space-x-2 mt-6">
            <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              <Download className="w-4 h-4 mr-2" />
              Download Latest Export
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configure Export
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExtensExport;
