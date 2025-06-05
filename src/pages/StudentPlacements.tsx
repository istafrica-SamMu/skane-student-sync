
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Calendar, CheckCircle, Clock, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const StudentPlacements = () => {
  const { t } = useLanguage();
  
  const placements = [
    {
      id: 1,
      studentName: "Erik Andersson",
      personalNumber: "200501-1234",
      fromMunicipality: "Malmö",
      toMunicipality: "Lund",
      fromSchool: "Malmö Gymnasium",
      toSchool: "Katedralskolan",
      program: "Naturvetenskapsprogrammet",
      requestDate: "2024-11-15",
      status: "pending",
      reason: "Familjeпереезд"
    },
    {
      id: 2,
      studentName: "Maria Johansson",
      personalNumber: "200403-5678",
      fromMunicipality: "Lund",
      toMunicipality: "Helsingborg",
      fromSchool: "Katedralskolan",
      toSchool: "Nicolai Gymnasium",
      program: "Samhällsvetenskapsprogrammet",
      requestDate: "2024-11-10",
      status: "approved",
      reason: "Programbyte"
    },
    {
      id: 3,
      studentName: "Carl Lindström",
      personalNumber: "200502-9012",
      fromMunicipality: "Helsingborg",
      toMunicipality: "Malmö",
      fromSchool: "Nicolai Gymnasium",
      toSchool: "Jensen Gymnasium",
      program: "Estetiska programmet",
      requestDate: "2024-11-08",
      status: "completed",
      reason: "Specialisering"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-ike-warning text-white">{t('placements.pending')}</Badge>;
      case "approved":
        return <Badge className="bg-ike-primary text-white">{t('placements.approved')}</Badge>;
      case "completed":
        return <Badge className="bg-ike-success text-white">{t('placements.completed')}</Badge>;
      default:
        return <Badge variant="secondary">{t('placements.unknown')}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">{t('placements.title')}</h1>
          <p className="text-ike-neutral mt-2">
            {t('placements.subtitle')}
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <ArrowUpDown className="w-4 h-4 mr-2" />
          {t('placements.new.transfer')}
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('placements.pending.transfers')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">23</div>
            <div className="text-xs text-ike-neutral">{t('placements.requires.approval')}</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('placements.approved.this.month')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">47</div>
            <div className="text-xs text-ike-neutral">+15% {t('placements.from.last.month')}</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('placements.completed.transfers')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">156</div>
            <div className="text-xs text-ike-neutral">{t('placements.since.term.start')}</div>
          </CardContent>
        </Card>
      </div>

      {/* Placement Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <ArrowUpDown className="w-5 h-5 mr-2 text-ike-primary" />
            {t('placements.current.requests')}
          </CardTitle>
          <CardDescription>
            {t('placements.recent.transfers')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {placements.map((placement) => (
              <div key={placement.id} className="border rounded-lg p-4 hover:bg-ike-neutral-light/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-ike-primary rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-ike-neutral-dark">{placement.studentName}</h3>
                        <p className="text-sm text-ike-neutral font-mono">{placement.personalNumber}</p>
                      </div>
                      {getStatusBadge(placement.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium text-ike-neutral">{t('placements.from')}</span>
                            <p className="text-ike-neutral-dark">{placement.fromSchool}</p>
                            <p className="text-xs text-ike-neutral">{placement.fromMunicipality} kommun</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium text-ike-neutral">{t('placements.to')}</span>
                            <p className="text-ike-neutral-dark">{placement.toSchool}</p>
                            <p className="text-xs text-ike-neutral">{placement.toMunicipality} kommun</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-medium text-ike-neutral">{t('placements.program')}</span>
                          <span className="ml-2 text-ike-neutral-dark">{placement.program}</span>
                        </div>
                        <div className="flex items-center text-ike-neutral">
                          <Calendar className="w-4 h-4 mr-1" />
                          {placement.requestDate}
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="font-medium text-ike-neutral">{t('placements.reason')}</span>
                        <span className="ml-2 text-ike-neutral-dark">{placement.reason}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4 flex flex-col space-y-2">
                    {placement.status === "pending" && (
                      <>
                        <Button size="sm" className="bg-ike-success hover:bg-green-600 text-white">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {t('placements.approve')}
                        </Button>
                        <Button size="sm" variant="outline" className="border-ike-error text-ike-error hover:bg-ike-error/10">
                          {t('placements.reject')}
                        </Button>
                      </>
                    )}
                    {placement.status === "approved" && (
                      <Button size="sm" className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                        <Clock className="w-4 h-4 mr-1" />
                        {t('placements.execute')}
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-ike-neutral hover:text-ike-primary">
                      {t('placements.view.details')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transfer Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">{t('placements.transfer.process')}</CardTitle>
          <CardDescription>
            {t('placements.process.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-ike-success rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-ike-neutral-dark">{t('placements.step.application')}</h4>
                <p className="text-sm text-ike-neutral">{t('placements.step.application.desc')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-ike-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-ike-neutral-dark">{t('placements.step.review')}</h4>
                <p className="text-sm text-ike-neutral">{t('placements.step.review.desc')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-ike-warning rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-ike-neutral-dark">{t('placements.step.approval')}</h4>
                <p className="text-sm text-ike-neutral">{t('placements.step.approval.desc')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <div>
                <h4 className="font-medium text-ike-neutral-dark">{t('placements.step.execution')}</h4>
                <p className="text-sm text-ike-neutral">{t('placements.step.execution.desc')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentPlacements;
