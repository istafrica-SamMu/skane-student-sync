
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Euro, Search, Plus, Edit, Calendar, TrendingUp } from "lucide-react";

const PriceLists = () => {
  const priceLists = [
    {
      id: 1,
      municipality: "Malmö",
      type: "Normal",
      validFrom: "2024-07-01",
      validTo: "2025-06-30",
      programs: 12,
      avgPrice: 125000,
      status: "active",
      lastUpdated: "2024-06-15"
    },
    {
      id: 2,
      municipality: "Malmö", 
      type: "Intern",
      validFrom: "2024-07-01",
      validTo: "2025-06-30",
      programs: 12,
      avgPrice: 118000,
      status: "active",
      lastUpdated: "2024-06-15"
    },
    {
      id: 3,
      municipality: "Lund",
      type: "Normal",
      validFrom: "2024-07-01",
      validTo: "2025-06-30",
      programs: 10,
      avgPrice: 128000,
      status: "active",
      lastUpdated: "2024-06-20"
    },
    {
      id: 4,
      municipality: "Helsingborg",
      type: "Normal", 
      validFrom: "2025-01-01",
      validTo: "2025-12-31",
      programs: 14,
      avgPrice: 135000,
      status: "draft",
      lastUpdated: "2024-11-10"
    }
  ];

  const programs = [
    {
      code: "NA",
      name: "Naturvetenskapsprogrammet",
      municipality: "Malmö",
      normalPrice: 125000,
      internalPrice: 118000,
      specialization: "Naturvetenskap och samhälle"
    },
    {
      code: "SA",
      name: "Samhällsvetenskapsprogrammet", 
      municipality: "Malmö",
      normalPrice: 122000,
      internalPrice: 115000,
      specialization: "Samhällsvetenskap"
    },
    {
      code: "TE",
      name: "Teknikprogrammet",
      municipality: "Malmö", 
      normalPrice: 135000,
      internalPrice: 128000,
      specialization: "Teknik"
    },
    {
      code: "EK",
      name: "Ekonomiprogrammet",
      municipality: "Malmö",
      normalPrice: 120000,
      internalPrice: 113000,
      specialization: "Ekonomi"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-ike-success text-white">Aktiv</Badge>;
      case "draft":
        return <Badge className="bg-ike-warning text-white">Utkast</Badge>;
      case "expired":
        return <Badge className="bg-ike-error text-white">Utgången</Badge>;
      default:
        return <Badge variant="secondary">Okänd</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Prislistor</h1>
          <p className="text-ike-neutral mt-2">
            Hantera priser för program och specialiseringar
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Calendar className="w-4 h-4 mr-2" />
            Prishistorik
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Plus className="w-4 h-4 mr-2" />
            Ny Prislista
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Aktiva Prislistor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">47</div>
            <div className="text-xs text-ike-neutral">Över 33 kommuner</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Genomsnittspris
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">127,500</div>
            <div className="text-xs text-ike-neutral">SEK per student/år</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Uppdateringar i år
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">12</div>
            <div className="text-xs text-ike-neutral">Prisändringar 2024</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Prisökning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">+3.2%</div>
            <div className="text-xs text-ike-neutral">Jämfört med 2023</div>
          </CardContent>
        </Card>
      </div>

      {/* Price Lists Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Euro className="w-5 h-5 mr-2 text-ike-primary" />
            Prislistor per Kommun
          </CardTitle>
          <CardDescription>
            Översikt över aktiva och planerade prislistor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Sök prislistor..."
                className="pl-10 border-ike-primary/20 focus:border-ike-primary"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Kommun</TableHead>
                  <TableHead className="font-medium">Typ</TableHead>
                  <TableHead className="font-medium">Giltig från</TableHead>
                  <TableHead className="font-medium">Giltig till</TableHead>
                  <TableHead className="font-medium">Program</TableHead>
                  <TableHead className="font-medium text-right">Genomsnittspris</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium text-center">Åtgärder</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priceLists.map((priceList) => (
                  <TableRow key={priceList.id} className="hover:bg-ike-neutral-light/50">
                    <TableCell className="font-medium text-ike-neutral-dark">
                      {priceList.municipality}
                    </TableCell>
                    <TableCell>{priceList.type}</TableCell>
                    <TableCell>{priceList.validFrom}</TableCell>
                    <TableCell>{priceList.validTo}</TableCell>
                    <TableCell>{priceList.programs} program</TableCell>
                    <TableCell className="text-right font-medium">
                      {priceList.avgPrice.toLocaleString('sv-SE')} SEK
                    </TableCell>
                    <TableCell>{getStatusBadge(priceList.status)}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm" className="text-ike-neutral hover:text-ike-primary">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Program Prices Detail */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Programpriser - Malmö Kommun</CardTitle>
          <CardDescription>
            Detaljerade priser för olika program och specialiseringar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Programkod</TableHead>
                <TableHead className="font-medium">Programnamn</TableHead>
                <TableHead className="font-medium">Specialisering</TableHead>
                <TableHead className="font-medium text-right">Normalpris</TableHead>
                <TableHead className="font-medium text-right">Internt pris</TableHead>
                <TableHead className="font-medium text-center">Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((program, index) => (
                <TableRow key={index} className="hover:bg-ike-neutral-light/50">
                  <TableCell className="font-medium font-mono">
                    {program.code}
                  </TableCell>
                  <TableCell className="font-medium text-ike-neutral-dark">
                    {program.name}
                  </TableCell>
                  <TableCell>{program.specialization}</TableCell>
                  <TableCell className="text-right font-medium">
                    {program.normalPrice.toLocaleString('sv-SE')} SEK
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {program.internalPrice.toLocaleString('sv-SE')} SEK
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="sm" className="text-ike-neutral hover:text-ike-primary">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Price Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <TrendingUp className="w-5 h-5 mr-2 text-ike-primary" />
            Pristrender
          </CardTitle>
          <CardDescription>
            Utveckling av genomsnittspriser över tid
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-ike-neutral-light rounded-lg">
                <h4 className="font-medium text-ike-neutral-dark mb-2">2024</h4>
                <div className="text-2xl font-bold text-ike-primary">127,500 SEK</div>
                <div className="text-sm text-ike-success">+3.2% från 2023</div>
              </div>
              
              <div className="p-4 bg-ike-neutral-light rounded-lg">
                <h4 className="font-medium text-ike-neutral-dark mb-2">2023</h4>
                <div className="text-2xl font-bold text-ike-neutral-dark">123,500 SEK</div>
                <div className="text-sm text-ike-success">+2.8% från 2022</div>
              </div>
              
              <div className="p-4 bg-ike-neutral-light rounded-lg">
                <h4 className="font-medium text-ike-neutral-dark mb-2">2022</h4>
                <div className="text-2xl font-bold text-ike-neutral-dark">120,100 SEK</div>
                <div className="text-sm text-ike-success">+2.2% från 2021</div>
              </div>
            </div>
            
            <div className="h-64 flex items-center justify-center border rounded-lg p-4">
              <div className="text-center text-ike-neutral">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
                <p>Interaktivt trenddiagram skulle visas här</p>
                <p className="text-sm">(Visualisering av prisförändringar över tid)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceLists;
