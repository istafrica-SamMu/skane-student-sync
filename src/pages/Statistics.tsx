
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Download, PieChart, Calendar, ArrowUp, ArrowDown } from "lucide-react";

const Statistics = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Statistik & Analys</h1>
          <p className="text-ike-neutral mt-2">
            Datadrivet beslutsunderlag och trendanalys
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Calendar className="w-4 h-4 mr-2" />
            Period: Nov 2024
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            Exportera data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Elevtillväxt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">+12.3%</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowUp className="w-3 h-3 mr-1" />
              Jämfört med föregående år
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Kostnadseffektivitet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">+3.8%</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowUp className="w-3 h-3 mr-1" />
              Förbättring sedan 2023
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Konfliktfrekvens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-error">2.4%</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowDown className="w-3 h-3 mr-1" />
              -0.8% jämfört med föregående år
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Framgångsgrad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">94.2%</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowUp className="w-3 h-3 mr-1" />
              +1.5% från förra mätningen
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
              Elevintagstrender
            </CardTitle>
            <CardDescription>
              Historisk utveckling av elevantal per program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded-lg">
              <div className="text-center text-ike-neutral">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
                <p>Interaktivt linjediagram skulle visas här</p>
                <p className="text-sm">(Visualisering av elevtalsutveckling över tid)</p>
              </div>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <Badge className="bg-ike-primary text-white">Naturvetenskap</Badge>
              <Badge className="bg-ike-success text-white">Samhällsvetenskap</Badge>
              <Badge className="bg-ike-warning text-white">Teknik</Badge>
              <Badge className="bg-ike-error text-white">Ekonomi</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <PieChart className="w-5 h-5 mr-2 text-ike-primary" />
              Programfördelning
            </CardTitle>
            <CardDescription>
              Antal studenter per programtyp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded-lg">
              <div className="text-center text-ike-neutral">
                <PieChart className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
                <p>Interaktivt cirkeldiagram skulle visas här</p>
                <p className="text-sm">(Visualisering av elevfördelning mellan program)</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-ike-primary rounded-full"></div>
                <span className="text-xs">Naturvetenskap (32%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-ike-success rounded-full"></div>
                <span className="text-xs">Samhällsvetenskap (28%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-ike-warning rounded-full"></div>
                <span className="text-xs">Teknik (22%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-ike-error rounded-full"></div>
                <span className="text-xs">Ekonomi (18%)</span>
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
            Geografisk fördelning av studenter
          </CardTitle>
          <CardDescription>
            Distribution av studenter per kommun
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center border rounded-lg mb-4">
            <div className="text-center text-ike-neutral">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
              <p>Interaktivt regiondiagram skulle visas här</p>
              <p className="text-sm">(Visualisering av geografisk fördelning med karta eller stapeldiagram)</p>
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
            <CardTitle className="text-ike-neutral-dark">Kostnad per Student</CardTitle>
            <CardDescription>
              Medel- och mediankostnad per studentkategori
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center border rounded-lg mb-4">
              <div className="text-center text-ike-neutral">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
                <p>Interaktivt stapeldiagram skulle visas här</p>
                <p className="text-sm">(Kostnadsjämförelser mellan program)</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ike-neutral">Naturvetenskap:</span>
                  <span className="font-medium">135,000 SEK</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ike-neutral">Samhällsvetenskap:</span>
                  <span className="font-medium">122,000 SEK</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ike-neutral">Teknik:</span>
                  <span className="font-medium">142,000 SEK</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ike-neutral">Ekonomi:</span>
                  <span className="font-medium">118,000 SEK</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">Budgetuppfyllnad</CardTitle>
            <CardDescription>
              Jämförelse mellan budget och faktiskt utfall
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center border rounded-lg mb-4">
              <div className="text-center text-ike-neutral">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
                <p>Interaktivt kombinationsdiagram skulle visas här</p>
                <p className="text-sm">(Budget vs utfall trendanalys)</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center justify-between text-sm p-2 bg-ike-neutral-light rounded-lg">
                <span>Total budget 2024:</span>
                <span className="font-medium">42,500,000 SEK</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 bg-ike-neutral-light rounded-lg">
                <span>Aktuellt utfall (Nov):</span>
                <span className="font-medium">39,250,000 SEK (92.4%)</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 bg-green-50 text-green-700 rounded-lg">
                <span>Prognos 2024:</span>
                <span className="font-medium">42,100,000 SEK (-0.9%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Dataexport</CardTitle>
          <CardDescription>
            Exportera statistik och analysdata i olika format
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              <Download className="w-4 h-4 mr-2" />
              Excel Rapport
            </Button>
            <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
              <Download className="w-4 h-4 mr-2" />
              PDF Sammanställning
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              CSV Rådata
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
