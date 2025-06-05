
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Upload,
  User,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCcw,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Integration = () => {
  const { t } = useLanguage();
  
  const integrations = [
    {
      id: 1,
      name: "Municipal SIS - Malmö",
      type: "ist_admin",
      status: "success",
      lastSync: "2024-11-15 14:30",
      processed: 1245,
      errors: 0,
      nextScheduled: "2024-11-16 02:00"
    },
    {
      id: 2,
      name: "SS12000 Import - Lund",
      type: "ss12000",
      status: "running",
      lastSync: "2024-11-15 15:45",
      processed: 458,
      errors: 0,
      nextScheduled: t('integration.ongoing')
    },
    {
      id: 3,
      name: "Navet Integration",
      type: "navet",
      status: "scheduled",
      lastSync: "2024-11-15 08:00",
      processed: 2847,
      errors: 3,
      nextScheduled: "2024-11-15 20:00"
    },
    {
      id: 4,
      name: "File Import - Helsingborg",
      type: "file",
      status: "error",
      lastSync: "2024-11-15 10:15",
      processed: 342,
      errors: 12,
      nextScheduled: t('integration.manual.action.required')
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-ike-success text-white">{t('integration.status.successful')}</Badge>;
      case "running":
        return <Badge className="bg-ike-primary text-white">{t('integration.status.running')}</Badge>;
      case "scheduled":
        return <Badge className="bg-ike-warning text-white">{t('integration.status.scheduled')}</Badge>;
      case "error":
        return <Badge className="bg-ike-error text-white">{t('integration.status.error')}</Badge>;
      default:
        return <Badge variant="secondary">{t('integration.status.unknown')}</Badge>;
    }
  };

  const getIntegrationIcon = (type: string) => {
    switch (type) {
      case "ist_admin":
        return <Database className="w-5 h-5 text-white" />;
      case "ss12000":
        return <Upload className="w-5 h-5 text-white" />;
      case "navet":
        return <User className="w-5 h-5 text-white" />;
      case "file":
        return <FileText className="w-5 h-5 text-white" />;
      default:
        return <Database className="w-5 h-5 text-white" />;
    }
  };

  const getIntegrationIconBg = (type: string) => {
    switch (type) {
      case "ist_admin":
        return "bg-blue-500";
      case "ss12000":
        return "bg-ike-primary";
      case "navet":
        return "bg-green-500";
      case "file":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">{t('integration.title')}</h1>
          <p className="text-ike-neutral mt-2">
            {t('integration.subtitle')}
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <RefreshCcw className="w-4 h-4 mr-2" />
          {t('integration.sync.now')}
        </Button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('integration.successful.syncs')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">24</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowUp className="w-3 h-3 mr-1" />
              {t('integration.last.24.hours')}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('integration.processed.records')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">48,234</div>
            <div className="flex items-center text-xs text-ike-neutral mt-1">
              {t('integration.last.24.hours')}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('integration.integration.issues')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">3</div>
            <div className="flex items-center text-xs text-ike-error mt-1">
              <ArrowUp className="w-3 h-3 mr-1" />
              {t('integration.requires.action')}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('integration.average.sync.time')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">1.8h</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowDown className="w-3 h-3 mr-1" />
              -0.5h {t('integration.from.previous.month')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Database className="w-5 h-5 mr-2 text-ike-primary" />
            {t('integration.integration.status')}
          </CardTitle>
          <CardDescription>
            {t('integration.status.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {integrations.map((integration) => (
              <div 
                key={integration.id} 
                className={`border rounded-lg p-4 ${
                  integration.status === 'error' ? 'border-ike-error/30 bg-ike-error/5' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIntegrationIconBg(integration.type)}`}>
                      {getIntegrationIcon(integration.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-ike-neutral-dark">{integration.name}</h3>
                      <p className="text-sm text-ike-neutral">
                        {t('integration.last.sync')} {integration.lastSync}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(integration.status)}
                </div>

                {integration.status === "running" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-ike-neutral">{t('integration.progress')}</span>
                      <span className="text-ike-neutral">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center justify-between bg-ike-neutral-light p-2 rounded-lg">
                    <span className="text-ike-neutral">{t('integration.processed.records.count')}</span>
                    <span className="font-medium">{integration.processed.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between bg-ike-neutral-light p-2 rounded-lg">
                    <span className="text-ike-neutral">{t('integration.errors')}</span>
                    <span className={`font-medium ${integration.errors > 0 ? 'text-ike-error' : ''}`}>
                      {integration.errors}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-ike-neutral">
                    <Clock className="w-4 h-4 mr-1" />
                    {t('integration.next')} {integration.nextScheduled}
                  </div>

                  <div className="flex space-x-2">
                    {integration.status === "error" && (
                      <Button size="sm" className="bg-ike-error hover:bg-ike-error/80 text-white">
                        <XCircle className="w-4 h-4 mr-1" />
                        {t('integration.show.errors')}
                      </Button>
                    )}

                    {integration.status === "running" && (
                      <Button size="sm" variant="outline" className="border-ike-error text-ike-error hover:bg-ike-error/10">
                        {t('integration.cancel')}
                      </Button>
                    )}

                    {(integration.status === "success" || integration.status === "error") && (
                      <Button size="sm" className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                        <RefreshCcw className="w-4 h-4 mr-1" />
                        {t('integration.synchronize')}
                      </Button>
                    )}

                    <Button size="sm" variant="ghost" className="text-ike-neutral hover:text-ike-primary">
                      {t('integration.configuration')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Database className="w-5 h-5 mr-2 text-blue-500" />
              {t('integration.municipal.sis.sync')}
            </CardTitle>
            <CardDescription>
              {t('integration.municipal.sis.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">IST Admin</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Tieto Education</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Alfa E-skola</span>
              </div>
              
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-2">
                {t('integration.configure.connections')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Upload className="w-5 h-5 mr-2 text-ike-primary" />
              {t('integration.ss12000.import')}
            </CardTitle>
            <CardDescription>
              {t('integration.ss12000.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">{t('integration.full.support')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">{t('integration.batch.realtime')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">{t('integration.validation.conflict')}</span>
              </div>
              
              <Button className="w-full bg-ike-primary hover:bg-ike-primary-dark text-white mt-2">
                {t('integration.import.ss12000')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <User className="w-5 h-5 mr-2 text-green-500" />
              {t('integration.navet.integration')}
            </CardTitle>
            <CardDescription>
              {t('integration.navet.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">{t('integration.population.data')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">{t('integration.address.updates')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">{t('integration.protected.personal.data')}</span>
              </div>
              
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white mt-2">
                {t('integration.navet.settings')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* File Processing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <FileText className="w-5 h-5 mr-2 text-amber-500" />
            {t('integration.file.processing')}
          </CardTitle>
          <CardDescription>
            {t('integration.file.processing.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 bg-ike-neutral-light/40">
              <h3 className="font-medium text-ike-neutral-dark mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-ike-primary" />
                {t('integration.import.data')}
              </h3>
              <p className="text-sm text-ike-neutral mb-4">
                {t('integration.import.data.description')}
              </p>
              <Button className="w-full bg-ike-primary hover:bg-ike-primary-dark text-white">
                {t('integration.choose.file.import')}
              </Button>
            </div>
            
            <div className="border rounded-lg p-6 bg-ike-neutral-light/40">
              <h3 className="font-medium text-ike-neutral-dark mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-amber-500" />
                {t('integration.export.data')}
              </h3>
              <p className="text-sm text-ike-neutral mb-4">
                {t('integration.export.data.description')}
              </p>
              <Button className="w-full border-amber-500 text-amber-500 hover:bg-amber-500/10" variant="outline">
                {t('integration.choose.data.export')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Integration;
