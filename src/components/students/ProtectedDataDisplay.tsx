
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye } from "lucide-react";
import { privacyService } from "@/services/privacyService";
import PrivacyIndicator from "./PrivacyIndicator";

interface ProtectedDataDisplayProps {
  studentId: number;
  field: string;
  fallbackValue?: string;
  userRole?: string;
  showPrivacyIndicator?: boolean;
}

const ProtectedDataDisplay = ({ 
  studentId, 
  field, 
  fallbackValue = '', 
  userRole = 'user',
  showPrivacyIndicator = true 
}: ProtectedDataDisplayProps) => {
  const [showUnmasked, setShowUnmasked] = useState(false);
  const isProtected = privacyService.isStudentProtected(studentId);
  
  if (!isProtected) {
    return <span>{fallbackValue}</span>;
  }

  const protectedStudent = privacyService.getProtectedStudent(studentId);
  const privacyMark = privacyService.getPrivacyMark(studentId);
  const canViewUnmasked = privacyService.canViewUnmaskedData(userRole);
  
  if (!protectedStudent || !privacyMark) {
    return <span>{fallbackValue}</span>;
  }

  const maskedData = privacyService.getMaskedData(studentId, field);
  const unmaskedData = (protectedStudent.unmaskedData as any)[field] || fallbackValue;

  const displayValue = (showUnmasked && canViewUnmasked) ? unmaskedData : maskedData;

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm">
        {displayValue || fallbackValue}
      </span>
      
      {showPrivacyIndicator && (
        <PrivacyIndicator privacyMark={privacyMark} showDetails={false} />
      )}
      
      {canViewUnmasked && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => setShowUnmasked(!showUnmasked)}
        >
          {showUnmasked ? (
            <EyeOff className="w-3 h-3" />
          ) : (
            <Eye className="w-3 h-3" />
          )}
        </Button>
      )}
    </div>
  );
};

export default ProtectedDataDisplay;
