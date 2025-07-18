
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Euro, 
  TrendingUp, 
  Download, 
  FileText, 
  Calendar,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

const ContributionReports = () => {
  const { t } = useLanguage();

  const contributions = [
    {
      municipality: "Malmö", 
      totalAmount: 1245000,
      sentAmount: 745000,
      receivedAmount: 500000,
      studentCount: 950,
      netPosition: 245000
    },
    {
      municipality: "Lund",
      totalAmount: 985000,
      sentAmount: 620000,
      receivedAmount: 365000,
      studentCount: 750,
      netPosition: 255000
    },
    {
      municipality: "Helsingborg",
      totalAmount: 785000,
      sentAmount: 350000,
      receivedAmount: 435000,
      studentCount: 620,
      netPosition: -85000
    },
    {
      municipality: "Kristianstad",
      totalAmount: 520000,
      sentAmount: 310000,
      receivedAmount: 210000,
      studentCount: 410,
      netPosition: 100000
    },
    {
      municipality: "Landskrona",
      totalAmount: 220000,
      sentAmount: 95000,
      receivedAmount: 125000,
      studentCount: 170,
      netPosition: -30000
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">{t('contributions.title')}</h1>
          <p className="text-ike-neutral mt-2">
            {t('contributions.subtitle')}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Calendar className="w-4 h-4 mr-2" />
            {t('contributions.historical.reports')}
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            {t('contributions.export.data')}
          </Button>
        </div>
      </div>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Filter className="w-5 h-5 mr-2 text-ike-primary" />
            {t('contributions.filter.data')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-ike-neutral mb-1">{t('contributions.period')}</label>
              <Select defaultValue="current">
                <SelectTrigger>
                  <SelectValue placeholder={t('contributions.select.period')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">November 2024</SelectItem>
                  <SelectItem value="previous">Oktober 2024</SelectItem>
                  <SelectItem value="q3">Q3 2024</SelectItem>
                  <SelectItem value="q2">Q2 2024</SelectItem>
                  <SelectItem value="q1">Q1 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ike-neutral mb-1">{t('contributions.municipality')}</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder={t('contributions.select.municipality')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('contributions.all.municipalities')}</SelectItem>
                  <SelectItem value="malmo">Malmö</SelectItem>
                  <SelectItem value="lund">Lund</SelectItem>
                  <SelectItem value="helsingborg">Helsingborg</SelectItem>
                  <SelectItem value="kristianstad">Kristianstad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ike-neutral mb-1">{t('contributions.program')}</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder={t('contributions.select.program')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('contributions.all.programs')}</SelectItem>
                  <SelectItem value="na">Naturvetenskapsprogrammet</SelectItem>
                  <SelectItem value="sa">Samhällsvetenskapsprogrammet</SelectItem>
                  <SelectItem value="te">Teknikprogrammet</SelectItem>
                  <SelectItem value="ek">Ekonomiprogrammet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ike-neutral mb-1">{t('contributions.flow.type')}</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder={t('contributions.select.flow.type')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('contributions.all.flows')}</SelectItem>
                  <SelectItem value="sent">{t('contributions.sent.payments')}</SelectItem>
                  <SelectItem value="received">{t('contributions.received.payments')}</SelectItem>
                  <SelectItem value="netpositive">{t('contributions.positive.net')}</SelectItem>
                  <SelectItem value="netnegative">{t('contributions.negative.net')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              {t('contributions.apply.filter')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('contributions.total.contributions')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              3,755,000 SEK
            </div>
            <div className="text-xs text-ike-success mt-1">
              +5.7% {t('contributions.from.last.month')}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('contributions.average.per.student')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              5,033 SEK
            </div>
            <div className="text-xs text-ike-neutral mt-1">
              {t('contributions.monthly.average')}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('contributions.largest.recipient')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">Malmö</div>
            <div className="text-xs text-ike-neutral mt-1">
              500,000 SEK {t('contributions.received')}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('contributions.largest.contributor')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">Lund</div>
            <div className="text-xs text-ike-neutral mt-1">
              620,000 SEK {t('contributions.sent')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contributions by Municipality */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Euro className="w-5 h-5 mr-2 text-ike-primary" />
            {t('contributions.overview.per.municipality')}
          </CardTitle>
          <CardDescription>
            {t('contributions.detailed.overview')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {contributions.map((contribution, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-ike-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {contribution.municipality.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-ike-neutral-dark">{contribution.municipality}</h3>
                      <p className="text-sm text-ike-neutral">{contribution.studentCount} {t('contributions.students')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-ike-neutral-dark">
                      {contribution.totalAmount.toLocaleString('sv-SE')} SEK
                    </div>
                    <div className="text-sm text-ike-neutral">
                      {t('contributions.total.transaction.volume')}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-ike-neutral">{t('contributions.sent.contribution')}</span>
                      <span className="text-sm font-medium text-ike-neutral-dark">
                        {contribution.sentAmount.toLocaleString('sv-SE')} SEK
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full">
                      <div 
                        className="h-2 bg-ike-error rounded-full" 
                        style={{ width: `${(contribution.sentAmount / contribution.totalAmount * 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-ike-neutral">{t('contributions.received.contribution')}</span>
                      <span className="text-sm font-medium text-ike-neutral-dark">
                        {contribution.receivedAmount.toLocaleString('sv-SE')} SEK
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full">
                      <div 
                        className="h-2 bg-ike-success rounded-full" 
                        style={{ width: `${(contribution.receivedAmount / contribution.totalAmount * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div className="text-sm">
                    <span className="font-medium text-ike-neutral">{t('contributions.net.result')}</span>
                    <span 
                      className={contribution.netPosition >= 0 ? "ml-2 text-ike-success" : "ml-2 text-ike-error"}
                    >
                      {contribution.netPosition >= 0 ? "+" : ""}
                      {contribution.netPosition.toLocaleString('sv-SE')} SEK
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {t('contributions.trends')}
                    </Button>
                    <Button size="sm" variant="ghost" className="text-ike-neutral hover:text-ike-primary">
                      <FileText className="w-4 h-4 mr-1" />
                      {t('contributions.details')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Report Types */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">{t('contributions.available.reports')}</CardTitle>
          <CardDescription>
            {t('contributions.specialized.reports')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-ike-neutral-light/50 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 bg-ike-primary/10 text-ike-primary rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-ike-neutral-dark">{t('contributions.municipal.summary')}</h3>
              </div>
              <p className="text-sm text-ike-neutral mb-4">
                {t('contributions.municipal.summary.desc')}
              </p>
              <Button size="sm" className="w-full bg-ike-primary hover:bg-ike-primary-dark text-white">
                {t('contributions.generate.report')}
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-ike-neutral-light/50 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 bg-ike-primary/10 text-ike-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-ike-neutral-dark">{t('contributions.trend.analysis')}</h3>
              </div>
              <p className="text-sm text-ike-neutral mb-4">
                {t('contributions.trend.analysis.desc')}
              </p>
              <Button size="sm" className="w-full bg-ike-primary hover:bg-ike-primary-dark text-white">
                {t('contributions.generate.report')}
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-ike-neutral-light/50 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 bg-ike-primary/10 text-ike-primary rounded-lg flex items-center justify-center">
                  <Euro className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-ike-neutral-dark">{t('contributions.economic.analysis')}</h3>
              </div>
              <p className="text-sm text-ike-neutral mb-4">
                {t('contributions.economic.analysis.desc')}
              </p>
              <Button size="sm" className="w-full bg-ike-primary hover:bg-ike-primary-dark text-white">
                {t('contributions.generate.report')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContributionReports;
