
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCcw, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Database
} from "lucide-react";
import { useTravelCardSync } from "@/hooks/useTravelCardSync";

const TravelCardSyncStatus = () => {
  const { syncStatus, performSync } = useTravelCardSync();

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString('sv-SE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = () => {
    if (syncStatus.isRunning) {
      return <Badge className="bg-ike-warning text-white animate-pulse">Syncing...</Badge>;
    }
    if (syncStatus.errors.length > 0) {
      return <Badge className="bg-ike-error text-white">Error</Badge>;
    }
    return <Badge className="bg-ike-success text-white">Up to date</Badge>;
  };

  return (
    <Card className="border-l-4 border-l-ike-primary">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-ike-neutral-dark">
          <div className="flex items-center">
            <Database className="w-5 h-5 mr-2 text-ike-primary" />
            Daily Data Updates
          </div>
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium text-ike-neutral-dark mb-1">Last Sync</p>
            <p className="text-ike-neutral flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-ike-success" />
              {formatDateTime(syncStatus.lastSync)}
            </p>
            {syncStatus.lastSync && (
              <p className="text-xs text-ike-neutral mt-1">
                {syncStatus.recordsUpdated} records updated
              </p>
            )}
          </div>
          <div>
            <p className="font-medium text-ike-neutral-dark mb-1">Next Sync</p>
            <p className="text-ike-neutral flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {formatDateTime(syncStatus.nextSync)}
            </p>
            <p className="text-xs text-ike-neutral mt-1">
              Automatic daily at 02:00
            </p>
          </div>
          <div>
            <p className="font-medium text-ike-neutral-dark mb-1">Manual Sync</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={performSync}
              disabled={syncStatus.isRunning}
              className="border-ike-primary text-ike-primary hover:bg-ike-primary/10"
            >
              {syncStatus.isRunning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-ike-primary mr-2"></div>
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCcw className="w-4 h-4 mr-1" />
                  Sync Now
                </>
              )}
            </Button>
          </div>
        </div>
        
        {syncStatus.errors.length > 0 && (
          <div className="bg-ike-error/10 border border-ike-error/20 rounded-lg p-3">
            <div className="flex items-center text-ike-error mb-2">
              <AlertTriangle className="w-4 h-4 mr-2" />
              <span className="font-medium">Sync Errors</span>
            </div>
            {syncStatus.errors.map((error, index) => (
              <p key={index} className="text-sm text-ike-error">
                {error}
              </p>
            ))}
          </div>
        )}
        
        <div className="bg-ike-neutral-light p-3 rounded-lg">
          <h4 className="font-medium text-ike-neutral-dark mb-2">What gets updated?</h4>
          <ul className="text-sm text-ike-neutral space-y-1">
            <li>• Student address changes from population registry</li>
            <li>• Enrollment status updates from school systems</li>
            <li>• Grade progression and transfers</li>
            <li>• Travel distance calculations</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelCardSyncStatus;
