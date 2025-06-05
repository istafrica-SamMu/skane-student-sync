
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Package, 
  Upload, 
  Download, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Users,
  ArrowUp
} from "lucide-react";

const StudentBulk = () => {
  const { t } = useLanguage();

  const bulkOperations = [
    {
      id: 1,
      type: "import",
      name: "SS12000 Import - Lunds kommun",
      status: "completed",
      progress: 100,
      totalRecords: 342,
      processedRecords: 342,
      successfulRecords: 338,
      failedRecords: 4,
      startTime: "2024-11-15 09:30",
      endTime: "2024-11-15 09:45",
      user: "Anna Lindström"
    },
    {
      id: 2,
      type: "promotion",
      name: "Årskursavancemang 2024",
      status: "running",
      progress: 65,
      totalRecords: 1247,
      processedRecords: 810,
      successfulRecords: 806,
      failedRecords: 4,
      startTime: "2024-11-15 14:00",
      endTime: null,
      user: "Lars Persson"
    },
    {
      id: 3,
      type: "export",
      name: "Studentdata Export - Malmö",
      status: "pending",
      progress: 0,
      totalRecords: 456,
      processedRecords: 0,
      successfulRecords: 0,
      failedRecords: 0,
      startTime: null,
      endTime: null,
      user: "Maria Andersson"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-ike-success text-white">{t('bulk.completed')}</Badge>;
      case "running":
        return <Badge className="bg-ike-primary text-white">{t('bulk.running')}</Badge>;
      case "pending":
        return <Badge className="bg-ike-warning text-white">{t('bulk.pending')}</Badge>;
      case "failed":
        return <Badge className="bg-ike-error text-white">{t('bulk.failed.status')}</Badge>;
      default:
        return <Badge variant="secondary">{t('bulk.unknown')}</Badge>;
    }
  };

  const getOperationIcon = (type: string) => {
    switch (type) {
      case "import":
        return <Upload className="w-4 h-4" />;
      case "export":
        return <Download className="w-4 h-4" />;
      case "promotion":
        return <ArrowUp className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">{t('bulk.title')}</h1>
          <p className="text-ike-neutral mt-2">
            {t('bulk.subtitle')}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <FileText className="w-4 h-4 mr-2" />
            {t('bulk.templates')}
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Package className="w-4 h-4 mr-2" />
            {t('bulk.new.operation')}
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-ike-primary">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Upload className="w-5 h-5 mr-2 text-ike-primary" />
              {t('bulk.import.student.data')}
            </CardTitle>
            <CardDescription>
              {t('bulk.import.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-ike-primary hover:bg-ike-primary-dark text-white">
              {t('bulk.start.import')}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-ike-success">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <ArrowUp className="w-5 h-5 mr-2 text-ike-success" />
              {t('bulk.year.advancement')}
            </CardTitle>
            <CardDescription>
              {t('bulk.advancement.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-ike-success hover:bg-green-600 text-white">
              {t('bulk.start.advancement')}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-ike-warning">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Download className="w-5 h-5 mr-2 text-ike-warning" />
              {t('bulk.export.data')}
            </CardTitle>
            <CardDescription>
              {t('bulk.export.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-ike-warning hover:bg-yellow-500 text-white">
              {t('bulk.start.export')}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Operation Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Package className="w-5 h-5 mr-2 text-ike-primary" />
            {t('bulk.recent.operations')}
          </CardTitle>
          <CardDescription>
            {t('bulk.operations.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {bulkOperations.map((operation) => (
              <div key={operation.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-ike-primary rounded-full flex items-center justify-center text-white">
                      {getOperationIcon(operation.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-ike-neutral-dark">{operation.name}</h3>
                      <p className="text-sm text-ike-neutral">{t('bulk.started.by')} {operation.user}</p>
                    </div>
                  </div>
                  {getStatusBadge(operation.status)}
                </div>

                {operation.status === "running" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-ike-neutral">{t('bulk.progress')}</span>
                      <span className="text-ike-neutral">{operation.progress}%</span>
                    </div>
                    <Progress value={operation.progress} className="h-2" />
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-ike-neutral">{t('bulk.total')}</span>
                    <p className="text-ike-neutral-dark">{operation.totalRecords.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-ike-neutral">{t('bulk.processed')}</span>
                    <p className="text-ike-neutral-dark">{operation.processedRecords.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-ike-success">{t('bulk.successful')}</span>
                    <p className="text-ike-success">{operation.successfulRecords.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-ike-error">{t('bulk.failed')}</span>
                    <p className="text-ike-error">{operation.failedRecords.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <div className="text-sm text-ike-neutral">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {t('bulk.start')} {operation.startTime || t('bulk.not.started')}
                      </div>
                      {operation.endTime && (
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1 text-ike-success" />
                          {t('bulk.end')} {operation.endTime}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {operation.status === "running" && (
                      <Button size="sm" variant="outline" className="border-ike-error text-ike-error hover:bg-ike-error/10">
                        {t('bulk.cancel')}
                      </Button>
                    )}
                    {operation.failedRecords > 0 && (
                      <Button size="sm" variant="outline" className="border-ike-warning text-ike-warning hover:bg-ike-warning/10">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {t('bulk.show.errors')}
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-ike-neutral hover:text-ike-primary">
                      {t('bulk.details')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Import Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">{t('bulk.import.guidelines')}</CardTitle>
          <CardDescription>
            {t('bulk.guidelines.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-ike-success mt-0.5" />
              <div>
                <h4 className="font-medium text-ike-neutral-dark">{t('bulk.ss12000.standard')}</h4>
                <p className="text-sm text-ike-neutral">{t('bulk.ss12000.description')}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-ike-success mt-0.5" />
              <div>
                <h4 className="font-medium text-ike-neutral-dark">{t('bulk.validation.before.import')}</h4>
                <p className="text-sm text-ike-neutral">{t('bulk.validation.description')}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-ike-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-ike-neutral-dark">{t('bulk.backup.before.operations')}</h4>
                <p className="text-sm text-ike-neutral">{t('bulk.backup.description')}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-ike-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-ike-neutral-dark">{t('bulk.communication')}</h4>
                <p className="text-sm text-ike-neutral">{t('bulk.communication.description')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentBulk;
