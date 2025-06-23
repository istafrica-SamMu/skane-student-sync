
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link2, RefreshCw, Settings, AlertTriangle, CheckCircle } from "lucide-react";
import type { FinancialIntegration } from "@/types/posting";

interface FinancialIntegrationManagementProps {
  integrations: FinancialIntegration[];
}

const FinancialIntegrationManagement: React.FC<FinancialIntegrationManagementProps> = ({
  integrations
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-ike-success text-white">Connected</Badge>;
      case "disconnected":
        return <Badge variant="secondary">Disconnected</Badge>;
      case "error":
        return <Badge className="bg-ike-error text-white">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-ike-success" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-ike-error" />;
      default:
        return <RefreshCw className="w-4 h-4 text-ike-neutral" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-ike-neutral-dark">
          <Link2 className="w-5 h-5 mr-2 text-ike-primary" />
          Financial Integration Status
        </CardTitle>
        <CardDescription>
          Monitor municipality financial system integrations and posting requirements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Municipality</TableHead>
              <TableHead>System</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Auto Posting</TableHead>
              <TableHead>Last Sync</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {integrations.map((integration) => (
              <TableRow key={integration.municipalityId}>
                <TableCell>
                  <div className="flex items-center">
                    {getStatusIcon(integration.connectionStatus)}
                    <span className="ml-2 font-medium">{integration.municipalityName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{integration.integrationSystem.toUpperCase()}</Badge>
                </TableCell>
                <TableCell>{getStatusBadge(integration.connectionStatus)}</TableCell>
                <TableCell>
                  {integration.configuration.autoPostingEnabled ? (
                    <Badge className="bg-ike-success text-white">Enabled</Badge>
                  ) : (
                    <Badge variant="secondary">Manual</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {integration.lastSync ? (
                      <span className="text-ike-neutral">
                        {new Date(integration.lastSync).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-ike-neutral italic">Never</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FinancialIntegrationManagement;
