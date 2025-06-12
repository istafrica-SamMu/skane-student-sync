
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Euro, Plus, Calculator, TrendingUp } from "lucide-react";

export default function PriceCodes() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Price Codes</h1>
          <p className="text-ike-neutral mt-2">
            Manage price codes for study paths and inter-municipal compensation
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Price Code
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Euro className="w-5 h-5 text-ike-primary" />
              Total Price Codes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">34</div>
            <p className="text-ike-neutral text-sm">Active price codes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-ike-primary" />
              Average Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">95,450 SEK</div>
            <p className="text-ike-neutral text-sm">Per student per year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-ike-primary" />
              Price Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">12</div>
            <p className="text-ike-neutral text-sm">This school year</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Price Code Overview</CardTitle>
          <CardDescription>Current price codes and their associated study paths</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { code: "PC001", name: "Natural Science", price: "98,500 SEK", studyPaths: 8, status: "Active" },
              { code: "PC002", name: "Social Science", price: "92,300 SEK", studyPaths: 12, status: "Active" },
              { code: "PC003", name: "Technology", price: "105,200 SEK", studyPaths: 6, status: "Updated" },
              { code: "PC004", name: "Arts", price: "89,750 SEK", studyPaths: 4, status: "Active" },
            ].map((priceCode, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{priceCode.name}</h3>
                  <p className="text-sm text-ike-neutral">
                    {priceCode.code} • {priceCode.price} • {priceCode.studyPaths} study paths
                  </p>
                </div>
                <Badge variant={priceCode.status === "Updated" ? "secondary" : "default"}>
                  {priceCode.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
