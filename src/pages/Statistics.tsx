
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Download, PieChart, Calendar, ArrowUp, ArrowDown, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Statistics = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">{t('statistics.title')}</h1>
          <p className="text-ike-neutral mt-2">
            {t('statistics.subtitle')}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Calendar className="w-4 h-4 mr-2" />
            {t('statistics.period')}: Nov 2024
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            {t('statistics.export.data')}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('statistics.student.growth')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">+12.3%</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowUp className="w-3 h-3 mr-1" />
              {t('statistics.compared.previous.year')}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('statistics.cost.efficiency')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">+3.8%</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowUp className="w-3 h-3 mr-1" />
              {t('statistics.improvement.since.2023')}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('statistics.conflict.frequency')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-error">2.4%</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowDown className="w-3 h-3 mr-1" />
              {t('statistics.compared.previous.year.decrease')}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('statistics.success.rate')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">94.2%</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowUp className="w-3 h-3 mr-1" />
              {t('statistics.from.last.measurement')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enrollment Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <TrendingUp className="w-5 h-5 mr-2 text-ike-primary" />
              {t('statistics.enrollment.trends')}
            </CardTitle>
            <CardDescription>
              {t('statistics.historical.development')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded-lg">
              <div className="text-center text-ike-neutral">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
                <p>{t('statistics.interactive.line.chart')}</p>
                <p className="text-sm">({t('statistics.visualization.enrollment')})</p>
              </div>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <Badge className="bg-ike-primary text-white">{t('statistics.natural.science')}</Badge>
              <Badge className="bg-ike-success text-white">{t('statistics.social.science')}</Badge>
              <Badge className="bg-ike-warning text-white">{t('statistics.technology')}</Badge>
              <Badge className="bg-ike-error text-white">{t('statistics.economics')}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <PieChart className="w-5 h-5 mr-2 text-ike-primary" />
              {t('statistics.program.distribution')}
            </CardTitle>
            <CardDescription>
              {t('statistics.students.per.program')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded-lg">
              <div className="text-center text-ike-neutral">
                <PieChart className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
                <p>{t('statistics.interactive.pie.chart')}</p>
                <p className="text-sm">({t('statistics.visualization.distribution')})</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-ike-primary rounded-full"></div>
                <span className="text-xs">{t('statistics.natural.science')} (32%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-ike-success rounded-full"></div>
                <span className="text-xs">{t('statistics.social.science')} (28%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-ike-warning rounded-full"></div>
                <span className="text-xs">{t('statistics.technology')} (22%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-ike-error rounded-full"></div>
                <span className="text-xs">{t('statistics.economics')} (18%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <BarChart3 className="w-5 h-5 mr-2 text-ike-primary" />
            {t('statistics.geographical.distribution')}
          </CardTitle>
          <CardDescription>
            {t('statistics.students.per.municipality')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center border rounded-lg mb-4">
            <div className="text-center text-ike-neutral">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
              <p>{t('statistics.interactive.region.chart')}</p>
              <p className="text-sm">({t('statistics.visualization.geographical')})</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { municipality: "Malmö", students: 950, color: "bg-ike-primary" },
              { municipality: "Lund", students: 750, color: "bg-ike-success" },
              { municipality: "Helsingborg", students: 620, color: "bg-ike-warning" },
              { municipality: "Kristianstad", students: 410, color: "bg-ike-error" },
              { municipality: "Landskrona", students: 170, color: "bg-green-500" }
            ].map((item, index) => (
              <Card key={index} className={`border-l-4 border-l-${item.color.split('-')[2]}`}>
                <CardContent className="p-3">
                  <div className="text-lg font-bold text-ike-neutral-dark">
                    {item.students}
                  </div>
                  <div className="text-xs text-ike-neutral">
                    {item.municipality}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">{t('statistics.cost.per.student')}</CardTitle>
            <CardDescription>
              {t('statistics.mean.median.cost')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center border rounded-lg mb-4">
              <div className="text-center text-ike-neutral">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
                <p>{t('statistics.interactive.bar.chart')}</p>
                <p className="text-sm">({t('statistics.cost.comparisons')})</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ike-neutral">{t('statistics.natural.science')}:</span>
                  <span className="font-medium">135,000 SEK</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ike-neutral">{t('statistics.social.science')}:</span>
                  <span className="font-medium">122,000 SEK</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ike-neutral">{t('statistics.technology')}:</span>
                  <span className="font-medium">142,000 SEK</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ike-neutral">{t('statistics.economics')}:</span>
                  <span className="font-medium">118,000 SEK</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">{t('statistics.budget.fulfillment')}</CardTitle>
            <CardDescription>
              {t('statistics.budget.vs.actual')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center border rounded-lg mb-4">
              <div className="text-center text-ike-neutral">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
                <p>{t('statistics.interactive.combination.chart')}</p>
                <p className="text-sm">({t('statistics.budget.trend.analysis')})</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center justify-between text-sm p-2 bg-ike-neutral-light rounded-lg">
                <span>{t('statistics.total.budget.2024')}:</span>
                <span className="font-medium">42,500,000 SEK</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 bg-ike-neutral-light rounded-lg">
                <span>{t('statistics.current.outcome')}:</span>
                <span className="font-medium">39,250,000 SEK (92.4%)</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 bg-green-50 text-green-700 rounded-lg">
                <span>{t('statistics.forecast.2024')}:</span>
                <span className="font-medium">42,100,000 SEK (-0.9%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">{t('statistics.data.export')}</CardTitle>
          <CardDescription>
            {t('statistics.export.statistics.analysis')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              <Download className="w-4 h-4 mr-2" />
              {t('statistics.excel.report')}
            </Button>
            <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
              <Download className="w-4 h-4 mr-2" />
              {t('statistics.pdf.summary')}
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              {t('statistics.csv.raw.data')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Analysis Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Advanced Analysis Tools</CardTitle>
          <CardDescription>
            Access specialized analytical tools for deeper insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              className="bg-ike-success hover:bg-ike-success/90 text-white h-20 flex flex-col items-center justify-center"
              onClick={() => window.location.href = '/analysis/geographical'}
            >
              <MapPin className="w-6 h-6 mb-2" />
              <span className="font-medium">Geographical Analysis</span>
              <span className="text-xs opacity-90">Interactive maps & location data</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-ike-primary text-ike-primary hover:bg-ike-primary/10 h-20 flex flex-col items-center justify-center"
              onClick={() => window.location.href = '/analysis/advanced'}
            >
              <BarChart3 className="w-6 h-6 mb-2" />
              <span className="font-medium">Advanced Analytics</span>
              <span className="text-xs opacity-90">Deep statistical analysis</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
