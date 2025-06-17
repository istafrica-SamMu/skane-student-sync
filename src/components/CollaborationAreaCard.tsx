
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Building2, MapPin, Edit, Unlink } from "lucide-react";

interface Municipality {
  id: string;
  name: string;
  code: string;
}

interface CollaborationArea {
  id: string;
  name: string;
  region: string;
  description?: string;
  municipalities: Municipality[];
  status: 'active' | 'inactive';
  coordinatorName: string;
  coordinatorEmail: string;
}

interface CollaborationAreaCardProps {
  area: CollaborationArea;
  onEdit?: () => void;
  onRemoveMunicipality?: (municipalityId: string) => void;
}

export const CollaborationAreaCard = ({ area, onEdit, onRemoveMunicipality }: CollaborationAreaCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center text-ike-primary">
            <Users className="w-5 h-5 mr-2" />
            {area.name}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge 
              variant={area.status === 'active' ? 'default' : 'secondary'}
              className={area.status === 'active' ? 'bg-green-100 text-green-800' : ''}
            >
              {area.status}
            </Badge>
            {onEdit && (
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-ike-neutral-light p-4 rounded-lg">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-ike-primary" />
              <span className="font-medium text-ike-primary">Region: {area.region}</span>
            </div>
            
            {area.description && (
              <p className="text-sm text-ike-neutral">{area.description}</p>
            )}
            
            <div className="space-y-2">
              <div>
                <span className="font-medium text-sm">Coordinator:</span>
                <p className="text-sm">{area.coordinatorName}</p>
                <p className="text-sm text-ike-neutral">{area.coordinatorEmail}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-ike-primary flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              Municipalities ({area.municipalities.length})
            </h4>
          </div>
          
          {area.municipalities.length === 0 ? (
            <p className="text-sm text-ike-neutral italic">No municipalities in this collaboration area</p>
          ) : (
            <div className="grid gap-2">
              {area.municipalities.map((municipality) => (
                <div key={municipality.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{municipality.name}</p>
                    <p className="text-sm text-ike-neutral">Code: {municipality.code}</p>
                  </div>
                  {onRemoveMunicipality && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemoveMunicipality(municipality.id)}
                    >
                      <Unlink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
