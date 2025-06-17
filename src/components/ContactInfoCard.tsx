
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Mail, Phone, MapPin, Edit } from "lucide-react";

interface ContactPerson {
  name: string;
  role: string;
  email: string;
  phone: string;
}

interface ContactInfoCardProps {
  contactPerson: ContactPerson;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  onEdit?: () => void;
}

export const ContactInfoCard = ({ contactPerson, address, onEdit }: ContactInfoCardProps) => {
  const formatPhoneNumber = (phone: string) => {
    // Format Swedish phone numbers
    return phone.replace(/(\+46)\s?(\d{2})\s?(\d{3})\s?(\d{2})\s?(\d{2})/, '$1 $2 $3 $4 $5');
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^(\+46|0)\s?\d{2,3}\s?\d{3}\s?\d{2}\s?\d{2}$/.test(phone);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center text-ike-primary">
            <Users className="w-5 h-5 mr-2" />
            Contact Information
          </CardTitle>
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-ike-neutral-light p-4 rounded-lg">
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ike-primary">{contactPerson.name}</span>
                <Badge variant="outline" className="text-xs">
                  {contactPerson.role}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-ike-primary flex-shrink-0" />
                <span className="text-sm">{contactPerson.email}</span>
                {!validateEmail(contactPerson.email) && (
                  <Badge variant="destructive" className="text-xs">Invalid</Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-ike-primary flex-shrink-0" />
                <span className="text-sm">{formatPhoneNumber(contactPerson.phone)}</span>
                {!validatePhone(contactPerson.phone) && (
                  <Badge variant="destructive" className="text-xs">Invalid</Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-ike-primary mb-2 flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Address
          </h4>
          <div className="text-sm space-y-1">
            <p className="font-medium">{address.street}</p>
            <p>{address.postalCode} {address.city}</p>
            <p className="text-ike-neutral">{address.country}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
